// src/store/useStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Transaction, Filters, Role, Theme } from '../types'
import { mockTransactions } from '../data/mockData'

interface StoreState {
    // data
    transactions: Transaction[]

    // ui state
    role: Role
    theme: Theme
    filters: Filters

    // transaction actions
    addTransaction: (t: Transaction) => void
    editTransaction: (id: string, updated: Partial<Transaction>) => void
    deleteTransaction: (id: string) => void

    // filter actions
    setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void
    resetFilters: () => void

    // ui actions
    setRole: (role: Role) => void
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

const defaultFilters: Filters = {
    search: '',
    type: 'all',
    category: 'all',
    month: 'all',
    sortField: 'date',
    sortOrder: 'desc',
}

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            transactions: mockTransactions,
            role: 'viewer',
            theme: 'light',
            filters: defaultFilters,

            addTransaction: (t) =>
                set((s) => ({ transactions: [t, ...s.transactions] })),

            editTransaction: (id, updated) =>
                set((s) => ({
                    transactions: s.transactions.map((t) =>
                        t.id === id ? { ...t, ...updated } : t
                    ),
                })),

            deleteTransaction: (id) =>
                set((s) => ({
                    transactions: s.transactions.filter((t) => t.id !== id),
                })),

            setFilter: (key, value) =>
                set((s) => ({ filters: { ...s.filters, [key]: value } })),

            resetFilters: () => set({ filters: defaultFilters }),

            setRole: (role) => set({ role }),
            setTheme: (theme) => set({ theme }),
            toggleTheme: () =>
                set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
        }),
        {
            name: 'finsight-storage',
            partialise: (s) => ({
                transactions: s.transactions,
                role: s.role,
                theme: s.theme,
            }),
        }
    )
)

// ── Filtered selector ─────────────────────────────────────────────────────────
export function useFilteredTransactions() {
    const { transactions, filters } = useStore()

    return transactions
        .filter((t) => {
            if (filters.type !== 'all' && t.type !== filters.type) return false
            if (filters.category !== 'all' && t.category !== filters.category) return false
            if (filters.month !== 'all' && !t.date.startsWith(filters.month)) return false
            if (filters.search) {
                const q = filters.search.toLowerCase()
                if (
                    !t.description.toLowerCase().includes(q) &&
                    !t.category.toLowerCase().includes(q)
                ) return false
            }
            return true
        })
        .sort((a, b) => {
            if (filters.sortField === 'date') {
                return filters.sortOrder === 'desc'
                    ? b.date.localeCompare(a.date)
                    : a.date.localeCompare(b.date)
            }
            return filters.sortOrder === 'desc'
                ? b.amount - a.amount
                : a.amount - b.amount
        })
}