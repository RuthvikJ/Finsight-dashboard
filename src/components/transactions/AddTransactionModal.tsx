// src/components/transactions/AddTransactionModal.tsx

import { useState } from 'react'
import { X } from 'lucide-react'
import { useStore } from '../../store/useStore'
import type { Transaction, TransactionType, TransactionCategory } from '../../types'
import { CATEGORIES } from '../../data/mockData'

interface Props {
  onClose: () => void
  initialData?: Transaction
}

export default function AddTransactionModal({ onClose, initialData }: Props) {
  const { addTransaction, editTransaction, theme } = useStore()
  const isDark = theme === 'dark'
  const isEditing = Boolean(initialData)

  const [form, setForm] = useState({
    description: initialData?.description ?? '',
    amount: initialData ? String(initialData.amount) : '',
    type: (initialData?.type ?? 'expense') as TransactionType,
    category: (initialData?.category ?? 'Food & Dining') as TransactionCategory,
    date: initialData?.date ?? new Date().toISOString().slice(0, 10),
    note: initialData?.note ?? '',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = () => {
    if (!form.description || !form.amount) return
    if (isEditing && initialData) {
      editTransaction(initialData.id, {
        description: form.description,
        amount: parseFloat(form.amount),
        type: form.type,
        category: form.category,
        date: form.date,
        note: form.note || undefined,
      })
    } else {
      const t: Transaction = {
        id: `txn-${Date.now()}`,
        description: form.description,
        amount: parseFloat(form.amount),
        type: form.type,
        category: form.category,
        date: form.date,
        note: form.note || undefined,
      }
      addTransaction(t)
    }
    onClose()
  }

  const input = `w-full text-sm font-medium rounded-xl border px-4 py-3 outline-none transition-all duration-200 ${isDark
      ? 'bg-[#1F1F22] border-[#3F3F46] text-[#FAFAFA] focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 focus:bg-[#27272A]'
      : 'bg-[#F5F5F4] border-transparent text-[#1C0A00] focus:border-[#EA580C] focus:bg-white focus:ring-4 focus:ring-[#FFEDD5]/50'
    }`

  const label = `text-[11px] font-bold uppercase tracking-widest mb-1.5 ml-1 block ${isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 backdrop-blur-sm"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`w-full max-w-md rounded-[24px] border overflow-hidden flex flex-col shadow-2xl transition-all ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'
        }`}>

        {/* Gradient Header Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#EA580C] to-[#F97316]" />

        <div className="p-6 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
              {isEditing ? 'Edit transaction' : 'New transaction'}
            </h2>
            <button onClick={onClose} className={`p-1.5 rounded-full transition-colors ${isDark ? 'hover:bg-[#3F3F46] text-[#71717A] hover:text-[#FAFAFA]' : 'hover:bg-[#F5F5F4] text-[#A8A29E] hover:text-[#1C0A00]'}`}>
              <X size={18} />
            </button>
          </div>

          {/* Type toggle */}
          <div className={`flex rounded-xl p-1 border gap-1 ${isDark ? 'bg-[#1F1F22] border-[#3F3F46]' : 'bg-[#F5F5F4] border-transparent'
            }`}>
            {(['expense', 'income'] as TransactionType[]).map(t => (
              <button
                key={t}
                onClick={() => set('type', t)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 capitalize ${form.type === t
                    ? t === 'income'
                      ? 'bg-[#16A34A] text-white shadow-md'
                      : 'bg-[#EA580C] text-white shadow-md'
                    : isDark ? 'text-[#71717A] hover:text-[#FAFAFA]' : 'text-[#A8A29E] hover:text-[#1C0A00]'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div>
            <label className={label}>Description</label>
            <input className={input} placeholder="e.g. Grocery run"
              value={form.description} onChange={e => set('description', e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Amount (₹)</label>
              <input className={input} type="number" placeholder="0"
                value={form.amount} onChange={e => set('amount', e.target.value)} />
            </div>
            <div>
              <label className={label}>Date</label>
              <input className={input} type="date"
                value={form.date} onChange={e => set('date', e.target.value)} />
            </div>
          </div>

          <div>
            <label className={label}>Category</label>
            <select className={`${input} appearance-none`} value={form.category}
              onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className={label}>Note (optional)</label>
            <input className={input} placeholder="Any extra detail..."
              value={form.note} onChange={e => set('note', e.target.value)} />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 mt-2">
            <button onClick={onClose}
              className={`flex-1 py-3 text-sm font-bold rounded-xl border transition-all duration-200 ${isDark
                  ? 'border-[#3F3F46] text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#3F3F46]'
                  : 'border-[#E7E5E4] text-[#78716C] hover:text-[#1C0A00] hover:bg-[#F5F5F4]'
                }`}>
              Cancel
            </button>
            <button onClick={handleSubmit}
              className={`flex-1 py-3 text-sm font-bold rounded-xl text-white transition-all duration-200 shadow-md hover:shadow-lg ${
                form.type === 'income' ? 'bg-[#16A34A] hover:bg-[#15803D]' : 'bg-[#EA580C] hover:bg-[#C2410C]'
              }`}>
              {isEditing ? 'Save changes' : 'Add transaction'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}