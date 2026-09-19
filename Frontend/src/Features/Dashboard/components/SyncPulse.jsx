export default function SyncPulse({ label = 'Live', size = 'sm' }) {
  const dot = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent">
      <span className="relative flex items-center justify-center">
        <span className={`absolute inline-flex ${dot} rounded-full bg-accent animate-pulseDot`} />
        <span className={`relative inline-flex ${dot} rounded-full bg-accent`} />
      </span>
      {label}
    </span>
  )
}
