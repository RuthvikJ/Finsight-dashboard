// src/components/dashboard/ExpenseBreakdown.tsx

import { useStore } from '../../store/useStore'
import { formatCurrency } from '../../utils/finance'
import type { Transaction } from '../../types'

interface Props {
  transactions: Transaction[]
}

const CATEGORY_COLORS: Record<string, string> = {
  Housing: '#10B981',
  Shopping: '#8B5CF6',
  'Food & Dining': '#F59E0B',
  Transport: '#3B82F6',
  Utilities: '#06B6D4',
  Healthcare: '#EC4899',
  Entertainment: '#F43F5E',
  Other: '#6B7280'
}

const CATEGORY_DESC: Record<string, string> = {
  Housing: 'Rent & Mortgages',
  Shopping: 'Retail & Electronics',
  'Food & Dining': 'Groceries & Dining out',
  Transport: 'Uber, Lyft & Fuel',
  Utilities: 'Internet, Water & Power',
  Healthcare: 'Pharmacy & Medical',
  Entertainment: 'Events & Subscriptions',
  Other: 'Miscellaneous'
}

export default function ExpenseBreakdown({ transactions }: Props) {
  const { theme } = useStore()
  const isDark = theme === 'dark'

  // Calculations
  const expenses = transactions.filter(t => t.type === 'expense')
  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0)
  
  const categoryMap = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {} as Record<string, number>)

  const sortedCategories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const cardBg = isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E5E7EB]'

  return (
    <div className={`rounded-2xl border p-6 md:p-8 flex flex-col w-full ${cardBg} shadow-[0_4px_12px_rgba(0,0,0,0.02)] min-h-[460px]`}>
      
      <div className="flex items-center justify-between mb-8">
        <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
          Expense Breakdown
        </h3>
        <button className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-[#27272A] text-[#A1A1AA]' : 'hover:bg-[#F3F4F6] text-[#6B7280]'}`}>
           <span className="text-[14px] font-bold tracking-widest leading-none pb-1">...</span>
        </button>
      </div>

      <div className="flex flex-col gap-6 flex-1 justify-center">
        {sortedCategories.length === 0 ? (
          <div className="text-center py-6 text-sm text-gray-500">No expenses found</div>
        ) : (
          sortedCategories.map(([category, amount]) => {
            const color = CATEGORY_COLORS[category] || CATEGORY_COLORS['Other']
            const desc = CATEGORY_DESC[category] || 'Various'
            const percentage = totalExpense > 0 ? ((amount / totalExpense) * 100).toFixed(1) : '0'

            return (
              <div key={category} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-10 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: color }} />
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-[14px] font-bold ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
                      {category}
                    </span>
                    <span className={`text-[12px] font-medium leading-tight ${isDark ? 'text-[#71717A]' : 'text-[#6B7280]'}`}>
                      {desc}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-0.5">
                  <span className={`text-[14px] font-bold tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
                    {formatCurrency(amount)}
                  </span>
                  <span className={`text-[11px] font-bold tabular-nums flex items-center gap-0.5 ${isDark ? 'text-[#10B981]' : 'text-[#059669]'}`}>
                    ↑ {percentage}%
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
