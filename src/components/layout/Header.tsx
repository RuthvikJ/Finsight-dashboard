// src/components/layout/Header.tsx

import { useLocation } from 'react-router-dom'
import { Menu, Bell } from 'lucide-react'
import { useStore } from '../../store/useStore'
import ThemeToggle from '../ui/ThemeToggle'
import RoleSwitcher from '../ui/RoleSwitcher'

interface Props {
  onMenuClick?: () => void
}

export default function Header({ onMenuClick }: Props) {
  const { pathname } = useLocation()
  const theme = useStore((s) => s.theme)
  const isDark = theme === 'dark'

  const title = pathname.split('/')[1] || 'dashboard'
  const displayTitle = title.charAt(0).toUpperCase() + title.slice(1)

  return (
    <div className={`w-full border-b transition-colors duration-300 z-40 ${
      isDark ? 'border-[#27272A] bg-[#18181B]' : 'border-[#E7E5E4] bg-white'
    }`}>
      <div className="flex items-center justify-between px-6 md:px-8 py-5 min-h-[76px]">
        
        {/* Left Side: Menu Toggle + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className={`md:hidden p-2 -ml-2 rounded-xl transition-colors ${
              isDark ? 'hover:bg-[#27272A] text-[#FAFAFA]' : 'hover:bg-[#F5F5F4] text-[#1C0A00]'
            }`}
          >
            <Menu size={22} />
          </button>
          
          <div className="flex items-center gap-4">
            {/* Horizontal Accent Line */}
            <span className="hidden sm:block w-5 h-[3px] rounded-full bg-gradient-to-r from-[#EA580C] to-[#C2410C] mt-0.5" />
            
            <div className="flex flex-col">
              <h1 className={`text-[22px] md:text-2xl font-bold tracking-tight leading-none ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
                {displayTitle}
              </h1>
              <span className={`text-[13px] mt-1.5 font-medium tracking-wide ${isDark ? 'text-[#71717A]' : 'text-[#6B7280]'}`}>
                {displayTitle === 'Dashboard' ? 'Your financial overview at a glance' : `Manage your ${displayTitle.toLowerCase()}`}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-4 md:gap-6 shrink-0">
          <div className="hidden sm:block">
             <RoleSwitcher />
          </div>
          
          <div className={`hidden sm:block w-px h-6 ${isDark ? 'bg-[#3F3F46]' : 'bg-[#E5E7EB]'}`} />
          
          <ThemeToggle />

          <button className={`p-2.5 rounded-full relative transition-colors ${
            isDark ? 'bg-[#27272A] hover:bg-[#3F3F46] text-[#A1A1AA]' : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#4B5563]'
          }`}>
             <Bell size={18} strokeWidth={2.5} />
             <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EA580C] rounded-full ring-2 ring-white dark:ring-[#18181B]" />
          </button>

          <button className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm tracking-widest transition-all focus:ring-4 ${
            isDark 
              ? 'bg-[#EA580C] text-white hover:opacity-90 focus:ring-[#EA580C]/20' 
              : 'bg-[#EA580C] text-white hover:opacity-90 focus:ring-[#EA580C]/20'
          }`}>
             R
          </button>
        </div>

      </div>
    </div>
  )
}
