// src/components/transactions/TransactionTable.tsx

import { useState, useEffect } from 'react'
import { Pencil, Trash2, Receipt, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore, useFilteredTransactions } from '../../store/useStore'
import { formatCurrency, formatDate } from '../../utils/finance'
import type { Transaction } from '../../types'

interface Props {
  onEdit: (t: Transaction) => void
}

export default function TransactionTable({ onEdit }: Props) {
  const { role, theme, deleteTransaction } = useStore()
  const transactions = useFilteredTransactions()
  const isDark = theme === 'dark'
  const isAdmin = role === 'admin'

  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 8

  useEffect(() => {
    setCurrentPage(1)
  }, [transactions.length])

  const totalPages = Math.max(1, Math.ceil(transactions.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentTransactions = transactions.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // ── Empty state ───────────────────────────────────────────────
  if (transactions.length === 0) {
    return (
      <div className={`rounded-xl border flex flex-col items-center justify-center py-16 gap-3 ${
        isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'
      }`}>
        <Receipt size={36} className={isDark ? 'text-[#3F3F46]' : 'text-[#D6D3D1]'} />
        <p className={`text-sm font-semibold ${isDark ? 'text-[#A1A1AA]' : 'text-[#57534E]'}`}>
          No transactions found
        </p>
        <p className={`text-xs ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>
          Try adjusting your filters
        </p>
      </div>
    )
  }

  // ── Shared column header style ────────────────────────────────
  const th = `text-[10px] font-bold uppercase tracking-widest px-4 py-3.5 text-left whitespace-nowrap ${
    isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'
  }`

  return (
    <>
      {/* ── Desktop table (md+) ──────────────────────────────── */}
      <div className={`hidden md:block rounded-2xl border overflow-x-auto transition-all ${
        isDark ? 'bg-[#27272A] border-[#3F3F46] shadow-[0_1px_3px_rgba(0,0,0,0.3)]' : 'bg-white border-transparent shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]'
      }`}>
        <table className="w-full border-collapse">
          <thead className={`sticky top-0 z-10 backdrop-blur-sm ${isDark ? 'bg-[#1F1F22]/90' : 'bg-[#FAFAF9]/90'} border-b ${isDark ? 'border-[#3F3F46]' : 'border-[#E7E5E4]/60'}`}>
            <tr>
              <th className={th}>Date</th>
              <th className={th}>Description</th>
              <th className={th}>Category</th>
              <th className={th}>Type</th>
              <th className={`${th} text-right pr-4 md:pr-6`}>Amount</th>
              {isAdmin && <th className={`${th} text-center`}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((t) => {
              const borderClass = isDark ? 'border-[#3F3F46]' : 'border-[#F5F5F4]'
              const rowBgHover = isDark ? 'hover:bg-[#2F2F33] hover:shadow-inner' : 'hover:bg-[#FFEDD5]/30'

              return (
                <tr
                  key={t.id}
                  className={`border-b transition-all duration-200 group ${borderClass} ${rowBgHover}`}
                >
                  {/* Date */}
                  <td className={`px-4 py-3.5 text-xs font-semibold whitespace-nowrap min-w-[110px] ${
                    isDark ? 'text-[#A1A1AA]' : 'text-[#78716C]'
                  }`}>
                    {formatDate(t.date)}
                  </td>

                  {/* Description */}
                  <td className={`px-4 py-3.5 text-sm font-medium min-w-[160px] max-w-[200px] truncate tracking-tight ${
                    isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'
                  }`}>
                    {t.description}
                    {t.note && (
                      <span className={`ml-2 text-xs font-normal ${
                        isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'
                      }`}>
                        · {t.note}
                      </span>
                    )}
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3.5 min-w-[130px]">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                      isDark 
                        ? 'bg-[#431407] text-[#FB923C]' 
                        : 'bg-[#FFEDD5] text-[#7C2D12]'
                    }`}>
                      {t.category}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3.5 min-w-[90px]">
                    {t.type === 'income' ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400 whitespace-nowrap">
                        Income
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-600 whitespace-nowrap">
                        Expense
                      </span>
                    )}
                  </td>

                  {/* Amount */}
                  <td className={`py-3.5 pl-4 pr-4 md:pr-6 min-w-[110px] text-right text-sm font-bold whitespace-nowrap tabular-nums ${
                    t.type === 'income' ? 'text-[#16A34A]' : 'text-[#DC2626]'
                  }`}>
                    {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
                  </td>

                  {/* Actions — admin only */}
                  {isAdmin && (
                    <td className="px-4 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                        <button
                          onClick={() => onEdit(t)}
                          className={`p-1.5 rounded-xl transition-colors duration-150 ${
                            isDark
                              ? 'bg-[#3F3F46] hover:bg-[#52525B] text-[#FAFAFA]'
                              : 'bg-[#F5F5F4] hover:bg-[#E7E5E4] text-[#1C0A00]'
                          }`}
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className="p-1.5 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors duration-150"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* ── Mobile cards (below md) ──────────────────────────── */}
      <div className="flex flex-col gap-3 md:hidden">
        {currentTransactions.map((t) => (
          <div
            key={t.id}
            className={`relative overflow-hidden rounded-2xl border p-4 min-h-[72px] flex flex-col gap-3 transition-shadow shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md ${
              isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-transparent'
            }`}
          >
            {/* Accent Border */}
            <div className={`absolute left-0 top-0 bottom-0 border-l-4 ${t.type === 'income' ? 'border-[#16A34A]' : 'border-[#EA580C]'}`} />

            {/* Top row: description + amount */}
            <div className="flex items-start justify-between gap-3 pl-2">
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium tracking-tight truncate ${
                  isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'
                }`}>
                  {t.description}
                </p>
                <div className={`text-xs mt-1 flex items-center gap-1.5 truncate ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`}>
                  <span>{t.category}</span>
                  <span>·</span>
                  <span>{formatDate(t.date)}</span>
                </div>
              </div>
              <span className={`text-base font-bold whitespace-nowrap tabular-nums shrink-0 ${
                t.type === 'income' ? 'text-[#16A34A]' : 'text-[#DC2626]'
              }`}>
                {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
              </span>
            </div>

            {/* Actions */}
            {isAdmin && (
              <div className="flex items-center justify-end gap-2 pl-2">
                <button
                  onClick={() => onEdit(t)}
                  className={`flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl transition-colors duration-150 ${
                    isDark
                      ? 'bg-[#3F3F46] text-[#FAFAFA]'
                      : 'bg-[#F5F5F4] text-[#1C0A00]'
                  }`}
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 transition-colors duration-150"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Pagination Footer ──────────────────────────── */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t mt-4 ${
        isDark ? 'border-[#3F3F46]' : 'border-[#E7E5E4]'
      }`}>
        <p className={`text-xs font-medium ${isDark ? 'text-[#A1A1AA]' : 'text-[#78716C]'}`}>
          Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, transactions.length)} of {transactions.length} transactions
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`p-1.5 rounded-lg border transition-colors ${
              currentPage === 1
                ? isDark ? 'border-[#3F3F46] text-[#3F3F46] cursor-not-allowed' : 'border-[#E7E5E4] text-[#D6D3D1] cursor-not-allowed'
                : isDark ? 'border-[#52525B] text-[#FAFAFA] hover:bg-[#3F3F46]' : 'border-[#D6D3D1] text-[#1C0A00] hover:bg-[#F5F5F4]'
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          <span className={`text-xs font-semibold ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`p-1.5 rounded-lg border transition-colors ${
              currentPage === totalPages
                ? isDark ? 'border-[#3F3F46] text-[#3F3F46] cursor-not-allowed' : 'border-[#E7E5E4] text-[#D6D3D1] cursor-not-allowed'
                : isDark ? 'border-[#52525B] text-[#FAFAFA] hover:bg-[#3F3F46]' : 'border-[#D6D3D1] text-[#1C0A00] hover:bg-[#F5F5F4]'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  )
}
