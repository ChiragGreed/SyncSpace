import { Users } from 'lucide-react'

export default function TeammatesHeroIcon() {
  return (
    <div
      className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
      style={{
        background: 'linear-gradient(135deg, rgba(255,107,61,0.15) 0%, rgba(255,179,71,0.08) 100%)',
        border: '1px solid rgba(255, 107, 61, 0.2)',
        boxShadow: '0 0 40px rgba(255, 107, 61, 0.12)',
      }}
    >
      <Users className="w-9 h-9" style={{ color: '#ff8c42' }} strokeWidth={1.5} />
    </div>
  )
}
