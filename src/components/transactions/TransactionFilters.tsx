// src/components/transactions/TransactionFilters.tsx

import { Search, X, SlidersHorizontal } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { CATEGORIES, MONTHS } from '../../data/mockData'

export default function TransactionFilters() {
  const { filters, setFilter, resetFilters, theme } = useStore()
  const isDark = theme === 'dark'

  const base = `text-sm font-medium rounded-xl border px-3 py-2 outline-none max-w-full transition-all duration-200 ${isDark
      ? 'bg-[#1F1F22] border-[#3F3F46] text-[#FAFAFA] focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/20 focus:bg-[#27272A]'
      : 'bg-[#F5F5F4] border-transparent text-[#1C0A00] focus:border-[#EA580C] focus:bg-white focus:ring-4 focus:ring-[#FFEDD5]/50'
    }`

  const hasActiveFilters =
    filters.search !== '' ||
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.month !== 'all'

  return (
    <div className={`rounded-2xl border p-4 mb-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col gap-4 ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'}`}>
      
      <div className="flex items-center gap-2 mb-1">
        <SlidersHorizontal size={16} className={isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'} />
        <h3 className={`text-sm font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>Filter & Sort</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`} />
          <input
            type="text"
            placeholder="Search descriptions or notes..."
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            className={`${base} w-full pl-10 pr-10`}
          />
          {filters.search && (
            <button
              onClick={() => setFilter('search', '')}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${isDark ? 'hover:bg-[#3F3F46] text-[#A1A1AA]' : 'hover:bg-[#E7E5E4] text-[#A8A29E]'}`}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Type */}
          <select
            value={filters.type}
            onChange={(e) => setFilter('type', e.target.value as any)}
            className={`${base} flex-1 min-w-[110px] appearance-none`}
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category */}
          <select
            value={filters.category}
            onChange={(e) => setFilter('category', e.target.value as any)}
            className={`${base} flex-1 min-w-[130px] appearance-none`}
          >
            <option value="all">Categories</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Month */}
          <select
            value={filters.month}
            onChange={(e) => setFilter('month', e.target.value)}
            className={`${base} flex-1 min-w-[110px] appearance-none`}
          >
            <option value="all">All time</option>
            {MONTHS.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
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
            className={`${base} flex-1 min-w-[130px] appearance-none`}
          >
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="amount-desc">Highest amount</option>
            <option value="amount-asc">Lowest amount</option>
          </select>

          {/* Reset */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className={`text-sm font-bold px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap ${isDark
                  ? 'bg-[#3F3F46] text-[#FAFAFA] hover:bg-[#EA580C] hover:text-white'
                  : 'bg-[#F5F5F4] text-[#1C0A00] hover:bg-[#EA580C] hover:text-white hover:shadow-md'
                }`}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}