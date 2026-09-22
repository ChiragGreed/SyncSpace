import EmptyState from './EmptyState.jsx'

// Shows the user's real projects ranked by completion progress, in place
// of the old hardcoded "goals" mock. Backend has no separate goals model,
// so top projects is the closest real signal we have.
export default function GoalsCard({ projects = [] }) {
  const topProjects = [...projects]
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 4)

  return (
    <div
      className="rounded-2xl p-5 h-full flex flex-col cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 border border-accent/15 hover:border-accent/35"
      style={{
        background: 'linear-gradient(145deg, rgba(26,20,16,0.95) 0%, rgba(18,14,10,0.9) 100%)',
        boxShadow: '0 4px 24px rgba(255, 107, 61, 0.06)',
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-ink">Top projects</h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/12 text-accentLight border border-accent/20">
          By progress
        </span>
      </div>

      {topProjects.length === 0 ? (
        <div className="flex-1 flex items-center">
          <EmptyState title="No projects yet" description="Create a project to start tracking progress here." />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {topProjects.map((project) => (
            <div key={project.id}>
              <div className="flex items-center justify-between mb-2 gap-2">
                <p className="text-sm text-ink truncate">{project.name}</p>
                <span className="font-display text-sm font-semibold text-accentLight shrink-0">
                  {project.progress}%
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-accent/10">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${project.progress}%`,
                    background: 'linear-gradient(90deg, #ff6b3d 0%, #ffb347 100%)',
                    boxShadow: '0 0 8px rgba(255, 107, 61, 0.45)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
