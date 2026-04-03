// src/components/ui/Badge.tsx

interface BadgeProps {
  label: string
  variant?: 'income' | 'expense' | 'category' | 'neutral'
}

export default function Badge({ label, variant = 'neutral' }: BadgeProps) {
  const styles = {
    income: 'bg-green-50  text-green-700  border-green-200',
    expense: 'bg-red-50    text-red-600    border-red-200',
    category: 'bg-[#FFEDD5] text-[#7C2D12] border-[#FED7AA]',
    neutral: 'bg-[#F5F5F4] text-[#57534E] border-[#E7E5E4]',
  }

  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${styles[variant]}`}>
      {label}
    </span>
  )
}