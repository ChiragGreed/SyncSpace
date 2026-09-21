import { useEffect, useState } from 'react'
import { ArrowLeft, CalendarDays, Check, Edit3, FolderKanban, Save, Trash2, UserRound, X } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useTask from '../hook/useTask.js'

const STATUS_OPTIONS = [
    { value: 'toDo', label: 'To do', color: '#a99d98', background: 'rgba(169, 157, 152, 0.1)' },
    { value: 'inProgress', label: 'In progress', color: '#ff8c42', background: 'rgba(255, 107, 61, 0.12)' },
    { value: 'completed', label: 'Completed', color: '#ffb347', background: 'rgba(255, 179, 71, 0.12)' },
]

const PRIORITY_STYLES = {
    high: { color: '#ff6b3d', background: 'rgba(255, 107, 61, 0.12)' },
    medium: { color: '#ffb347', background: 'rgba(255, 179, 71, 0.12)' },
    low: { color: '#a99d98', background: 'rgba(169, 157, 152, 0.1)' },
}

const initialsFor = (person) => {
    if (!person) return '?'
    if (person.initials) return person.initials
    return (person.fullName || person.name || String(person)).split(' ').map((part) => part[0]).join('').slice(0, 2)
}

const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No due date'
const toInputDate = (date) => date ? new Date(date).toISOString().slice(0, 10) : ''

