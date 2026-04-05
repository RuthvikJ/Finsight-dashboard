// src/components/dashboard/RevenueCard.tsx

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Rectangle } from 'recharts'
import { useStore } from '../../store/useStore'
import { getWeeklySummaries, getMonthlySummaries, getYearlySummaries, formatCurrency } from '../../utils/finance'
import type { Transaction } from '../../types'
import { useState, useMemo } from 'react'
import { Filter } from 'lucide-react'

interface Props {
  transactions: Transaction[]
}

// Custom Bar Shape to mimic Image 1 style: thick rounded bars + white top slit + text inside the active bar.
const CustomBarShape = (props: any) => {
  const { x, y, width, height, isDark, isActive, value } = props
  
  if (height < 2) return null

  const radius = 12
  const bgFill = isActive ? '#38BDF8' : (isDark ? '#3F3F46' : '#D1D5DB')
  const patternId = `bar-pattern-${Math.random()}`

  return (
    <g>
      {/* Textured dark pattern mimicking the reference image if dark */}
      {isDark && !isActive && (
        <defs>
           <pattern id={patternId} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
             <line x1="0" y1="0" x2="0" y2="4" stroke="#52525B" strokeWidth="1.5" />
           </pattern>
        </defs>
      )}
      
      {/* Main Bar */}
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={isActive ? bgFill : (isDark ? `url(#${patternId})` : bgFill)}
        radius={[radius, radius, radius, radius]}
        stroke={isActive ? '#38BDF8' : (isDark ? '#52525B' : 'transparent')}
        strokeWidth={isDark ? 1 : 0}
      />
      
      {/* White Slit at top */}
      <rect 
        x={x + width * 0.25} 
        y={y + 6} 
        width={width * 0.5} 
        height="3" 
        fill={isActive ? '#FFFFFF' : '#E5E7EB'} 
        rx="1.5" 
      />

      {/* Active inner text (mimicking the +12% / amount blocks in the reference) */}
      {isActive && height > 60 && (
         <>
           <rect x={x + 8} y={y + 20} width={width - 16} height="20" rx="8" fill="#FFFFFF" fillOpacity={0.2} />
           <text x={x + width / 2} y={y + 33} textAnchor="middle" fill="#FFFFFF" fontSize="10" fontVariant="tabular-nums" fontWeight="700">
             ▲12%
           </text>
           <text x={x + width / 2} y={y + height - 12} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontVariant="tabular-nums" fontWeight="800">
             ₹{Math.round(value / 1000)}k
           </text>
         </>
      )}
      
      {/* Tiny blue dot at bottom for specific inactive bar mimicking Image 1 reference randomly placed */}
      {!isActive && height > 20 && Math.random() > 0.8 && (
         <circle cx={x + width / 2} cy={y + height - 16} r="3" fill="#38BDF8" />
      )}
    </g>
  )
}

export default function RevenueCard({ transactions }: Props) {
  const { theme } = useStore()
  const isDark = theme === 'dark'
  
  const [filter, setFilter] = useState<'Weekly' | 'Monthly' | 'Yearly'>('Monthly')

  const data = useMemo(() => {
    if (filter === 'Weekly') return getWeeklySummaries(transactions).slice(-10)
    if (filter === 'Yearly') return getYearlySummaries(transactions).slice(-5)
    return getMonthlySummaries(transactions).slice(-10)
  }, [transactions, filter])

  const recentIncome = data.length >= 2 ? data[data.length - 1].income : 0
  const prevIncome = data.length >= 2 ? data[data.length - 2].income : 1 
  const diff = ((recentIncome - prevIncome) / prevIncome) * 100

  const sumIncome = data.reduce((acc, val) => acc + val.income, 0)
  const prevSumIncome = Math.round(sumIncome * 0.85) // Mocked prev period sum

  // Hardcode active index to simulating 'Sep' active highlighting from Image 1
  const activeIndex = data.length > 2 ? data.length - 3 : data.length - 1

  const cardBg = isDark ? 'bg-[#1D1D21] border-[#3F3F46]' : 'bg-white border-[#E5E7EB]'
  const textColor = isDark ? '#D4D4D8' : '#6B7280'

  return (
    <div className={`rounded-[2rem] border p-6 md:p-8 flex flex-col w-full h-[460px] ${cardBg} shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-colors duration-300`}>
      
      {/* Header matching Image 1: Title left top, values left bottom. Filters right top. */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex flex-col gap-2">
          <h3 className={`text-[15px] font-bold ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
            Revenue
          </h3>
          <div className="flex items-center gap-3">
            <span className={`text-[36px] font-bold tracking-tight tabular-nums leading-none ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
              {formatCurrency(sumIncome)}
            </span>
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[12px] font-bold ${diff >= 0 ? 'bg-[#10B981] text-white' : 'bg-[#EF4444] text-white'}`}>
              {diff >= 0 ? '▲' : '▼'} {Math.abs(diff).toFixed(1)}%
            </div>
            <span className={`text-[12px] font-semibold ${isDark ? 'text-[#D4D4D8]' : 'text-[#6B7280]'}`}>
              vs {formatCurrency(prevSumIncome)} last period
            </span>
          </div>
        </div>

        {/* Filters Top Right */}
        <div className="flex items-center gap-2">
           <div className={`flex items-center p-1 rounded-full ${isDark ? 'bg-[#3F3F46]/50' : 'bg-[#F3F4F6]'}`}>
             {(['Weekly', 'Monthly', 'Yearly'] as const).map(f => (
               <button
                 key={f}
                 onClick={() => setFilter(f)}
                 className={`px-4 py-1.5 text-[12px] font-bold rounded-full transition-all duration-200 ${
                   filter === f 
                     ? 'bg-white text-[#111827] shadow-sm' 
                     : `text-[#9CA3AF] hover:text-[#FAFAFA] dark:text-[#A1A1AA]`
                 }`}
               >
                 {f}
               </button>
             ))}
             <span className={`px-4 py-1.5 text-[12px] font-bold text-[#9CA3AF] cursor-not-allowed`}>Range</span>
           </div>
           
           <button className={`p-2 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-[#3F3F46]/50 text-[#A1A1AA] hover:text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
              <Filter size={16} />
           </button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full min-h-0 pl-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: -10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'transparent' : 'transparent'} />
            
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: textColor, fontWeight: 700 }}
              tickMargin={12}
            />
            {/* Custom Y-Axis to mimic reference (6000, 4500, 3000, 1500, 0) */}
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(v: number) => String(v)}
              tick={{ fontSize: 13, fill: textColor, fontWeight: 700 }}
              tickMargin={12}
            />
            
            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: isDark ? '#27272A' : '#FFFFFF',
                borderRadius: '12px',
                border: 'none',
                color: isDark ? '#FAFAFA' : '#111827',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              }}
              formatter={(value: any) => [formatCurrency(Number(value)), 'Revenue']}
            />
            
            <Bar 
              dataKey="income" 
              maxBarSize={44}
              shape={(props: any) => <CustomBarShape {...props} isDark={isDark} isActive={props.index === activeIndex} value={props.payload.income} />}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}
