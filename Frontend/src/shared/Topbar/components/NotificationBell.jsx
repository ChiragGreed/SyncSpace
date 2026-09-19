import { useState, useRef, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { notifications as initialNotifications } from '../../../mockData.js'

export default function NotificationBell() {
  const [showNotifs, setShowNotifs] = useState(false)
  const [notifs, setNotifs] = useState(initialNotifications)
  const dropdownRef = useRef(null)

  const unreadCount = notifs.filter(n => n.unread).length

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifs(false)
      }
    }
    if (showNotifs) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showNotifs])

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, unread: false })))
  const toggleRead = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, unread: !n.unread } : n))

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowNotifs(!showNotifs)}
        aria-label="Notifications"
        className="relative p-2 rounded-xl text-muted hover:text-ink transition-all duration-200 cursor-pointer"
        style={{ background: 'rgba(255, 107, 61, 0.07)', border: '1px solid rgba(255, 107, 61, 0.12)' }}
      >
        <Bell className="w-5 h-5" strokeWidth={2} />
        {unreadCount > 0 && (
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: '#ff6b3d' }}
          />
        )}
      </button>

      {showNotifs && (
        <div
          className="absolute right-0 mt-3 w-80 rounded-2xl p-4 z-50 transition-all duration-300"
          style={{
            background: 'linear-gradient(145deg, rgba(26,20,16,0.98) 0%, rgba(18,14,10,0.95) 100%)',
            border: '1px solid rgba(255, 107, 61, 0.18)',
            boxShadow: '0 8px 32px rgba(255, 107, 61, 0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center justify-between pb-3 mb-3" style={{ borderBottom: '1px solid rgba(255,107,61,0.1)' }}>
            <span className="font-display font-semibold text-sm" style={{ color: '#fff0e8' }}>
              Notifications ({unreadCount})
            </span>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[10px] font-semibold hover:brightness-110 transition-all"
                style={{ color: '#ff8c42' }}
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1">
            {notifs.length === 0 ? (
              <p className="text-xs text-muted py-4 text-center">No notifications yet</p>
            ) : (
              notifs.map((n) => (
                <div
                  key={n.id}
                  onClick={() => toggleRead(n.id)}
                  className="flex gap-2.5 p-2 rounded-xl cursor-pointer hover:bg-white/[0.02] transition-all duration-250 text-left"
                  style={{
                    border: n.unread ? '1px solid rgba(255, 107, 61, 0.1)' : '1px solid transparent',
                    background: n.unread ? 'rgba(255, 107, 61, 0.02)' : 'transparent',
                  }}
                >
                  <div className="pt-0.5 shrink-0">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5"
                      style={{
                        background: n.unread ? 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)' : 'transparent',
                        border: n.unread ? 'none' : '1px solid #7a7070',
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-normal" style={{ color: n.unread ? '#fff0e8' : '#7a7070' }}>
                      {n.text}
                    </p>
                    <span className="text-[9px] font-mono mt-1 block text-muted">{n.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
