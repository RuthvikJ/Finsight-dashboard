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
    <div className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 border-t backdrop-blur-md ${isDark
        ? 'bg-[#18181B]/90 border-[#27272A]'
        : 'bg-white/90 border-[#E7E5E4]'
      }`}>
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-h-[56px] min-w-[64px] py-3 rounded-xl transition-all duration-150 relative ${isActive
              ? 'text-[#EA580C]'
              : isDark
                ? 'text-[#52525B] hover:text-[#A1A1AA]'
                : 'text-[#A8A29E] hover:text-[#57534E]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute top-1.5 w-1 h-1 rounded-full bg-[#EA580C]" />
              )}
              <Icon size={20} className={isActive ? 'mt-2' : ''} />
              <span className={`text-[10px] font-medium tracking-wide mt-1 ${isActive ? 'mt-1' : ''}`}>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
}