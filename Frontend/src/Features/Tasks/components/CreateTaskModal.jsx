import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

const inputStyle = {
  background: 'rgba(255, 107, 61, 0.04)',
  border: '1px solid rgba(255, 107, 61, 0.15)',
  color: '#fff0e8',
}

export default function CreateTaskModal({ isOpen, onClose, onCreate, projects = [], members = [] }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projectId, setProjectId] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [assignee, setAssignee] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const titleInputRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => {
      setTitle('')
      setDescription('')
      setProjectId('')
      setPriority('medium')
      setDueDate('')
      setAssignee('')
      titleInputRef.current?.focus()
    }, 0)
    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || submitting) return
    setSubmitting(true)
    try {
      await onCreate({
        title: title.trim(),
        description: description.trim() || undefined,
        projectId: projectId || undefined,
        priority,
        dueDate: dueDate || undefined,
        assignee: assignee || undefined,
      })
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-task-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-6 rounded-2xl border border-accent/18"
        style={{
          background: 'linear-gradient(145deg, rgba(26,20,16,0.98) 0%, rgba(18,14,10,0.95) 100%)',
          boxShadow: '0 8px 32px rgba(255, 107, 61, 0.12)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 id="create-task-title" className="font-display font-semibold text-lg text-ink">
            Create task
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-muted border border-accent/10 transition-all duration-200 hover:bg-accent/8 hover:text-ink"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="task-title" className="block text-xs text-muted mb-1.5">
              Task title
            </label>
            <input
              id="task-title"
              ref={titleInputRef}
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fix login redirect bug"
              className="w-full rounded-lg px-3 py-2 text-sm placeholder:text-muted outline-none transition-all duration-200 focus:border-accent/55"
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="task-description" className="block text-xs text-muted mb-1.5">
              Description
            </label>
            <textarea
              id="task-description"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any extra detail teammates should know"
              className="w-full rounded-lg px-3 py-2 text-sm placeholder:text-muted outline-none transition-all duration-200 resize-none focus:border-accent/55"
              style={inputStyle}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="task-priority" className="block text-xs text-muted mb-1.5">
                Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-accent/55"
                style={inputStyle}
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#1a1410]">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="task-due" className="block text-xs text-muted mb-1.5">
                Due date
              </label>
              <input
                id="task-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-accent/55"
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label htmlFor="task-project" className="block text-xs text-muted mb-1.5">
              Project <span className="text-muted/70">(optional)</span>
            </label>
            <select
              id="task-project"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-accent/55"
              style={inputStyle}
            >
              <option value="" className="bg-[#1a1410]">No project (personal task)</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id} className="bg-[#1a1410]">
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {members.length > 0 && (
            <div>
              <label htmlFor="task-assignee" className="block text-xs text-muted mb-1.5">
                Assign to <span className="text-muted/70">(optional)</span>
              </label>
              <select
                id="task-assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-accent/55"
                style={inputStyle}
              >
                <option value="" className="bg-[#1a1410]">Me</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id} className="bg-[#1a1410]">
                    {member.fullName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm font-medium rounded-xl py-2.5 transition-all duration-200 text-muted border border-accent/15 hover:border-accent/30 hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 text-white text-sm font-semibold rounded-xl py-2.5 transition-all duration-200 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
                boxShadow: '0 4px 14px rgba(255, 107, 61, 0.35)',
              }}
            >
              {submitting ? 'Creating…' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
