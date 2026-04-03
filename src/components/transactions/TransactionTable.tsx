// src/components/transactions/TransactionTable.tsx

import { Pencil, Trash2, Receipt } from 'lucide-react'
import { useStore, useFilteredTransactions } from '../../store/useStore'
import { formatCurrency, formatDate } from '../../utils/finance'
import type { Transaction } from '../../types'
import Badge from '../ui/Badge'

interface Props {
  onEdit: (t: Transaction) => void
}

export default function TransactionTable({ onEdit }: Props) {
  const { role, theme, deleteTransaction } = useStore()
  const transactions = useFilteredTransactions()
  const isDark = theme === 'dark'
  const isAdmin = role === 'admin'

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
  const th = `text-xs font-semibold uppercase tracking-wide px-4 py-3 text-left ${
    isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'
  }`

  return (
    <>
      {/* ── Desktop table (md+) ──────────────────────────────── */}
      <div className={`hidden md:block rounded-xl border overflow-hidden ${
        isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'
      }`}>
        <table className="w-full border-collapse">
          <thead>
            <tr className={`border-b ${isDark ? 'border-[#3F3F46]' : 'border-[#E7E5E4]'}`}>
              <th className={th}>Date</th>
              <th className={th}>Description</th>
              <th className={th}>Category</th>
              <th className={th}>Type</th>
              <th className={`${th} text-right`}>Amount</th>
              {isAdmin && <th className={`${th} text-center`}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => {
              const isOdd = i % 2 === 0
              const rowBg = isOdd
                ? isDark ? 'bg-[#27272A]' : 'bg-white'
                : isDark ? 'bg-[#232326]' : 'bg-[#FAFAF9]'

              return (
                <tr
                  key={t.id}
                  className={`border-b transition-colors duration-100 group ${rowBg} ${
                    isDark
                      ? 'border-[#3F3F46] hover:bg-[#2F2F33]'
                      : 'border-[#F5F5F4] hover:bg-[#FFF7ED]'
                  }`}
                >
                  {/* Date */}
                  <td className={`px-4 py-3 text-xs whitespace-nowrap ${
                    isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'
                  }`}>
                    {formatDate(t.date)}
                  </td>

                  {/* Description */}
                  <td className={`px-4 py-3 text-sm font-medium max-w-[200px] truncate ${
                    isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'
                  }`}>
                    {t.description}
                    {t.note && (
                      <span className={`ml-1.5 text-xs font-normal ${
                        isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'
                      }`}>
                        · {t.note}
                      </span>
                    )}
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3">
                    <Badge label={t.category} variant="category" />
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3">
                    <Badge
                      label={t.type === 'income' ? 'Income' : 'Expense'}
                      variant={t.type}
                    />
                  </td>

                  {/* Amount */}
                  <td className={`px-4 py-3 text-sm font-semibold text-right tabular-nums ${
                    t.type === 'income' ? 'text-[#16A34A]' : 'text-[#DC2626]'
                  }`}>
                    {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
                  </td>

                  {/* Actions — admin only */}
                  {isAdmin && (
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button
                          onClick={() => onEdit(t)}
                          className={`p-1.5 rounded-lg transition-colors duration-150 ${
                            isDark
                              ? 'hover:bg-[#3F3F46] text-[#71717A] hover:text-[#FAFAFA]'
                              : 'hover:bg-[#F5F5F4] text-[#A8A29E] hover:text-[#1C0A00]'
                          }`}
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className="p-1.5 rounded-lg text-[#A8A29E] hover:bg-red-50 hover:text-[#DC2626] transition-colors duration-150"
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

      {/* ── Mobile cards (below md) ──────────────────────────── */}
      <div className="flex flex-col gap-2 md:hidden">
        {transactions.map((t) => (
          <div
            key={t.id}
            className={`rounded-xl border p-3 flex flex-col gap-2 ${
              isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'
            }`}
          >
            {/* Top row: description + amount */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${
                  isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'
                }`}>
                  {t.description}
                </p>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>
                  {formatDate(t.date)}
                </p>
              </div>
              <span className={`text-sm font-bold tabular-nums shrink-0 ${
                t.type === 'income' ? 'text-[#16A34A]' : 'text-[#DC2626]'
              }`}>
                {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
              </span>
            </div>

            {/* Bottom row: badges + actions */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge label={t.category} variant="category" />
                <Badge
                  label={t.type === 'income' ? 'Income' : 'Expense'}
                  variant={t.type}
                />
              </div>

              {isAdmin && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(t)}
                    className={`p-1 rounded-lg transition-colors duration-150 ${
                      isDark
                        ? 'text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#3F3F46]'
                        : 'text-[#A8A29E] hover:text-[#1C0A00] hover:bg-[#F5F5F4]'
                    }`}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="p-1 rounded-lg text-[#A8A29E] hover:bg-red-50 hover:text-[#DC2626] transition-colors duration-150"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
