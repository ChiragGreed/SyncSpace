import { useState } from 'react'
import { AlertTriangle, ArrowLeft, CalendarDays, Check, ChevronDown, Edit3, MailPlus, MoreHorizontal, Plus, Save, Sparkles, Trash2, Users, X, } from 'lucide-react'

import ProgressBar from '../../Dashboard/components/ProgressBar.jsx'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useProject from '../hook/useProject.js'
import useTask from '../../Tasks/hook/useTask.js'
import useInvitation from '../../Invitations/hook/useInvitation.js';
import useTeam from '../../TeamMates/hook/useTeam.js'
import { useSelector } from 'react-redux'
import useAI from '../../Ai/hook/useAi.js'

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
    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        assignee: '',
    })
    const [showInviteForm, setShowInviteForm] = useState(false)
    const [inviteEmail, setInviteEmail] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const [priorityMenuOpen, setPriorityMenuOpen] = useState(false)
    const [assigneeMenuOpen, setAssigneeMenuOpen] = useState(false)
    const [notice, setNotice] = useState('')
    const [aiTasks, setAiTasks] = useState([])
    const [selectedAiTasks, setSelectedAiTasks] = useState([])
    const [showAiTasks, setShowAiTasks] = useState(false)
    const [isGeneratingTasks, setIsGeneratingTasks] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [form, setForm] = useState({ title: '', description: '', dueDate: '' })
    const { getProject, updateProject, deleteProject } = useProject();
    const { createTask } = useTask();
    const { generateTasks } = useAI();
    const { createInvitation } = useInvitation();
    const { searchUsers } = useTeam();
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

    useEffect(() => {
        if (!showTaskForm) {
            setTaskForm({
                title: '',
                description: '',
                priority: 'medium',
                dueDate: '',
                assignee: members?.[0]?._id || members?.[0]?.id || '',
            })
        }
    }, [showTaskForm, members])

    const normalizedStatus = normalizeStatus(status)
    const statusStyle = STATUS_STYLES[normalizedStatus] ?? STATUS_STYLES['in-progress']
    const completedTasks = projectTasks.filter((task) => task.statuses === 'done').length
    const progress = normalizedStatus === 'done'
        ? 100
        : projectTasks.length ? Math.round((completedTasks / projectTasks.length) * 100) : 0

    const addTask = async (event) => {
        event.preventDefault()

        if (!taskForm.title.trim() || !projectId) return

        const assignee = taskForm.assignee || members?.[0]?._id || members?.[0]?.id

        await createTask(
            taskForm.title.trim(),
            taskForm.description.trim(),
            projectId,
            'toDo',
            taskForm.priority,
            assignee,
            taskForm.dueDate || undefined
        )

        await getProject(projectId)
        setShowTaskForm(false)
        setNotice('Task created successfully')
    }
    const handleGenerateTasks = async () => {
        if (!title?.trim() || !description?.trim()) {
            setNotice('Project title and description are required to generate tasks')
            return
        }

        try {
            setIsGeneratingTasks(true)

            const tasks = await generateTasks(title, description)

            setAiTasks(tasks)
            setSelectedAiTasks([])
            setShowAiTasks(true)
        } catch (error) {
            setNotice(
                error.response?.data?.message ||
                'Failed to generate tasks. Please try again.'
            )
        } finally {
            setIsGeneratingTasks(false)
        }
    }

    const toggleAiTask = (index) => {
        setSelectedAiTasks((current) =>
            current.includes(index)
                ? current.filter((item) => item !== index)
                : [...current, index]
        )
    }

    const addSelectedAiTasks = async () => {
        if (!selectedAiTasks.length || !projectId) return

        try {
            for (const index of selectedAiTasks) {
                const task = aiTasks[index]

                await createTask(
                    task.title,
                    task.description,
                    projectId,
                    'toDo',
                    'medium',
                    members?.[0]?._id || members?.[0]?.id,
                    undefined
                )
            }

            await getProject(projectId)

            setAiTasks([])
            setSelectedAiTasks([])
            setShowAiTasks(false)
            setNotice(`${selectedAiTasks.length} AI task${selectedAiTasks.length > 1 ? 's' : ''} added successfully`)
        } catch (error) {
            setNotice(
                error.response?.data?.message ||
                'Failed to add AI tasks'
            )
        }
    }

    const inviteTeammate = async (event) => {
        event.preventDefault()
        if (!inviteEmail.trim()) return

        const email = inviteEmail.trim().toLowerCase()

        try {
            const users = await searchUsers(email)
            const recipient = users.find((user) => user.email?.toLowerCase() === email)

            if (!recipient) {
                setNotice(`No teammate found for ${inviteEmail.trim()}`)
                return
            }

            const response = await createInvitation(projectId, [recipient._id])
            const skippedInvitation = response?.skipped?.[0]

            if (skippedInvitation) {
                setNotice(skippedInvitation.reason || 'This teammate could not be invited')
                return
            }

            setNotice(`Invitation sent to ${recipient.fullName || recipient.email}`)
            setInviteEmail('')
            setShowInviteForm(false)
        } catch (error) {
            setNotice(error.response?.data?.message || 'The invitation could not be sent')
        }
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

    const handleDeleteProject = async () => {
        await deleteProject(projectId)
        navigate('/')
    }

    return (
        <main className="relative z-10 mx-auto max-w-6xl px-5 py-6 pb-24 md:px-8 md:py-8">
            <div className="mb-7 flex items-center justify-between gap-4">
                <button
                    type="button"
                    className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-ink"
                    onClick={() => { navigate('/') }}
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
                            <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-[#ff8c78] hover:bg-orange-500/8" onClick={() => { setShowDeleteConfirm(true); setShowMenu(false) }}>
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
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-display font-semibold text-ink">Project tasks</h2>
                            <p className="mt-1 text-xs text-muted">
                                Keep the team moving one task at a time.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleGenerateTasks}
                                disabled={isGeneratingTasks}
                                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                                style={{
                                    background: 'rgba(255,179,71,0.1)',
                                    border: '1px solid rgba(255,179,71,0.25)',
                                    color: '#ffb347',
                                }}
                            >
                                <Sparkles className="h-3.5 w-3.5" />
                                {isGeneratingTasks ? 'Generating...' : 'Generate with AI'}
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowTaskForm((current) => !current)}
                                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-all hover:brightness-110"
                                style={{
                                    background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
                                    boxShadow: '0 3px 12px rgba(255,107,61,0.25)',
                                }}
                            >
                                <Plus className="h-3.5 w-3.5" />
                                Add task
                            </button>
                        </div>
                    </div>
                    {showAiTasks && aiTasks.length > 0 && (
                        <div
                            className="mb-5 rounded-xl p-4"
                            style={{
                                background: 'rgba(255,179,71,0.05)',
                                border: '1px solid rgba(255,179,71,0.18)',
                            }}
                        >
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4" style={{ color: '#ffb347' }} />
                                        <h3 className="text-sm font-semibold text-ink">
                                            AI suggested tasks
                                        </h3>
                                    </div>

                                    <p className="mt-1 text-[11px] text-muted">
                                        Select the tasks you want to add to this project.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAiTasks(false)
                                        setAiTasks([])
                                        setSelectedAiTasks([])
                                    }}
                                    className="rounded-lg p-1.5 text-muted hover:text-ink"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="space-y-2">
                                {aiTasks.map((task, index) => {
                                    const selected = selectedAiTasks.includes(index)

                                    return (
                                        <button
                                            key={`${task.title}-${index}`}
                                            type="button"
                                            onClick={() => toggleAiTask(index)}
                                            className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition-all"
                                            style={{
                                                background: selected
                                                    ? 'rgba(255,179,71,0.1)'
                                                    : 'rgba(255,107,61,0.03)',
                                                border: selected
                                                    ? '1px solid rgba(255,179,71,0.3)'
                                                    : '1px solid rgba(255,107,61,0.1)',
                                            }}
                                        >
                                            <span
                                                className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border"
                                                style={{
                                                    borderColor: selected
                                                        ? '#ffb347'
                                                        : 'rgba(255,107,61,0.25)',
                                                    background: selected
                                                        ? '#ffb347'
                                                        : 'transparent',
                                                }}
                                            >
                                                {selected && (
                                                    <Check
                                                        className="h-3 w-3"
                                                        style={{ color: '#1a1410' }}
                                                    />
                                                )}
                                            </span>

                                            <span className="min-w-0">
                                                <span className="block text-xs font-semibold text-ink">
                                                    {task.title}
                                                </span>

                                                <span className="mt-1 block text-[11px] leading-5 text-muted">
                                                    {task.description}
                                                </span>
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-3">
                                <span className="text-[11px] text-muted">
                                    {selectedAiTasks.length} selected
                                </span>

                                <button
                                    type="button"
                                    onClick={addSelectedAiTasks}
                                    disabled={!selectedAiTasks.length}
                                    className="rounded-lg px-3 py-2 text-xs font-semibold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                                    style={{
                                        background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
                                    }}
                                >
                                    Add selected tasks
                                </button>
                            </div>
                        </div>
                    )}
                    {showTaskForm && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="create-task-title"
                            onClick={() => setShowTaskForm(false)}
                        >
                            <div
                                className="w-full max-w-md rounded-2xl p-6"
                                style={{
                                    background: 'linear-gradient(145deg, rgba(26,20,16,0.98) 0%, rgba(18,14,10,0.95) 100%)',
                                    border: '1px solid rgba(255, 107, 61, 0.18)',
                                    boxShadow: '0 8px 32px rgba(255, 107, 61, 0.12)',
                                }}
                                onClick={(event) => event.stopPropagation()}
                            >
                                <div className="mb-5 flex items-center justify-between">
                                    <h2 id="create-task-title" className="font-display text-lg font-semibold" style={{ color: '#fff0e8' }}>
                                        Create task
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={() => setShowTaskForm(false)}
                                        aria-label="Close task form"
                                        className="rounded-lg p-1.5 text-muted transition-all duration-200"
                                        style={{ border: '1px solid rgba(255, 107, 61, 0.1)' }}
                                    >
                                        <X className="h-4 w-4" strokeWidth={2} />
                                    </button>
                                </div>

                                <form onSubmit={addTask} className="flex flex-col gap-4">
                                    <div>
                                        <label htmlFor="task-title" className="mb-1.5 block text-xs text-muted">
                                            Task title
                                        </label>
                                        <input
                                            id="task-title"
                                            autoFocus
                                            required
                                            type="text"
                                            value={taskForm.title}
                                            onChange={(event) => setTaskForm((current) => ({ ...current, title: event.target.value }))}
                                            placeholder="e.g. Build onboarding flow"
                                            className="w-full rounded-lg px-3 py-2 text-sm outline-none placeholder:text-muted"
                                            style={{
                                                background: 'rgba(255, 107, 61, 0.04)',
                                                border: '1px solid rgba(255, 107, 61, 0.15)',
                                                color: '#fff0e8',
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="task-description" className="mb-1.5 block text-xs text-muted">
                                            Description
                                        </label>
                                        <textarea
                                            id="task-description"
                                            rows={3}
                                            value={taskForm.description}
                                            onChange={(event) => setTaskForm((current) => ({ ...current, description: event.target.value }))}
                                            placeholder="Describe what needs to be done"
                                            className="w-full resize-none rounded-lg px-3 py-2 text-sm outline-none placeholder:text-muted"
                                            style={{
                                                background: 'rgba(255, 107, 61, 0.04)',
                                                border: '1px solid rgba(255, 107, 61, 0.15)',
                                                color: '#fff0e8',
                                            }}
                                        />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="task-priority"
                                                className="mb-1.5 block text-xs text-muted"
                                            >
                                                Priority
                                            </label>

                                            <div className="relative">
                                                <button
                                                    id="task-priority"
                                                    type="button"
                                                    onClick={() => {
                                                        setPriorityMenuOpen((open) => !open)
                                                        setAssigneeMenuOpen(false)
                                                    }}
                                                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm outline-none transition-all duration-200"
                                                    style={{
                                                        background: 'linear-gradient(145deg, rgba(18,12,10,0.96) 0%, rgba(22,16,12,0.9) 100%)',
                                                        border: '1px solid rgba(255, 107, 61, 0.18)',
                                                        boxShadow: 'inset 0 0 0 1px rgba(255, 107, 61, 0.04)',
                                                        color: '#fff0e8',
                                                    }}
                                                    aria-label="Select task priority"
                                                    aria-expanded={priorityMenuOpen}
                                                >
                                                    <span className="capitalize">
                                                        {taskForm.priority}
                                                    </span>

                                                    <ChevronDown
                                                        className={`h-4 w-4 text-[#ffb347] transition-transform duration-200 ${priorityMenuOpen ? 'rotate-180' : ''
                                                            }`}
                                                    />
                                                </button>

                                                {priorityMenuOpen && (
                                                    <div
                                                        className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-xl p-1"
                                                        style={{
                                                            background:
                                                                'linear-gradient(145deg, rgba(26,20,16,0.98) 0%, rgba(18,14,10,0.98) 100%)',
                                                            border: '1px solid rgba(255,107,61,0.2)',
                                                            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                                                        }}
                                                    >
                                                        {['low', 'medium', 'high'].map((priority) => {
                                                            const priorityStyle = PRIORITY_STYLES[priority]

                                                            return (
                                                                <button
                                                                    key={priority}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setTaskForm((current) => ({
                                                                            ...current,
                                                                            priority,
                                                                        }))
                                                                        setPriorityMenuOpen(false)
                                                                    }}
                                                                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm capitalize transition-colors hover:bg-orange-500/8"
                                                                    style={{
                                                                        color: priorityStyle.color,
                                                                        background:
                                                                            taskForm.priority === priority
                                                                                ? priorityStyle.background
                                                                                : 'transparent',
                                                                    }}
                                                                >
                                                                    <span>{priority}</span>

                                                                    {taskForm.priority === priority && (
                                                                        <Check className="h-3.5 w-3.5" />
                                                                    )}
                                                                </button>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="task-date" className="mb-1.5 block text-xs text-muted">
                                                Due date
                                            </label>
                                            <input
                                                id="task-date"
                                                type="date"
                                                value={taskForm.dueDate}
                                                onChange={(event) => setTaskForm((current) => ({ ...current, dueDate: event.target.value }))}
                                                className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                                                style={{
                                                    background: 'rgba(255, 107, 61, 0.04)',
                                                    border: '1px solid rgba(255, 107, 61, 0.15)',
                                                    color: '#fff0e8',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="task-assignee"
                                            className="mb-1.5 block text-xs text-muted"
                                        >
                                            Assign to
                                        </label>

                                        <div className="relative">
                                            <button
                                                id="task-assignee"
                                                type="button"
                                                onClick={() => {
                                                    setAssigneeMenuOpen((open) => !open)
                                                    setPriorityMenuOpen(false)
                                                }}
                                                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm outline-none transition-all duration-200"
                                                style={{
                                                    background:
                                                        'linear-gradient(145deg, rgba(18,12,10,0.96) 0%, rgba(22,16,12,0.9) 100%)',
                                                    border: '1px solid rgba(255, 107, 61, 0.18)',
                                                    boxShadow: 'inset 0 0 0 1px rgba(255, 107, 61, 0.04)',
                                                    color: '#fff0e8',
                                                }}
                                                aria-label="Select task assignee"
                                                aria-expanded={assigneeMenuOpen}
                                            >
                                                <span className="truncate">
                                                    {taskForm.assignee
                                                        ? (
                                                            members?.find(
                                                                (member) =>
                                                                    (member._id || member.id) === taskForm.assignee
                                                            )?.fullName ||
                                                            members?.find(
                                                                (member) =>
                                                                    (member._id || member.id) === taskForm.assignee
                                                            )?.name ||
                                                            'Team member'
                                                        )
                                                        : 'Unassigned'}
                                                </span>

                                                <ChevronDown
                                                    className={`h-4 w-4 shrink-0 text-[#ffb347] transition-transform duration-200 ${assigneeMenuOpen ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>

                                            {assigneeMenuOpen && (
                                                <div
                                                    className="absolute left-0 right-0 top-full z-30 mt-1 max-h-48 overflow-y-auto overflow-hidden rounded-xl p-1"
                                                    style={{
                                                        background:
                                                            'linear-gradient(145deg, rgba(26,20,16,0.98) 0%, rgba(18,14,10,0.98) 100%)',
                                                        border: '1px solid rgba(255,107,61,0.2)',
                                                        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                                                    }}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setTaskForm((current) => ({
                                                                ...current,
                                                                assignee: '',
                                                            }))
                                                            setAssigneeMenuOpen(false)
                                                        }}
                                                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-orange-500/8"
                                                        style={{
                                                            color: '#a99d98',
                                                            background:
                                                                taskForm.assignee === ''
                                                                    ? 'rgba(255,107,61,0.08)'
                                                                    : 'transparent',
                                                        }}
                                                    >
                                                        <span>Unassigned</span>

                                                        {taskForm.assignee === '' && (
                                                            <Check className="h-3.5 w-3.5 text-[#ffb347]" />
                                                        )}
                                                    </button>

                                                    {members?.map((member) => {
                                                        const memberId = member._id || member.id
                                                        const memberName =
                                                            member.fullName ||
                                                            member.name ||
                                                            'Team member'

                                                        const isSelected =
                                                            taskForm.assignee === memberId

                                                        return (
                                                            <button
                                                                key={memberId}
                                                                type="button"
                                                                onClick={() => {
                                                                    setTaskForm((current) => ({
                                                                        ...current,
                                                                        assignee: memberId,
                                                                    }))
                                                                    setAssigneeMenuOpen(false)
                                                                }}
                                                                className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-orange-500/8"
                                                                style={{
                                                                    color: '#fff0e8',
                                                                    background: isSelected
                                                                        ? 'rgba(255,107,61,0.08)'
                                                                        : 'transparent',
                                                                }}
                                                            >
                                                                <span className="truncate">
                                                                    {memberName}
                                                                </span>

                                                                {isSelected && (
                                                                    <Check className="h-3.5 w-3.5 shrink-0 text-[#ffb347]" />
                                                                )}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-1 flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowTaskForm(false)}
                                            className="flex-1 rounded-xl py-2.5 text-sm font-medium"
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid rgba(255, 107, 61, 0.15)',
                                                color: '#7a7070',
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110"
                                            style={{
                                                background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
                                                boxShadow: '0 4px 14px rgba(255, 107, 61, 0.35)',
                                            }}
                                        >
                                            Create task
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
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
            {showDeleteConfirm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-project-title"
                    onClick={() => setShowDeleteConfirm(false)}
                >
                    <div
                        className="w-full max-w-sm rounded-2xl p-6 border border-accent/18"
                        style={{
                            background: 'linear-gradient(145deg, rgba(26,20,16,0.98) 0%, rgba(18,14,10,0.95) 100%)',
                            boxShadow: '0 8px 32px rgba(255, 107, 61, 0.12)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: 'rgba(255, 107, 61, 0.1)', border: '1px solid rgba(255, 107, 61, 0.2)' }}>
                            <AlertTriangle className="h-5 w-5" style={{ color: '#ff8c42' }} />
                        </div>
                        <h2 id="delete-project-title" className="mb-1.5 font-display text-lg font-semibold" style={{ color: '#fff0e8' }}>Delete project?</h2>
                        <p className="mb-6 text-sm leading-6" style={{ color: '#a99d98' }}>
                            This will permanently delete <span className="font-semibold" style={{ color: '#fff0e8' }}>{title || 'this project'}</span> and all of its tasks. This action <span className="font-semibold" style={{ color: '#ffb347' }}>cannot be undone</span>.
                        </p>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 text-sm font-medium rounded-xl py-2.5 transition-all duration-200 text-muted border border-accent/15 hover:border-accent/30 hover:text-ink"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteProject}
                                className="flex-1 text-white text-sm font-semibold rounded-xl py-2.5 transition-all duration-200 hover:brightness-110"
                                style={{ background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)', boxShadow: '0 4px 14px rgba(255, 107, 61, 0.35)' }}
                            >
                                Delete project
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
