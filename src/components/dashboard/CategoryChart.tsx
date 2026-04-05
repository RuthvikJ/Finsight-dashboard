import { useStore } from '../../store/useStore'
import { getCategorySummaries } from '../../utils/finance'
import type { Transaction } from '../../types'
import HealthScore from './HealthScore'

interface Props {
  transactions: Transaction[]
}

const COLORS = [
  '#EA580C', // top 1
  '#F97316', // top 2
  '#FB923C', // top 3
  '#FDBA74', // top 4
  '#FED7AA', // top 5
  '#FFEDD5', // top 6
]

export default function CategoryChart({ transactions }: Props) {
  const { theme } = useStore()
  const isDark = theme === 'dark'
  
  const data = getCategorySummaries(transactions).slice(0, 5)

  // Attach transaction counts to each category manually since utility doesn't return count.
  const dataWithCount = data.map((d, i) => {
    const count = transactions.filter(t => t.type === 'expense' && t.category === d.category).length
    return { ...d, count, color: isDark && i > 2 ? '#52525B' : COLORS[i] || COLORS[0] }
  })

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`

  return (
    <div className={`rounded-[2rem] border p-6 md:p-8 flex flex-col gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] h-full ${
      isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'
    }`}>
      
      {/* Portfolio Breakdown Header */}
      <div>
        <h3 className={`text-lg font-bold tracking-tight mb-1 ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
          Portfolio breakdown
        </h3>
        <p className={`text-sm ${isDark ? 'text-[#A1A1AA]' : 'text-[#78716C]'}`}>
          Where your money is going
        </p>
      </div>
      
      {/* List */}
      <div className="flex flex-col gap-4">
        {dataWithCount.map((item) => (
          <div key={item.category} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <div>
                <p className={`text-sm font-semibold leading-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
                  {item.category}
                </p>
                <p className={`text-[10px] uppercase tracking-widest font-bold mt-0.5 ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`}>
                  {item.count} {item.count === 1 ? 'txn' : 'txns'}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`text-sm font-bold tabular-nums leading-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
                {formatCurrency(item.amount)}
              </p>
              <p className={`text-xs font-semibold tabular-nums mt-0.5 ${isDark ? 'text-[#A1A1AA]' : 'text-[#78716C]'}`}>
                {item.percentage}%
              </p>
            </div>
          </div>
        ))}
        {dataWithCount.length === 0 && (
          <p className={`text-sm py-4 text-center ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`}>
            No expenses found.
          </p>
        )}
      </div>

      <div className={`w-full h-px ${isDark ? 'bg-[#3F3F46]' : 'bg-[#F5F5F4]'}`} />

      {/* Health Score embedded */}
      <HealthScore transactions={transactions} />

    </div>
  )
}