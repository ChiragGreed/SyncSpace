export function StatSkeleton() {
  return (
    <div className="skeleton-card rounded-xl p-4">
      <div className="h-3 w-20 rounded shimmer-bg animate-shimmer mb-3" />
      <div className="h-6 w-12 rounded shimmer-bg animate-shimmer" />
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="skeleton-card rounded-xl p-5 flex flex-col gap-4">
      <div className="h-4 w-2/3 rounded shimmer-bg animate-shimmer" />
      <div className="h-3 w-full rounded shimmer-bg animate-shimmer" />
      <div className="h-1.5 w-full rounded-full shimmer-bg animate-shimmer" />
      <div className="h-3 w-1/3 rounded shimmer-bg animate-shimmer" />
    </div>
  )
}

export function TaskRowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 px-1 border-b border-border last:border-0">
      <div className="w-2 h-2 rounded-full shimmer-bg animate-shimmer shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-1/2 rounded shimmer-bg animate-shimmer" />
        <div className="h-2.5 w-1/4 rounded shimmer-bg animate-shimmer" />
      </div>
    </div>
  )
}

export function GoalsCardSkeleton() {
  return (
    <div className="skeleton-card rounded-2xl p-5 h-full flex flex-col gap-5">
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 w-24 rounded shimmer-bg animate-shimmer" />
        <div className="h-4 w-16 rounded-full shimmer-bg animate-shimmer" />
      </div>
      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-3 w-1/2 rounded shimmer-bg animate-shimmer" />
              <div className="h-3 w-8 rounded shimmer-bg animate-shimmer" />
            </div>
            <div className="h-1.5 w-full rounded-full shimmer-bg animate-shimmer" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function AssignmentCardSkeleton() {
  return (
    <div className="skeleton-card rounded-2xl p-5 h-full flex flex-col gap-4">
      <div className="h-4 w-40 rounded shimmer-bg animate-shimmer mb-2" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
            <div className="w-8 h-8 rounded-full shimmer-bg animate-shimmer shrink-0" />
            <div className="flex-1 space-y-2 min-w-0">
              <div className="h-3 w-3/4 rounded shimmer-bg animate-shimmer" />
              <div className="h-2.5 w-1/3 rounded shimmer-bg animate-shimmer" />
            </div>
            <div className="h-4 w-12 rounded-full shimmer-bg animate-shimmer shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function DeadlineCardSkeleton() {
  return (
    <div className="skeleton-card rounded-2xl p-5 h-full flex flex-col items-center text-center gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="h-4 w-16 rounded shimmer-bg animate-shimmer" />
        <div className="h-3.5 w-24 rounded shimmer-bg animate-shimmer" />
      </div>
      
      {/* Circle placeholder */}
      <div className="w-[110px] h-[110px] rounded-full border-4 border-dashed border-orange-500/25 flex items-center justify-center animate-pulse my-2">
        <div className="h-4 w-8 rounded shimmer-bg animate-shimmer" />
      </div>

      <div className="h-3 w-28 rounded shimmer-bg animate-shimmer" />
      
      <div className="w-full h-9 rounded-xl shimmer-bg animate-shimmer mt-auto" />
    </div>
  )
}
