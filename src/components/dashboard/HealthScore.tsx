// src/components/dashboard/HealthScore.tsx

import { useStore } from '../../store/useStore'
import {
  getFinancialHealth,
  getTotalIncome,
  getTotalExpenses,
  getSavingsRate,
} from '../../utils/finance'
import type { Transaction } from '../../types'

interface Props {
  transactions: Transaction[]
}

export default function HealthScore({ transactions }: Props) {
  const { theme } = useStore()
  const isDark = theme === 'dark'

  const health = getFinancialHealth(transactions)
  const income = getTotalIncome(transactions)
  const expenses = getTotalExpenses(transactions)
  const savingsRate = getSavingsRate(transactions)
  const budgetUtilization = income > 0 ? Math.round((expenses / income) * 100) : 0
  const savingsAmt = income - expenses

  const cardBg = isDark ? 'bg-[#13131A] border-[#1E1E2E]' : 'bg-white border-[#E2E8F0]'

  // SVG gauge props
  const RADIUS = 64
  const CIRCUMFERENCE = Math.PI * RADIUS // half-circle arc
  const progress = Math.min(health.score / 100, 1)
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  // Score color
  const scoreColor =
    health.label === 'Excellent' ? '#22C55E' :
    health.label === 'Good' ? '#3B82F6' :
    health.label === 'Fair' ? '#F59E0B' : '#EF4444'

  // Metrics
  const metrics = [
    {
      label: 'Savings Rate',
      value: `${savingsRate}%`,
      sub: 'Income saved each month',
      color: '#22C55E',
      bar: savingsRate,
    },
    {
      label: 'Budget Utilization',
      value: `${budgetUtilization}%`,
      sub: 'Expenses vs income ratio',
      color: budgetUtilization > 85 ? '#EF4444' : budgetUtilization > 65 ? '#F59E0B' : '#3B82F6',
      bar: budgetUtilization,
    },
    {
      label: 'Monthly Savings',
      value: `₹${(savingsAmt / 1000).toFixed(1)}k`,
      sub: 'Net positive cash flow',
      color: savingsAmt >= 0 ? '#22C55E' : '#EF4444',
      bar: Math.min(Math.abs(savingsAmt) / Math.max(income, 1) * 100, 100),
    },
  ]

  return (
    <div className={`rounded-2xl border p-8 flex flex-col w-full ${cardBg} shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300`}>

      {/* Header */}
      <div className="flex items-center justify-between mb-7 ml-3">
        <div>
          <h3 className={`text-[13.5px] font-bold tracking-tight ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
            Financial Health
          </h3>
          <p className={`text-[11px] mt-0.5 font-medium ${isDark ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>
            Analysed from your transactions
          </p>
        </div>
        <span
          className="text-[10px] font-black uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: `${scoreColor}18`,
            color: scoreColor,
          }}
        >
          {health.label}
        </span>
      </div>

      {/* Gauge */}
      <div className="relative flex justify-center items-end pb-2 mb-6">
        <svg width="160" height="85" viewBox="0 0 160 85" className="overflow-visible">
          {/* Track */}
          <path
            d="M 12,80 A 68,68 0 0,1 148,80"
            fill="none"
            stroke={isDark ? '#1E293B' : '#F1F5F9'}
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Progress */}
          <path
            d="M 12,80 A 68,68 0 0,1 148,80"
            fill="none"
            stroke={scoreColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{
              transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: `drop-shadow(0 0 6px ${scoreColor}60)`,
            }}
          />
        </svg>

        {/* Center values */}
        <div className="absolute bottom-2 flex flex-col items-center">
          <span
            className="text-[28px] font-black tabular-nums leading-none"
            style={{ color: scoreColor }}
          >
            {health.score}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-[0.1em] mt-0.5 ${isDark ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>
            /100
          </span>
        </div>
      </div>

      {/* Gauge labels */}
      <div className="flex justify-between px-1 mb-8">
        <span className={`text-[10px] font-bold ${isDark ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>Poor</span>
        <span className={`text-[10px] font-bold ${isDark ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>Excellent</span>
      </div>

      {/* Metric rows */}
      <div className="flex flex-col gap-5">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <span className={`text-[12px] font-bold ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                  {m.label}
                </span>
                <p className={`text-[10px] font-medium mt-0.5 ${isDark ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                  {m.sub}
                </p>
              </div>
              <span
                className="text-[13px] font-black tabular-nums"
                style={{ color: m.color }}
              >
                {m.value}
              </span>
            </div>
            {/* Progress bar */}
            <div className={`w-full h-1.5 rounded-full ${isDark ? 'bg-[#1E293B]' : 'bg-[#F1F5F9]'}`}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min(m.bar, 100)}%`,
                  backgroundColor: m.color,
                  boxShadow: `0 0 6px ${m.color}50`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}