// src/components/layout/Sidebar.tsx

import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  TrendingUp,
  BarChart3,
  X,
  ChevronRight,
} from 'lucide-react'
import { useStore } from '../../store/useStore'

interface Props {
  isCollapsed: boolean
  onToggle: () => void
  isMobile?: boolean
  onClose?: () => void
}

export default function Sidebar({ isCollapsed, onToggle, isMobile, onClose }: Props) {
  const theme = useStore((s) => s.theme)
  const isDark = theme === 'dark'

  const collapsed = isMobile ? false : isCollapsed

  const bg = isDark
    ? 'bg-[#13131A] border-[#1E1E2E]'
    : 'bg-[#FFFFFF] border-[#E2E8F0]'

  const width = collapsed ? 'w-[72px]' : 'w-[240px]'

  return (
    <div
      className={`flex flex-col h-screen border-r transition-[width] duration-300 ease-in-out relative shrink-0 overflow-hidden
        ${bg} ${isMobile ? 'w-[240px]' : width}`}
    >

      {/* ── Logo ─────────────────────────────────── */}
      <div className={`flex items-center h-[68px] px-4 border-b shrink-0
        ${isDark ? 'border-[#1E1E2E]' : 'border-[#E2E8F0]'}`}>
        <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#F97316] to-[#C2410C] flex items-center justify-center shadow-lg shadow-orange-500/25 shrink-0">
          <span className="text-white text-[14px] font-black leading-none tracking-wider">FS</span>
        </div>
        <div className={`ml-3 flex flex-col overflow-hidden transition-all duration-300
          ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
          <span className={`text-[18px] font-bold tracking-tight whitespace-nowrap
            ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
            Fin<span className="text-[#F97316]">Sight</span>
          </span>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className={`ml-auto p-1.5 rounded-lg shrink-0
              ${isDark ? 'text-[#64748B] hover:bg-[#1E293B]' : 'text-[#94A3B8] hover:bg-[#F1F5F9]'}`}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* ── Admin Profile ────────────────────────── */}
      <div className={`flex items-center gap-3 px-4 py-4 mt-2 mx-2 rounded-xl shrink-0
        ${isDark ? 'bg-[#1A1A24]' : 'bg-[#F8FAFC]'}`}>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
          <span className="text-white text-[12px] font-black tracking-widest">AD</span>
        </div>
        <div className={`flex flex-col min-w-0 overflow-hidden transition-all duration-300
          ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
          <span className={`text-[13px] font-bold whitespace-nowrap truncate
            ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>Admin User</span>
          <span className={`text-[11px] font-medium whitespace-nowrap
            ${isDark ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>Administrator</span>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────── */}
      <nav className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 scrollbar-none mt-1">

        {/* Dashboard */}
        <NavItem to="/dashboard" label="Dashboard" Icon={LayoutDashboard}
          collapsed={collapsed} isDark={isDark} isMobile={isMobile} onClose={onClose} />

        {/* Data group */}
        <div className="mt-4 mb-1">
          {!collapsed ? (
            <div className="px-3 py-1.5">
              <span className={`text-[10px] font-black uppercase tracking-[0.12em]
                ${isDark ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>Data</span>
            </div>
          ) : (
            <div className={`mx-2 h-px my-2 ${isDark ? 'bg-[#1E293B]' : 'bg-[#E2E8F0]'}`} />
          )}
          <NavItem to="/transactions" label="Transactions" Icon={ArrowLeftRight}
            collapsed={collapsed} isDark={isDark} isMobile={isMobile} onClose={onClose} />
          <NavItem to="/reports" label="Reports" Icon={BarChart3}
            collapsed={collapsed} isDark={isDark} isMobile={isMobile} onClose={onClose} />
        </div>

        {/* Insights — standalone */}
        <div className="mt-4">
          <NavItem to="/insights" label="Insights" Icon={Lightbulb}
            collapsed={collapsed} isDark={isDark} isMobile={isMobile} onClose={onClose} />
        </div>

        {/* Live Market — standalone */}
        <div className="mt-1">
          <NavItem to="/market" label="Live Market" Icon={TrendingUp}
            collapsed={collapsed} isDark={isDark} isMobile={isMobile} onClose={onClose} />
        </div>

      </nav>

      {/* ── Bottom: Status ───────────────────────── */}
      <div className={`px-4 py-4 border-t shrink-0
        ${isDark ? 'border-[#1E1E2E]' : 'border-[#E2E8F0]'}`}>
        <div className={`flex items-center gap-2 overflow-hidden
          ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
          <span className={`text-[11px] font-semibold whitespace-nowrap transition-all duration-300
            ${collapsed ? 'w-0 opacity-0' : 'opacity-100'}
            ${isDark ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
            v1.0.0 · All systems normal
          </span>
        </div>
      </div>

    </div>
  )
}

// ── Reusable NavItem ─────────────────────────
function NavItem({
  to, label, Icon, collapsed, isDark, isMobile, onClose
}: {
  to: string
  label: string
  Icon: any
  collapsed: boolean
  isDark: boolean
  isMobile?: boolean
  onClose?: () => void
}) {
  return (
    <NavLink
      to={to}
      onClick={isMobile ? onClose : undefined}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `flex items-center rounded-xl transition-all duration-200 relative h-11 w-full
        ${isActive
          ? isDark
            ? 'bg-[#F97316]/10 text-[#F97316]'
            : 'bg-[#FFF7ED] text-[#EA580C]'
          : isDark
            ? 'text-[#475569] hover:bg-[#1E293B] hover:text-[#94A3B8]'
            : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#334155]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full transition-all duration-200
            ${isActive ? 'h-6 bg-[#F97316] opacity-100' : 'h-0 opacity-0'}`} />

          <div className="w-[44px] h-full flex items-center justify-center shrink-0">
            <Icon size={19} strokeWidth={isActive ? 2.5 : 2} className="transition-colors" />
          </div>

          <span className={`text-[13.5px] whitespace-nowrap font-semibold overflow-hidden transition-all duration-300
            ${collapsed ? 'w-0 opacity-0' : 'opacity-100'}
            ${isActive ? 'font-bold' : ''}`}>
            {label}
          </span>

          {isActive && !collapsed && (
            <ChevronRight size={14} className="ml-auto mr-3 opacity-60" strokeWidth={2.5} />
          )}
        </>
      )}
    </NavLink>
  )
}