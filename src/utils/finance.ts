// src/utils/finance.ts

import type { Transaction, MonthlySummary, CategorySummary, FinancialHealth, TransactionCategory } from '../types'

export function getMonthlySummaries(transactions: Transaction[]): MonthlySummary[] {
    const map: Record<string, { income: number; expenses: number }> = {}

    transactions.forEach(t => {
        const month = t.date.slice(0, 7)
        if (!map[month]) map[month] = { income: 0, expenses: 0 }
        if (t.type === 'income') map[month].income += t.amount
        else map[month].expenses += t.amount
    })

    return Object.entries(map)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, { income, expenses }]) => ({
            month: new Date(month + '-01').toLocaleString('default', { month: 'short' }),
            income,
            expenses,
            balance: income - expenses,
        }))
}

export function getWeeklySummaries(transactions: Transaction[]): MonthlySummary[] {
    const map: Record<string, { income: number; expenses: number }> = {}

    transactions.forEach(t => {
        const d = new Date(t.date)
        const dayNum = d.getUTCDay() || 7
        d.setUTCDate(d.getUTCDate() + 4 - dayNum)
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1))
        const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7)
        const weekKey = `${d.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`

        if (!map[weekKey]) map[weekKey] = { income: 0, expenses: 0 }
        if (t.type === 'income') map[weekKey].income += t.amount
        else map[weekKey].expenses += t.amount
    })

    return Object.entries(map)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([weekKey, { income, expenses }]) => ({
            month: `W${weekKey.split('-W')[1]}`,
            income,
            expenses,
            balance: income - expenses,
        }))
}

export function getYearlySummaries(transactions: Transaction[]): MonthlySummary[] {
    const map: Record<string, { income: number; expenses: number }> = {}

    transactions.forEach(t => {
        const year = t.date.slice(0, 4)
        if (!map[year]) map[year] = { income: 0, expenses: 0 }
        if (t.type === 'income') map[year].income += t.amount
        else map[year].expenses += t.amount
    })

    return Object.entries(map)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([year, { income, expenses }]) => ({
            month: year,
            income,
            expenses,
            balance: income - expenses,
        }))
}

export function getCategorySummaries(transactions: Transaction[]): CategorySummary[] {
    const expenses = transactions.filter(t => t.type === 'expense')
    const total = expenses.reduce((sum, t) => sum + t.amount, 0)
    const map: Record<string, number> = {}

    expenses.forEach(t => {
        map[t.category] = (map[t.category] || 0) + t.amount
    })

    return Object.entries(map)
        .sort(([, a], [, b]) => b - a)
        .map(([category, amount]) => ({
            category: category as TransactionCategory,
            amount,
            percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
            count: expenses.filter(t => t.category === category).length,
        }))
}

export function getFinancialHealth(transactions: Transaction[]): FinancialHealth {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    const savingsRate = income > 0 ? (income - expenses) / income : 0
    const score = Math.min(100, Math.round(savingsRate * 100))

    if (score >= 75) return { score, label: 'Excellent', color: 'text-[#10B981]' }
    if (score >= 50) return { score, label: 'Good', color: 'text-[#3B82F6]' }
    if (score >= 25) return { score, label: 'Fair', color: 'text-[#F59E0B]' }
    return { score, label: 'Poor', color: 'text-[#EF4444]' }
}

export function getTotalIncome(transactions: Transaction[]): number {
    return transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
}

export function getTotalExpenses(transactions: Transaction[]): number {
    return transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
}

export function getBalance(transactions: Transaction[]): number {
    return getTotalIncome(transactions) - getTotalExpenses(transactions)
}

export function getSavingsRate(transactions: Transaction[]): number {
    const income = getTotalIncome(transactions)
    const expenses = getTotalExpenses(transactions)
    return income > 0 ? Math.round(((income - expenses) / income) * 100) : 0
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount)
}

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
}

export function getMonthLabel(monthStr: string): string {
    return new Date(monthStr + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })
}