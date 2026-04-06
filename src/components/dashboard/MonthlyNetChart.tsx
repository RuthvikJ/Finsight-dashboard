// src/components/dashboard/MonthlyNetChart.tsx

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useStore } from '../../store/useStore'
import { getMonthlySummaries } from '../../utils/finance'
import type { Transaction } from '../../types'

interface Props {
  transactions: Transaction[]
}

export default function MonthlyNetChart({ transactions }: Props) {
  const { theme } = useStore()
  const isDark = theme === 'dark'

  const data = getMonthlySummaries(transactions).slice(-6)

  const cardBg = isDark ? 'bg-[#13131A] border-[#1E1E2E]' : 'bg-white border-[#E2E8F0]'
  const textColor = isDark ? '#334155' : '#94A3B8'
  const gridColor = isDark ? '#1E293B' : '#F1F5F9'

  return (
    <div className={`rounded-2xl border p-7 flex flex-col gap-7 w-full h-full min-h-[380px] ${cardBg} transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]`}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 ml-3">
        <div>
          <h3 className={`text-[13.5px] font-bold tracking-tight ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
            Net Position Curve
          </h3>
          <p className={`text-[11px] mt-0.5 font-medium ${isDark ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>
            Six-month income vs expenses trend
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
            <span className={`text-[10px] font-bold uppercase tracking-[0.08em] ${isDark ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
            <span className={`text-[10px] font-bold uppercase tracking-[0.08em] ${isDark ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>Expenses</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 8, left: -8, bottom: 4 }}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F97316" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: textColor, fontWeight: 600 }}
              tickMargin={12}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11, fill: textColor, fontWeight: 600 }}
              tickMargin={8}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1A1A24' : '#FFFFFF',
                borderRadius: '12px',
                border: `1px solid ${isDark ? '#1E293B' : '#E2E8F0'}`,
                color: isDark ? '#F1F5F9' : '#0F172A',
                boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.6)' : '0 10px 40px rgba(0,0,0,0.08)',
                padding: '10px 14px',
                fontSize: '12px',
              }}
              formatter={(value: any, name: any) => [
                `₹${Number(value).toLocaleString('en-IN')}`,
                name === 'income' ? 'Income' : 'Expenses',
              ]}
              labelStyle={{ fontWeight: 700, marginBottom: '4px' }}
            />

            <Area
              type="monotone"
              dataKey="income"
              stroke="#22C55E"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#incomeGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#22C55E', strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#F97316"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#expenseGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#F97316', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}
