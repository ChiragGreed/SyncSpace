export default function ProgressBar({ value }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ background: 'rgba(255, 107, 61, 0.1)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${value}%`,
            background: 'linear-gradient(90deg, #ff6b3d 0%, #ffb347 100%)',
            boxShadow: '0 0 8px rgba(255, 107, 61, 0.5)',
          }}
        />
      </div>
      <span className="font-mono text-[11px] text-muted w-8 text-right">{value}%</span>
    </div>
  )
}
