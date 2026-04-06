// src/App.tsx

import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './store/useStore'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'
import Reports from './pages/Reports'
import Market from './pages/Market'

export default function App() {
  const theme = useStore((s) => s.theme)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0F0F12]' : 'bg-[#F4F6FA]'}`}>
      <BrowserRouter>
        <div className="flex h-screen overflow-hidden">

          {/* Sidebar — desktop only */}
          <aside className="hidden md:flex shrink-0 z-50">
            <Sidebar
              isCollapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed((c) => !c)}
            />
          </aside>

          {/* Sidebar — mobile drawer overlay */}
          <div className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className={`absolute top-0 left-0 bottom-0 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <Sidebar
                isCollapsed={false}
                onToggle={() => setIsMobileMenuOpen(false)}
                isMobile
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>

          {/* Main content — shifts with sidebar */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <Header
              onMenuClick={() => setIsMobileMenuOpen(true)}
              onSidebarToggle={() => setSidebarCollapsed((c) => !c)}
            />
            <main className="flex-1 overflow-y-auto p-8">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/market" element={<Market />} />
              </Routes>
            </main>
          </div>

        </div>
      </BrowserRouter>
    </div>
  )
}