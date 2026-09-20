const PRIORITY_CONFIG = {
  high: { bg: 'rgba(255, 107, 61, 0.15)', color: '#ff6b3d', border: 'rgba(255, 107, 61, 0.3)' },
  medium: { bg: 'rgba(255, 179, 71, 0.12)', color: '#ffb347', border: 'rgba(255, 179, 71, 0.25)' },
  low: { bg: 'rgba(122, 112, 112, 0.1)', color: '#7a7070', border: 'rgba(122, 112, 112, 0.2)' },
}

const STATUS_LABEL = {
  todo: 'To do',
  'in-progress': 'In progress',
  done: 'Done',
}

// Status dot colors — orange palette
const STATUS_DOT = {
  done: '#ffb347',
  'in-progress': '#ff6b3d',
  todo: 'rgba(122, 112, 112, 0.5)',
}

export default function TaskRow({ task, user }) {
  const assignee = user;
  const priority = PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG.low

  return (
    <div
      className="flex items-center gap-3 py-3 px-1 transition-all duration-200 hover:bg-orange-500/[0.03] rounded-lg last:border-0"
      style={{ borderBottom: '1px solid rgba(255, 107, 61, 0.08)' }}
    >
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: STATUS_DOT[task.status] ?? 'rgba(122,112,112,0.5)' }}
      />
      <div className="min-w-0 flex-1">
        <p className={`text-sm truncate ${task.status === 'done' ? 'text-muted line-through' : 'text-ink'}`}>
          {task.title}
        </p>
        <p className="text-[11px] text-muted truncate">{task.project}</p>
      </div>
      <span
        className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono shrink-0"
        style={{ background: priority.bg, color: priority.color, border: `1px solid ${priority.border}` }}
      >
        {task.priority}
      </span>
      <span className="hidden md:inline text-[11px] text-muted w-20 shrink-0">{STATUS_LABEL[task.status]}</span>
      <span className="text-[11px] text-muted font-mono w-14 shrink-0 text-right">{task.due}</span>
      {assignee && (
        <div
          title={assignee}
          className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-mono text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)' }}
        >
          {(assignee)
            .split(' ')
            .map((name) => name[0])
            .join('')
            .slice(0, 2)}
        </div>
      )}
    </div>
  )
}
