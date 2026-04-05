// src/App.tsx

import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './store/useStore'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'

export default function App() {
  const theme = useStore((s) => s.theme)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#18181B]' : 'bg-[#FFFBF7]'
      }`}>
      <BrowserRouter>
        <div className="flex h-screen overflow-hidden">

          {/* Sidebar — desktop only */}
          <aside className="hidden md:flex z-50">
            <Sidebar />
          </aside>

          {/* Sidebar — mobile drawer */}
          <div className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
            <div 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className={`absolute top-0 left-0 bottom-0 transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
              <Sidebar onClose={() => setIsMobileMenuOpen(false)} isMobile />
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
            <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
            <main className="flex-1 overflow-y-auto p-5 md:p-7">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/insights" element={<Insights />} />
              </Routes>
            </main>
          </div>

        </div>
      </BrowserRouter>
    </div>
  )
}