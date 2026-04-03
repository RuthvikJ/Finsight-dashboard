// src/components/transactions/TransactionFilters.tsx

import { Search, X } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { CATEGORIES, MONTHS } from '../../data/mockData'

export default function TransactionFilters() {
  const { filters, setFilter, resetFilters, theme } = useStore()
  const isDark = theme === 'dark'

  const base = `text-xs rounded-lg border px-3 py-2 outline-none transition-all duration-150 ${isDark
      ? 'bg-[#27272A] border-[#3F3F46] text-[#FAFAFA] focus:border-[#EA580C]'
      : 'bg-white border-[#E7E5E4] text-[#1C0A00] focus:border-[#EA580C]'
    }`

  const hasActiveFilters =
    filters.search !== '' ||
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.month !== 'all'

  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'
          }`} />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
          className={`${base} w-full pl-8 pr-8`}
        />
        {filters.search && (
          <button
            onClick={() => setFilter('search', '')}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X size={12} className={isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'} />
          </button>
        )}
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Type */}
        <select
          value={filters.type}
          onChange={(e) => setFilter('type', e.target.value as any)}
          className={base}
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value as any)}
          className={base}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Month */}
        <select
          value={filters.month}
          onChange={(e) => setFilter('month', e.target.value)}
          className={base}
        >
          <option value="all">All months</option>
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
          className={base}
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
            className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all duration-150 ${isDark
                ? 'border-[#3F3F46] text-[#71717A] hover:text-[#EA580C] hover:border-[#EA580C]'
                : 'border-[#E7E5E4] text-[#A8A29E] hover:text-[#EA580C] hover:border-[#EA580C]'
              }`}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}