import { useState } from 'react'
import { ArrowLeft, CalendarDays, Check, ChevronDown, Edit3, MailPlus, MoreHorizontal, Plus, Save, Trash2, Users, X, } from 'lucide-react'
import ProgressBar from '../../Dashboard/components/ProgressBar.jsx'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useProject from '../hook/useProject.js'
import { useSelector } from 'react-redux'

const AVATAR_BACKGROUNDS = [
    'linear-gradient(135deg, #ff6b3d 0%, #ff8c42 100%)',
    'linear-gradient(135deg, #e85d2e 0%, #ff6b3d 100%)',
    'linear-gradient(135deg, #ff8c42 0%, #ffb347 100%)',
]

const STATUS_STYLES = {
    'in-progress': { label: 'In progress', color: '#ff8c42', background: 'rgba(255, 107, 61, 0.12)' },
    done: { label: 'Completed', color: '#ffb347', background: 'rgba(255, 179, 71, 0.12)' },
}

const normalizeStatus = (status) => ({
    inProgress: 'in-progress',
    completed: 'done',
    'in-progress': 'in-progress',
    done: 'done',
}[status] ?? 'in-progress')

const normalizeTask = (task) => ({
    ...task,
    id: task._id || task.id,
    statuses: {
        toDo: 'todo',
        inProgress: 'in-progress',
        completed: 'done',
        todo: 'todo',
        'in-progress': 'in-progress',
        done: 'done',
    }[task.statuses || task.status] ?? 'todo',
    due: task.due || (task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'),
})

const toInputDate = (date) => date ? new Date(date).toISOString().slice(0, 10) : ''

const PRIORITY_STYLES = {
    high: { color: '#ff6b3d', background: 'rgba(255, 107, 61, 0.12)' },
    medium: { color: '#ffb347', background: 'rgba(255, 179, 71, 0.12)' },
    low: { color: '#a99d98', background: 'rgba(169, 157, 152, 0.1)' },
}

const initialsFor = (member) => {
    if (member.initials) return member.initials
    return (member.fullName || member.name || String(member))
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
}

function Avatar({ member, index = 0, size = 'normal' }) {
    return (
        <div
            title={member.fullName || member.name}
            className={`${size === 'large' ? 'h-10 w-10 text-xs' : 'h-7 w-7 text-[10px]'} flex shrink-0 items-center justify-center rounded-full font-mono text-white`}
            style={{ background: AVATAR_BACKGROUNDS[index % AVATAR_BACKGROUNDS.length] }}
        >
            {initialsFor(member)}
        </div>
    )
}

export default function ProjectDetail() {
    const [projectTasks, setProjectTasks] = useState([])
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [taskTitle, setTaskTitle] = useState('')
    const [showInviteForm, setShowInviteForm] = useState(false)
    const [inviteEmail, setInviteEmail] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const [notice, setNotice] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [form, setForm] = useState({ title: '', description: '', dueDate: '' })
    const { getProject, updateProject } = useProject();
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { title, admin, description, status, members, dueDate, projectTasks: storedTasks } = useSelector((state) => state.project);

    useEffect(() => {
        if (projectId) getProject(projectId);
    }, [getProject, projectId])

    useEffect(() => {
        setProjectTasks(storedTasks.map(normalizeTask));
    }, [storedTasks]);

    useEffect(() => {
        setForm({ title: title || '', description: description || '', dueDate: toInputDate(dueDate) })
    }, [title, description, dueDate]);

    const normalizedStatus = normalizeStatus(status)
    const statusStyle = STATUS_STYLES[normalizedStatus] ?? STATUS_STYLES['in-progress']
    const completedTasks = projectTasks.filter((task) => task.statuses === 'done').length
    const progress = normalizedStatus === 'done'
        ? 100
        : projectTasks.length ? Math.round((completedTasks / projectTasks.length) * 100) : 0

    const addTask = (event) => {
        event.preventDefault()
        if (!taskTitle.trim()) return
        setProjectTasks((current) => [
            ...current,
            { id: `new-${Date.now()}`, title: taskTitle.trim(), statuses: 'todo', priority: 'medium', due: 'No date', assignee: '' },
        ])
        setTaskTitle('')
        setShowTaskForm(false)
    }

    const inviteTeammate = (event) => {
        event.preventDefault()
        if (!inviteEmail.trim()) return
        setNotice(`Invite sent for ${inviteEmail.trim()}`)
        setInviteEmail('')
        setShowInviteForm(false)
    }

    const toggleTask = (taskId) => {
        setProjectTasks((current) => current.map((task) => (
            task.id === taskId ? { ...task, statuses: task.statuses === 'done' ? 'todo' : 'done' } : task
        )))
    }

    const saveProject = async (event) => {
        event.preventDefault()
        await updateProject(projectId, { ...form, dueDate: form.dueDate || undefined })
        setIsEditing(false)
        setShowMenu(false)
        setNotice('Project details updated')
    }

    return (
        <main className="relative z-10 mx-auto max-w-6xl px-5 py-6 pb-24 md:px-8 md:py-8">
            <div className="mb-7 flex items-center justify-between gap-4">
                <button
                    type="button"
                    className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-ink"
                    onClick={()=>{navigate('/')}}
                >
                    <ArrowLeft className="h-4 w-4" />
                    All projects
                </button>
                <div className="relative">
                    <button
                        type="button"
                        aria-label="Project actions"
                        onClick={() => setShowMenu((current) => !current)}
                        className="rounded-lg p-2 text-muted transition-colors hover:bg-orange-500/8 hover:text-ink"
                    >
                        <MoreHorizontal className="h-5 w-5" />
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 top-10 z-20 w-36 rounded-xl p-1" style={{ background: '#1a1410', border: '1px solid rgba(255,107,61,0.2)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                            <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-muted hover:bg-orange-500/8 hover:text-ink" onClick={() => { setIsEditing(true); setShowMenu(false) }}>
                                <Edit3 className="h-3.5 w-3.5" /> Edit project
                            </button>
                            <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-[#ff8c78] hover:bg-orange-500/8" onClick={() => setNotice('Delete confirmation will be connected soon.')}>
                                <Trash2 className="h-3.5 w-3.5" /> Delete project
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <section className="mb-8 rounded-2xl p-6 md:p-8" style={{ background: 'linear-gradient(145deg, rgba(26,20,16,0.96) 0%, rgba(18,14,10,0.92) 100%)', border: '1px solid rgba(255,107,61,0.16)', boxShadow: '0 4px 24px rgba(255,107,61,0.06)' }}>
                <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            <span className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider" style={{ color: statusStyle.color, background: statusStyle.background, border: `1px solid ${statusStyle.color}44` }}>{statusStyle.label}</span>
                            <span className="flex items-center gap-1.5 text-xs text-muted"><CalendarDays className="h-3.5 w-3.5" /> Due {dueDate ? new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date'}</span>
                        </div>
                        {isEditing ? (
                            <form onSubmit={saveProject} className="space-y-4">
                                <input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="w-full rounded-lg px-3 py-2 text-xl font-semibold outline-none md:text-3xl" style={{ background: 'rgba(255,107,61,0.05)', border: '1px solid rgba(255,107,61,0.2)', color: '#fff0e8' }} />
                                <textarea rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Add a description" className="w-full resize-none rounded-lg px-3 py-2 text-sm leading-6 outline-none placeholder:text-muted" style={{ background: 'rgba(255,107,61,0.05)', border: '1px solid rgba(255,107,61,0.2)', color: '#fff0e8' }} />
                                <label className="block text-xs text-muted">Due date<input type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} className="mt-1 block rounded-lg px-3 py-2 text-sm outline-none" style={{ background: 'rgba(255,107,61,0.05)', border: '1px solid rgba(255,107,61,0.2)', color: '#fff0e8' }} /></label>
                                <div className="flex gap-2"><button type="submit" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #ff6b3d, #ffb347)' }}><Save className="h-3.5 w-3.5" /> Save changes</button><button type="button" onClick={() => setIsEditing(false)} className="rounded-lg px-3 py-2 text-xs text-muted hover:text-ink">Cancel</button></div>
                            </form>
                        ) : (
                            <><h1 className="font-display text-2xl font-bold text-ink md:text-4xl">{title || 'Project details'}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-muted">{description || 'No description yet.'}</p></>
                        )}
                    </div>
                    <div className="min-w-47.5 rounded-xl p-4" style={{ background: 'rgba(255,107,61,0.05)', border: '1px solid rgba(255,107,61,0.1)' }}>
                        <div className="mb-2 flex items-center justify-between text-xs text-muted"><span>Overall progress</span><span className="font-mono text-ink">{progress}%</span></div>
                        <ProgressBar value={progress} />
                        <p className="mt-3 text-[11px] text-muted">{completedTasks} of {projectTasks.length} tasks complete</p>
                    </div>
                </div>
            </section>

            {notice && <div className="mb-5 flex items-center justify-between rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(255,107,61,0.1)', border: '1px solid rgba(255,107,61,0.2)', color: '#ffb347' }}>{notice}<button type="button" aria-label="Dismiss notification" onClick={() => setNotice('')}><X className="h-4 w-4" /></button></div>}

            <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
                <section className="rounded-2xl p-5 md:p-6" style={{ background: 'linear-gradient(145deg, rgba(26,20,16,0.95) 0%, rgba(18,14,10,0.9) 100%)', border: '1px solid rgba(255,107,61,0.14)' }}>
                    <div className="mb-4 flex items-center justify-between"><div><h2 className="font-display font-semibold text-ink">Project tasks</h2><p className="mt-1 text-xs text-muted">Keep the team moving one task at a time.</p></div><button type="button" onClick={() => setShowTaskForm((current) => !current)} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-all hover:brightness-110" style={{ background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)', boxShadow: '0 3px 12px rgba(255,107,61,0.25)' }}><Plus className="h-3.5 w-3.5" /> Add task</button></div>
                    {showTaskForm && <form onSubmit={addTask} className="mb-4 flex gap-2"><input autoFocus value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} placeholder="What needs to be done?" className="min-w-0 flex-1 rounded-lg px-3 py-2 text-sm outline-none placeholder:text-muted" style={{ background: 'rgba(255,107,61,0.05)', border: '1px solid rgba(255,107,61,0.2)', color: '#fff0e8' }} /><button type="submit" className="rounded-lg px-3 text-xs font-semibold text-white" style={{ background: '#ff6b3d' }}>Add</button></form>}
                    <div>{projectTasks.map((task) => { const priority = PRIORITY_STYLES[task.priority] ?? PRIORITY_STYLES.low; return <div key={task.id} role="button" tabIndex={0} onClick={() => navigate(`/task/${task.id}`)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') navigate(`/task/${task.id}`) }} className="flex cursor-pointer items-center gap-3 border-b py-3 last:border-0 transition-colors hover:bg-orange-500/5" style={{ borderColor: 'rgba(255,107,61,0.08)' }}><button type="button" aria-label={`Mark ${task.title} ${task.statuses === 'done' ? 'to do' : 'complete'}`} onClick={(event) => { event.stopPropagation(); toggleTask(task.id) }} className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: task.statuses === 'done' ? 'linear-gradient(135deg, #ff6b3d, #ffb347)' : 'transparent', border: task.statuses === 'done' ? 'none' : '1px solid rgba(255,107,61,0.35)' }}>{task.statuses === 'done' && <Check className="h-3 w-3 text-white" />}</button><div className="min-w-0 flex-1"><p className={`truncate text-sm ${task.statuses === 'done' ? 'text-muted line-through' : 'text-ink'}`}>{task.title}</p><p className="mt-1 text-[11px] text-muted">Due {task.due || 'No date'}</p></div><span className="hidden rounded-full px-2 py-1 font-mono text-[10px] sm:inline" style={{ color: priority.color, background: priority.background }}>{task.priority}</span>{task.assignee && <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[10px] text-white" style={{ background: 'linear-gradient(135deg, #ff6b3d, #ffb347)' }}>{typeof task.assignee === 'string' && task.assignee.length <= 3 ? task.assignee : initialsFor(task.assignee)}</span>}<ChevronDown className="h-4 w-4 shrink-0 text-muted" /></div> })}</div>
                </section>

                <aside className="space-y-5">
                    <section className="rounded-2xl p-5" style={{ background: 'linear-gradient(145deg, rgba(26,20,16,0.95) 0%, rgba(18,14,10,0.9) 100%)', border: '1px solid rgba(255,107,61,0.14)' }}>
                        <div className="mb-4 flex items-center justify-between"><div><h2 className="font-display font-semibold text-ink">Project members</h2><p className="mt-1 text-xs text-muted">{members.length} people collaborating</p></div><Users className="h-4 w-4 text-muted" /></div>
                        <div className="space-y-3">{members.map((member, index) => <div key={member.id || member._id || member.name} className="flex items-center gap-3"><Avatar member={member} index={index} /><div className="min-w-0 flex-1"><p className="truncate text-sm text-ink">{member.name || member.fullName}</p><p className="truncate text-[11px] text-muted">{member.role || 'Team member'}</p></div><MoreHorizontal className="h-4 w-4 text-muted" /></div>)}</div>
                        <div className="mt-4 border-t pt-3" style={{ borderColor: 'rgba(255,107,61,0.08)' }}><p className="text-[10px] uppercase tracking-widest text-muted">Project admin</p><p className="mt-1 text-sm text-ink">{admin?.fullName || admin?.name || 'Not available'}</p><p className="text-[11px] text-muted">{admin?.email || ''}</p></div>
                        <button type="button" onClick={() => setShowInviteForm((current) => !current)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold text-[#ffb347] transition-colors hover:bg-orange-500/8" style={{ border: '1px dashed rgba(255,107,61,0.28)' }}><MailPlus className="h-3.5 w-3.5" /> Invite teammates</button>
                        {showInviteForm && <form onSubmit={inviteTeammate} className="mt-3 flex gap-2"><input autoFocus type="email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="teammate@email.com" className="min-w-0 flex-1 rounded-lg px-2.5 py-2 text-xs outline-none placeholder:text-muted" style={{ background: 'rgba(255,107,61,0.05)', border: '1px solid rgba(255,107,61,0.2)', color: '#fff0e8' }} /><button type="submit" className="rounded-lg px-2.5 text-xs text-white" style={{ background: '#ff6b3d' }}>Send</button></form>}
                    </section>
                    <section className="rounded-2xl p-5" style={{ background: 'rgba(255,107,61,0.04)', border: '1px solid rgba(255,107,61,0.1)' }}><p className="text-xs uppercase tracking-widest text-muted">Next milestone</p><p className="mt-2 font-display text-lg font-semibold text-ink">API integration review</p><p className="mt-1 text-xs leading-5 text-muted">Make sure the task assignment endpoint is ready for the team walkthrough.</p></section>
                </aside>
            </div>
        </main>
    )
}
