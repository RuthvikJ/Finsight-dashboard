// src/components/ui/RoleSwitcher.tsx

import { useStore } from '../../store/useStore'
import type { Role } from '../../types'
import { ChevronDown } from 'lucide-react'

export default function RoleSwitcher() {
  const { role, setRole, theme } = useStore()
  const isDark = theme === 'dark'

  return (
    <div className="relative flex items-center">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        className={`appearance-none h-8 pl-3 pr-8 rounded-lg text-[13px] font-semibold border outline-none cursor-pointer transition-all duration-200
          ${isDark
            ? 'bg-[#1A1A24] border-[#2E2E3A] text-[#F1F5F9] hover:border-[#F97316]/50'
            : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#F97316]/50'
          }`}
      >
        <option value="admin">Admin</option>
        <option value="viewer">Viewer</option>
      </select>

      {/* Right chevron */}
      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronDown size={13} className={isDark ? 'text-[#475569]' : 'text-[#94A3B8]'} />
      </div>
    </div>
  )
}