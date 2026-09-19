import { Search } from 'lucide-react'

export default function TopbarSearch({ query, onQueryChange }) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" strokeWidth={2} />
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        type="text"
        placeholder="Search projects or tasks..."
        aria-label="Search projects or tasks"
        className="w-full rounded-xl pl-9 pr-3 py-2 text-sm placeholder:text-muted outline-none transition-all duration-200"
        style={{
          background: 'rgba(255, 107, 61, 0.06)',
          border: '1px solid rgba(255, 107, 61, 0.15)',
          color: '#fff0e8',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(255, 107, 61, 0.55)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255, 107, 61, 0.15)'}
      />
    </div>
  )
}
