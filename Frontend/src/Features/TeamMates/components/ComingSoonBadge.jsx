import { Sparkles } from 'lucide-react'

export default function ComingSoonBadge() {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono mb-4"
      style={{
        background: 'rgba(255, 107, 61, 0.1)',
        border: '1px solid rgba(255, 107, 61, 0.2)',
        color: '#ff8c42',
      }}
    >
      <Sparkles className="w-3 h-3" strokeWidth={2} />
      Coming soon
    </div>
  )
}
