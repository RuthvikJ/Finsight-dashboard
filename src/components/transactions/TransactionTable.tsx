// src/components/transactions/TransactionTable.tsx

import { useState, useEffect } from 'react'
import { Pencil, Trash2, Receipt, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Tag } from 'lucide-react'
import { useStore, useFilteredTransactions } from '../../store/useStore'
import { formatCurrency, formatDate } from '../../utils/finance'
import type { Transaction } from '../../types'

interface Props {
  onEdit: (t: Transaction) => void
}

// Mock status — derive from amount & type for demo purposes
function deriveStatus(t: Transaction): 'Completed' | 'Pending' {
  const day = new Date(t.date).getDate()
  return (day % 7 === 0) ? 'Pending' : 'Completed'
}

export default function TransactionTable({ onEdit }: Props) {
  const { role, theme, deleteTransaction } = useStore()
  const transactions = useFilteredTransactions()
  const isDark = theme === 'dark'
  const isAdmin = role === 'admin'

  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  useEffect(() => { setCurrentPage(1) }, [transactions.length])

  const totalPages = Math.max(1, Math.ceil(transactions.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginated = transactions.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const th = `text-[10.5px] font-black uppercase tracking-[0.1em] px-5 py-4 text-left whitespace-nowrap
    ${isDark ? 'text-[#334155]' : 'text-[#94A3B8]'}`

  if (transactions.length === 0) {
    return (
      <div className={`rounded-2xl border flex flex-col items-center justify-center py-24 gap-4 mt-3
        ${isDark ? 'bg-[#13131A] border-[#1E1E2E]' : 'bg-white border-[#E2E8F0]'}`}>
        <Receipt size={44} className={isDark ? 'text-[#1E293B]' : 'text-[#E2E8F0]'} />
        <p className={`text-[14px] font-bold ${isDark ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
          No transactions found
        </p>
        <p className={`text-[12px] font-medium ${isDark ? 'text-[#1E293B]' : 'text-[#E2E8F0]'}`}>
          Try adjusting your filters
        </p>
      </div>
    )
  }

  return (
    <>
      {/* ── Desktop Table ──────────────────────────────────────── */}
      <div className={`hidden md:block rounded-2xl border overflow-hidden mt-3 min-h-[520px] flex flex-col transition-all duration-300
        ${isDark
          ? 'bg-[#13131A] border-[#1E1E2E] hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
          : 'bg-white border-[#E2E8F0] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
        }`}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            {/* Head */}
            <thead className={`border-b ${isDark ? 'bg-[#0F0F12] border-[#1E1E2E]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
              <tr>
                <th className={th}>Date</th>
                <th className={th}>Description</th>
                <th className={th}>Category</th>
                <th className={th}>Type</th>
                <th className={th}>Status</th>
                <th className={`${th} text-right pr-5`}>Amount</th>
                {isAdmin && <th className={`${th} text-center`}>Actions</th>}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {paginated.map((t) => {
                const status = deriveStatus(t)
                const rowBorder = isDark ? 'border-[#1A1A24]' : 'border-[#F8FAFC]'
                const rowHover = isDark ? 'hover:bg-[#1A1A24]' : 'hover:bg-[#F8FAFC]'

                return (
                  <tr
                    key={t.id}
                    className={`border-b last:border-0 group transition-colors duration-150 ${rowBorder} ${rowHover}`}
                  >
                    {/* Date */}
                    <td className={`px-5 py-4 text-[12px] font-semibold whitespace-nowrap min-w-[130px]
                      ${isDark ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
                      {formatDate(t.date)}
                    </td>

                    {/* Description */}
                    <td className={`px-5 py-4 text-[13px] font-bold min-w-[200px] max-w-[280px] truncate
                      ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
                      {t.description}
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 min-w-[150px]">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap
                        ${isDark ? 'bg-[#1E293B] text-[#94A3B8]' : 'bg-[#F1F5F9] text-[#475569]'}`}>
                        <Tag size={11} className="opacity-70" />
                        {t.category}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4 min-w-[120px]">
                      {t.type === 'income' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/10 text-emerald-500 whitespace-nowrap">
                          <TrendingUp size={12} strokeWidth={2.5} />
                          Income
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-orange-500/10 text-orange-500 whitespace-nowrap">
                          <TrendingDown size={12} strokeWidth={2.5} />
                          Expense
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 min-w-[110px]">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-black whitespace-nowrap
                        ${status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-amber-500/10 text-amber-500'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        {status}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className={`py-4 px-5 min-w-[140px] text-right text-[13px] font-black whitespace-nowrap tabular-nums
                      ${t.type === 'income'
                        ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                        : isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'
                      }`}>
                      {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
                    </td>

                    {/* Actions — admin only */}
                    {isAdmin && (
                      <td className="px-5 py-4 text-center min-w-[100px]">
                        <div className="flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-150">
                          <button
                            onClick={() => onEdit(t)}
                            className={`p-1.5 rounded-lg transition-colors border
                              ${isDark
                                ? 'border-[#1E293B] hover:bg-[#1E293B] text-[#475569] hover:text-[#94A3B8]'
                                : 'border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#94A3B8] hover:text-[#475569]'
                              }`}
                            title="Edit"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => deleteTransaction(t.id)}
                            className="p-1.5 rounded-lg transition-colors border border-red-500/20 hover:bg-red-500/10 text-red-500"
                            title="Delete"
                          >
                            <Trash2 size={13} />
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
      </div>

      {/* ── Mobile Cards ──────────────────────────────────────── */}
      <div className="flex flex-col gap-3 md:hidden mt-3">
        {paginated.map((t) => {
          const status = deriveStatus(t)
          return (
            <div
              key={t.id}
              className={`rounded-2xl border p-4 flex flex-col gap-3
                ${isDark ? 'bg-[#13131A] border-[#1E1E2E]' : 'bg-white border-[#E2E8F0]'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-bold ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
                    {t.description}
                  </p>
                  <p className={`text-[11px] mt-0.5 font-medium ${isDark ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>
                    {formatDate(t.date)} · {t.category}
                  </p>
                </div>
                <span className={`text-[13px] font-black tabular-nums shrink-0
                  ${t.type === 'income'
                    ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                    : isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'
                  }`}>
                  {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
                </span>
              </div>

              <div className={`flex items-center justify-between pt-2 border-t
                ${isDark ? 'border-[#1E1E2E]' : 'border-[#F1F5F9]'}`}>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black
                    ${status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    {status}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black
                    ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                    {t.type === 'income' ? 'Income' : 'Expense'}
                  </span>
                </div>

                {isAdmin && (
                  <div className="flex gap-1.5">
                    <button onClick={() => onEdit(t)} className={`p-1.5 border rounded-lg ${isDark ? 'border-[#1E293B] text-[#475569]' : 'border-[#E2E8F0] text-[#94A3B8]'}`}>
                      <Pencil size={12} />
                    </button>
                    <button onClick={() => deleteTransaction(t.id)} className="p-1.5 border border-red-500/20 rounded-lg text-red-500">
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Pagination ────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-5 px-1">
          <span className={`text-[12px] font-semibold ${isDark ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>
            Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, transactions.length)} of {transactions.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[12px] font-bold transition-all duration-200
                ${currentPage === 1
                  ? 'opacity-40 cursor-not-allowed'
                  : isDark ? 'border-[#1E293B] text-[#94A3B8] hover:bg-[#1A1A24]' : 'border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'
                }`}
            >
              <ChevronLeft size={14} /> Prev
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-[12px] font-bold transition-all duration-200
                      ${currentPage === page
                        ? 'bg-[#F97316] text-white shadow-sm shadow-orange-500/30'
                        : isDark
                          ? 'text-[#475569] hover:bg-[#1A1A24]'
                          : 'text-[#94A3B8] hover:bg-[#F1F5F9]'
                      }`}
                  >
                    {page}
                  </button>
                )
              })}
              {totalPages > 5 && (
                <span className={`text-[12px] font-bold ${isDark ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                  …{totalPages}
                </span>
              )}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[12px] font-bold transition-all duration-200
                ${currentPage === totalPages
                  ? 'opacity-40 cursor-not-allowed'
                  : isDark ? 'border-[#1E293B] text-[#94A3B8] hover:bg-[#1A1A24]' : 'border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'
                }`}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
