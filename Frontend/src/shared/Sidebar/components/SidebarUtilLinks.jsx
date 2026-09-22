import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Bell, Settings, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import useNotification from '../../../Features/Notifications/hook/useNotification.js'

export default function SidebarUtilLinks() {
  const [showNotifs, setShowNotifs] = useState(false)

  const { getNotifications, markNotificationRead, markAllNotificationsRead } = useNotification()
  const notifications = useSelector((state) => state.notification.notifications)
  const unreadCount = notifications.filter((n) => !n.isRead).length

  useEffect(() => { getNotifications() }, [getNotifications])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setShowNotifs(false) }
    if (showNotifs) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [showNotifs])

  const formatTime = (createdAt) => {
    if (!createdAt) return ''
    return new Date(createdAt).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
  }

  const modal = showNotifs && createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Notifications"
      onClick={() => setShowNotifs(false)}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 border border-accent/18"
        style={{
          background: 'linear-gradient(145deg, rgba(26,20,16,0.98) 0%, rgba(18,14,10,0.95) 100%)',
          boxShadow: '0 24px 64px rgba(255, 107, 61, 0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between mb-5"
          style={{ borderBottom: '1px solid rgba(255,107,61,0.1)', paddingBottom: '16px' }}
        >
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" style={{ color: '#ff8c42' }} strokeWidth={2} />
            <span className="font-display font-semibold text-sm" style={{ color: '#fff0e8' }}>
              Notifications
            </span>
            {unreadCount > 0 && (
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
                style={{ background: 'rgba(255, 107, 61, 0.15)', color: '#ff6b3d' }}
              >
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={() => markAllNotificationsRead()}
                className="text-[11px] font-semibold hover:brightness-110 transition-all"
                style={{ color: '#ff8c42' }}
              >
                Mark all read
              </button>
            )}
            <button
              onClick={() => setShowNotifs(false)}
              aria-label="Close notifications"
              className="p-1 rounded-lg transition-all hover:bg-white/5"
              style={{ color: '#7a7070' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-2.5 max-h-80 overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            <p className="text-xs text-muted py-6 text-center">No notifications yet</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => { if (!n.isRead) markNotificationRead(n._id) }}
                className="flex gap-2.5 p-3 rounded-xl cursor-pointer transition-all duration-200"
                style={{
                  border: !n.isRead ? '1px solid rgba(255, 107, 61, 0.12)' : '1px solid transparent',
                  background: !n.isRead ? 'rgba(255, 107, 61, 0.04)' : 'transparent',
                }}
              >
                <div className="pt-0.5 shrink-0">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5"
                    style={{
                      background: !n.isRead ? 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)' : 'transparent',
                      border: !n.isRead ? 'none' : '1px solid #7a7070',
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-normal" style={{ color: !n.isRead ? '#fff0e8' : '#7a7070' }}>
                    {n.message}
                  </p>
                  <span className="text-[9px] font-mono mt-1 block text-muted">{formatTime(n.createdAt)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body
  )

  return (
    <>
      {modal}
      <div className="mt-8 pt-4 flex flex-col gap-1" style={{ borderTop: '1px solid rgba(255, 107, 61, 0.1)' }}>

        <button
          onClick={() => setShowNotifs(true)}
          aria-label="Notifications"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted transition-all duration-200 text-left"
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,61,0.08)'; e.currentTarget.style.color = '#fff0e8' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#7a7070' }}
        >
          <Bell className="w-4 h-4 shrink-0" strokeWidth={2} />
          Notifications
          {unreadCount > 0 && (
            <span
              className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-full"
              style={{ background: 'rgba(255, 107, 61, 0.15)', color: '#ff6b3d' }}
            >
              {unreadCount}
            </span>
          )}
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
    </>
  )
}
