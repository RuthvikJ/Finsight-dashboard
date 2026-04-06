// src/components/layout/Header.tsx

import { useLocation } from 'react-router-dom'
import { Menu, Bell, Settings } from 'lucide-react'
import { useStore } from '../../store/useStore'
import RoleSwitcher from '../ui/RoleSwitcher'
import ThemeToggle from '../ui/ThemeToggle'

interface Props {
  onMenuClick?: () => void
  onSidebarToggle?: () => void
}

export default function Header({ onMenuClick, onSidebarToggle }: Props) {
  const { pathname } = useLocation()
  const { theme } = useStore()
  const isDark = theme === 'dark'

  const title = pathname.split('/')[1] || 'dashboard'
  const displayTitle = title.charAt(0).toUpperCase() + title.slice(1)

  const iconBtn = `p-2.5 rounded-xl transition-all duration-200 cursor-pointer
    ${isDark
      ? 'text-[#475569] hover:text-[#94A3B8] hover:bg-[#1E293B]'
      : 'text-[#94A3B8] hover:text-[#475569] hover:bg-[#F1F5F9]'
    }`

  return (
    <header className={`w-full border-b shrink-0 z-40 transition-colors duration-200
      ${isDark ? 'border-[#1E1E2E] bg-[#0F0F12]' : 'border-[#E2E8F0] bg-white'}`}>

      <div className="flex items-center justify-between px-4 md:px-6 h-[68px] gap-4">

        {/* ── Left: Hamburger + Title + Role Dropdown ── */}
        <div className="flex items-center gap-4 min-w-0">

          {/* Desktop sidebar toggle */}
          <button
            onClick={onSidebarToggle}
            className={`hidden md:flex ${iconBtn} items-center justify-center`}
            title="Toggle sidebar"
          >
            <Menu size={20} strokeWidth={2} />
          </button>

          {/* Mobile menu */}
          <button
            onClick={onMenuClick}
            className={`md:hidden flex items-center justify-center ${iconBtn}`}
          >
            <Menu size={20} strokeWidth={2} />
          </button>

          {/* Divider */}
          <div className={`hidden md:block w-px h-5 ${isDark ? 'bg-[#1E293B]' : 'bg-[#E2E8F0]'}`} />

          {/* Page title */}
          <h1 className={`text-[20px] font-bold tracking-tight leading-none truncate
            ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
            {displayTitle}
          </h1>

          {/* Gap + Role dropdown next to title */}
          <div className="hidden sm:block ml-2">
            <RoleSwitcher />
          </div>

        </div>

        {/* ── Right: Theme Toggle + Icons + Avatar ─── */}
        <div className="flex items-center gap-2 shrink-0">

          {/* iPhone-style theme toggle */}
          <ThemeToggle />

          {/* Divider */}
          <div className={`w-px h-5 mx-1 ${isDark ? 'bg-[#1E293B]' : 'bg-[#E2E8F0]'}`} />

          {/* Notifications */}
          <button className={`${iconBtn} relative`} title="Notifications">
            <Bell size={18} strokeWidth={2} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#F97316] rounded-full" />
          </button>

          {/* Settings */}
          <button className={iconBtn} title="Settings">
            <Settings size={18} strokeWidth={2} />
          </button>

          {/* Divider */}
          <div className={`w-px h-5 mx-1 ${isDark ? 'bg-[#1E293B]' : 'bg-[#E2E8F0]'}`} />

          {/* Admin avatar */}
          <button
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center text-white text-[11px] font-black tracking-widest shadow-md shadow-orange-500/25 hover:opacity-90 transition-opacity"
            title="Admin User"
          >
            AD
          </button>

        </div>

      </div>
    </header>
  )
}