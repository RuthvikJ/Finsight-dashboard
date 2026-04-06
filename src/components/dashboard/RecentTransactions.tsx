// src/components/dashboard/RecentTransactions.tsx

import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react'
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
    .slice(0, 6)

  return (
    <div className={`rounded-2xl border flex flex-col w-full h-full min-h-[360px] transition-all duration-300
      ${isDark
        ? 'bg-[#13131A] border-[#1E1E2E] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
        : 'bg-white border-[#E2E8F0] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
      }`}>

      {/* Header */}
      <div className="flex items-center justify-between p-7 pb-5 ml-3">
        <div>
          <h3 className={`text-[13.5px] font-bold tracking-tight ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
            Recent Activity
          </h3>
          <p className={`text-[11px] mt-0.5 font-medium ${isDark ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>
            Latest transactions
          </p>
        </div>
        <Link
          to="/transactions"
          className={`flex items-center gap-0.5 text-[12px] font-bold transition-colors
            ${isDark ? 'text-[#F97316] hover:text-[#FB923C]' : 'text-[#EA580C] hover:text-[#C2410C]'}`}
        >
          View all <ChevronRight size={13} strokeWidth={2.5} />
        </Link>
      </div>

      {/* Divider */}
      <div className={`mx-7 h-px ${isDark ? 'bg-[#1E293B]' : 'bg-[#F1F5F9]'}`} />

      {/* Transaction list */}
      <div className="flex flex-col flex-1 px-7 py-5 overflow-hidden">
        {recent.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className={`text-sm font-medium ${isDark ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>No recent activity</p>
          </div>
        ) : (
          <div className="flex flex-col gap-0">
            {recent.map((t, i) => (
              <div
                key={t.id}
                className={`flex items-center justify-between py-4 group transition-colors rounded-xl px-3 -mx-3
                  ${isDark ? 'hover:bg-[#1A1A24]' : 'hover:bg-[#F8FAFC]'}
                  ${i < recent.length - 1 ? `border-b ${isDark ? 'border-[#1E293B]' : 'border-[#F1F5F9]'}` : ''}`}
              >
                {/* Left: icon + info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors
                    ${t.type === 'income'
                      ? isDark ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600'
                      : isDark ? 'bg-[#F97316]/10 text-[#F97316]' : 'bg-orange-50 text-orange-600'
                    }`}>
                    {t.type === 'income' ? <TrendingUp size={16} strokeWidth={2.5} /> : <TrendingDown size={16} strokeWidth={2.5} />}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className={`text-[13px] font-bold truncate ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
                      {t.description}
                    </span>
                    <span className={`text-[10px] font-medium truncate ${isDark ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>
                      {t.category} · {formatDate(t.date)}
                    </span>
                  </div>
                </div>

                {/* Right: amount */}
                <span className={`text-[13px] font-black tabular-nums shrink-0 ml-3
                  ${t.type === 'income'
                    ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                    : isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'
                  }`}>
                  {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
