import { CalendarDays } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'
import SyncPulse from './SyncPulse.jsx'

const STATUS_CONFIG = {
  'in-progress': {
    bg: 'rgba(255, 107, 61, 0.12)',
    color: '#ff8c42',
    border: 'rgba(255, 107, 61, 0.28)',
  },
  done: {
    bg: 'rgba(255, 179, 71, 0.12)',
    color: '#ffb347',
    border: 'rgba(255, 179, 71, 0.28)',
  },
}

// Warm orange shades for member avatars
const AVATAR_BG = [
  'linear-gradient(135deg, #ff6b3d 0%, #ff8c42 100%)',
  'linear-gradient(135deg, #e85d2e 0%, #ff6b3d 100%)',
  'linear-gradient(135deg, #ff8c42 0%, #ffb347 100%)',
  'linear-gradient(135deg, #c94d20 0%, #e85d2e 100%)',
]

export default function ProjectCard({ project }) {
  const status = STATUS_CONFIG[project.status] ?? STATUS_CONFIG['in-progress']

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
      style={{
        background: 'linear-gradient(145deg, rgba(26,20,16,0.95) 0%, rgba(18,14,10,0.9) 100%)',
        border: '1px solid rgba(255, 107, 61, 0.14)',
        boxShadow: '0 4px 24px rgba(255, 107, 61, 0.06)',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255, 107, 61, 0.35)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255, 107, 61, 0.14)'}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display font-semibold text-ink">{project.name}</h3>
          <p className="text-xs text-muted mt-1">{project.description}</p>
        </div>
        <SyncPulse label="" />
      </div>

      <ProgressBar value={project.progress} />

      <div className="flex items-center justify-between text-xs text-muted">
        <span
          className="px-2 py-0.5 rounded-full font-mono text-[10px]"
          style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}` }}
        >
          {project.status.replace('-', ' ')}
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays className="w-3.5 h-3.5" strokeWidth={2} />
          {project.dueDate}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255, 107, 61, 0.08)' }}>
        <div className="flex -space-x-2">
          {project.members?.slice(0, 4).map((member, i) => {
            const memberName = member.fullName || member.name || String(member)
            const initials = memberName
              .split(' ')
              .map((name) => name[0])
              .join('')
              .slice(0, 2)

            return (
              <div
                key={member._id || member.id || member}
                title={memberName}
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[9px] font-mono text-white"
                style={{
                  background: AVATAR_BG[i % AVATAR_BG.length],
                  borderColor: 'rgba(10,8,6,0.9)',
                }}
              >
                {initials}
              </div>
            )
          })}
        </div>
        <span className="text-[11px] text-muted font-mono">
          {project.members?.length || 0} members
        </span>
      </div>
    </div>
  )
}
