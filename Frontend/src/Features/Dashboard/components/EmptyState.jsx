import { SearchX } from 'lucide-react'

export default function EmptyState({ title = 'Nothing here yet', description = 'Try a different search or filter.' }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-4 border border-dashed border-border rounded-xl">
      <div className="w-10 h-10 rounded-full bg-surface2 flex items-center justify-center mb-3">
        <SearchX className="w-5 h-5 text-muted" strokeWidth={2} />
      </div>
      <p className="text-sm font-medium text-ink">{title}</p>
      <p className="text-xs text-muted mt-1">{description}</p>
    </div>
  )
}
