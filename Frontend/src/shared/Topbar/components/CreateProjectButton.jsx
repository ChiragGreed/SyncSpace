import { Plus } from 'lucide-react'

export default function CreateProjectButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-create-project-modal'))}
      className="flex items-center gap-1.5 shrink-0 text-white text-xs font-semibold rounded-full px-3 py-1.5 transition-all duration-200 hover:brightness-110 cursor-pointer"
      style={{ background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)', boxShadow: '0 3px 12px rgba(255,107,61,0.35)' }}
    >
      <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
      Create project
    </button>
  )
}
