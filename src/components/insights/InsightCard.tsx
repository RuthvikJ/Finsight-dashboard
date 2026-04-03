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

  const cardBg = isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'

  const iconBg = isDark ? 'bg-[#3F3F46]' : 'bg-[#FFEDD5]'
  const iconColor = isDark ? 'text-[#EA580C]' : 'text-[#EA580C]'

  const valueColor = accent
    ? 'text-[#EA580C]'
    : isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'

  const trendColor =
    trend === 'up'
      ? 'text-[#16A34A]'
      : trend === 'down'
        ? 'text-[#DC2626]'
        : isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'

  return (
    <div className={`rounded-xl border p-4 flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.02] ${cardBg}`}>

      {/* Icon */}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
        <Icon size={16} className={iconColor} />
      </div>

      {/* Title */}
      <p className={`text-xs font-medium ${isDark ? 'text-[#A1A1AA]' : 'text-[#A8A29E]'}`}>
        {title}
      </p>

      {/* Value */}
      <p className={`text-xl font-bold leading-tight ${valueColor}`}>
        {value}
      </p>

      {/* Subtext + trend */}
      <div className="flex items-center gap-1.5">
        {trend && trend !== 'neutral' && (
          <span className={`flex items-center ${trendColor}`}>
            {trend === 'up'
              ? <TrendingUp size={12} />
              : <TrendingDown size={12} />
            }
          </span>
        )}
        <p className={`text-xs ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`}>
          {subtext}
        </p>
      </div>

    </div>
  )
}
