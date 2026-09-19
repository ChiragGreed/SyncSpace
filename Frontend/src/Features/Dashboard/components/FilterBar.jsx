export default function FilterBar({ filters, active, onChange, label = 'Filter' }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1" role="tablist" aria-label={label}>
      {filters.map((f) => (
        <button
          key={f.id}
          role="tab"
          aria-selected={active === f.id}
          onClick={() => onChange(f.id)}
          className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
          style={active === f.id ? {
            background: 'linear-gradient(135deg, rgba(255,107,61,0.25), rgba(255,179,71,0.18))',
            color: '#ff8c42',
            border: '1px solid rgba(255, 107, 61, 0.4)',
            boxShadow: '0 2px 8px rgba(255, 107, 61, 0.2)',
          } : {
            background: 'transparent',
            color: '#7a7070',
            border: '1px solid rgba(255, 107, 61, 0.12)',
          }}
          onMouseEnter={e => {
            if (active !== f.id) {
              e.target.style.color = '#fff0e8'
              e.target.style.borderColor = 'rgba(255, 107, 61, 0.28)'
            }
          }}
          onMouseLeave={e => {
            if (active !== f.id) {
              e.target.style.color = '#7a7070'
              e.target.style.borderColor = 'rgba(255, 107, 61, 0.12)'
            }
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
