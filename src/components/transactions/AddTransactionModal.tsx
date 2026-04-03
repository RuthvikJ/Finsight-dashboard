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

  const input = `w-full text-sm rounded-lg border px-3 py-2 outline-none transition-all duration-150 ${isDark
      ? 'bg-[#1F1F22] border-[#3F3F46] text-[#FAFAFA] focus:border-[#EA580C]'
      : 'bg-white border-[#E7E5E4] text-[#1C0A00] focus:border-[#EA580C]'
    }`

  const label = `text-xs font-medium mb-1 block ${isDark ? 'text-[#A1A1AA]' : 'text-[#57534E]'}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`w-full max-w-md rounded-2xl border p-5 flex flex-col gap-4 ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-white border-[#E7E5E4]'
        }`}>

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className={`text-base font-semibold ${isDark ? 'text-[#FAFAFA]' : 'text-[#1C0A00]'}`}>
            {isEditing ? 'Edit transaction' : 'Add transaction'}
          </h2>
          <button onClick={onClose}>
            <X size={16} className={isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'} />
          </button>
        </div>

        {/* Type toggle */}
        <div className={`flex rounded-lg p-0.5 border gap-1 ${isDark ? 'bg-[#1F1F22] border-[#3F3F46]' : 'bg-[#F5F5F4] border-[#E7E5E4]'
          }`}>
          {(['expense', 'income'] as TransactionType[]).map(t => (
            <button
              key={t}
              onClick={() => set('type', t)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 capitalize ${form.type === t
                  ? t === 'income'
                    ? 'bg-green-500 text-white'
                    : 'bg-[#EA580C] text-white'
                  : isDark ? 'text-[#71717A]' : 'text-[#A8A29E]'
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

        <div className="grid grid-cols-2 gap-3">
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
          <select className={input} value={form.category}
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
        <div className="flex gap-2 pt-1">
          <button onClick={onClose}
            className={`flex-1 py-2 text-sm font-medium rounded-xl border transition-all duration-150 ${isDark
                ? 'border-[#3F3F46] text-[#71717A] hover:text-[#FAFAFA]'
                : 'border-[#E7E5E4] text-[#A8A29E] hover:text-[#1C0A00]'
              }`}>
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="flex-1 py-2 text-sm font-semibold rounded-xl bg-[#EA580C] text-white hover:bg-[#C2410C] transition-all duration-150">
            {isEditing ? 'Save changes' : 'Add transaction'}
          </button>
        </div>

      </div>
    </div>
  )
}