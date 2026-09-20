import { useState, useRef, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { useSelector } from 'react-redux'
import useNotification from '../../../Features/Dashboard/hook/useNotification.js'

export default function NotificationBell() {
  const [showNotifs, setShowNotifs] = useState(false)
  const dropdownRef = useRef(null)
  const { getNotifications, markNotificationRead, markAllNotificationsRead } = useNotification()
  const notifs = useSelector((state) => state.notification.notifications)

  const unreadCount = notifs.filter((notification) => !notification.isRead).length

  useEffect(() => {
    getNotifications()
  }, [getNotifications])

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

  const markAllRead = () => markAllNotificationsRead()
  const markRead = (notification) => {
    if (!notification.isRead) markNotificationRead(notification._id)
  }

  const formatTime = (createdAt) => {
    if (!createdAt) return ''
    return new Date(createdAt).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
  }

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
                  key={n._id}
                  onClick={() => markRead(n)}
                  className="flex gap-2.5 p-2 rounded-xl cursor-pointer hover:bg-white/2 transition-all duration-250 text-left"
                  style={{
                    border: !n.isRead ? '1px solid rgba(255, 107, 61, 0.1)' : '1px solid transparent',
                    background: !n.isRead ? 'rgba(255, 107, 61, 0.02)' : 'transparent',
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
      )}
    </div>
  )
}
