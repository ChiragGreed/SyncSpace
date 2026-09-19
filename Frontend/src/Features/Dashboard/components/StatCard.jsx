// All stat cards share the same orange warm-glow aesthetic, differing only in opacity/angle
const CARD_STYLES = [
  { bg: 'linear-gradient(145deg, rgba(255,107,61,0.14) 0%, rgba(255,140,66,0.06) 100%)' },
  { bg: 'linear-gradient(145deg, rgba(255,140,66,0.12) 0%, rgba(255,107,61,0.05) 100%)' },
  { bg: 'linear-gradient(145deg, rgba(255,107,61,0.1) 0%, rgba(255,180,80,0.07) 100%)' },
  { bg: 'linear-gradient(145deg, rgba(255,160,70,0.12) 0%, rgba(255,107,61,0.06) 100%)' },
]

export default function StatCard({ label, value, delta, index = 0 }) {
  const card = CARD_STYLES[index % CARD_STYLES.length]
  const isPositive = typeof delta === 'string' && delta.startsWith('+')
  const isNegative = typeof delta === 'string' && delta.startsWith('-')

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-1 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
      style={{
        background: card.bg,
        border: '1px solid rgba(255, 107, 61, 0.18)',
        boxShadow: '0 4px 20px rgba(255, 107, 61, 0.08)',
      }}
    >
      <p className="text-xs text-muted mb-1">{label}</p>
      <p className="font-display text-3xl font-bold" style={{ color: '#fff8f0' }}>
        {value}
      </p>
      <p className={`text-[11px] font-mono mt-0.5 ${isPositive ? 'text-accent' : isNegative ? 'text-rose' : 'text-muted'}`}>
        {delta}
      </p>
    </div>
  )
}
