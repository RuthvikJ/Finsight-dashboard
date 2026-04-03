// src/components/layout/BottomNav.tsx

import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Lightbulb } from 'lucide-react'
import { useStore } from '../../store/useStore'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
]

export default function BottomNav() {
  const theme = useStore((s) => s.theme)
  const isDark = theme === 'dark'

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 py-2 border-t ${isDark
        ? 'bg-[#18181B] border-[#27272A]'
        : 'bg-white border-[#E7E5E4]'
      }`}>
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-150 ${isActive
              ? 'text-[#EA580C]'
              : isDark
                ? 'text-[#52525B] hover:text-[#A1A1AA]'
                : 'text-[#A8A29E] hover:text-[#57534E]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={18} />
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
}