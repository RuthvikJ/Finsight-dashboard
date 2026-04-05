// src/components/transactions/TransactionFilters.tsx

import { Search, Plus } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { CATEGORIES } from '../../data/mockData'

interface Props {
  onAddTransaction: () => void
}

export default function TransactionFilters({ onAddTransaction }: Props) {
  const { filters, setFilter, theme, role } = useStore()
  const isDark = theme === 'dark'
  const isAdmin = role === 'admin'

  const baseSelect = `text-sm font-semibold rounded-xl border px-3 py-2.5 outline-none transition-all duration-200 cursor-pointer appearance-none ${isDark
      ? 'bg-[#1F1F22] border-[#3F3F46] text-[#A1A1AA] hover:bg-[#27272A] focus:border-[#047857]'
      : 'bg-white border-[#E7E5E4] text-[#57534E] hover:bg-[#F5F5F4] focus:border-[#047857]'
    }`

  return (
    <div className="flex flex-col xl:flex-row items-center gap-3 w-full">
      
      {/* Search Input */}
      <div className="relative flex-1 w-full min-w-[200px]">
        <Search size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`} />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 text-sm font-semibold rounded-xl border outline-none transition-all duration-200 ${
            isDark 
              ? 'bg-[#1F1F22] border-[#3F3F46] text-[#FAFAFA] focus:border-[#047857] placeholder:text-[#71717A]' 
              : 'bg-white border-[#E7E5E4] text-[#1C0A00] focus:border-[#047857] placeholder:text-[#A8A29E]'
          }`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
        {/* Type Filter */}
        <select
          value={filters.type}
          onChange={(e) => setFilter('type', e.target.value as any)}
          className={`${baseSelect} flex-1 min-w-[120px]`}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value as any)}
          className={`${baseSelect} flex-1 min-w-[140px]`}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Page Size Split (Mock logic since store doesn't handle page size directly yet) */}
        <div className={`hidden sm:flex text-sm font-semibold rounded-xl border px-3 py-2.5 items-center gap-2 ${
          isDark ? 'bg-[#1F1F22] border-[#3F3F46] text-[#A1A1AA]' : 'bg-white border-[#E7E5E4] text-[#57534E]'
        }`}>
          <span>10 / page</span>
          <span className="text-[10px]">▼</span>
        </div>

        {/* Add Transaction Button */}
        {isAdmin && (
          <button
            onClick={onAddTransaction}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95 shrink-0 ml-auto xl:ml-0"
            style={{ 
              background: isDark ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
              boxShadow: isDark ? '0 4px 12px rgba(16,185,129,0.3)' : '0 4px 12px rgba(16,185,129,0.2)'
            }}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">Add Transaction</span>
          </button>
        )}
      </div>

    </div>
  )
}