// src/components/dashboard/HealthScore.tsx

import { useStore } from '../../store/useStore'
import { getFinancialHealth, getTotalIncome, getTotalExpenses } from '../../utils/finance'
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
  const savings = income - expenses

  const ringColor =
    health.label === 'Excellent' ? '#16A34A' :
      health.label === 'Good' ? '#EA580C' :
        health.label === 'Fair' ? '#EAB308' : '#DC2626'

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="self-start">
        <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'
          }`}>Health score</h3>
        <p className={`text-sm mt-0.5 ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'
          }`}>Based on savings rate</p>
      </div>

      <div className="relative flex items-center justify-center mt-2">
        {(() => {
          const r = 48
          const cx = 60
          const cy = 60
          const circ = 2 * Math.PI * r
          const gap = 3
          const segLen = circ * 0.25 - gap

          const segments = [
            { color: '#DC2626', min: 0,  max: 24  },
            { color: '#EAB308', min: 25, max: 49  },
            { color: '#EA580C', min: 50, max: 74  },
            { color: '#16A34A', min: 75, max: 100 },
          ]
          
          return (
            <svg width="120" height="120" viewBox="0 0 120 120">
              {/* Track ring */}
              <circle
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={isDark ? '#3F3F46' : '#F5F5F4'}
                strokeWidth="8"
              />
              {/* Colored segments */}
              {segments.map((seg, i) => {
                const offset = -(circ * i * 0.25 + gap / 2)
                const isLit = health.score >= seg.min
                return (
                  <circle
                    key={i}
                    cx={cx} cy={cy} r={r}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="8"
                    strokeDasharray={`${segLen} ${circ - segLen}`}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    opacity={isLit ? 1 : 0.15}
                    style={{ transition: 'opacity 0.5s ease' }}
                  />
                )
              })}
              {/* Score text */}
              <text
                x={cx} y={cy - 6}
                textAnchor="middle"
                fontSize="22"
                fontWeight="700"
                fill={isDark ? '#FAFAFA' : '#1C0A00'}>
                {health.score}
              </text>
              <text
                x={cx} y={cy + 10}
                textAnchor="middle"
                fontSize="10"
                fill={isDark ? '#71717A' : '#A8A29E'}>
                out of 100
              </text>
            </svg>
          )
        })()}
        
        <div className="absolute top-[80px] flex flex-col items-center justify-center pointer-events-none mt-2">
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: ringColor }}>
            {health.label}
          </span>
        </div>
      </div>

      <div className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl mt-2 ${isDark ? 'bg-[#1F1F22]' : 'bg-[#F5F5F4]'}`}>
        <div className="flex flex-col">
          <span className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`}>Net Saved</span>
          <span className={`text-sm font-bold tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>₹{(savings / 1000).toFixed(1)}k</span>
        </div>
        <div className={`w-px h-6 ${isDark ? 'bg-[#3F3F46]' : 'bg-[#E7E5E4]'}`} />
        <div className="flex flex-col items-end">
          <span className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`}>Income</span>
          <span className={`text-sm font-bold tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>₹{(income / 1000).toFixed(1)}k</span>
        </div>
      </div>
    </div>
  )
}