// src/components/layout/Sidebar.tsx

import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Lightbulb, X, Wallet } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatCurrency } from '../../utils/finance'

const primaryLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
]

interface Props {
  onClose?: () => void
  isMobile?: boolean
}

export default function Sidebar({ onClose, isMobile }: Props) {
  const theme = useStore((s) => s.theme)
  const txns = useStore((s) => s.transactions)
  const isDark = theme === 'dark'

  const income = txns.filter(t => t.type === 'income').reduce((s,t) => s+t.amount, 0)
  const expense = txns.filter(t => t.type === 'expense').reduce((s,t) => s+t.amount, 0)
  const netWorth = income - expense

  return (
    <div className={`group flex flex-col h-screen border-r py-8 shadow-[1px_0_15px_rgba(0,0,0,0.03)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative
      ${isMobile ? 'w-[260px]' : 'w-[72px] hover:w-[220px]'}
      ${isDark ? 'bg-[#121214] border-[#27272A]' : 'bg-[#FAFAFA] border-[#E5E7EB]'}`}>

      {/* Logo Area */}
      <div className={`flex items-center mb-10 h-10 px-4 ${isMobile ? 'justify-between' : 'justify-start'}`}>
        <div className={`flex items-center gap-3 overflow-hidden ${!isMobile && 'w-10'}`}>
          <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#EA580C] to-[#C2410C] flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
             <span className="text-white text-[17px] font-black leading-none pb-px tracking-wider">FS</span>
          </div>
          <span className={`text-[22px] font-bold tracking-tight whitespace-nowrap transition-opacity duration-300
            ${isMobile ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}
            ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
            Fin<span className="text-[#EA580C]">Sight</span>
          </span>
        </div>
        
        {isMobile && (
          <button onClick={onClose} className={`p-1.5 rounded-lg shrink-0 ${isDark ? 'text-[#A1A1AA] hover:bg-[#27272A]' : 'text-[#9CA3AF] hover:bg-[#E5E7EB]'}`}>
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-10 flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-2">
        
        {/* Main Nav */}
        <nav className="flex flex-col gap-1.5">
          {primaryLinks.map(({ to, label, icon: Icon }) => (
            <NavItem key={to} to={to} label={label} Icon={Icon} isMobile={isMobile} isDark={isDark} onClose={onClose} />
          ))}
        </nav>

      </div>

      {/* Net Worth Widget (Expanded Only) */}
      <div className={`mt-auto whitespace-nowrap overflow-hidden transition-all duration-300 px-4
        ${isMobile ? 'opacity-100 h-auto' : 'opacity-0 h-0 md:group-hover:opacity-100 md:group-hover:h-auto md:group-hover:mt-8'}`}>
        <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E5E7EB]'} shadow-sm`}>
          <div className="flex items-center justify-between mb-3">
             <div className={`p-1.5 rounded-lg ${isDark ? 'bg-[#EA580C]/20 text-[#EA580C]' : 'bg-orange-50 text-orange-600'}`}>
                <Wallet size={16} />
             </div>
             <span className={`text-[11px] font-bold tracking-widest uppercase ${isDark ? 'text-[#71717A]' : 'text-[#9CA3AF]'}`}>Net Worth</span>
          </div>
          <div className={`text-xl font-bold tracking-tight tabular-nums ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
            {formatCurrency(netWorth)}
          </div>
        </div>
      </div>

    </div>
  )
}

function NavItem({ to, label, Icon, isMobile, isDark, onClose }: any) {
  return (
    <NavLink
      to={to}
      onClick={isMobile ? onClose : undefined}
      className={({ isActive }) =>
        `flex items-center rounded-xl transition-all duration-300 relative overflow-hidden group/nav h-12 w-full
        ${isActive
          ? isDark 
            ? 'bg-[#27272A] text-[#FAFAFA]' 
            : 'bg-white shadow-sm border border-[#E5E7EB] text-[#111827]'
          : isDark 
            ? 'text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA]' 
            : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 transition-all duration-300 rounded-r-full
            ${isActive ? 'bg-[#EA580C] opacity-100' : 'opacity-0'}`} />
          
          <div className="w-[56px] h-full flex items-center justify-center shrink-0 ml-0.5">
            <Icon
              size={22}
              className={`transition-colors ${isActive ? 'text-[#EA580C]' : 'text-inherit'}`}
              strokeWidth={isActive ? 2.5 : 2}
            />
          </div>
          
          <span className={`whitespace-nowrap transition-all duration-300 text-[15px]
            ${isActive ? 'font-bold' : 'font-semibold'}
            ${isMobile ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3 md:group-hover:opacity-100 md:group-hover:translate-x-0'}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  )
}