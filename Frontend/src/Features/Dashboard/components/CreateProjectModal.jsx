import { useEffect, useRef, useState } from 'react'
import { X, Check } from 'lucide-react'
import { members } from '../../../mockData.js'

const AVATAR_BG = [
  'linear-gradient(135deg, #ff6b3d 0%, #ff8c42 100%)',
  'linear-gradient(135deg, #ff8c42 0%, #ffb347 100%)',
  'linear-gradient(135deg, #e85d2e 0%, #ff6b3d 100%)',
  'linear-gradient(135deg, #ffb347 0%, #ff8c42 100%)',
]

export default function CreateProjectModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onCreate({
      id: `p${Date.now()}`,
      name: name.trim(),
      description: description.trim() || 'No description yet.',
      progress: 0,
      status: 'in-progress',
      dueDate: dueDate || 'No due date',
      members: selectedMembers,
      tasksTotal: 0,
      tasksDone: 0,
    })
    onClose()
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
        className="w-full max-w-md p-6 rounded-2xl"
        style={{
          background: 'linear-gradient(145deg, rgba(26,20,16,0.98) 0%, rgba(18,14,10,0.95) 100%)',
          border: '1px solid rgba(255, 107, 61, 0.18)',
          boxShadow: '0 8px 32px rgba(255, 107, 61, 0.12)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 id="create-project-title" className="font-display font-semibold text-lg" style={{ color: '#fff0e8' }}>
            Create project
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-muted transition-all duration-200"
            style={{ border: '1px solid rgba(255, 107, 61, 0.1)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,61,0.08)'; e.currentTarget.style.color = '#fff0e8' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#7a7070' }}
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
              className="w-full rounded-lg px-3 py-2 text-sm placeholder:text-muted outline-none transition-all duration-200"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(255, 107, 61, 0.55)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255, 107, 61, 0.15)'}
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
              className="w-full rounded-lg px-3 py-2 text-sm placeholder:text-muted outline-none transition-all duration-200 resize-none"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(255, 107, 61, 0.55)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255, 107, 61, 0.15)'}
            />
          </div>

          {/* Due date */}
          <div>
            <label htmlFor="project-due" className="block text-xs text-muted mb-1.5">
              Due date
            </label>
            <input
              id="project-due"
              type="text"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="e.g. Sep 30"
              className="w-full rounded-lg px-3 py-2 text-sm placeholder:text-muted outline-none transition-all duration-200"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(255, 107, 61, 0.55)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255, 107, 61, 0.15)'}
            />
          </div>

          {/* Team members */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs text-muted">
                Invite team members
              </label>
              {selectedMembers.length > 0 && (
                <span className="text-[10px] font-mono" style={{ color: '#ff8c42' }}>
                  {selectedMembers.length} selected
                </span>
              )}
            </div>
            <div
              className="rounded-xl p-3"
              style={{
                background: 'rgba(255, 107, 61, 0.04)',
                border: '1px solid rgba(255, 107, 61, 0.12)',
              }}
            >
              <div className="flex flex-col gap-2">
                {members.map((member, i) => {
                  const isSelected = selectedMembers.includes(member.id)
                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => toggleMember(member.id)}
                      className="flex items-center gap-3 w-full rounded-lg px-2 py-1.5 text-left transition-all duration-200"
                      style={{
                        background: isSelected ? 'rgba(255, 107, 61, 0.1)' : 'transparent',
                        border: isSelected
                          ? '1px solid rgba(255, 107, 61, 0.3)'
                          : '1px solid transparent',
                      }}
                    >
                      {/* Avatar */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-mono text-white shrink-0"
                        style={{ background: AVATAR_BG[i % AVATAR_BG.length] }}
                      >
                        {member.initials}
                      </div>

                      {/* Name */}
                      <span
                        className="text-sm flex-1"
                        style={{ color: isSelected ? '#fff0e8' : '#7a7070' }}
                      >
                        {member.name}
                      </span>

                      {/* Check indicator */}
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
                        style={{
                          background: isSelected
                            ? 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)'
                            : 'rgba(255, 107, 61, 0.08)',
                          border: isSelected
                            ? 'none'
                            : '1px solid rgba(255, 107, 61, 0.2)',
                        }}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm font-medium rounded-xl py-2.5 transition-all duration-200"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 107, 61, 0.15)',
                color: '#7a7070',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,107,61,0.3)'; e.currentTarget.style.color = '#fff0e8' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,107,61,0.15)'; e.currentTarget.style.color = '#7a7070' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 text-white text-sm font-semibold rounded-xl py-2.5 transition-all duration-200 hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
                boxShadow: '0 4px 14px rgba(255, 107, 61, 0.35)',
              }}
            >
              Create project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}