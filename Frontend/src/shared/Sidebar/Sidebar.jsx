import { LayoutGrid, FolderKanban, CheckSquare, Users, ClipboardList } from 'lucide-react'
import SidebarLogo from './components/SidebarLogo.jsx'
import SidebarNav from './components/SidebarNav.jsx'
import SidebarUtilLinks from './components/SidebarUtilLinks.jsx'
import SidebarProfile from './components/SidebarProfile.jsx'
import MobileBottomNav from './components/MobileBottomNav.jsx'

const NAV = [
  { id: 'dashboard', label: 'Home', icon: LayoutGrid },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'teammates', label: 'Teammates', icon: Users },
  { id: 'activity-log', label: 'Activity Log', icon: ClipboardList, route: '/team/search' },
]

export default function Sidebar({ active, onNavigate }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex md:sticky md:top-0 md:h-screen md:max-h-screen md:overflow-y-auto md:flex-col w-64 shrink-0 px-4 py-6"
        style={{
          background: 'linear-gradient(180deg, #0e0a08 0%, #0a0a0f 100%)',
          borderRight: '1px solid rgba(255, 107, 61, 0.12)',
        }}
      >
        <SidebarLogo />
        <SidebarNav nav={NAV} active={active} onNavigate={onNavigate} />
        <SidebarUtilLinks />
        <SidebarProfile />
      </aside>

      {/* Mobile bottom nav */}
      <MobileBottomNav nav={NAV} active={active} onNavigate={onNavigate} />
    </>
  )
}