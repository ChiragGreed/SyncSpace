import { useState, useRef, useEffect } from 'react'
import { LogOut } from 'lucide-react'
import { useSelector } from 'react-redux'

export default function TopbarProfile() {
  const [showProfile, setShowProfile] = useState(false)
  const profileDropdownRef = useRef(null)
  const { fullName, email, role } = useSelector((state) => state.user)
  const avatarInitials = fullName?.split(' ').map((name) => name[0]).join('').slice(0, 2) || 'U'

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfile(false)
      }
    }
    if (showProfile) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showProfile])

  return (
    <div className="relative" ref={profileDropdownRef}>
      <div
        className="flex items-center gap-2.5 pl-3 cursor-pointer"
        style={{ borderLeft: '1px solid rgba(255, 107, 61, 0.12)' }}
        onClick={() => setShowProfile(!showProfile)}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-semibold text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)', boxShadow: '0 2px 10px rgba(255,107,61,0.35)' }}
        >
          {avatarInitials}
        </div>
        <div className="hidden sm:block leading-tight">
          <p className="text-sm font-medium hover:text-white transition-colors" style={{ color: '#fff0e8' }}>{fullName || 'User'}</p>
          <p className="text-[11px] text-muted">{role || 'Member'}</p>
        </div>
      </div>

      {showProfile && (
        <div
          className="absolute right-0 mt-3 w-56 rounded-2xl p-2 z-50 transition-all duration-300"
          style={{
            background: 'linear-gradient(145deg, rgba(26,20,16,0.98) 0%, rgba(18,14,10,0.95) 100%)',
            border: '1px solid rgba(255, 107, 61, 0.18)',
            boxShadow: '0 8px 32px rgba(255, 107, 61, 0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="px-3 py-3 flex flex-col gap-1 items-center text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center font-display text-lg font-semibold text-white mb-2"
              style={{ background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)', boxShadow: '0 4px 14px rgba(255,107,61,0.35)' }}
            >
              {avatarInitials}
            </div>
            <p className="text-base font-semibold" style={{ color: '#fff0e8' }}>{fullName || 'User'}</p>
            <p className="text-xs text-muted mb-1">{role || 'Member'}</p>
            <p className="text-[11px] font-mono" style={{ color: '#ff8c42' }}>{email || 'No email available'}</p>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <div className="my-1" style={{ borderTop: '1px solid rgba(255,107,61,0.1)' }} />
            <button
              className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{ color: '#ff6b3d', background: 'rgba(255,107,61,0.05)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,61,0.15)'; e.currentTarget.style.color = '#ff6b3d' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,107,61,0.05)'; e.currentTarget.style.color = '#ff6b3d' }}
            >
              <LogOut className="w-4 h-4" strokeWidth={2} />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
