// src/components/dashboard/ExpenseBreakdown.tsx

import { useStore } from '../../store/useStore'
import { formatCurrency } from '../../utils/finance'
import type { Transaction } from '../../types'

interface Props {
  transactions: Transaction[]
}

const CATEGORY_COLORS: Record<string, string> = {
  Housing: '#22C55E',
  Shopping: '#8B5CF6',
  'Food & Dining': '#F59E0B',
  Transport: '#3B82F6',
  Utilities: '#06B6D4',
  Healthcare: '#EC4899',
  Entertainment: '#F43F5E',
  Freelance: '#F97316',
  Salary: '#14B8A6',
  Investment: '#A78BFA',
  Other: '#64748B',
}

const CATEGORY_DESC: Record<string, string> = {
  Housing: 'Rent & Mortgages',
  Shopping: 'Retail & Electronics',
  'Food & Dining': 'Groceries & Dining',
  Transport: 'Fuel & Rideshare',
  Utilities: 'Internet & Power',
  Healthcare: 'Pharmacy & Medical',
  Entertainment: 'Events & Subs',
  Freelance: 'Freelance income',
  Salary: 'Regular salary',
  Investment: 'Investment returns',
  Other: 'Miscellaneous',
}

export default function ExpenseBreakdown({ transactions }: Props) {
  const { theme } = useStore()
  const isDark = theme === 'dark'

  const expenses = transactions.filter((t) => t.type === 'expense')
  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0)

  const categoryMap = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {} as Record<string, number>)

  const sorted = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className={`rounded-2xl border p-7 flex flex-col w-full transition-all duration-300
      ${isDark
        ? 'bg-[#13131A] border-[#1E1E2E] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
        : 'bg-white border-[#E2E8F0] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
      }`}>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-[13.5px] font-bold tracking-tight ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
            Expense Breakdown
          </h3>
          <p className={`text-[11px] mt-0.5 font-medium ${isDark ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>
            Top spending categories
          </p>
        </div>
        <span className={`text-[11px] font-bold tabular-nums ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
          {formatCurrency(totalExpense)}
        </span>
      </div>

      {/* Category list */}
      <div className="flex flex-col gap-4.5">
        {sorted.length === 0 ? (
          <p className={`text-sm text-center py-6 ${isDark ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
            No expenses found
          </p>
        ) : (
          sorted.map(([category, amount]) => {
            const color = CATEGORY_COLORS[category] ?? CATEGORY_COLORS['Other']
            const desc = CATEGORY_DESC[category] ?? 'Various'
            const pct = totalExpense > 0 ? ((amount / totalExpense) * 100).toFixed(1) : '0'

            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}70` }}
                    />
                    <div className="min-w-0">
                      <span className={`text-[12.5px] font-bold truncate block ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                        {category}
                      </span>
                      <span className={`text-[10px] font-medium truncate block ${isDark ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                        {desc}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0 ml-2">
                    <span className={`text-[12.5px] font-bold tabular-nums ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
                      {formatCurrency(amount)}
                    </span>
                    <span className="text-[10px] font-bold" style={{ color }}>{pct}%</span>
                  </div>
                </div>
                {/* Mini bar */}
                <div className={`w-full h-1 rounded-full ${isDark ? 'bg-[#1E293B]' : 'bg-[#F1F5F9]'}`}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: color,
                      boxShadow: `0 0 4px ${color}50`,
                    }}
                  />
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
