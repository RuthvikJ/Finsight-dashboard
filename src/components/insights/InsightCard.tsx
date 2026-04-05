// src/components/insights/InsightCard.tsx

import { TrendingUp, TrendingDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useStore } from '../../store/useStore'

interface Props {
  title: string
  value: string
  subtext: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
  accent?: boolean
}

export default function InsightCard({ title, value, subtext, icon: Icon, trend, accent }: Props) {
  const theme = useStore((s) => s.theme)
  const isDark = theme === 'dark'

  const cardBg = isDark 
    ? 'bg-[#27272A] border-[#3F3F46] shadow-[0_1px_3px_rgba(0,0,0,0.3)]' 
    : 'bg-white border-transparent shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]'

  const hoverEffect = isDark
    ? 'hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:scale-[1.01]'
    : 'hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:scale-[1.01]'

  const iconBg = isDark ? 'bg-[#431407]' : 'bg-[#FFEDD5]'
  const iconColor = isDark ? 'text-[#EA580C]' : 'text-[#EA580C]'

  const valueColor = accent
    ? 'text-[#EA580C] dark:text-[#FB923C]'
    : isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'

  const trendPositive = trend === 'up'
  const trendBg = trendPositive
    ? isDark ? 'bg-green-500/20' : 'bg-green-100'
    : trend === 'down'
      ? isDark ? 'bg-red-500/20' : 'bg-red-100'
      : isDark ? 'bg-[#3F3F46]' : 'bg-[#F5F5F4]'

  const trendColor = trendPositive
    ? 'text-green-600 dark:text-green-400'
    : trend === 'down'
      ? 'text-red-600 dark:text-red-400'
      : isDark ? 'text-[#A1A1AA]' : 'text-[#A8A29E]'

  return (
    <div className={`rounded-2xl border p-5 flex flex-col gap-4 transition-all duration-300 relative overflow-hidden ${cardBg} ${hoverEffect}`}>

      {accent && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-[#EA580C] blur-3xl opacity-20 dark:opacity-30 rounded-full" />
      )}

      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon size={20} className={iconColor} strokeWidth={2.5} />
      </div>

      <div className="flex flex-col gap-1 z-10">
        {/* Title */}
        <p className={`text-[11px] uppercase tracking-widest font-bold ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`}>
          {title}
        </p>

        {/* Value */}
        <p className={`text-2xl md:text-3xl font-black tracking-tight tabular-nums ${valueColor}`}>
          {value}
        </p>
      </div>

      {/* Subtext + trend */}
      <div className="flex items-center gap-2 mt-auto pt-1">
        {trend && trend !== 'neutral' && (
          <span className={`flex items-center justify-center p-1 rounded-full ${trendBg} ${trendColor}`}>
            {trend === 'up' ? <TrendingUp size={14} strokeWidth={3} /> : <TrendingDown size={14} strokeWidth={3} />}
          </span>
        )}
        <p className={`text-xs font-semibold ${isDark ? 'text-[#A1A1AA]' : 'text-[#78716C]'}`}>
          {subtext}
        </p>
      </div>

    </div>
  )
}
