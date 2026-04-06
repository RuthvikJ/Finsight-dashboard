// src/pages/Transactions.tsx

import { useState } from 'react'
import { useStore, useFilteredTransactions } from '../store/useStore'
import type { Transaction } from '../types'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable from '../components/transactions/TransactionTable'
import AddTransactionModal from '../components/transactions/AddTransactionModal'
import { formatCurrency } from '../utils/finance'
import { TrendingUp, TrendingDown, Receipt } from 'lucide-react'

export default function Transactions() {
  const { theme } = useStore()
  const transactions = useFilteredTransactions()
  const isDark = theme === 'dark'

  const [showModal, setShowModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const isModalOpen = showModal || editingTransaction !== null

  const handleEdit = (t: Transaction) => {
    setEditingTransaction(t)
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
    setEditingTransaction(null)
  }

  const incomeTotal = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenseTotal = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const netBalance = incomeTotal - expenseTotal

  return (
    <div className="flex flex-col gap-5 w-full max-w-[1280px] mx-auto">

      {/* ── Summary Strip ──────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        {/* Income */}
        <div className={`rounded-xl border p-4 flex items-center gap-3 transition-all duration-200
          ${isDark ? 'bg-[#13131A] border-[#1E1E2E]' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <div className="min-w-0">
            <p className={`text-[10px] font-bold uppercase tracking-[0.1em] ${isDark ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>Income</p>
            <p className={`text-[14px] font-black tabular-nums truncate text-emerald-500`}>+{formatCurrency(incomeTotal)}</p>
          </div>
        </div>

        {/* Expenses */}
        <div className={`rounded-xl border p-4 flex items-center gap-3 transition-all duration-200
          ${isDark ? 'bg-[#13131A] border-[#1E1E2E]' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
            <TrendingDown size={16} className="text-orange-500" />
          </div>
          <div className="min-w-0">
            <p className={`text-[10px] font-bold uppercase tracking-[0.1em] ${isDark ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>Expenses</p>
            <p className={`text-[14px] font-black tabular-nums truncate text-orange-500`}>−{formatCurrency(expenseTotal)}</p>
          </div>
        </div>

        {/* Net */}
        <div className={`rounded-xl border p-4 flex items-center gap-3 transition-all duration-200
          ${isDark ? 'bg-[#13131A] border-[#1E1E2E]' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="w-9 h-9 rounded-xl bg-[#F97316]/10 flex items-center justify-center shrink-0">
            <Receipt size={16} className="text-[#F97316]" />
          </div>
          <div className="min-w-0">
            <p className={`text-[10px] font-bold uppercase tracking-[0.1em] ${isDark ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>Net Balance</p>
            <p className={`text-[14px] font-black tabular-nums truncate ${netBalance >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {netBalance >= 0 ? '+' : '−'}{formatCurrency(Math.abs(netBalance))}
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter Bar ─────────────────────────────────────────── */}
      <div className={`rounded-2xl border p-4 transition-all duration-200
        ${isDark ? 'bg-[#13131A] border-[#1E1E2E]' : 'bg-white border-[#E2E8F0]'}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className={`text-[12px] font-bold ${isDark ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>
              {transactions.length} result{transactions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <TransactionFilters onAddTransaction={() => setShowModal(true)} />
      </div>

      {/* ── Transaction Table ──────────────────────────────────── */}
      <TransactionTable onEdit={handleEdit} />

      {/* ── Modal ─────────────────────────────────────────────── */}
      {isModalOpen && (
        <AddTransactionModal
          onClose={handleClose}
          initialData={editingTransaction ?? undefined}
        />
      )}

    </div>
  )
}
