import { useState } from 'react'
import RadialProgress from './RadialProgress.jsx'

// An ObjectId's first 4 bytes encode its creation time — used here so we
// can show "time elapsed toward the deadline" without needing a separate
// createdAt field on the task model.
const createdAtFromObjectId = (id) => {
  if (!id || typeof id !== 'string' || id.length < 8) return null
  const seconds = parseInt(id.substring(0, 8), 16)
  return Number.isNaN(seconds) ? null : new Date(seconds * 1000)
}

const formatRemaining = (dueDate, now) => {
  const diffMs = dueDate.getTime() - now
  const diffHours = Math.round(diffMs / (1000 * 60 * 60))

  if (diffMs < 0) {
    const overdueDays = Math.max(1, Math.round(-diffMs / (1000 * 60 * 60 * 24)))
    return `Overdue by ${overdueDays} day${overdueDays === 1 ? '' : 's'}`
  }
  if (diffHours < 24) return diffHours <= 1 ? 'Due within the hour' : `${diffHours} hr remaining`
  const diffDays = Math.round(diffHours / 24)
  return `${diffDays} day${diffDays === 1 ? '' : 's'} remaining`
}

// Finds the closest upcoming (or most overdue) incomplete task with a due
// date — this replaces the hardcoded mock "deadlineTask" with real data.
const pickUrgentTask = (tasks) => {
  const withDueDates = tasks.filter((t) => t.status !== 'done' && t.dueDateRaw)
  if (withDueDates.length === 0) return null
  return [...withDueDates].sort((a, b) => a.dueDateRaw - b.dueDateRaw)[0]
}

export default function DeadlineCard({ tasks = [], onCompleteTask }) {
  const [completing, setCompleting] = useState(false)
  // Lazy initializer: the one place it's safe to read the clock once,
  // rather than calling Date.now() directly during render.
  const [now] = useState(() => Date.now())
  const urgentTask = pickUrgentTask(tasks)

  const handleComplete = async () => {
    if (!urgentTask || completing) return
    setCompleting(true)
    try {
      await onCompleteTask?.(urgentTask.id)
    } finally {
      setCompleting(false)
    }
  }

  let progress = 0
  let remainingLabel = 'No upcoming deadlines'

  if (urgentTask) {
    const createdAt = createdAtFromObjectId(urgentTask.id) ?? new Date(urgentTask.dueDateRaw.getTime() - 1000 * 60 * 60 * 24 * 7)
    const totalWindow = urgentTask.dueDateRaw.getTime() - createdAt.getTime()
    const elapsed = now - createdAt.getTime()
    progress = totalWindow > 0 ? Math.min(100, Math.max(0, Math.round((elapsed / totalWindow) * 100))) : 100
    remainingLabel = formatRemaining(urgentTask.dueDateRaw, now)
  }

  return (
    <div
      className="rounded-2xl p-5 h-full flex flex-col items-center text-center cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 border border-accent/15 hover:border-accent/35"
      style={{
        background: 'linear-gradient(145deg, rgba(26,20,16,0.95) 0%, rgba(18,14,10,0.9) 100%)',
        boxShadow: '0 4px 24px rgba(255, 107, 61, 0.06)',
      }}
    >
      <div className="w-full flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-ink text-left">Deadline</h3>
        <span className="text-[10px] text-muted font-mono truncate max-w-[9rem]">
          {urgentTask ? urgentTask.title : 'All clear'}
        </span>
      </div>

      <RadialProgress value={progress} highlighted size={110} stroke={8} />

      <p className="text-xs text-muted mt-4 mb-4">{remainingLabel}</p>

      <button
        type="button"
        onClick={handleComplete}
        disabled={!urgentTask || completing}
        className="w-full text-white text-sm font-semibold rounded-xl py-2.5 transition-all duration-200 hover:brightness-110 mt-auto disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
        style={{
          background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
          boxShadow: '0 4px 16px rgba(255, 107, 61, 0.4)',
        }}
      >
        {completing ? 'Marking complete…' : 'Mark as complete'}
      </button>
    </div>
  )
}
