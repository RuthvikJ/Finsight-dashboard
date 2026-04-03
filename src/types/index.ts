// src/types/index.ts

export type TransactionType = 'income' | 'expense'

export type TransactionCategory =
    | 'Food & Dining'
    | 'Transport'
    | 'Shopping'
    | 'Entertainment'
    | 'Healthcare'
    | 'Utilities'
    | 'Housing'
    | 'Salary'
    | 'Freelance'
    | 'Investment'
    | 'Other'

export interface Transaction {
    id: string
    date: string           // ISO string e.g. "2024-11-15"
    amount: number         // always positive
    type: TransactionType
    category: TransactionCategory
    description: string
    note?: string
}

export type Role = 'admin' | 'viewer'

export type Theme = 'light' | 'dark'

export type FilterType = 'all' | 'income' | 'expense'

export type SortField = 'date' | 'amount'
export type SortOrder = 'asc' | 'desc'

export interface Filters {
    search: string
    type: FilterType
    category: TransactionCategory | 'all'
    month: string          // e.g. "2024-11" or "all"
    sortField: SortField
    sortOrder: SortOrder
}

export interface MonthlySummary {
    month: string          // e.g. "Nov"
    income: number
    expenses: number
    balance: number
}

export interface CategorySummary {
    category: TransactionCategory
    amount: number
    percentage: number
    count: number
}

export interface FinancialHealth {
    score: number          // 0–100
    label: 'Poor' | 'Fair' | 'Good' | 'Excellent'
    color: string          // tailwind text color class
}