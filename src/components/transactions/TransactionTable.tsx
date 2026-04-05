// src/components/transactions/TransactionTable.tsx

import { useState, useEffect } from 'react'
import { Pencil, Trash2, Receipt, ChevronLeft, ChevronRight, Activity, TrendingUp, TrendingDown } from 'lucide-react'
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
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    setCurrentPage(1)
  }, [transactions.length])

  const totalPages = Math.max(1, Math.ceil(transactions.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentTransactions = transactions.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // ── Empty state ───────────────────────────────────────────────
  if (transactions.length === 0) {
    return (
      <div className={`rounded-2xl border flex flex-col items-center justify-center py-24 gap-4 mt-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] ${
        isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E5E7EB]'
      }`}>
        <Receipt size={48} className={isDark ? 'text-[#3F3F46]' : 'text-[#D1D5DB]'} />
        <p className={`text-base font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#4B5563]'}`}>
          No transactions found
        </p>
      </div>
    )
  }

  // ── Shared column header style ────────────────────────────────
  const th = `text-[11px] font-bold uppercase tracking-widest px-6 py-5 text-left whitespace-nowrap ${
    isDark ? 'text-[#71717A]' : 'text-[#6B7280]'
  }`

  return (
    <>
      {/* ── Desktop table (md+) ──────────────────────────────── */}
      <div className={`hidden md:block rounded-2xl border overflow-hidden transition-all shadow-[0_4px_12px_rgba(0,0,0,0.02)] mt-2 ${
        isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E5E7EB]'
      }`}>
        <div className="overflow-x-auto scollbar-none">
          <table className="w-full border-collapse">
            <thead className={`${isDark ? 'bg-[#18181B]' : 'bg-gray-50'} border-b ${isDark ? 'border-[#27272A]' : 'border-[#E5E7EB]'}`}>
              <tr>
                <th className={th}>Date</th>
                <th className={th}>Description</th>
                <th className={th}>Category</th>
                <th className={th}>Type</th>
                <th className={`${th} text-right pr-6 md:pr-8`}>Amount</th>
                {isAdmin && <th className={`${th} text-center`}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((t) => {
                const borderClass = isDark ? 'border-[#27272A]' : 'border-[#F3F4F6]'
                const rowBgHover = isDark ? 'hover:bg-[#27272A]/50 transition-colors duration-200' : 'hover:bg-[#F9FAFB] transition-colors duration-200'

                return (
                  <tr
                    key={t.id}
                    className={`border-b last:border-0 group ${borderClass} ${rowBgHover}`}
                  >
                    {/* Date */}
                    <td className={`px-6 py-5 text-sm font-semibold whitespace-nowrap min-w-[140px] ${
                      isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'
                    }`}>
                      {formatDate(t.date)}
                    </td>

                    {/* Description */}
                    <td className={`px-6 py-5 text-[15px] font-bold min-w-[220px] tracking-tight ${
                      isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'
                    }`}>
                      {t.description}
                    </td>

                    {/* Category */}
                    <td className="px-6 py-5 min-w-[160px]">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold whitespace-nowrap ${
                        isDark 
                          ? 'bg-[#3F3F46]/50 text-[#D4D4D8]' 
                          : 'bg-[#F3F4F6] text-[#4B5563]'
                      }`}>
                        <Activity size={14} className={isDark ? 'text-[#A1A1AA]' : 'text-[#9CA3AF]'} />
                        {t.category}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-5 min-w-[140px]">
                      {t.type === 'income' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold bg-emerald-500/10 text-emerald-500 whitespace-nowrap">
                          <TrendingUp size={14} strokeWidth={2.5} /> Income
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold bg-red-500/10 text-red-500 whitespace-nowrap">
                          <TrendingDown size={14} strokeWidth={2.5} /> Expense
                        </span>
                      )}
                    </td>

                    {/* Amount */}
                    <td className={`py-5 pl-6 pr-6 md:pr-8 min-w-[160px] text-right text-[15px] font-bold whitespace-nowrap tabular-nums ${
                      t.type === 'income' ? (isDark ? 'text-[#10B981]' : 'text-[#059669]') : (isDark ? 'text-[#FAFAFA]' : 'text-[#111827]')
                    }`}>
                      {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
                    </td>

                    {/* Actions — admin only */}
                    {isAdmin && (
                      <td className="px-6 py-5 text-center min-w-[120px]">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <button
                            onClick={() => onEdit(t)}
                            className={`p-2 rounded-lg transition-colors border ${
                              isDark
                                ? 'border-[#3F3F46] bg-transparent hover:bg-[#3F3F46] text-[#A1A1AA]'
                                : 'border-[#E5E7EB] bg-transparent hover:bg-[#E5E7EB] text-[#6B7280]'
                            }`}
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => deleteTransaction(t.id)}
                            className={`p-2 rounded-lg transition-colors border ${
                              isDark
                                ? 'border-[#EF4444]/20 bg-transparent hover:bg-[#EF4444]/20 text-[#EF4444]'
                                : 'border-[#EF4444]/20 bg-transparent hover:bg-[#EF4444]/10 text-[#EF4444]'
                            }`}
                            title="Delete"
                          >
                            <Trash2 size={15} />
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

      {/* ── Mobile cards (below md) ──────────────────────────── */}
      <div className="flex flex-col gap-4 md:hidden mt-2">
        {currentTransactions.map((t) => (
          <div
            key={t.id}
            className={`relative overflow-hidden rounded-2xl border p-5 flex flex-col gap-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] ${
              isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E5E7EB]'
            }`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className={`text-[15px] font-bold tracking-tight ${
                  isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'
                }`}>
                  {t.description}
                </p>
                <div className={`text-xs mt-1.5 font-medium ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}>
                  {formatDate(t.date)}
                </div>
              </div>
              <span className={`text-[16px] font-bold whitespace-nowrap tabular-nums ${
                t.type === 'income' ? (isDark ? 'text-[#10B981]' : 'text-[#059669]') : (isDark ? 'text-[#FAFAFA]' : 'text-[#111827]')
              }`}>
                {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
              </span>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between mt-1 pt-3 border-t dark:border-[#27272A] border-[#F3F4F6]">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase ${
                isDark ? 'bg-[#3F3F46]/50 text-[#D4D4D8]' : 'bg-[#F3F4F6] text-[#4B5563]'
              }`}>
                <Activity size={12} /> {t.category}
              </span>

              {isAdmin && (
                <div className="flex gap-2">
                  <button onClick={() => onEdit(t)} className="p-2 border rounded-lg dark:border-[#3F3F46] border-[#E5E7EB] text-[#6B7280] dark:text-[#A1A1AA]">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => deleteTransaction(t.id)} className="p-2 border rounded-lg dark:border-[#EF4444]/20 border-[#EF4444]/20 text-[#EF4444]">
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Pagination Footer ──────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6 mb-8">
           <button
             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
             disabled={currentPage === 1}
             className={`p-2.5 rounded-xl border transition-all ${
               currentPage === 1
                 ? isDark ? 'border-[#27272A] text-[#3F3F46] opacity-50' : 'border-[#E5E7EB] text-[#D1D5DB] opacity-50'
                 : isDark ? 'border-[#3F3F46] text-[#A1A1AA] hover:bg-[#27272A]' : 'border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]'
             }`}
           >
             <ChevronLeft size={18} />
           </button>
           <span className={`text-[14px] font-bold w-24 text-center ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
              Page {currentPage} of {totalPages}
           </span>
           <button
             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
             disabled={currentPage === totalPages}
             className={`p-2.5 rounded-xl border transition-all ${
               currentPage === totalPages
                 ? isDark ? 'border-[#27272A] text-[#3F3F46] opacity-50' : 'border-[#E5E7EB] text-[#D1D5DB] opacity-50'
                 : isDark ? 'border-[#3F3F46] text-[#A1A1AA] hover:bg-[#27272A]' : 'border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]'
             }`}
           >
             <ChevronRight size={18} />
           </button>
        </div>
      )}
    </>
  )
}
