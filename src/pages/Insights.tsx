// src/pages/Insights.tsx

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useStore } from '../store/useStore'
import {
  getMonthlySummaries,
  getCategorySummaries,
  getTotalIncome,
  getTotalExpenses,
  formatCurrency,
} from '../utils/finance'
import { TrendingUp, TrendingDown, Target, Zap, Activity } from 'lucide-react'

export default function Insights() {
  const { theme, transactions } = useStore()
  const isDark = theme === 'dark'

  // ── Derived Data
  const monthlySums = getMonthlySummaries(transactions)
  
  const currentMonth = monthlySums[monthlySums.length - 1] || { income: 0, expenses: 0, balance: 0 }
  const prevMonth = monthlySums[monthlySums.length - 2] || { income: 1, expenses: 1, balance: 1 }

  const savingsRate = currentMonth.income > 0 ? ((currentMonth.income - currentMonth.expenses) / currentMonth.income) * 100 : 0
  const prevSavingsRate = prevMonth.income > 0 ? ((prevMonth.income - prevMonth.expenses) / prevMonth.income) * 100 : 0
  const savingsRateDelta = savingsRate - prevSavingsRate

  const categorySummaries = getCategorySummaries(transactions)
  const topCategory = categorySummaries[0] || { category: 'None', amount: 0 }
  
  const totalIncome = getTotalIncome(transactions)
  const totalExpenses = getTotalExpenses(transactions)
  const avgMonthlySpend = totalExpenses / (monthlySums.length || 1)
  
  const netPosition = totalIncome - totalExpenses
  const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0

  // Colors
  const cardBg = isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E5E7EB]'
  const textColor = isDark ? '#A1A1AA' : '#9CA3AF'
  const gridColor = isDark ? '#27272A' : '#F3F4F6'

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-10 min-h-screen">
      
      {/* ── ROW 1: Highlight Metrics ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        
        {/* Top Spending */}
        <div className={`rounded-2xl border p-6 flex flex-col justify-between gap-4 ${cardBg} shadow-[0_4px_12px_rgba(0,0,0,0.02)] min-h-[140px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}>Top Spend Category</span>
            <div className={`p-1.5 rounded-lg ${isDark ? 'bg-red-500/10 text-red-500' : 'bg-red-50 text-red-600'}`}><Target size={16} /></div>
          </div>
          <div>
            <div className={`text-[28px] font-bold tracking-tight truncate ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>{topCategory.category}</div>
            <div className={`text-[13px] font-semibold mt-1 tabular-nums ${isDark ? 'text-[#EF4444]' : 'text-red-600'}`}>{formatCurrency(topCategory.amount)} Lifetime</div>
          </div>
        </div>

        {/* Savings Rate */}
        <div className={`rounded-2xl border p-6 flex flex-col justify-between gap-4 ${cardBg} shadow-[0_4px_12px_rgba(0,0,0,0.02)] min-h-[140px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}>Savings Rate</span>
            <div className={`p-1.5 rounded-lg ${isDark ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600'}`}><Zap size={16} /></div>
          </div>
          <div>
            <div className={`text-[28px] font-bold tracking-tight tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>{savingsRate.toFixed(1)}%</div>
            <div className={`flex items-center gap-1.5 mt-1 text-[12px] font-bold ${savingsRateDelta >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {savingsRateDelta >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {Math.abs(savingsRateDelta).toFixed(1)}% vs Last month
            </div>
          </div>
        </div>

        {/* Avg Monthly Spend */}
        <div className={`rounded-2xl border p-6 flex flex-col justify-between gap-4 ${cardBg} shadow-[0_4px_12px_rgba(0,0,0,0.02)] min-h-[140px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}>Avg Monthly Spend</span>
            <div className={`p-1.5 rounded-lg ${isDark ? 'bg-orange-500/10 text-orange-500' : 'bg-orange-50 text-orange-600'}`}><Activity size={16} /></div>
          </div>
          <div>
            <div className={`text-[28px] font-bold tracking-tight tabular-nums truncate ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>{formatCurrency(avgMonthlySpend)}</div>
            <div className={`text-[12px] font-medium mt-1 ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'}`}>Based on {monthlySums.length} months</div>
          </div>
        </div>
        
        {/* Expense Ratio */}
        <div className={`rounded-2xl border p-6 flex flex-col justify-between gap-4 ${cardBg} shadow-[0_4px_12px_rgba(0,0,0,0.02)] min-h-[140px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}>Overall Expense Ratio</span>
            <div className={`p-1.5 rounded-lg ${isDark ? 'bg-blue-500/10 text-blue-500' : 'bg-blue-50 text-blue-600'}`}><Activity size={16} /></div>
          </div>
          <div>
            <div className={`text-[28px] font-bold tracking-tight tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>{expenseRatio.toFixed(1)}%</div>
            <div className={`w-full h-1.5 rounded-full mt-3 ${isDark ? 'bg-[#27272A]' : 'bg-[#F3F4F6]'}`}>
               <div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.min(100, expenseRatio)}%` }} />
            </div>
          </div>
        </div>

      </div>

      {/* ── ROW 2: Bar Analysis & Performance List ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_400px] gap-6 items-start">
        
        {/* Top Expense Categories Chart */}
        <div className={`rounded-2xl border p-6 md:p-8 flex flex-col w-full h-[460px] ${cardBg} shadow-[0_4px_12px_rgba(0,0,0,0.02)]`}>
          <div className="mb-8">
            <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>Monthly Flow Analysis</h3>
            <p className={`text-[12px] mt-1 font-medium ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'}`}>Six month income vs expense mapping</p>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySums.slice(-6)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={8}>
              <CartesianGrid stroke={gridColor} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: textColor, fontWeight: 600 }} tickMargin={16} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12, fill: textColor, fontWeight: 600 }} tickMargin={12} />
              <Tooltip
                cursor={{ fill: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)' }}
                contentStyle={{ backgroundColor: isDark ? '#27272A' : '#FFFFFF', borderRadius: '16px', border: `1px solid ${isDark ? '#3F3F46' : '#E5E7EB'}`, color: isDark ? '#FAFAFA' : '#111827', padding: '12px 16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                formatter={(value: any, name: any) => [`₹${Number(value).toLocaleString('en-IN')}`, name === 'income' ? 'Income' : 'Expense']}
              />
              <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={32} />
              <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Net Position Summary */}
        <div className={`rounded-2xl border p-6 md:p-8 flex flex-col w-full h-[460px] ${cardBg} shadow-[0_4px_12px_rgba(0,0,0,0.02)]`}>
          <div className="mb-6">
            <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>Aggregate Position</h3>
            <p className={`text-[12px] mt-1 font-medium ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'}`}>All time ledger</p>
          </div>
          
          <div className={`flex flex-col flex-1 justify-center p-8 rounded-2xl border mb-6 ${isDark ? 'bg-[#27272A]/30 border-[#3F3F46]' : 'bg-gray-50 border-gray-200'}`}>
             <div className={`text-[14px] font-bold uppercase tracking-widest text-center ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}>Net Worth</div>
             <div className={`text-[46px] font-black tabular-nums tracking-tighter text-center mt-2 ${isDark ? 'text-[#10B981]' : 'text-emerald-600'}`}>{formatCurrency(netPosition)}</div>
          </div>
          
          <div className="flex flex-col gap-4">
             <div className="flex justify-between border-b pb-4 dark:border-[#27272A] border-gray-200">
                <span className={`text-[14px] font-bold ${isDark ? 'text-[#A1A1AA]' : 'text-[#4B5563]'}`}>Total Income</span>
                <span className={`text-[15px] font-bold tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>{formatCurrency(totalIncome)}</span>
             </div>
             <div className="flex justify-between">
                <span className={`text-[14px] font-bold ${isDark ? 'text-[#A1A1AA]' : 'text-[#4B5563]'}`}>Total Expenses</span>
                <span className={`text-[15px] font-bold tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>{formatCurrency(totalExpenses)}</span>
             </div>
          </div>
        </div>

      </div>

      {/* ── ROW 3: Full Category Breakdown Data Table ───────────────────────── */}
      <div className={`rounded-2xl border overflow-hidden ${cardBg} shadow-[0_4px_12px_rgba(0,0,0,0.02)]`}>
          <div className="p-6 md:p-8 border-b dark:border-[#27272A] border-gray-200">
             <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>Full Category Ledger</h3>
             <p className={`text-[12px] mt-1 font-medium ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'}`}>Lifetime categorized expense mapping</p>
          </div>
          
          <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8">
             {categorySummaries.map((cat, i) => (
                <div key={cat.category} className="flex flex-col group">
                   <div className="flex justify-between items-end mb-2">
                      <span className={`text-[15px] font-bold ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>{cat.category}</span>
                      <span className={`text-[13px] font-bold tabular-nums text-red-500`}>-{formatCurrency(cat.amount)}</span>
                   </div>
                   <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#27272A]' : 'bg-[#F3F4F6]'}`}>
                     <div
                       className="h-full rounded-full transition-all duration-1000"
                       style={{ width: `${cat.percentage}%`, backgroundColor: i === 0 ? '#EF4444' : '#F59E0B', opacity: Math.max(1 - (i * 0.1), 0.4) }}
                     />
                   </div>
                   <div className="flex justify-between items-center mt-2.5">
                      <span className={`text-[12px] font-semibold ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'}`}>{cat.count} Transactions</span>
                      <span className={`text-[12px] font-bold uppercase tracking-wider ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}>{cat.percentage}% of total</span>
                   </div>
                </div>
             ))}
          </div>
      </div>

    </div>
  )
}
