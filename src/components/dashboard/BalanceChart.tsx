import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'
import { useStore } from '../../store/useStore'
import { getMonthlySummaries } from '../../utils/finance'
import type { Transaction } from '../../types'

interface Props {
  transactions: Transaction[]
}

export default function BalanceChart({ transactions }: Props) {
  const { theme } = useStore()
  const isDark = theme === 'dark'
  const data = getMonthlySummaries(transactions)

  // Quick stats for badges
  const avgIncome = data.length ? data.reduce((s, d) => s + d.income, 0) / data.length : 0
  const avgExpense = data.length ? data.reduce((s, d) => s + d.expenses, 0) / data.length : 0

  const gridColor = isDark ? '#3F3F46' : '#F5F5F4'
  const textColor = isDark ? '#71717A' : '#A8A29E'
  const tooltipBg = isDark ? '#27272A' : '#FFFFFF'
  const tooltipBorder = isDark ? '#3F3F46' : '#E7E5E4'

  return (
    <div className={`rounded-2xl border p-5 md:p-6 flex flex-col gap-6 ${isDark ? 'bg-[#27272A] border-[#3F3F46] shadow-[0_1px_3px_rgba(0,0,0,0.3)]' : 'bg-[#FFFFFF] border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]'
      }`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'
            }`}>Balance overview</h3>
          <p className={`text-sm mt-0.5 ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'
            }`}>Income vs expenses over last 6 months</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${isDark ? 'bg-[#431407]/40 text-[#FB923C]' : 'bg-[#FFEDD5] text-[#EA580C]'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
            Avg Inc: ₹{(avgIncome / 1000).toFixed(1)}k
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${isDark ? 'bg-[#3F3F46] text-[#A1A1AA]' : 'bg-[#F5F5F4] text-[#78716C]'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#71717A]' : 'bg-[#A8A29E]'}`} />
            Avg Exp: ₹{(avgExpense / 1000).toFixed(1)}k
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EA580C" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#EA580C" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#78716C" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#78716C" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke={gridColor} strokeDasharray="4 4" vertical={false} />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: textColor, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            tickMargin={12}
          />
          <YAxis
            tick={{ fontSize: 12, fill: textColor, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            tickMargin={8}
            width={60}
          />

          <Tooltip
            contentStyle={{
              background: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              color: isDark ? '#FAFAFA' : '#1C0A00',
              boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.08)',
              padding: '10px 14px'
            }}
            itemStyle={{ padding: '2px 0' }}
            formatter={(value: any, name: any) => [
              `₹${Number(value).toLocaleString('en-IN')}`,
              name === 'income' ? 'Income' : 'Expenses',
            ]}
          />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#EA580C"
            strokeWidth={3}
            fill="url(#incomeGrad)"
            dot={{ fill: '#EA580C', r: 4, strokeWidth: 2, stroke: isDark ? '#27272A' : '#FFFFFF' }}
            activeDot={{ r: 6, fill: '#EA580C', strokeWidth: 0, strokeOpacity: 0.2, stroke: '#EA580C' }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke={isDark ? '#52525B' : '#A8A29E'}
            strokeWidth={3}
            fill="url(#expenseGrad)"
            dot={{ fill: isDark ? '#52525B' : '#A8A29E', r: 4, strokeWidth: 2, stroke: isDark ? '#27272A' : '#FFFFFF' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}