import { useLocation } from 'react-router-dom'
import { useStore } from '../../store/useStore'

export default function Header() {
  const { pathname } = useLocation()
  const theme = useStore((s) => s.theme)
  const isDark = theme === 'dark'

  const title = pathname.split('/')[1] || 'dashboard'
  const displayTitle = title.charAt(0).toUpperCase() + title.slice(1)

  return (
    <div className="px-4 md:px-7 py-4 md:pt-8 md:pb-4 flex flex-col justify-center">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#EA580C] to-[#C2410C]" />
        <h1 className={`text-lg md:text-2xl font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
          {displayTitle}
        </h1>
      </div>
    </div>
  )
}
