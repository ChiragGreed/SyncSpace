export default function SidebarNav({ nav, active, onNavigate }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Primary">
      {nav.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          aria-current={active === item.id ? 'page' : undefined}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left"
          style={active === item.id ? {
            background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
            color: '#fff0e8',
            boxShadow: '0 4px 14px rgba(255, 107, 61, 0.35)',
          } : { color: '#7a7070' }}
          onMouseEnter={e => {
            if (active !== item.id) {
              e.currentTarget.style.background = 'rgba(255,107,61,0.08)'
              e.currentTarget.style.color = '#fff0e8'
            }
          }}
          onMouseLeave={e => {
            if (active !== item.id) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#7a7070'
            }
          }}
        >
          <item.icon className="w-4 h-4" strokeWidth={2} />
          {item.label}
        </button>
      ))}
    </nav>
  )
}
