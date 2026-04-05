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

  const data = getMonthlySummaries(transactions).slice(-6) // last 6 months

  const cardBg = isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E5E7EB]'
  const textColor = isDark ? '#A1A1AA' : '#9CA3AF'
  const gridColor = isDark ? '#27272A' : '#F3F4F6'

  return (
    <div className={`rounded-2xl border p-6 md:p-8 flex flex-col gap-6 w-full ${cardBg} shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-shadow duration-300 min-h-[460px]`}>
      
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
            Net Position Curve
          </h3>
          <p className={`text-[12px] mt-1 font-medium ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'}`}>
            Six month trailing income vs expenses spread
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}>Income</span>
           </div>
           <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}>Expenses</span>
           </div>
        </div>
      </div>

      <div className="flex-1 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke={gridColor} strokeDasharray="4 4" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: textColor, fontWeight: 600 }}
              tickMargin={16}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12, fill: textColor, fontWeight: 600 }}
              tickMargin={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#27272A' : '#FFFFFF',
                borderRadius: '16px',
                border: `1px solid ${isDark ? '#3F3F46' : '#E5E7EB'}`,
                color: isDark ? '#FAFAFA' : '#111827',
                boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.08)',
                padding: '12px 16px',
              }}
              formatter={(value: any, name: any) => [`₹${Number(value).toLocaleString('en-IN')}`, name === 'income' ? 'Income' : 'Expense']}
              labelStyle={{ fontSize: '12px', fontWeight: 700, color: textColor, marginBottom: '6px' }}
              itemStyle={{ fontSize: '14px', fontWeight: 800, padding: '2px 0' }}
            />
            <Area 
              type="monotone" 
              dataKey="income" 
              stroke="#10B981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorIncome)" 
            />
            <Area 
              type="monotone" 
              dataKey="expenses" 
              stroke="#EF4444" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorExpense)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}
