import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import StatCard from '../components/StatCard.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import TaskRow from '../components/TaskRow.jsx'
import FilterBar from '../components/FilterBar.jsx'
import EmptyState from '../components/EmptyState.jsx'
import CreateProjectModal from '../components/CreateProjectModal.jsx'
import { StatSkeleton, ProjectCardSkeleton, TaskRowSkeleton, GoalsCardSkeleton, AssignmentCardSkeleton, DeadlineCardSkeleton } from '../components/Skeletons.jsx'
import { stats } from '../../../mockData.js'
import GoalsCard from '../components/GoalsCard.jsx'
import AssignmentCard from '../components/AssignmentCard.jsx'
import DeadlineCard from '../components/DeadlineCard.jsx'
import DashboardBackground from '../components/DashboardBackground.jsx'
import TeammatesPage from '../../TeamMates/pages/TeamMates.jsx'
import useAuth from '../hook/useAuth.js'
import useProject from '../hook/useProject.js'
import useTask from '../hook/useTask.js'
import { useSelector } from 'react-redux'

const PROJECT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'done', label: 'Done' },
]

const TASK_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'todo', label: 'To do' },
  { id: 'done', label: 'Done' },
]

const TABS = ['Overview', 'Activity']
const STATUS_ORDER = { 'todo': 0, 'in-progress': 1, 'done': 2 }

const normalizeProject = (project) => ({
  ...project,
  id: project._id,
  name: project.title,
  status: project.status === 'completed' ? 'done' : 'in-progress',
  dueDate: project.dueDate ? new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date',
  progress: project.status === 'completed' ? 100 : 0,
})

const normalizeTask = (task) => ({
  ...task,
  id: task._id,
  status: {
    toDo: 'todo',
    inProgress: 'in-progress',
    completed: 'done',
  }[task.status] ?? task.status,
  project: task.projectId?.title || 'Personal task',
  due: '-',
})

export default function Dashboard({ query }) {
  const [loading, setLoading] = useState(true);
  const [projectFilter, setProjectFilter] = useState('all');
  const [taskFilter, setTaskFilter] = useState('all');
  const [tab, setTab] = useState(TABS[0]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { getMe } = useAuth();
  const { getProjects, createProject } = useProject();
  const { getTasks } = useTask();
  const fullName = useSelector((state) => state.user.fullName);
  const projects = useSelector((state) => state.project.projects);
  const tasks = useSelector((state) => state.task.tasks);
  const firstName = fullName?.split(' ')[0] || 'there';
  const projectList = useMemo(() => projects.map(normalizeProject), [projects]);
  const taskList = useMemo(() => tasks.map(normalizeTask), [tasks]);

  useEffect(() => {
    getMe();
  }, [getMe])

  useEffect(() => {
    getProjects();
  }, [getProjects])

  useEffect(() => {
    getTasks();
  }, [getTasks])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleOpenModal = () => setShowCreateModal(true)
    window.addEventListener('open-create-project-modal', handleOpenModal)
    return () => window.removeEventListener('open-create-project-modal', handleOpenModal)
  }, [])

  const q = query.trim().toLowerCase()

  const filteredProjects = useMemo(
    () =>
      projectList
        .filter((p) => (projectFilter === 'all' ? true : p.status === projectFilter))
        .filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
    [projectList, projectFilter, q]
  )

  const filteredTasks = useMemo(
    () =>
      taskList
        .filter((t) => (taskFilter === 'all' ? true : t.status === taskFilter))
        .filter((t) => t.title.toLowerCase().includes(q) || t.project.toLowerCase().includes(q))
        .sort((a, b) => (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99)),
    [q, taskFilter, taskList]
  )

  const activeProjectsCount = projectList.filter((p) => p.status === 'in-progress').length

  const liveStats = stats.map((s) => (s.id === 'active' ? { ...s, value: activeProjectsCount } : s))

  const handleCreateProject = async (newProject) => {
    await createProject(newProject.name, newProject.description, 'inProgress', newProject.dueDate)
    await getProjects()
  }

  return (
    <>
      <DashboardBackground />

      <div className="px-5 md:px-8 py-6 pb-24 md:pb-8 max-w-6xl mx-auto relative z-10">
        <div className="mb-6">
          <h1 className="font-display text-xl md:text-2xl font-bold">
            <span style={{ color: '#fff0e8' }}>Welcome back, </span>
            <span style={{ background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{firstName}</span>
          </h1>
          <p className="text-sm text-muted mt-1">Here's what's moving across your projects.</p>
        </div>

        {/* Stats */}
        <section aria-label="Overview stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
            : liveStats.map((s, i) => <StatCard key={s.id} label={s.label} value={s.value} delta={s.delta} index={i} />)}
        </section>

        {/* All about tabs */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-ink">
              All about <span className="text-muted font-normal text-sm">{firstName}</span>
            </h2>
            <div className="hidden sm:flex rounded-full p-0.5 text-xs" style={{ background: 'rgba(255,107,61,0.07)', border: '1px solid rgba(255,107,61,0.15)' }}>
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap font-medium"
                  style={tab === t ? {
                    background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
                    color: '#fff0e8',
                    boxShadow: '0 2px 10px rgba(255,107,61,0.35)',
                  } : { color: '#7a7070' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_0.9fr] gap-5">
            {loading ? (
              <>
                <GoalsCardSkeleton />
                <AssignmentCardSkeleton />
                <DeadlineCardSkeleton />
              </>
            ) : (
              <>
                <GoalsCard />
                <AssignmentCard />
                <DeadlineCard />
              </>
            )}
          </div>
        </section>


        {/* Projects */}
        <section id="projects-section" aria-label="Projects" className="mb-10 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <h2 className="font-display font-semibold text-ink">Projects</h2>
              <span className="text-xs text-muted font-mono">{filteredProjects.length} shown</span>
            </div>
            <div className="flex items-center gap-3">
              <FilterBar filters={PROJECT_FILTERS} active={projectFilter} onChange={setProjectFilter} label="Filter projects" />
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-1.5 shrink-0 text-white text-xs font-semibold rounded-full px-3 py-1.5 transition-all duration-200 hover:brightness-110"
                style={{ background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)', boxShadow: '0 3px 12px rgba(255,107,61,0.35)' }}
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />

              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <EmptyState title="No projects match this view" description="Try a different keyword or filter, or create a new project." />
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </section>

        {/* Tasks */}
        <section id="tasks-section" aria-label="Tasks" className="scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="font-display font-semibold text-ink">Recent tasks</h2>
            <FilterBar filters={TASK_FILTERS} active={taskFilter} onChange={setTaskFilter} label="Filter tasks" />
          </div>

          <div className="rounded-2xl px-4" style={{ background: 'linear-gradient(145deg, rgba(26,20,16,0.95) 0%, rgba(18,14,10,0.9) 100%)', border: '1px solid rgba(255,107,61,0.14)', boxShadow: '0 4px 24px rgba(255,107,61,0.06)' }}>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <TaskRowSkeleton key={i} />)
            ) : filteredTasks.length === 0 ? (
              <div className="py-2">
                <EmptyState title="No tasks match this view" description="Clear the filter or search to see everything." />
              </div>
            ) : (
              filteredTasks.map((t) => <TaskRow key={t.id} task={t} user={fullName} />)
            )}
          </div>
        </section>

        {/* Teammates Section */}
        <section id="teammates-section" aria-label="Teammates" className="scroll-mt-20 mt-10">
          <TeammatesPage />
        </section>

        <CreateProjectModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateProject}
        />
      </div>
    </>
  )
}
