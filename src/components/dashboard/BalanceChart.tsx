// src/components/dashboard/BalanceChart.tsx

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'
import { useStore } from '../../store/useStore'
import { getMonthlySummaries } from '../../utils/finance'

export default function BalanceChart() {
  const { transactions, theme } = useStore()
  const isDark = theme === 'dark'
  const data = getMonthlySummaries(transactions)

  const gridColor = isDark ? '#27272A' : '#F5F5F4'
  const textColor = isDark ? '#71717A' : '#A8A29E'
  const tooltipBg = isDark ? '#27272A' : '#FFFFFF'
  const tooltipBorder = isDark ? '#3F3F46' : '#E7E5E4'

  return (
    <div className={`rounded-xl border p-4 ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'
      }`}>
      <div className="mb-4">
        <h3 className={`text-sm font-semibold ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'
          }`}>Balance trend</h3>
        <p className={`text-xs mt-0.5 ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'
          }`}>Income vs expenses over 6 months</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EA580C" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#EA580C" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1C0A00" stopOpacity={0.08} />
              <stop offset="95%" stopColor="#1C0A00" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: textColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: textColor }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={48}
          />

          <Tooltip
            contentStyle={{
              background: tooltipBg,
              border: `0.5px solid ${tooltipBorder}`,
              borderRadius: '10px',
              fontSize: '12px',
              color: isDark ? '#FAFAFA' : '#1C0A00',
            }}
            formatter={(value: number, name: string) => [
              `₹${value.toLocaleString('en-IN')}`,
              name === 'income' ? 'Income' : 'Expenses',
            ]}
          />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#EA580C"
            strokeWidth={2}
            fill="url(#incomeGrad)"
            dot={{ fill: '#EA580C', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#EA580C' }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke={isDark ? '#3F3F46' : '#D6D3D1'}
            strokeWidth={2}
            fill="url(#expenseGrad)"
            dot={{ fill: isDark ? '#3F3F46' : '#D6D3D1', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}