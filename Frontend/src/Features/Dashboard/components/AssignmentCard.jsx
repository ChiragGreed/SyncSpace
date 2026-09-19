import { assignments, members } from '../../../mockData.js'

const STATUS_CONFIG = {
  Pending: {
    bg: 'rgba(255, 107, 61, 0.12)',
    color: '#ff8c42',
    border: 'rgba(255, 107, 61, 0.25)',
  },
  'In progress': {
    bg: 'rgba(255, 179, 71, 0.12)',
    color: '#ffb347',
    border: 'rgba(255, 179, 71, 0.25)',
  },
}

// Orange tones for avatars — warm shades so they still read as the same palette
const AVATAR_BG = [
  'linear-gradient(135deg, #ff6b3d 0%, #ff8c42 100%)',
  'linear-gradient(135deg, #ff8c42 0%, #ffb347 100%)',
  'linear-gradient(135deg, #e85d2e 0%, #ff6b3d 100%)',
  'linear-gradient(135deg, #ffb347 0%, #ff8c42 100%)',
]

export default function AssignmentCard() {
  return (
    <div
      className="rounded-2xl p-5 h-full flex flex-col cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
      style={{
        background: 'linear-gradient(145deg, rgba(26,20,16,0.95) 0%, rgba(18,14,10,0.9) 100%)',
        border: '1px solid rgba(255, 107, 61, 0.15)',
        boxShadow: '0 4px 24px rgba(255, 107, 61, 0.06)',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255, 107, 61, 0.35)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255, 107, 61, 0.14)'}
    >
      <h3 className="font-display font-semibold text-ink mb-4">Assignments for the team</h3>

      <div className="flex flex-col gap-3">
        {assignments.map((a, i) => {
          const assignee = members.find((m) => m.id === a.assignee)
          const status = STATUS_CONFIG[a.status] ?? STATUS_CONFIG['Pending']
          return (
            <div
              key={a.id}
              className="flex items-center gap-3 py-2"
              style={{ borderBottom: '1px solid rgba(255, 107, 61, 0.08)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono text-white shrink-0"
                style={{ background: AVATAR_BG[i % AVATAR_BG.length] }}
              >
                {assignee?.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-ink truncate">{a.task}</p>
                <p className="text-[11px] text-muted font-mono">{a.id} · {a.team}</p>
              </div>
              <span
                className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full"
                style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}` }}
              >
                {a.status}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
