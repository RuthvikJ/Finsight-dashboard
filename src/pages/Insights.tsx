// src/pages/Insights.tsx

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useStore } from '../store/useStore'
import {
  getMonthlySummaries,
  getCategorySummaries,
  getTotalExpenses,
  formatCurrency,
} from '../utils/finance'

export default function Insights() {
  const { theme } = useStore()
  const isDark = theme === 'dark'

  // ── Derived data ──────────────────────────────────────────────
  const allTxns = useStore(s => s.transactions)
  const expenses = allTxns.filter(t => t.type === 'expense')
  const biggestExpense = expenses.reduce((max, t) => 
    t.amount > max.amount ? t : max, expenses[0] || 
    { amount: 0, description: 'None' } as import('../types').Transaction)
  
  const monthlySums = getMonthlySummaries(allTxns)
  const bestIncomeMonth = monthlySums.reduce((best, m) => 
    m.income > best.income ? m : best, 
    monthlySums[0] || { month: '-', income: 0, expenses: 0, balance: 0 })
  
  const totalExpenses = getTotalExpenses(allTxns)
  const categorySummaries = getCategorySummaries(allTxns)

  // ── Chart colors ──────────────────────────────────────────────
  const gridColor = isDark ? '#3F3F46' : '#F5F5F4'
  const textColor = isDark ? '#71717A' : '#A8A29E'
  const tooltipBg = isDark ? '#27272A' : '#FFFFFF'
  const tooltipBorder = isDark ? '#3F3F46' : '#E7E5E4'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-0">
        <p className={`text-sm font-medium tracking-tight ${isDark ? 'text-[#A1A1AA]' : 'text-[#78716C]'}`}>
          Deeper metrics • All time
        </p>
      </div>

      {/* ── SECTION 1: Top stats grid ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-2">
        
        {/* Card 1: Biggest expense */}
        <div className={`rounded-3xl border p-5 md:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between gap-2.5 ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'}`}>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`}>
            Largest expense
          </p>
          <div className="flex flex-col gap-1">
            <p className={`text-2xl md:text-3xl font-bold tracking-tight tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
              {formatCurrency(biggestExpense.amount)}
            </p>
            <p className={`text-xs truncate font-medium ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>
              {biggestExpense.description}
            </p>
          </div>
        </div>

        {/* Card 2: Best income month */}
        <div className={`rounded-3xl border p-5 md:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between gap-2.5 ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'}`}>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`}>
            Best income month
          </p>
          <div className="flex flex-col gap-1">
            <p className={`text-2xl md:text-3xl font-bold tracking-tight tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
              {bestIncomeMonth.month}
            </p>
            <p className={`text-xs font-semibold tabular-nums mt-0.5 ${isDark ? 'text-[#16A34A]' : 'text-[#16A34A]'}`}>
              {formatCurrency(bestIncomeMonth.income)} earned
            </p>
          </div>
        </div>

        {/* Card 3: Avg monthly spend */}
        <div className={`rounded-3xl border p-5 md:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between gap-2.5 ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'border-transparent'}`}
          style={{ background: isDark ? undefined : 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)' }}>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-[#71717A]' : 'text-[#FFEDD5]'}`}>
            Avg monthly spend
          </p>
          <div className="flex flex-col gap-1">
            <p className={`text-2xl md:text-3xl font-bold tracking-tight tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-white'}`}>
              {formatCurrency(Math.round(totalExpenses / (monthlySums.length || 1)))}
            </p>
            <p className={`text-xs font-medium ${isDark ? 'text-[#52525B]' : 'text-orange-100'}`}>
              Based on last {monthlySums.length || 1} months
            </p>
          </div>
        </div>

      </div>

      {/* ── SECTION 2: Monthly bar chart ─────────────────────── */}
      <div className={`rounded-[2rem] border p-6 md:p-8 mb-2 shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'}`}>
        <div className="mb-4">
          <h3 className={`text-sm font-semibold ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
            Monthly income vs expenses
          </h3>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>
            Side-by-side comparison across 6 months
          </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlySums}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            barCategoryGap="30%"
            barGap={6}
          >
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
              cursor={{ fill: isDark ? '#3F3F46' : '#F5F5F4', opacity: 0.4 }}
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

            <Bar dataKey="income" fill="#EA580C" radius={[6, 6, 0, 0]} />
            <Bar
              dataKey="expenses"
              fill={isDark ? '#52525B' : '#D6D3D1'}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── SECTION 3: Category breakdown list ───────────────── */}
      <div className={`rounded-[2rem] border p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'}`}>
        <div className="mb-4">
          <h3 className={`text-sm font-semibold ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
            Spending breakdown
          </h3>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>
            All expense categories by total spend
          </p>
        </div>

        <div className="flex flex-col">
          {categorySummaries.map((cat, idx) => (
            <div key={cat.category} className={`px-3 py-2.5 rounded-xl transition-colors flex items-center justify-between gap-3 ${isDark ? 'hover:bg-[#2D2D30]' : 'hover:bg-[#FFFBF7]'}`}>
              {/* Category name */}
              <span className={`text-sm font-medium min-w-0 flex-1 truncate ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
                {cat.category}
              </span>
              
              {/* Progress bar container */}
              <div className="flex-1 max-w-[120px] md:max-w-[200px]">
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#3F3F46]' : 'bg-[#E7E5E4]'}`}>
                  <div
                    className="h-full rounded-full bg-[#EA580C] transition-all duration-1000"
                    style={{ width: `${cat.percentage}%`, opacity: Math.max(1 - (idx * 0.1), 0.4) }}
                  />
                </div>
              </div>

              {/* Amount */}
              <span className={`text-sm font-semibold whitespace-nowrap tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
                {formatCurrency(cat.amount)}
              </span>
              
              {/* Percentage badge */}
              <span className={`whitespace-nowrap flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${isDark
                  ? 'bg-[#431407]/40 text-[#FB923C]'
                  : 'bg-[#FFEDD5] text-[#EA580C]'
                }`}>
                {cat.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
