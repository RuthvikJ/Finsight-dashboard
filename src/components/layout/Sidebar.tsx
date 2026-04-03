// src/components/layout/Sidebar.tsx

import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Lightbulb } from 'lucide-react'
import { useStore } from '../../store/useStore'
import ThemeToggle from '../ui/ThemeToggle'
import RoleSwitcher from '../ui/RoleSwitcher'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
]

export default function Sidebar() {
  const theme = useStore((s) => s.theme)
  const isDark = theme === 'dark'

  return (
    <div className={`flex flex-col w-56 h-screen border-r px-4 py-6 gap-6 ${isDark
        ? 'bg-[#1F1F22] border-[#27272A]'
        : 'bg-white border-[#E7E5E4]'
      }`}>

      {/* Logo */}
      <div className="px-2">
        <span className={`text-lg font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'
          }`}>
          Fin<span className="text-[#EA580C]">Sight</span>
        </span>
        <p className={`text-xs mt-0.5 ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'
          }`}>Personal Finance</p>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${isActive
                ? 'bg-[#EA580C] text-white'
                : isDark
                  ? 'text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#27272A]'
                  : 'text-[#78716C] hover:text-[#1C0A00] hover:bg-[#F5F5F4]'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom controls */}
      <div className="flex flex-col gap-3">
        <RoleSwitcher />
        <ThemeToggle />
      </div>

    </div>
  )
}