import RadialProgress from './RadialProgress.jsx'
import { deadlineTask } from '../../../mockData.js'

export default function DeadlineCard() {
  return (
    <div
      className="rounded-2xl p-5 h-full flex flex-col items-center text-center cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
      style={{
        background: 'linear-gradient(145deg, rgba(26,20,16,0.95) 0%, rgba(18,14,10,0.9) 100%)',
        border: '1px solid rgba(255, 107, 61, 0.15)',
        boxShadow: '0 4px 24px rgba(255, 107, 61, 0.06)',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255, 107, 61, 0.35)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255, 107, 61, 0.14)'}
    >
      <div className="w-full flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-ink text-left">Deadline</h3>
        <span className="text-[10px] text-muted font-mono">{deadlineTask.title}</span>
      </div>

      <RadialProgress value={deadlineTask.progress} highlighted size={110} stroke={8} />

      <p className="text-xs text-muted mt-4 mb-4">{deadlineTask.remaining}</p>

      <button
        className="w-full text-white text-sm font-semibold rounded-xl py-2.5 transition-all duration-200 hover:brightness-110 mt-auto"
        style={{
          background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
          boxShadow: '0 4px 16px rgba(255, 107, 61, 0.4)',
        }}
      >
        Mark as complete
      </button>
    </div>
  )
}
