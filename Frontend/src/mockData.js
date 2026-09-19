export const currentUser = {
  name: 'Chirag Greed',
  role: 'Full Stack Developer',
  avatarInitials: 'CG',
  syncedAgo: '2m ago',
}

export const stats = [
  { id: 'active', label: 'Active projects', value: 6, delta: '+1 this week' },
  { id: 'due', label: 'Tasks due today', value: 4, delta: '2 overdue' },
  { id: 'done', label: 'Completed this week', value: 18, delta: '+30% vs last week' },
  { id: 'team', label: 'Team members synced', value: '9/10', delta: '1 offline' },
]

export const members = [
  { id: 'u1', name: 'Aisha Verma', initials: 'AV' },
  { id: 'u2', name: 'Rohit Sen', initials: 'RS' },
  { id: 'u3', name: 'Priya Nair', initials: 'PN' },
  { id: 'u4', name: 'Dev Malhotra', initials: 'DM' },
]

export const projects = [
  {
    id: 'p1',
    name: 'SyncSpace API',
    description: 'REST API powering users, projects and tasks.',
    progress: 72,
    status: 'in-progress',
    dueDate: 'Sep 2',
    members: ['u1', 'u2'],
    tasksTotal: 14,
    tasksDone: 10,
  },
  {
    id: 'p2',
    name: 'Onboarding Flow Redesign',
    description: 'Simplify sign-up and first-project creation.',
    progress: 40,
    status: 'in-progress',
    dueDate: 'Sep 10',
    members: ['u3', 'u4'],
    tasksTotal: 9,
    tasksDone: 4,
  },
  {
    id: 'p3',
    name: 'AI Task Assistant',
    description: 'Prioritization + auto-assignment suggestions.',
    progress: 18,
    status: 'in-progress',
    dueDate: 'Sep 20',
    members: ['u1', 'u3', 'u4'],
    tasksTotal: 11,
    tasksDone: 2,
  },
  {
    id: 'p4',
    name: 'Marketing Site',
    description: 'Landing page and docs for launch.',
    progress: 100,
    status: 'done',
    dueDate: 'Aug 15',
    members: ['u2'],
    tasksTotal: 7,
    tasksDone: 7,
  },
]

export const goals = [
  { id: 'g1', label: 'Ship SyncSpace API v1', progress: 64 },
  { id: 'g2', label: 'Ship AI task assistant', progress: 87 },
]


export const assignments = [
  { id: 'A1506', team: 'API team', task: 'Creating auth middleware', status: 'Pending', assignee: 'u1' },
  { id: 'S1406', team: 'Design team', task: 'Documenting components', status: 'In progress', assignee: 'u3' },
  { id: 'T2201', team: 'AI team', task: 'Prompt evaluation set', status: 'Pending', assignee: 'u4' },
]

export const deadlineTask = {
  title: 'Deploy staging build',
  progress: 47,
  remaining: '58 min remaining',
}

export const tasks = [
  { id: 't1', title: 'Fix JWT refresh token bug', project: 'SyncSpace API', priority: 'high', status: 'in-progress', due: 'Today', assignee: 'u2' },
  { id: 't2', title: 'Design empty-state illustrations', project: 'Onboarding Flow Redesign', priority: 'medium', status: 'todo', due: 'Today', assignee: 'u3' },
  { id: 't3', title: 'Wire up task assignment endpoint', project: 'SyncSpace API', priority: 'high', status: 'todo', due: 'Today', assignee: 'u1' },
  { id: 't4', title: 'Draft AI prompt for task summaries', project: 'AI Task Assistant', priority: 'medium', status: 'in-progress', due: 'Today', assignee: 'u4' },
  { id: 't5', title: 'Write API documentation', project: 'SyncSpace API', priority: 'low', status: 'done', due: 'Aug 24', assignee: 'u2' },
  { id: 't6', title: 'Set up CI for dashboard repo', project: 'Onboarding Flow Redesign', priority: 'medium', status: 'todo', due: 'Aug 28', assignee: 'u4' },
]

export const notifications = [
  { id: 'n1', text: 'Aisha Verma assigned you to "Creating auth middleware"', time: '10m ago', unread: true },
  { id: 'n2', text: 'Rohit Sen completed "Write API documentation"', time: '1h ago', unread: true },
  { id: 'n3', text: 'AI Task Assistant suggested prioritizing "Fix JWT refresh token bug"', time: '2h ago', unread: false },
  { id: 'n4', text: 'Dev Malhotra joined "AI Task Assistant" project', time: '1d ago', unread: false },
]
