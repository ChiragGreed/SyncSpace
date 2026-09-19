import { useState } from 'react'
import Sidebar from './shared/Sidebar/Sidebar.jsx'
import Topbar from './shared/Topbar/Topbar.jsx'
import Dashboard from './Features/Dashboard/pages/Dashboard.jsx'

export default function App() {
  const [active, setActive] = useState('dashboard')
  const [query, setQuery] = useState('')

  const handleNavigate = (id) => {
    setActive(id)
    if (id === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(`${id}-section`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex min-h-screen bg-navy">
      <Sidebar active={active} onNavigate={handleNavigate} />
      <div className="flex-1 min-w-0">
        <Topbar query={query} onQueryChange={setQuery} />
        <main>
          <Dashboard query={query} />
        </main>
      </div>
    </div>
  )
}
