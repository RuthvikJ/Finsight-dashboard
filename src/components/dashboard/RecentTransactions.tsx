// src/components/dashboard/RecentTransactions.tsx

import { Link } from 'react-router-dom'
import { Activity, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatCurrency, formatDate } from '../../utils/finance'
import type { Transaction } from '../../types'

interface Props {
  transactions: Transaction[]
}

export default function RecentTransactions({ transactions }: Props) {
  const { theme } = useStore()
  const isDark = theme === 'dark'

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const cardBg = isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E5E7EB]'

  return (
    <div className={`rounded-2xl border flex flex-col w-full ${cardBg} shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-shadow duration-300 min-h-[460px]`}>
      
      <div className="flex items-center justify-between p-6 md:p-8 pb-4">
        <div>
          <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
            Recent Transactions
          </h3>
          <p className={`text-[12px] mt-1 font-medium ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'}`}>
            Your latest spending and income
          </p>
        </div>
        <Link 
          to="/transactions" 
          className={`flex items-center gap-1 text-[13px] font-bold transition-colors ${isDark ? 'text-[#A1A1AA] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}`}
        >
          View all <ChevronRight size={14} strokeWidth={3} />
        </Link>
      </div>

      <div className="flex flex-col flex-1 px-6 md:px-8 pb-6 md:pb-8">
        {recent.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-sm font-medium text-gray-500">
            No recent activity
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-dashed dark:divide-[#3F3F46] divide-[#E5E7EB] flex-1 justify-center">
            {recent.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-4 group">
                
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors
                    ${t.type === 'income' 
                      ? isDark ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600'
                      : isDark ? 'bg-[#27272A] text-[#A1A1AA]' : 'bg-[#F3F4F6] text-[#4B5563]'}`}>
                    {t.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className={`text-[14px] font-bold ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
                      {t.description}
                    </span>
                    <div className="flex items-center gap-2">
                       <span className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}>
                         <Activity size={10} /> {t.category}
                       </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[14px] font-bold tabular-nums ${t.type === 'income' ? (isDark ? 'text-[#10B981]' : 'text-[#059669]') : (isDark ? 'text-[#FAFAFA]' : 'text-[#111827]')}`}>
                    {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
                  </span>
                  <span className={`text-[12px] font-medium ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'}`}>
                    {formatDate(t.date)}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  )
}
