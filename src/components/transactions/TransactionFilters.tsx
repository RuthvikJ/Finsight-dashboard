// src/components/transactions/TransactionFilters.tsx

import { Search, Plus, Filter } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { CATEGORIES } from '../../data/mockData'

interface Props {
  onAddTransaction: () => void
}

export default function TransactionFilters({ onAddTransaction }: Props) {
  const { filters, setFilter, theme, role } = useStore()
  const isDark = theme === 'dark'
  const isAdmin = role === 'admin'

  const selectBase = `text-[12.5px] font-semibold rounded-xl border px-3 py-2.5 outline-none transition-all duration-200 cursor-pointer appearance-none
    ${isDark
      ? 'bg-[#1A1A24] border-[#1E293B] text-[#94A3B8] hover:border-[#334155] focus:border-[#F97316]/50'
      : 'bg-white border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1] focus:border-[#F97316]/50'
    }`

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">

      {/* Search */}
      <div className="relative flex-1 min-w-[180px]">
        <Search
          size={15}
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none
            ${isDark ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}
        />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 text-[12.5px] font-semibold rounded-xl border outline-none transition-all duration-200
            ${isDark
              ? 'bg-[#1A1A24] border-[#1E293B] text-[#F1F5F9] placeholder:text-[#1E293B] focus:border-[#F97316]/50'
              : 'bg-white border-[#E2E8F0] text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#F97316]/50'
            }`}
        />
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">

        {/* Filter icon label (decorative) */}
        <div className={`hidden sm:flex items-center gap-1.5 text-[11px] font-bold shrink-0
          ${isDark ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
          <Filter size={13} />
          Filters:
        </div>

        {/* Type */}
        <select
          value={filters.type}
          onChange={(e) => setFilter('type', e.target.value as any)}
          className={`${selectBase} min-w-[110px]`}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value as any)}
          className={`${selectBase} min-w-[140px]`}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={`${filters.sortField}-${filters.sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split('-')
            setFilter('sortField', field as any)
            setFilter('sortOrder', order as any)
          }}
          className={`${selectBase} min-w-[130px] hidden sm:block`}
        >
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="amount-desc">Amount (High)</option>
          <option value="amount-asc">Amount (Low)</option>
        </select>

        {/* Add Transaction — Admin only */}
        {isAdmin && (
          <button
            onClick={onAddTransaction}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[12.5px] font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95 shrink-0 shadow-md shadow-orange-500/20"
            style={{
              background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
            }}
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Add Transaction</span>
          </button>
        )}
      </div>
    </div>
  )
}