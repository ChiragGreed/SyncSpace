import EmptyState from './EmptyState.jsx'

const STATUS_RANK = { 'in-progress': 0, todo: 1 }

// #ffb347 isn't one of the theme's named tokens, so this one status keeps
// an explicit style to match the app's existing exact palette.
const STATUS_CONFIG = {
  todo: { label: 'To do', className: 'border bg-accent/12 text-accentLight border-accent/25' },
  'in-progress': { label: 'In progress', style: { background: 'rgba(255, 179, 71, 0.12)', color: '#ffb347', border: '1px solid rgba(255, 179, 71, 0.25)' } },
}

// Orange tones for avatars — warm shades so they still read as the same palette
const AVATAR_BG = [
  'linear-gradient(135deg, #ff6b3d 0%, #ff8c42 100%)',
  'linear-gradient(135deg, #ff8c42 0%, #ffb347 100%)',
  'linear-gradient(135deg, #e85d2e 0%, #ff6b3d 100%)',
  'linear-gradient(135deg, #ffb347 0%, #ff8c42 100%)',
]

const initialsFor = (name = '') =>
  name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || '—'

// Shows the current user's own open tasks. There is no backend endpoint for
// a team-wide assignment feed (getTasks only returns tasks assigned to the
// caller), so this card is scoped to "your assignments" rather than the
// team's, using real task data instead of the old mock.
export default function AssignmentCard({ tasks = [], userName = '' }) {
  const openTasks = tasks
    .filter((task) => task.status !== 'done')
    .sort((a, b) => (STATUS_RANK[a.status] ?? 99) - (STATUS_RANK[b.status] ?? 99))
    .slice(0, 5)

  return (
    <div
      className="rounded-2xl p-5 h-full flex flex-col cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 border border-accent/15 hover:border-accent/35"
      style={{
        background: 'linear-gradient(145deg, rgba(26,20,16,0.95) 0%, rgba(18,14,10,0.9) 100%)',
        boxShadow: '0 4px 24px rgba(255, 107, 61, 0.06)',
      }}
    >
      <h3 className="font-display font-semibold text-ink mb-4">Your assignments</h3>

      {openTasks.length === 0 ? (
        <div className="flex-1 flex items-center">
          <EmptyState title="Nothing open" description="You're all caught up on your tasks." />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {openTasks.map((task, i) => {
            const status = STATUS_CONFIG[task.status] ?? STATUS_CONFIG.todo
            return (
              <div
                key={task.id}
                className="flex items-center gap-3 py-2 border-b border-accent/8 last:border-0"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono text-white shrink-0"
                  style={{ background: AVATAR_BG[i % AVATAR_BG.length] }}
                >
                  {initialsFor(userName)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-ink truncate">{task.title}</p>
                  <p className="text-[11px] text-muted font-mono truncate">{task.project}</p>
                </div>
                <span
                  className={`shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full ${status.className ?? ''}`}
                  style={status.style}
                >
                  {status.label}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
