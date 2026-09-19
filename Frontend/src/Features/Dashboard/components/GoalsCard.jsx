import { goals } from '../../../mockData.js'

export default function GoalsCard() {
  return (
    <div
      className="rounded-2xl p-5 h-full flex flex-col cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
      style={{
        background: 'linear-gradient(145deg, rgba(26,20,16,0.95) 0%, rgba(18,14,10,0.9) 100%)',
        border: '1px solid rgba(255, 107, 61, 0.15)',
        boxShadow: '0 4px 24px rgba(255, 107, 61, 0.06)',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255, 107, 61, 0.35)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255, 107, 61, 0.14)'}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-ink">Main goals</h3>
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(255, 107, 61, 0.12)', color: '#ff8c42', border: '1px solid rgba(255, 107, 61, 0.2)' }}
        >
          In progress
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {goals.map((g) => (
          <div key={g.id}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-ink">{g.label}</p>
              <span
                className="font-display text-sm font-semibold"
                style={{ color: '#ff8c42' }}
              >
                {g.progress}%
              </span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: 'rgba(255, 107, 61, 0.1)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${g.progress}%`,
                  background: 'linear-gradient(90deg, #ff6b3d 0%, #ffb347 100%)',
                  boxShadow: '0 0 8px rgba(255, 107, 61, 0.45)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
