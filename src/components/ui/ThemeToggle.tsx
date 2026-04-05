// src/components/ui/ThemeToggle.tsx

import { useStore } from '../../store/useStore'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useStore()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-[52px] h-[28px] rounded-full border-2 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden ${
        isDark
          ? 'bg-[#18181B] border-[#3F3F46] hover:border-[#52525B]'
          : 'bg-[#F5F5F4] border-[#E7E5E4] hover:border-[#D6D3D1]'
      }`}
      aria-label="Toggle theme"
      title="Toggle Theme"
    >
      {/* Track Background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Circle Icon Indicator */}
      <div 
        className={`absolute w-[20px] h-[20px] rounded-full shadow-sm transition-transform duration-300 ease-in-out flex items-center justify-center ${
          isDark 
            ? 'translate-x-[11px] bg-[#E4E4E5]' 
            : '-translate-x-[11px] bg-white border border-[#E7E5E4]'
        }`}
      />
    </button>
  )
}