// src/pages/Dashboard.tsx

import { useStore } from '../store/useStore'
import {
  getTotalIncome,
  getTotalExpenses,
  getBalance,
} from '../utils/finance'
import SummaryCard from '../components/dashboard/SummaryCard'
import RevenueCard from '../components/dashboard/RevenueCard'
import ExpenseBreakdown from '../components/dashboard/ExpenseBreakdown'
import HealthScore from '../components/dashboard/HealthScore'
import MonthlyNetChart from '../components/dashboard/MonthlyNetChart'
import RecentTransactions from '../components/dashboard/RecentTransactions'

export default function Dashboard() {
  const { transactions, timeRange } = useStore()

  // Filtered transactions by time range
  const now = new Date('2025-06-30')
  const monthsBack = timeRange === '1M' ? 1 : timeRange === '3M' ? 3 : 6
  const cutoff = new Date(now)
  cutoff.setMonth(cutoff.getMonth() - monthsBack)
  const cutoffStr = cutoff.toISOString().slice(0, 10)
  const filteredTxns = transactions.filter((t) => t.date >= cutoffStr)

  const balance = getBalance(filteredTxns)
  const income = getTotalIncome(filteredTxns)
  const expenses = getTotalExpenses(filteredTxns)

  // Mock deltas
  const incomeDelta = 12.4
  const expensesDelta = 5.2
  const savingsDelta = 68.6

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* ── ROW 1: Summary Cards ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          type="balance"
          label="Total Balance"
          value={balance}
          isCurrency
          delta={savingsDelta}
        />
        <SummaryCard
          type="income"
          label="Total Income"
          value={income}
          isCurrency
          delta={incomeDelta}
        />
        <SummaryCard
          type="expense"
          label="Total Expenses"
          value={expenses}
          isCurrency
          delta={-expensesDelta}
        />
        <SummaryCard
          type="savings"
          label="Transactions"
          value={filteredTxns.length}
        />
      </div>

      {/* ── ROW 2: Revenue Chart + Expense Breakdown + Health ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        {/* Revenue bar chart */}
        <div className="min-h-[420px]">
          <RevenueCard transactions={filteredTxns} />
        </div>

        {/* Stacked: Expense breakdown + Health score */}
        <div className="flex flex-col gap-5">
          <ExpenseBreakdown transactions={filteredTxns} />
          <HealthScore transactions={filteredTxns} />
        </div>
      </div>

      {/* ── ROW 3: Monthly Net Chart + Recent Transactions ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 pb-4">
        <div className="min-h-[380px]">
          <MonthlyNetChart transactions={filteredTxns} />
        </div>
        <RecentTransactions transactions={filteredTxns} />
      </div>

    </div>
  )
}