// src/components/dashboard/RevenueCard.tsx

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useStore } from '../../store/useStore'
import { getWeeklySummaries, getMonthlySummaries, getYearlySummaries, formatCurrency } from '../../utils/finance'
import type { Transaction } from '../../types'
import { useState, useMemo } from 'react'

interface Props {
  transactions: Transaction[]
}

const FILTERS = ['Weekly', 'Monthly', 'Yearly'] as const
type FilterType = typeof FILTERS[number]

export default function RevenueCard({ transactions }: Props) {
  const { theme } = useStore()
  const isDark = theme === 'dark'

  const [filter, setFilter] = useState<FilterType>('Monthly')

  const data = useMemo(() => {
    if (filter === 'Weekly') return getWeeklySummaries(transactions).slice(-10)
    if (filter === 'Yearly') return getYearlySummaries(transactions).slice(-5)
    return getMonthlySummaries(transactions).slice(-8)
  }, [transactions, filter])

  const sumIncome = data.reduce((acc, v) => acc + v.income, 0)
  const prevSum = Math.round(sumIncome * 0.85)
  const diff = prevSum > 0 ? ((sumIncome - prevSum) / prevSum) * 100 : 0

  const maxIncomeIndex = data.reduce((maxIdx, d, i, arr) => d.income > arr[maxIdx].income ? i : maxIdx, 0)

  const textColor = isDark ? '#475569' : '#94A3B8'

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
      <div className={`rounded-xl px-3.5 py-2.5 text-sm shadow-lg border
        ${isDark ? 'bg-[#1A1A24] border-[#1E293B] text-[#F1F5F9]' : 'bg-white border-[#E2E8F0] text-[#0F172A]'}`}>
        <p className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 ${isDark ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>{label}</p>
        <p className="text-[13px] font-black tabular-nums">{formatCurrency(payload[0].value)}</p>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl border p-8 flex flex-col w-full h-full min-h-[440px] transition-all duration-300 overflow-hidden
      ${isDark
        ? 'bg-[#13131A] border-[#1E1E2E] hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
        : 'bg-white border-[#E2E8F0] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
      }`}>

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4 ml-3">
        <div className="flex flex-col min-w-0">
          <h3 className={`text-[13.5px] font-bold tracking-tight ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
            Revenue Overview
          </h3>
          <div className="flex items-baseline gap-2.5 mt-2 flex-wrap">
            <span className={`text-[26px] font-black tracking-tight tabular-nums leading-none ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
              {formatCurrency(sumIncome)}
            </span>
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-black
              ${diff >= 0 ? 'bg-emerald-500/15 text-emerald-500' : 'bg-red-500/15 text-red-500'}`}>
              {diff >= 0 ? '▲' : '▼'} {Math.abs(diff).toFixed(1)}%
            </div>
            <span className={`text-[11px] font-semibold hidden sm:block ${isDark ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
              vs {formatCurrency(prevSum)} prior
            </span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className={`flex items-center p-0.5 rounded-xl shrink-0 ${isDark ? 'bg-[#1E293B]' : 'bg-[#F1F5F9]'}`}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all duration-200
                ${filter === f
                  ? isDark
                    ? 'bg-[#F97316] text-white shadow-sm shadow-orange-500/30'
                    : 'bg-white text-[#0F172A] shadow-sm'
                  : isDark
                    ? 'text-[#475569] hover:text-[#94A3B8]'
                    : 'text-[#94A3B8] hover:text-[#475569]'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 8, left: -12, bottom: 4 }} barCategoryGap="30%">
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: textColor, fontWeight: 600 }}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11, fill: textColor, fontWeight: 600 }}
              tickMargin={8}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', radius: 8 }} />
            <Bar dataKey="income" radius={[6, 6, 3, 3]} maxBarSize={36} animationDuration={700}>
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={index === maxIncomeIndex
                    ? '#F97316'
                    : isDark ? '#1E293B' : '#E2E8F0'
                  }
                  style={index === maxIncomeIndex ? { filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.5))' } : undefined}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
