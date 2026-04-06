// src/components/dashboard/SummaryCard.tsx

import _CountUp from 'react-countup'
const CountUp = (_CountUp as any).default || _CountUp
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react'
import { useStore } from '../../store/useStore'

interface Props {
  label: string
  value: number
  delta?: number
  prefix?: string
  suffix?: string
  isCurrency?: boolean
  type: 'balance' | 'income' | 'expense' | 'savings'
}

export default function SummaryCard({
  label,
  value,
  delta,
  prefix = '',
  suffix = '',
  isCurrency = false,
  type,
}: Props) {
  const theme = useStore((s) => s.theme)
  const isDark = theme === 'dark'

  const styles = {
    balance: { icon: Wallet, color: '#22C55E', bg: isDark ? 'rgba(34,197,94,0.1)' : '#F0FDF4', border: isDark ? 'rgba(34,197,94,0.15)' : '#DCFCE7' },
    income: { icon: ArrowUpRight, color: '#3B82F6', bg: isDark ? 'rgba(59,130,246,0.1)' : '#EFF6FF', border: isDark ? 'rgba(59,130,246,0.15)' : '#DBEAFE' },
    expense: { icon: ArrowDownRight, color: '#F97316', bg: isDark ? 'rgba(249,115,22,0.1)' : '#FFF7ED', border: isDark ? 'rgba(249,115,22,0.15)' : '#FFEDD5' },
    savings: { icon: Activity, color: '#8B5CF6', bg: isDark ? 'rgba(139,92,246,0.1)' : '#F5F3FF', border: isDark ? 'rgba(139,92,246,0.15)' : '#EDE9FE' },
  }

  const { icon: Icon, color, bg, border } = styles[type] ?? styles.balance

  const deltaPositive = delta !== undefined && delta >= 0
  const deltaColor = deltaPositive
    ? isDark ? '#22C55E' : '#16A34A'
    : isDark ? '#EF4444' : '#DC2626'

  return (
    <div className={`rounded-2xl border flex flex-col gap-5 transition-all duration-300 min-w-0 overflow-hidden relative
      px-7 py-7
      ${isDark
        ? 'bg-[#13131A] border-[#1E1E2E] hover:border-[#334155] hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
        : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
      }`}
    >
      {/* Top: Label + Icon */}
      <div className="flex items-center justify-start gap-2 w-full">
        <span className={`text-[12.5px] font-medium
          ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
          {label}
        </span>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: bg, border: `1px solid ${border}` }}
        >
          <Icon size={17} color={color} strokeWidth={2.5} />
        </div>
      </div>

      {/* Value */}
      <div className={`text-[27px] font-bold tracking-tight tabular-nums leading-none ml-3
        ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
        {prefix}
        {isCurrency ? (
          <CountUp end={value} duration={1.2} separator="," prefix="₹" preserveValue />
        ) : (
          <CountUp end={value} duration={1.2} suffix={suffix} preserveValue />
        )}
      </div>

      {/* Delta */}
      {delta !== undefined && (
        <div className="flex items-center gap-1.5 ml-3">
          {deltaPositive
            ? <TrendingUp size={13} strokeWidth={2.5} style={{ color: deltaColor }} />
            : <TrendingDown size={13} strokeWidth={2.5} style={{ color: deltaColor }} />
          }
          <span
            className="text-[12px] font-medium"
            style={{ color: deltaColor }}
          >
            {deltaPositive ? '+' : ''}{delta}% from last month
          </span>
        </div>
      )}
    </div>
  )
}