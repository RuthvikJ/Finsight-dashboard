// src/components/dashboard/SummaryCard.tsx

import _CountUp from 'react-countup'
const CountUp = (_CountUp as any).default || _CountUp
import { TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
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
  sparkline?: number[]
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
  sparkline,
}: Props) {
  const theme = useStore((s) => s.theme)
  const isDark = theme === 'dark'

  const isAccent = accent
  const isDarkFilled = !accent && dark_filled

  const bg = isAccent
    ? 'bg-gradient-to-br from-[#EA580C] to-[#C2410C]'
    : isDarkFilled
      ? isDark ? 'bg-[#27272A] shadow-[0_1px_3px_rgba(0,0,0,0.3)]' : 'bg-[#1C0A00] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]'
      : isDark ? 'bg-[#27272A] shadow-[0_1px_3px_rgba(0,0,0,0.3)]' : 'bg-[#FFFFFF] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]'

  const hoverEffect = isDark
    ? 'hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:scale-[1.01]'
    : 'hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:scale-[1.01]'

  const border = isAccent || isDarkFilled
    ? 'border-transparent'
    : isDark ? 'border-[#3F3F46]' : 'border-[#E7E5E4]'

  const labelColor = isAccent
    ? 'text-[#FFEDD5]'
    : isDarkFilled
      ? 'text-[#A8A29E]'
      : isDark ? 'text-[#A1A1AA]' : 'text-[#A8A29E]'

  const valueColor = isAccent || isDarkFilled
    ? 'text-white'
    : isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'

  const deltaPositive = delta !== undefined && delta >= 0
  const deltaColor = isAccent
    ? 'text-[#FFEDD5]'
    : isDarkFilled
      ? deltaPositive ? 'text-green-400' : 'text-red-400'
      : deltaPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'

  const deltaBg = isAccent
    ? 'bg-white/20'
    : isDarkFilled
      ? deltaPositive ? 'bg-green-500/20' : 'bg-red-500/20'
      : deltaPositive ? 'bg-green-100 dark:bg-green-500/20' : 'bg-red-100 dark:bg-red-500/20'

  return (
    <div className={`rounded-3xl border p-5 md:p-6 flex flex-col justify-between gap-2.5 transition-all duration-300 min-w-0 overflow-hidden ${bg} ${hoverEffect} ${border}`}>
      <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest truncate ${labelColor}`}>
        {label}
      </span>

      <div className={`text-2xl md:text-3xl font-bold tracking-tight tabular-nums truncate py-0.5 ${valueColor}`}>
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
        <div className={`inline-flex items-center self-start gap-1 px-2 py-1 rounded-full text-[10px] sm:text-[11px] font-bold ${deltaColor} ${deltaBg}`}>
          {deltaPositive ? <TrendingUp size={12} strokeWidth={3} /> : <TrendingDown size={12} strokeWidth={3} />}
          <span>{Math.abs(delta)}%</span>
        </div>
      )}

      {sparkline && sparkline.length > 0 && (
        <div style={{ height: 36, marginTop: 4 }}>
          <ResponsiveContainer width="100%" height={36}>
            <LineChart data={sparkline.map((v, i) => ({ i, v }))}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={accent ? 'rgba(255,255,255,0.6)' : '#EA580C'}
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}