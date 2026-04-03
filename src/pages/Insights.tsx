// src/pages/Insights.tsx

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import {
  TrendingUp, TrendingDown, ShoppingBag, Utensils,
  PiggyBank, AlertCircle, Award,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import {
  getMonthlySummaries,
  getCategorySummaries,
  getTotalIncome,
  getTotalExpenses,
  getSavingsRate,
  formatCurrency,
} from '../utils/finance'
import InsightCard from '../components/insights/InsightCard'

export default function Insights() {
  const { transactions, theme } = useStore()
  const isDark = theme === 'dark'

  // ── Derived data ──────────────────────────────────────────────
  const monthlySummaries = getMonthlySummaries(transactions)
  const categorySummaries = getCategorySummaries(transactions)
  const totalIncome = getTotalIncome(transactions)
  const totalExpenses = getTotalExpenses(transactions)
  const savingsRate = getSavingsRate(transactions)

  // Card 1 — top spending category
  const topCategory = categorySummaries[0]

  // Card 4 — biggest single expense
  const biggestExpense = transactions
    .filter(t => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0]

  // Card 5 — best income month
  const bestIncomeMonth = monthlySummaries.reduce(
    (best, m) => (m.income > best.income ? m : best),
    monthlySummaries[0] ?? { month: '—', income: 0, expenses: 0, balance: 0 }
  )

  // ── Chart colors ──────────────────────────────────────────────
  const gridColor = isDark ? '#3F3F46' : '#F5F5F4'
  const textColor = isDark ? '#71717A' : '#A8A29E'
  const tooltipBg = isDark ? '#27272A' : '#FFFFFF'
  const tooltipBorder = isDark ? '#3F3F46' : '#E7E5E4'

  const cardBg = isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'

  return (
    <div className="flex flex-col gap-6">

      {/* ── SECTION 1: Insight cards ─────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

        {/* Card 1: Top spending category */}
        <InsightCard
          title="Top spending category"
          value={topCategory?.category ?? '—'}
          subtext={
            topCategory
              ? `${formatCurrency(topCategory.amount)} spent — ${topCategory.percentage}% of total`
              : 'No expenses yet'
          }
          icon={ShoppingBag}
          trend="down"
        />

        {/* Card 2: Total saved */}
        <InsightCard
          title="Total saved"
          value={formatCurrency(totalIncome - totalExpenses)}
          subtext="Across all 6 months"
          icon={PiggyBank}
          accent
          trend="up"
        />

        {/* Card 3: Savings rate */}
        <InsightCard
          title="Savings rate"
          value={`${savingsRate}%`}
          subtext={
            savingsRate >= 30
              ? 'Excellent discipline'
              : savingsRate >= 20
                ? 'On the right track'
                : 'Room to improve'
          }
          icon={Award}
          trend={savingsRate >= 20 ? 'up' : 'down'}
        />

        {/* Card 4: Largest transaction */}
        <InsightCard
          title="Largest transaction"
          value={biggestExpense ? formatCurrency(biggestExpense.amount) : '—'}
          subtext={biggestExpense?.description ?? 'No expenses yet'}
          icon={AlertCircle}
          trend="down"
        />

        {/* Card 5: Best income month */}
        <InsightCard
          title="Best income month"
          value={bestIncomeMonth?.month ?? '—'}
          subtext={bestIncomeMonth ? formatCurrency(bestIncomeMonth.income) : '—'}
          icon={TrendingUp}
          trend="up"
        />

        {/* Card 6: Avg monthly spend */}
        <InsightCard
          title="Avg monthly spend"
          value={formatCurrency(monthlySummaries.length > 0 ? totalExpenses / monthlySummaries.length : 0)}
          subtext="Based on last 6 months"
          icon={TrendingDown}
          trend="neutral"
        />

      </div>

      {/* ── SECTION 2: Monthly bar chart ─────────────────────── */}
      <div className={`rounded-xl border p-4 ${cardBg}`}>
        <div className="mb-4">
          <h3 className={`text-sm font-semibold ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
            Monthly income vs expenses
          </h3>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>
            Side-by-side comparison across 6 months
          </p>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={monthlySummaries}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
            barCategoryGap="30%"
            barGap={4}
          >
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

            <Bar dataKey="income" fill="#EA580C" radius={[4, 4, 0, 0]} />
            <Bar
              dataKey="expenses"
              fill={isDark ? '#3F3F46' : '#D6D3D1'}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── SECTION 3: Category breakdown list ───────────────── */}
      <div className={`rounded-xl border p-4 flex flex-col gap-4 ${cardBg}`}>
        <div>
          <h3 className={`text-sm font-semibold ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
            Spending breakdown
          </h3>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>
            All expense categories by total spend
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {categorySummaries.map((cat) => (
            <div key={cat.category} className="flex flex-col gap-1.5">
              {/* Row: name + amount + badge */}
              <div className="flex items-center justify-between gap-2">
                <span className={`text-xs font-medium ${isDark ? 'text-[#A1A1AA]' : 'text-[#57534E]'}`}>
                  {cat.category}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
                    {formatCurrency(cat.amount)}
                  </span>
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${isDark
                      ? 'bg-[#431407] text-[#EA580C]'
                      : 'bg-[#FFEDD5] text-[#7C2D12]'
                    }`}>
                    {cat.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#3F3F46]' : 'bg-[#F5F5F4]'}`}>
                <div
                  className="h-full rounded-full bg-[#EA580C] transition-all duration-500"
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
