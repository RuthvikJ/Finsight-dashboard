// src/components/dashboard/HealthScore.tsx

import { useStore } from '../../store/useStore'
import { getFinancialHealth, getTotalIncome, getTotalExpenses } from '../../utils/finance'
import type { Transaction } from '../../types'

interface Props {
  transactions: Transaction[]
}

export default function HealthScore({ transactions }: Props) {
  const { theme } = useStore()
  const isDark = theme === 'dark'
  
  const health = getFinancialHealth(transactions)
  
  const income = getTotalIncome(transactions)
  const expenses = getTotalExpenses(transactions)
  
  // Simulated exposure metrics mimicking the Image 2 breakdown references implicitly linked to Health
  const stableBalance = income - expenses
  const volatileExposure = expenses * 0.4
  const stakedValue = income > 0 ? income * 0.15 : 0

  const cardBg = isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E5E7EB]'

  return (
    <div className={`rounded-3xl border p-6 md:p-8 flex flex-col w-full ${cardBg} shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300 min-h-[460px]`}>
      
      <div className="flex items-center justify-between mb-8">
        <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
          Portfolio Breakdown
        </h3>
        <button className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-[#27272A] text-[#52525B]' : 'hover:bg-[#F3F4F6] text-[#9CA3AF]'}`}>
           <span className="text-[14px] font-bold tracking-widest leading-none pb-1">...</span>
        </button>
      </div>

      <div className="flex flex-col gap-5 flex-1">
        
        {/* Metric 1 */}
        <div className="flex items-center justify-between group">
           <div className="flex flex-col gap-0.5">
             <span className={`text-[14px] font-bold ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>Risk Asset Exposure</span>
             <span className={`text-[12px] font-medium leading-tight ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'}`}>Volatile assets • Market sensitivity</span>
           </div>
           <div className="flex flex-col items-end gap-0.5">
             <span className={`text-[15px] font-bold tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>₹{(volatileExposure / 1000).toFixed(1)}k</span>
             <span className="text-[11px] font-bold text-[#10B981] flex items-center gap-0.5">▲ 25.6%</span>
           </div>
        </div>
        
        <div className={`w-full h-px ${isDark ? 'bg-[#27272A]' : 'bg-[#F3F4F6]'}`} />

        {/* Metric 2 */}
        <div className="flex items-center justify-between group">
           <div className="flex flex-col gap-0.5">
             <span className={`text-[14px] font-bold ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>Total Value Staked</span>
             <span className={`text-[12px] font-medium leading-tight ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'}`}>Locked value across networks</span>
           </div>
           <div className="flex flex-col items-end gap-0.5">
             <span className={`text-[15px] font-bold tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>₹{(stakedValue / 1000).toFixed(1)}k</span>
             <span className="text-[11px] font-bold text-[#EF4444] flex items-center gap-0.5">▼ 10.9%</span>
           </div>
        </div>

        <div className={`w-full h-px ${isDark ? 'bg-[#27272A]' : 'bg-[#F3F4F6]'}`} />

        {/* Metric 3 */}
        <div className="flex items-center justify-between group">
           <div className="flex flex-col gap-0.5">
             <span className={`text-[14px] font-bold ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>Stable Reserve Balance</span>
             <span className={`text-[12px] font-medium leading-tight ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'}`}>Liquidity buffer • On-chain reserves</span>
           </div>
           <div className="flex flex-col items-end gap-0.5">
             <span className={`text-[15px] font-bold tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>₹{(stableBalance / 1000).toFixed(1)}k</span>
             <span className="text-[11px] font-bold text-[#10B981] flex items-center gap-0.5">▲ 12.3%</span>
           </div>
        </div>

      </div>

      {/* Radial Health Ring - Following Image 2 layout */}
      <div className="relative flex justify-center items-end mt-8">
         <svg width="240" height="130" viewBox="0 0 240 130" className="overflow-visible">
            {/* Outer Arc (Yellow) */}
            <path d="M 30,120 A 90,90 0 0,1 210,120" fill="none" stroke="#EAB308" strokeWidth="6" strokeLinecap="round" />
            
            {/* Inner Arc (Purple-ish offset) */}
            <path d="M 50,120 A 70,70 0 0,1 190,120" fill="none" stroke={isDark ? '#3F3F46' : '#E5E7EB'} strokeWidth="24" strokeLinecap="round" />
            
            {/* Main Progress Arc (Green) */}
            <path 
               d="M 50,120 A 70,70 0 0,1 190,120" 
               fill="none" 
               stroke="#10B981" 
               strokeWidth="24" 
               strokeLinecap="round" 
               strokeDasharray="220" 
               strokeDashoffset={220 - (220 * (health.score / 100))}
               style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
            
            {/* Accent Arc (Purple tail) overlay */}
            <path 
               d="M 160,50 A 70,70 0 0,1 190,120" 
               fill="none" 
               stroke="#8B5CF6" 
               strokeWidth="6" 
               strokeLinecap="round" 
            />
         </svg>

         <div className="absolute bottom-0 w-full flex flex-col items-center">
            <span className={`text-[36px] font-black tabular-nums tracking-tighter leading-none ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
              {health.score}%
            </span>
            <span className={`mt-2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-[#10B981]/15 text-[#10B981]' : 'border border-[#10B981]/20 bg-emerald-50 text-emerald-600'}`}>
              Health Score
            </span>
         </div>
      </div>

    </div>
  )
}