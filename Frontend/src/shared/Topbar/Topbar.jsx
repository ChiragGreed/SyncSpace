import TopbarSearch from './components/TopbarSearch.jsx'
import NotificationBell from './components/NotificationBell.jsx'
import CreateProjectButton from './components/CreateProjectButton.jsx'
import TopbarProfile from './components/TopbarProfile.jsx'

export default function Topbar({ query, onQueryChange }) {
  return (
    <header
      className="flex items-center justify-between gap-4 px-5 md:px-8 py-4 sticky top-0 z-[100] relative"
      style={{
        background: 'rgba(10, 8, 6, 0.92)',
        borderBottom: '1px solid rgba(255, 107, 61, 0.1)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <TopbarSearch query={query} onQueryChange={onQueryChange} />

      <div className="flex items-center gap-3">
        <NotificationBell />
        <CreateProjectButton />
        <TopbarProfile />
      </div>
    </header>
  )
}