export default function TaskDetail() {
    const navigate = useNavigate()
    const { taskId } = useParams()
    const { getTask, updateTask, updateTaskStatus, deleteTask } = useTask()
    const { assignee, title, description, projectId, status, priority, dueDate } = useSelector((state) => state.task)
    const [isEditing, setIsEditing] = useState(false)
    const [form, setForm] = useState({ title: '', description: '', dueDate: '' })
    const [notice, setNotice] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!taskId) return
        setLoading(true)
        getTask(taskId).finally(() => setLoading(false))
    }, [getTask, taskId])

    useEffect(() => {
        setForm({ title: title || '', description: description || '', dueDate: toInputDate(dueDate) })
    }, [title, description, dueDate])

    const activeStatus = STATUS_OPTIONS.find((option) => option.value === status) ?? STATUS_OPTIONS[0]
    const priorityStyle = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.medium
    const projectName = projectId?.title || 'Personal task'
    const personName = assignee?.fullName || assignee?.name || 'Unassigned'

    const saveTask = async (event) => {
        event.preventDefault()
        await updateTask(taskId, { ...form, dueDate: form.dueDate || undefined })
        setIsEditing(false)
        setNotice('Task details updated')
    }

    const changeStatus = async (event) => {
        await updateTaskStatus(taskId, event.target.value)
        setNotice('Task status updated')
    }

    const removeTask = async () => {
        if (!window.confirm('Delete this task? This action cannot be undone.')) return
        await deleteTask(taskId)
        navigate('/')
    }

    if (loading) return <main className="mx-auto max-w-5xl px-5 py-8 text-sm text-muted md:px-8">Loading task...</main>

    return (
        <main className="relative z-10 mx-auto max-w-5xl px-5 py-6 pb-24 md:px-8 md:py-8">
            <div className="mb-7 flex items-center justify-between gap-4">
                <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-ink"><ArrowLeft className="h-4 w-4" /> Back</button>
                <button type="button" onClick={removeTask} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-[#ff8c78] transition-colors hover:bg-orange-500/8"><Trash2 className="h-3.5 w-3.5" /> Delete task</button>
            </div>

            <section className="mb-5 rounded-2xl p-6 md:p-8" style={{ background: 'linear-gradient(145deg, rgba(26,20,16,0.96) 0%, rgba(18,14,10,0.92) 100%)', border: '1px solid rgba(255,107,61,0.16)', boxShadow: '0 4px 24px rgba(255,107,61,0.06)' }}>
                <div className="mb-5 flex flex-wrap items-center gap-2"><span className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider" style={{ color: activeStatus.color, background: activeStatus.background, border: `1px solid ${activeStatus.color}44` }}>{activeStatus.label}</span>{priority && <span className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider" style={{ color: priorityStyle.color, background: priorityStyle.background }}>{priority} priority</span>}</div>
                {isEditing ? (
                    <form onSubmit={saveTask} className="space-y-4">
                        <input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="w-full rounded-lg px-3 py-2 text-xl font-semibold outline-none" style={{ background: 'rgba(255,107,61,0.05)', border: '1px solid rgba(255,107,61,0.2)', color: '#fff0e8' }} />
                        <textarea rows={4} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Add a description" className="w-full resize-none rounded-lg px-3 py-2 text-sm leading-6 outline-none placeholder:text-muted" style={{ background: 'rgba(255,107,61,0.05)', border: '1px solid rgba(255,107,61,0.2)', color: '#fff0e8' }} />
                        <label className="block text-xs text-muted">Due date<input type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} className="mt-1 block rounded-lg px-3 py-2 text-sm outline-none" style={{ background: 'rgba(255,107,61,0.05)', border: '1px solid rgba(255,107,61,0.2)', color: '#fff0e8' }} /></label>
                        <div className="flex gap-2"><button type="submit" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #ff6b3d, #ffb347)' }}><Save className="h-3.5 w-3.5" /> Save changes</button><button type="button" onClick={() => setIsEditing(false)} className="rounded-lg px-3 py-2 text-xs text-muted hover:text-ink">Cancel</button></div>
                    </form>
                ) : (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h1 className="font-display text-2xl font-bold text-ink md:text-4xl">{title || 'Task details'}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{description || 'No description yet.'}</p></div><button type="button" onClick={() => setIsEditing(true)} className="flex shrink-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#ffb347] transition-colors hover:bg-orange-500/8" style={{ border: '1px solid rgba(255,107,61,0.22)' }}><Edit3 className="h-3.5 w-3.5" /> Edit task</button></div>
                )}
            </section>

            {notice && <div className="mb-5 flex items-center justify-between rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(255,107,61,0.1)', border: '1px solid rgba(255,107,61,0.2)', color: '#ffb347' }}>{notice}<button type="button" aria-label="Dismiss notification" onClick={() => setNotice('')}><X className="h-4 w-4" /></button></div>}

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(145deg, rgba(26,20,16,0.95), rgba(18,14,10,0.9))', border: '1px solid rgba(255,107,61,0.14)' }}><div className="mb-3 flex items-center justify-between"><span className="text-xs text-muted">Status</span><Check className="h-4 w-4 text-accentLight" /></div><select value={status || 'toDo'} onChange={changeStatus} className="w-full appearance-none bg-transparent font-display text-sm font-semibold text-ink outline-none">{STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value} className="bg-[#1a1410]">{option.label}</option>)}</select></div>
                <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(145deg, rgba(26,20,16,0.95), rgba(18,14,10,0.9))', border: '1px solid rgba(255,107,61,0.14)' }}><div className="mb-3 flex items-center justify-between"><span className="text-xs text-muted">Due date</span><CalendarDays className="h-4 w-4 text-accentLight" /></div><p className="font-display text-sm font-semibold text-ink">{formatDate(dueDate)}</p></div>
                <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(145deg, rgba(26,20,16,0.95), rgba(18,14,10,0.9))', border: '1px solid rgba(255,107,61,0.14)' }}><div className="mb-3 flex items-center justify-between"><span className="text-xs text-muted">Assigned to</span><UserRound className="h-4 w-4 text-accentLight" /></div><div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-accent to-[#ffb347] font-mono text-[10px] text-white">{initialsFor(assignee)}</span><span className="truncate font-display text-sm font-semibold text-ink">{personName}</span></div></div>
                <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(145deg, rgba(26,20,16,0.95), rgba(18,14,10,0.9))', border: '1px solid rgba(255,107,61,0.14)' }}><div className="mb-3 flex items-center justify-between"><span className="text-xs text-muted">Project</span><FolderKanban className="h-4 w-4 text-accentLight" /></div><p className="truncate font-display text-sm font-semibold text-ink">{projectName}</p></div>
            </section>
        </main>
    )
}
