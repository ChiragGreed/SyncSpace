import { useEffect, useRef, useState } from 'react'
import { X, Check } from 'lucide-react'
import EmptyState from './EmptyState.jsx'

const AVATAR_BG = [
  'linear-gradient(135deg, #ff6b3d 0%, #ff8c42 100%)',
  'linear-gradient(135deg, #ff8c42 0%, #ffb347 100%)',
  'linear-gradient(135deg, #e85d2e 0%, #ff6b3d 100%)',
  'linear-gradient(135deg, #ffb347 0%, #ff8c42 100%)',
]

const initialsFor = (name = '') =>
  name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || '—'

export default function CreateProjectModal({ isOpen, onClose, onCreate, members = [], membersLoading = false }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const nameInputRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => {
      setName('')
      setDescription('')
      setDueDate('')
      setSelectedMembers([])
      nameInputRef.current?.focus()
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

  const toggleMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || submitting) return
    setSubmitting(true)
    try {
      await onCreate({
        name: name.trim(),
        description: description.trim() || 'No description yet.',
        dueDate: dueDate || undefined,
        members: selectedMembers,
      })
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    background: 'rgba(255, 107, 61, 0.04)',
    border: '1px solid rgba(255, 107, 61, 0.15)',
    color: '#fff0e8',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-project-title"
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
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 id="create-project-title" className="font-display font-semibold text-lg text-ink">
            Create project
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
          {/* Project name */}
          <div>
            <label htmlFor="project-name" className="block text-xs text-muted mb-1.5">
              Project name
            </label>
            <input
              id="project-name"
              ref={nameInputRef}
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Notifications Service"
              className="w-full rounded-lg px-3 py-2 text-sm placeholder:text-muted outline-none transition-all duration-200 focus:border-accent/55"
              style={inputStyle}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="project-description" className="block text-xs text-muted mb-1.5">
              Description
            </label>
            <textarea
              id="project-description"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this project about?"
              className="w-full rounded-lg px-3 py-2 text-sm placeholder:text-muted outline-none transition-all duration-200 resize-none focus:border-accent/55"
              style={inputStyle}
            />
          </div>

          {/* Due date */}
          <div>
            <label htmlFor="project-due" className="block text-xs text-muted mb-1.5">
              Due date
            </label>
            <input
              id="project-due"
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm placeholder:text-muted outline-none transition-all duration-200 focus:border-accent/55"
              style={inputStyle}
            />
          </div>

          {/* Team members */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs text-muted">
                Invite team members
              </label>
              {selectedMembers.length > 0 && (
                <span className="text-[10px] font-mono text-accentLight">
                  {selectedMembers.length} selected
                </span>
              )}
            </div>
            <div className="rounded-xl p-3 bg-accent/4 border border-accent/12">
              {membersLoading ? (
                <p className="text-xs text-muted py-2 text-center">Loading teammates…</p>
              ) : members.length === 0 ? (
                <EmptyState title="No teammates yet" description="Invite people from the Teammates tab first." />
              ) : (
                <div className="flex flex-col gap-2">
                  {members.map((member, i) => {
                    const isSelected = selectedMembers.includes(member._id)
                    return (
                      <button
                        key={member._id}
                        type="button"
                        onClick={() => toggleMember(member._id)}
                        className={`flex items-center gap-3 w-full rounded-lg px-2 py-1.5 text-left transition-all duration-200 border ${isSelected ? 'bg-accent/10 border-accent/30' : 'bg-transparent border-transparent'}`}
                      >
                        {/* Avatar */}
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-mono text-white shrink-0"
                          style={{ background: AVATAR_BG[i % AVATAR_BG.length] }}
                        >
                          {initialsFor(member.fullName)}
                        </div>

                        {/* Name */}
                        <span className={`text-sm flex-1 truncate ${isSelected ? 'text-ink' : 'text-muted'}`}>
                          {member.fullName}
                        </span>

                        {/* Check indicator */}
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${isSelected ? '' : 'bg-accent/8 border border-accent/20'}`}
                          style={isSelected ? { background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)' } : undefined}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
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
              {submitting ? 'Creating…' : 'Create project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
