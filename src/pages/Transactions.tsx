// src/pages/Transactions.tsx

import { useState } from 'react'
import { useStore, useFilteredTransactions } from '../store/useStore'
import type { Transaction } from '../types'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable from '../components/transactions/TransactionTable'
import AddTransactionModal from '../components/transactions/AddTransactionModal'
import { formatCurrency } from '../utils/finance'

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

  // Summary Row Calculations
  const incomeTotal = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenseTotal = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

  return (
    <div className="flex flex-col gap-5 w-full max-w-[1400px] mx-auto min-h-full">

      {/* Top Filter Bar */}
      <TransactionFilters onAddTransaction={() => setShowModal(true)} />

      {/* Summary Row */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 -mx-1 px-1">
        <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${isDark ? 'bg-[#27272A] text-[#A1A1AA]' : 'bg-[#E7E5E4] text-[#A8A29E]'}`}>
          <span>Showing:</span>
          <span className={isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}>{transactions.length} results</span>
        </div>
        
        <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${isDark ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-green-50 text-green-700'}`}>
          <span>Income:</span>
          <span>+{formatCurrency(incomeTotal)}</span>
        </div>

        <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${isDark ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-red-50 text-red-700'}`}>
          <span>Expenses:</span>
          <span>-{formatCurrency(expenseTotal)}</span>
        </div>
      </div>

      {/* Transaction list */}
      <TransactionTable onEdit={handleEdit} />

      {/* Modal */}
      {isModalOpen && (
        <AddTransactionModal
          onClose={handleClose}
          initialData={editingTransaction ?? undefined}
        />
      )}

    </div>
  )
}
