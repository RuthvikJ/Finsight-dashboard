// src/components/dashboard/SummaryCard.tsx

import CountUp from 'react-countup'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useStore } from '../../store/useStore'

interface Props {
  label: string
  value: number
  delta?: number        // percentage change vs last month
  prefix?: string
  suffix?: string
  isCurrency?: boolean
  accent?: boolean      // orange filled card
  dark_filled?: boolean // dark filled card
}

export default function SummaryCard({
  label,
  value,
  delta,
  prefix = '',
  suffix = '',
  isCurrency = false,
  accent = false,
  dark_filled = false,
}: Props) {
  const theme = useStore((s) => s.theme)
  const isDark = theme === 'dark'

  const isAccent = accent
  const isDarkFilled = !accent && dark_filled

  const bg = isAccent
    ? 'bg-[#EA580C]'
    : isDarkFilled
      ? isDark ? 'bg-[#3F3F46]' : 'bg-[#1C0A00]'
      : isDark ? 'bg-[#27272A]' : 'bg-white'

  const border = isAccent || isDarkFilled
    ? 'border-transparent'
    : isDark ? 'border-[#3F3F46]' : 'border-[#E7E5E4]'

  const labelColor = isAccent
    ? 'text-[#FFEDD5]'
    : isDarkFilled
      ? 'text-[#78716C]'
      : isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'

  const valueColor = isAccent || isDarkFilled
    ? 'text-white'
    : isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'

  const deltaPositive = delta !== undefined && delta >= 0
  const deltaColor = isAccent
    ? 'text-[#FFEDD5]'
    : isDarkFilled
      ? deltaPositive ? 'text-orange-300' : 'text-orange-300'
      : deltaPositive ? 'text-green-500' : 'text-red-500'

  return (
    <div className={`rounded-xl border p-4 flex flex-col gap-2 transition-all duration-200 hover:scale-[1.02] ${bg} ${border}`}>
      <span className={`text-xs font-semibold uppercase tracking-wide ${labelColor}`}>
        {label}
      </span>

      <div className={`text-2xl font-bold leading-none ${valueColor}`}>
        {prefix}
        {isCurrency ? (
          <CountUp
            end={value}
            duration={1.2}
            separator=","
            prefix="₹"
            preserveValue
          />
        ) : (
          <CountUp
            end={value}
            duration={1.2}
            suffix={suffix}
            preserveValue
          />
        )}
      </div>

      {delta !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-medium ${deltaColor}`}>
          {deltaPositive
            ? <TrendingUp size={12} />
            : <TrendingDown size={12} />
          }
          <span>{Math.abs(delta)}% vs last month</span>
        </div>
      )}
    </div>
  )
}