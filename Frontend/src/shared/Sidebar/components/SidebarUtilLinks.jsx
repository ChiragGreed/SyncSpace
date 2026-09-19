import { Bell, Settings } from 'lucide-react'

export default function SidebarUtilLinks() {
  return (
    <div className="mt-8 pt-4 flex flex-col gap-1" style={{ borderTop: '1px solid rgba(255, 107, 61, 0.1)' }}>
      <button
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted transition-all duration-200 text-left"
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,61,0.08)'; e.currentTarget.style.color = '#fff0e8' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#7a7070' }}
      >
        <Bell className="w-4 h-4" strokeWidth={2} />
        Notifications
        <span
          className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-full"
          style={{ background: 'rgba(255, 107, 61, 0.15)', color: '#ff6b3d' }}
        >
          4
        </span>
      </button>
      <button
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted transition-all duration-200 text-left"
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,61,0.08)'; e.currentTarget.style.color = '#fff0e8' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#7a7070' }}
      >
        <Settings className="w-4 h-4" strokeWidth={2} />
        Settings
      </button>
    </div>
  )
}
