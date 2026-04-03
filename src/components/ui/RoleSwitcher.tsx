// src/components/ui/RoleSwitcher.tsx

import { useStore } from '../../store/useStore'
import { Role } from '../../types'

export default function RoleSwitcher() {
  const { role, setRole, theme } = useStore()
  const isDark = theme === 'dark'

  return (
    <div className={`flex items-center gap-1 rounded-full p-0.5 border ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-[#F5F5F4] border-[#E7E5E4]'
      }`}>
      {(['viewer', 'admin'] as Role[]).map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 capitalize cursor-pointer ${role === r
            ? 'bg-[#EA580C] text-white shadow-sm'
            : isDark
              ? 'text-[#71717A] hover:text-[#A1A1AA]'
              : 'text-[#A8A29E] hover:text-[#57534E]'
            }`}
        >
          {r}
        </button>
      ))}
    </div>
  )
}