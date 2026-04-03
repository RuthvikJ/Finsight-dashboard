// src/components/dashboard/CategoryChart.tsx

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { useStore } from '../../store/useStore'
import { getCategorySummaries } from '../../utils/finance'

export default function CategoryChart() {
  const { transactions, theme } = useStore()
  const isDark = theme === 'dark'
  const data = getCategorySummaries(transactions).slice(0, 6)

  const gridColor = isDark ? '#27272A' : '#F5F5F4'
  const textColor = isDark ? '#71717A' : '#A8A29E'
  const tooltipBg = isDark ? '#27272A' : '#FFFFFF'
  const tooltipBorder = isDark ? '#3F3F46' : '#E7E5E4'

  return (
    <div className={`rounded-xl border p-4 ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'
      }`}>
      <div className="mb-4">
        <h3 className={`text-sm font-semibold ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'
          }`}>Spending by category</h3>
        <p className={`text-xs mt-0.5 ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'
          }`}>Top 6 expense categories</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" horizontal={false} />

          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: textColor }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            type="category"
            dataKey="category"
            tick={{ fontSize: 10, fill: textColor }}
            axisLine={false}
            tickLine={false}
            width={80}
            tickFormatter={(v: string) =>
              v.length > 12 ? v.slice(0, 11) + '…' : v
            }
          />

          <Tooltip
            contentStyle={{
              background: tooltipBg,
              border: `0.5px solid ${tooltipBorder}`,
              borderRadius: '10px',
              fontSize: '12px',
              color: isDark ? '#FAFAFA' : '#1C0A00',
            }}
            formatter={(value: number) => [
              `₹${value.toLocaleString('en-IN')}`,
              'Spent',
            ]}
          />

          <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={i === 0 ? '#EA580C' : isDark ? '#3F3F46' : '#FFEDD5'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}