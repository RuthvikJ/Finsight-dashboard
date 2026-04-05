// src/pages/Transactions.tsx

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useStore, useFilteredTransactions } from '../store/useStore'
import type { Transaction } from '../types'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable from '../components/transactions/TransactionTable'
import AddTransactionModal from '../components/transactions/AddTransactionModal'

export default function Transactions() {
  const { role, theme } = useStore()
  const transactions = useFilteredTransactions()
  const isDark = theme === 'dark'
  const isAdmin = role === 'admin'

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

  return (
    <div className="flex flex-col gap-4">

      {/* Top bar: filters + desktop add button */}
      <div className="flex flex-col gap-4 mb-2">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className={`text-sm font-medium tracking-tight ${isDark ? 'text-[#A1A1AA]' : 'text-[#78716C]'}`}>
            All historic activity • {transactions.length} total
          </p>
          {isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)' }}>
              <Plus size={15} />
              Add transaction
            </button>
          )}
        </div>

        <TransactionFilters />
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
