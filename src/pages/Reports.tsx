// src/pages/Reports.tsx

import { useStore } from '../store/useStore'
import { formatCurrency, formatDate } from '../utils/finance'
import { Download, TrendingUp, TrendingDown, FileText } from 'lucide-react'

export default function Reports() {
    const { transactions, theme } = useStore()
    const isDark = theme === 'dark'

    const income = transactions.filter((t) => t.type === 'income')
    const expenses = transactions.filter((t) => t.type === 'expense')
    const totalIncome = income.reduce((s, t) => s + t.amount, 0)
    const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0)
    const netBalance = totalIncome - totalExpenses

    const handleDownload = () => {
        const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']
        const rows = transactions
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((t) => [
                t.date,
                t.description,
                t.category,
                t.type,
                t.amount.toString(),
            ])
        const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'finsight-report.csv'
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="flex flex-col gap-6 w-full pb-10">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className={`text-[22px] font-bold ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
                        Reports
                    </h1>
                    <p className={`text-[13px] mt-1 ${isDark ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
                        Summary of your financial activity
                    </p>
                </div>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-[13px] font-bold transition-colors duration-200 shadow-md shadow-orange-500/20"
                >
                    <Download size={15} strokeWidth={2.5} />
                    Download CSV
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    {
                        label: 'Total Income',
                        value: formatCurrency(totalIncome),
                        icon: TrendingUp,
                        color: '#22C55E',
                        bg: isDark ? 'rgba(34,197,94,0.1)' : '#F0FDF4',
                    },
                    {
                        label: 'Total Expenses',
                        value: formatCurrency(totalExpenses),
                        icon: TrendingDown,
                        color: '#F97316',
                        bg: isDark ? 'rgba(249,115,22,0.1)' : '#FFF7ED',
                    },
                    {
                        label: 'Net Balance',
                        value: formatCurrency(netBalance),
                        icon: FileText,
                        color: netBalance >= 0 ? '#3B82F6' : '#EF4444',
                        bg: isDark ? 'rgba(59,130,246,0.1)' : '#EFF6FF',
                    },
                ].map((card) => (
                    <div
                        key={card.label}
                        className={`rounded-2xl border p-6 flex items-center gap-4 transition-all duration-200
              ${isDark ? 'bg-[#13131A] border-[#1E1E2E]' : 'bg-white border-[#E2E8F0]'}`}
                    >
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: card.bg }}
                        >
                            <card.icon size={18} color={card.color} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className={`text-[11px] font-bold uppercase tracking-[0.1em] ${isDark ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
                                {card.label}
                            </p>
                            <p className={`text-[20px] font-black tabular-nums mt-0.5`} style={{ color: card.color }}>
                                {card.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Transaction Table */}
            <div className={`rounded-2xl border overflow-hidden transition-all duration-200
        ${isDark ? 'bg-[#13131A] border-[#1E1E2E]' : 'bg-white border-[#E2E8F0]'}`}>

                {/* Table Header */}
                <div className={`grid grid-cols-5 px-6 py-3 border-b text-[11px] font-black uppercase tracking-[0.1em]
          ${isDark ? 'border-[#1E1E2E] text-[#334155] bg-[#0F0F12]' : 'border-[#E2E8F0] text-[#94A3B8] bg-[#F8FAFC]'}`}>
                    <span>Date</span>
                    <span className="col-span-2">Description</span>
                    <span>Category</span>
                    <span className="text-right">Amount</span>
                </div>

                {/* Table Rows */}
                <div className="flex flex-col">
                    {transactions
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((t, i) => (
                            <div
                                key={t.id}
                                className={`grid grid-cols-5 px-6 py-4 text-[13px] transition-colors
                  ${isDark
                                        ? 'border-b border-[#1E1E2E] hover:bg-[#1A1A24]'
                                        : 'border-b border-[#F1F5F9] hover:bg-[#F8FAFC]'
                                    }
                  ${i === transactions.length - 1 ? 'border-b-0' : ''}`}
                            >
                                <span className={isDark ? 'text-[#475569]' : 'text-[#94A3B8]'}>
                                    {formatDate(t.date)}
                                </span>
                                <span className={`col-span-2 font-semibold truncate ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
                                    {t.description}
                                </span>
                                <span className={isDark ? 'text-[#475569]' : 'text-[#64748B]'}>
                                    {t.category}
                                </span>
                                <span className={`text-right font-black tabular-nums
                  ${t.type === 'income'
                                        ? 'text-emerald-500'
                                        : isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'
                                    }`}>
                                    {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
                                </span>
                            </div>
                        ))}
                </div>
            </div>

        </div>
    )
}