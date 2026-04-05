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
    <div className={`flex flex-col w-64 h-screen border-r px-4 py-6 gap-6 shadow-[1px_0_10px_rgba(0,0,0,0.02)] ${
        isDark ? 'bg-[#1F1F22] border-[#27272A]' : 'bg-white border-[#E7E5E4]'
      }`}>

      {/* Logo */}
      <div className="px-3 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#EA580C] to-[#C2410C] flex items-center justify-center shadow-sm">
            <span className="text-white text-xs font-bold leading-none">F</span>
          </div>
          <span className={`text-lg font-bold tracking-tight
            ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
            Fin<span className="text-[#EA580C]">Sight</span>
          </span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1.5 flex-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? isDark 
                    ? 'bg-[#27272A] text-[#FAFAFA]' 
                    : 'bg-[#F5F5F4] text-[#1C0A00]'
                  : isDark
                    ? 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A]/50'
                    : 'text-[#78716C] hover:text-[#1C0A00] hover:bg-[#F5F5F4]/80'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <Icon size={18} className={`flex-shrink-0 transition-colors ${isActive ? (isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]') : 'group-hover:text-inherit'}`} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>{label}</span>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom controls */}
      <div className="flex flex-col gap-3 px-2">
        <RoleSwitcher />
        <ThemeToggle />
      </div>

    </div>
  )
}