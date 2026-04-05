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

  const getCardStyles = () => {
    switch (type) {
      case 'balance':
        return {
          icon: Wallet, color: '#10B981',
          bg: isDark ? 'bg-emerald-500/10' : 'bg-emerald-50',
          gradient: isDark ? 'from-emerald-500/5' : 'from-emerald-50',
        }
      case 'income':
        return {
          icon: ArrowUpRight, color: '#3B82F6',
          bg: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
          gradient: isDark ? 'from-blue-500/5' : 'from-blue-50',
        }
      case 'expense':
        return {
          icon: ArrowDownRight, color: '#EF4444',
          bg: isDark ? 'bg-red-500/10' : 'bg-red-50',
          gradient: isDark ? 'from-red-500/5' : 'from-red-50',
        }
      case 'savings':
        return {
          icon: Activity, color: '#8B5CF6',
          bg: isDark ? 'bg-purple-500/10' : 'bg-purple-50',
          gradient: isDark ? 'from-purple-500/5' : 'from-purple-50',
        }
      default:
        return { icon: Wallet, color: '#10B981', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500/5' }
    }
  }

  const { icon: Icon, color, bg, gradient } = getCardStyles()

  const cardBgBase = isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E5E7EB]'
  const hoverEffect = isDark
    ? 'hover:shadow-[0_6px_20px_rgba(0,0,0,0.6)] hover:-translate-y-[3px]'
    : 'hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:-translate-y-[3px]'

  const deltaPositive = delta !== undefined && delta >= 0
  const deltaColor = deltaPositive ? (isDark ? 'text-[#10B981]' : 'text-[#059669]') : (isDark ? 'text-[#EF4444]' : 'text-[#DC2626]')
  const deltaIconColor = deltaPositive ? '#10B981' : '#EF4444'

  return (
    <div className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 min-w-0 min-h-[140px] relative overflow-hidden group ${cardBgBase} ${hoverEffect}`}>

      {/* Background tinted gradient footprint */}
      <div className={`absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b ${gradient} to-transparent opacity-60 dark:opacity-40 pointer-events-none`} />

      {/* Top Row: Label & Icon */}
      <div className="flex items-start justify-between relative z-10 w-full">
        <span className={`text-[12px] font-bold uppercase tracking-widest mt-1 ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}>
          {label}
        </span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${bg}`}>
          <Icon size={20} color={color} />
        </div>
      </div>

      {/* Bottom Row: Value & Trend */}
      <div className="flex flex-col gap-2 relative z-10 mt-3">
        <div className={`text-[28px] sm:text-[32px] font-bold tracking-tight tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
          {prefix}
          {isCurrency ? (
            <CountUp end={value} duration={1.2} separator="," prefix="₹" preserveValue />
          ) : (
            <CountUp end={value} duration={1.2} suffix={suffix} preserveValue />
          )}
        </div>

        {delta !== undefined && (
          <div className="flex items-center gap-1.5 mt-1">
            <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${isDark ? 'bg-[#27272A]' : 'bg-[#F3F4F6]'} ${deltaColor}`}>
              {deltaPositive ? <TrendingUp size={12} strokeWidth={2.5} color={deltaIconColor} /> : <TrendingDown size={12} strokeWidth={2.5} color={deltaIconColor} />}
              <span>{Math.abs(delta)}%</span>
            </div>
            <span className={`text-[11px] font-medium leading-none ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'}`}>vs last period</span>
          </div>
        )}
      </div>

      {/* Absolute Bottom Accent Line */}
      <div className={`absolute bottom-0 left-0 w-full h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${bg}`} />

    </div>
  )
}