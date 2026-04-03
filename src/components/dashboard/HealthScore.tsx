// src/components/dashboard/HealthScore.tsx

import { useStore } from '../../store/useStore'
import { getFinancialHealth } from '../../utils/finance'

export default function HealthScore() {
  const { transactions, theme } = useStore()
  const isDark = theme === 'dark'
  const health = getFinancialHealth(transactions)

  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (health.score / 100) * circumference

  const ringColor =
    health.label === 'Excellent' ? '#16A34A' :
      health.label === 'Good' ? '#EA580C' :
        health.label === 'Fair' ? '#EAB308' : '#DC2626'

  return (
    <div className={`rounded-xl border p-4 flex flex-col items-center gap-2 ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'
      }`}>
      <h3 className={`text-sm font-semibold self-start ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'
        }`}>Health score</h3>

      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none"
          stroke={isDark ? '#3F3F46' : '#F5F5F4'} strokeWidth="8" />
        <circle cx="50" cy="50" r={radius} fill="none"
          stroke={ringColor} strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text x="50" y="46" textAnchor="middle"
          fontSize="18" fontWeight="700"
          fill={isDark ? '#FAFAFA' : '#1C0A00'}>
          {health.score}
        </text>
        <text x="50" y="60" textAnchor="middle"
          fontSize="9" fill={isDark ? '#71717A' : '#A8A29E'}>
          out of 100
        </text>
      </svg>

      <span className="text-sm font-bold" style={{ color: ringColor }}>
        {health.label}
      </span>
      <p className={`text-xs text-center ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'
        }`}>
        Based on your savings rate
      </p>
    </div>
  )
}