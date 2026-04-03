// src/components/ui/ThemeToggle.tsx

import { useStore } from '../../store/useStore'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useStore()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200 cursor-pointer ${isDark
          ? 'bg-[#27272A] border-[#3F3F46] text-[#A1A1AA] hover:border-[#EA580C]'
          : 'bg-white border-[#E7E5E4] text-[#57534E] hover:border-[#EA580C]'
        }`}
      aria-label="Toggle theme"
    >
      {/* Track */}
      <div className={`relative w-8 h-4 rounded-full transition-colors duration-300 ${isDark ? 'bg-[#EA580C]' : 'bg-[#E7E5E4]'
        }`}>
        {/* Dot */}
        <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300 ${isDark
            ? 'translate-x-4 bg-white'
            : 'translate-x-0.5 bg-[#D6D3D1]'
          }`} />
      </div>
      <span>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}