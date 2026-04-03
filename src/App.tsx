// src/App.tsx

import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './store/useStore'
import Sidebar from './components/layout/Sidebar'
import BottomNav from './components/layout/BottomNav'
import Header from './components/layout/Header'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'

export default function App() {
  const theme = useStore((s) => s.theme)

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
          <aside className="hidden md:flex">
            <Sidebar />
          </aside>

          {/* Main content */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/insights" element={<Insights />} />
              </Routes>
            </main>
          </div>

        </div>

        {/* Bottom nav — mobile only */}
        <nav className="md:hidden">
          <BottomNav />
        </nav>

      </BrowserRouter>
    </div>
  )
}