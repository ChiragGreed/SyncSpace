import { Zap } from 'lucide-react'

export default function SidebarLogo() {
  return (
    <div className="flex items-center gap-2 px-2 mb-6">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
          boxShadow: '0 4px 15px rgba(255, 107, 61, 0.4)',
        }}
      >
        <Zap className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
      </div>
      <span
        className="font-display font-semibold text-lg tracking-tight"
        style={{
          background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        SyncSpace
      </span>
    </div>
  )
}
