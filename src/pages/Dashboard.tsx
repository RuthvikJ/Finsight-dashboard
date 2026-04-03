// src/pages/Dashboard.tsx

import { useStore } from '../store/useStore'
import {
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getSavingsRate,
} from '../utils/finance'
import SummaryCard from '../components/dashboard/SummaryCard'
import BalanceChart from '../components/dashboard/BalanceChart'
import CategoryChart from '../components/dashboard/CategoryChart'
import HealthScore from '../components/dashboard/HealthScore'

export default function Dashboard() {
  const { transactions, theme } = useStore()
  const isDark = theme === 'dark'

  const balance = getBalance(transactions)
  const income = getTotalIncome(transactions)
  const expenses = getTotalExpenses(transactions)
  const savingsRate = getSavingsRate(transactions)

  // simple month-over-month delta using last 2 months
  const currentMonth = '2025-06'
  const prevMonth = '2025-05'
  const curr = transactions.filter(t => t.date.startsWith(currentMonth))
  const prev = transactions.filter(t => t.date.startsWith(prevMonth))

  const currIncome = curr.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const prevIncome = prev.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const currExpenses = curr.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const prevExpenses = prev.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

  const incomeDelta = prevIncome > 0 ? Math.round(((currIncome - prevIncome) / prevIncome) * 100) : 0
  const expensesDelta = prevExpenses > 0 ? Math.round(((currExpenses - prevExpenses) / prevExpenses) * 100) : 0

  const isDeficit = currExpenses > currIncome

  return (
    <div className="flex flex-col gap-5">

      {/* Deficit warning */}
      {isDeficit && (
        <div className={`rounded-xl border px-4 py-3 flex items-center gap-3 ${isDark
            ? 'bg-red-950 border-red-800 text-red-300'
            : 'bg-red-50  border-red-200 text-red-700'
          }`}>
          <span className="text-lg">⚠</span>
          <div>
            <p className="text-sm font-semibold">Spending exceeds income this month</p>
            <p className="text-xs opacity-75">Review your expenses to get back on track.</p>
          </div>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SummaryCard
          label="Total balance"
          value={balance}
          isCurrency
        />
        <SummaryCard
          label="Total income"
          value={income}
          delta={incomeDelta}
          isCurrency
        />
        <SummaryCard
          label="Expenses"
          value={expenses}
          delta={expensesDelta}
          isCurrency
          dark_filled
        />
        <SummaryCard
          label="Savings rate"
          value={savingsRate}
          suffix="%"
          accent
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <BalanceChart />
        </div>
        <HealthScore />
      </div>

      {/* Category chart */}
      <CategoryChart />

    </div>
  )
}