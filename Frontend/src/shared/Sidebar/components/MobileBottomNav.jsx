export default function MobileBottomNav({ nav, active, onNavigate }) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-20 flex justify-around items-center px-2 py-2"
      aria-label="Primary"
      style={{
        background: 'rgba(10, 8, 6, 0.95)',
        borderTop: '1px solid rgba(255, 107, 61, 0.12)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {nav.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          aria-current={active === item.id ? 'page' : undefined}
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all"
          style={active === item.id ? {
            background: 'rgba(255, 107, 61, 0.12)',
            color: '#ff6b3d',
          } : { color: '#7a7070' }}
        >
          <item.icon className="w-5 h-5" strokeWidth={2} />
          {item.label}
        </button>
      ))}
    </nav>
  )
}
