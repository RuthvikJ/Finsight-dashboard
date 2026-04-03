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
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className={`text-xs font-medium ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`}>
            {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
          </p>

          {/* Desktop add button — admin only */}
          {isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EA580C] text-white text-xs font-semibold hover:bg-[#C2410C] transition-colors duration-150"
            >
              <Plus size={14} />
              Add transaction
            </button>
          )}
        </div>

        <TransactionFilters />
      </div>

      {/* Transaction list */}
      <TransactionTable onEdit={handleEdit} />

      {/* Mobile FAB — admin only */}
      {isAdmin && (
        <button
          onClick={() => setShowModal(true)}
          className="md:hidden fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-lg hover:bg-[#C2410C] transition-colors duration-150"
          aria-label="Add transaction"
        >
          <Plus size={20} />
        </button>
      )}

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
