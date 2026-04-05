// src/pages/Dashboard.tsx

import { useStore } from '../store/useStore'
import {
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getSavingsRate,
  getMonthlySummaries,
} from '../utils/finance'
import SummaryCard from '../components/dashboard/SummaryCard'
import BalanceChart from '../components/dashboard/BalanceChart'
import CategoryChart from '../components/dashboard/CategoryChart'

export default function Dashboard() {
  const { transactions, theme, timeRange, setTimeRange } = useStore()
  const isDark = theme === 'dark'

  // Compute filteredTxns
  const now = new Date('2025-06-30')
  const monthsBack = timeRange === '1M' ? 1 : timeRange === '3M' ? 3 : 6
  const cutoff = new Date(now)
  cutoff.setMonth(cutoff.getMonth() - monthsBack)
  const cutoffStr = cutoff.toISOString().slice(0, 10)
  const filteredTxns = transactions.filter(t => t.date >= cutoffStr)

  const balance = getBalance(filteredTxns)
  const income = getTotalIncome(filteredTxns)
  const expenses = getTotalExpenses(filteredTxns)
  const savingsRate = getSavingsRate(filteredTxns)

  const currentMonth = '2025-06'
  const prevMonth = '2025-05'
  const curr = filteredTxns.filter(t => t.date.startsWith(currentMonth))
  const prev = filteredTxns.filter(t => t.date.startsWith(prevMonth))

  const currIncome = curr.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const prevIncome = prev.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const currExpenses = curr.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const prevExpenses = prev.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

  const incomeDelta = prevIncome > 0 ? Math.round(((currIncome - prevIncome) / prevIncome) * 100) : 0
  const expensesDelta = prevExpenses > 0 ? Math.round(((currExpenses - prevExpenses) / prevExpenses) * 100) : 0

  const isDeficit = currExpenses > currIncome

  // Compute sparklines
  const summaries = getMonthlySummaries(filteredTxns)
  const balanceSparkline = summaries.map(s => s.balance)
  const incomeSparkline = summaries.map(s => s.income)
  const expenseSparkline = summaries.map(s => s.expenses)
  const savingsSparkline = summaries.map(s =>
    s.income > 0 ? Math.round(((s.income - s.expenses) / s.income) * 100) : 0
  )

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`

  const dateRangeStr = timeRange === '1M' 
    ? 'Jun 2025' 
    : timeRange === '3M' 
      ? 'Apr–Jun 2025' 
      : 'Jan–Jun 2025'

  return (
    <div className="flex flex-col gap-6">

      {/* Deficit warning */}
      {isDeficit && (
        <div className={`rounded-2xl border px-5 py-4 flex items-center gap-4 ${isDark
          ? 'bg-red-950/30 border-red-900/50 text-red-300'
          : 'bg-red-50/50 border-red-100 text-red-700'
          }`}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
            <span className="text-xl leading-none">⚠</span>
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Spending exceeds income this month</p>
            <p className="text-xs mt-0.5 opacity-80">Review your expenses to get back on track.</p>
          </div>
        </div>
      )}

      {/* Header filters & subtitle */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className={`text-sm font-medium tracking-tight ${isDark ? 'text-[#A1A1AA]' : 'text-[#78716C]'}`}>
          Overview • {dateRangeStr}
        </p>

        <div className={`flex items-center gap-1 p-1 rounded-xl border ${isDark
            ? 'bg-[#27272A] border-[#3F3F46]'
            : 'bg-white border-[#E7E5E4]'}`}>
          {(['1M', '3M', '6M'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold
                transition-all duration-200 cursor-pointer ${timeRange === r
                  ? 'bg-[#EA580C] text-white shadow-sm'
                  : isDark
                    ? 'text-[#71717A] hover:text-[#A1A1AA]'
                    : 'text-[#A8A29E] hover:text-[#57534E]'
                }`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Hero KPI card */}
      <div className={`rounded-[2rem] border p-6 md:p-8 flex flex-col gap-6
        shadow-[0_4px_24px_rgba(0,0,0,0.04)]
        ${isDark
          ? 'bg-[#27272A] border-[#3F3F46]'
          : 'bg-white border-[#E7E5E4]'}`}>
        
        <div className="flex flex-col gap-2">
          <p className={`text-xs font-semibold uppercase tracking-widest
            ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`}>
            Total balance
          </p>
          <div className="flex items-end gap-4 flex-wrap">
            <span className={`text-5xl md:text-6xl font-bold tracking-tight py-1
              ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
              {formatCurrency(balance)}
            </span>
            <span className={`flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-full mb-1 sm:mb-2 border ${incomeDelta >= 0
              ? isDark
                ? 'bg-green-950/50 text-green-400 border-green-900/50'
                : 'bg-green-50 text-green-700 border-green-100'
              : isDark
                ? 'bg-red-950/50 text-red-400 border-red-900/50'
                : 'bg-red-50 text-red-600 border-red-100'
              }`}>
              {incomeDelta >= 0 ? '↑' : '↓'} {Math.abs(incomeDelta)}%
            </span>
          </div>
        </div>

        <div className={`w-full h-px ${isDark ? 'bg-[#3F3F46]' : 'bg-[#F5F5F4]'}`} />

        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-1.5">
            <p className={`text-[10px] font-semibold uppercase tracking-widest
              ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>Income</p>
            <p className="text-xl font-bold text-[#16A34A] tracking-tight">
              {formatCurrency(income)}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className={`text-[10px] font-semibold uppercase tracking-widest
              ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>Expenses</p>
            <p className="text-xl font-bold text-[#DC2626] tracking-tight">
              {formatCurrency(expenses)}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className={`text-[10px] font-semibold uppercase tracking-widest
              ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>Savings</p>
            <p className="text-xl font-bold text-[#EA580C] tracking-tight">
              {savingsRate}%
            </p>
          </div>
        </div>
      </div>

      {/* Summary cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          label="Total Balance"
          value={balance}
          isCurrency
          sparkline={balanceSparkline}
        />
        <SummaryCard
          label="Total Income"
          value={income}
          delta={incomeDelta}
          isCurrency
          sparkline={incomeSparkline}
        />
        <SummaryCard
          label="Expenses"
          value={expenses}
          delta={expensesDelta}
          isCurrency
          dark_filled
          sparkline={expenseSparkline}
        />
        <SummaryCard
          label="Savings Rate"
          value={savingsRate}
          suffix="%"
          accent
          sparkline={savingsSparkline}
        />
      </div>

      {/* Main Bottom Layout: 2-Col Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <BalanceChart transactions={filteredTxns} />
        </div>
        <div className="lg:col-span-1">
          <CategoryChart transactions={filteredTxns} />
        </div>
      </div>

    </div>
  )
}