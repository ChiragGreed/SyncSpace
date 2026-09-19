import { members } from '../../../mockData.js'
import TeamMemberRow from './TeamMemberRow.jsx'

export default function TeamPreviewCard() {
  return (
    <div
      className="w-full rounded-2xl p-5"
      style={{
        background: 'linear-gradient(145deg, rgba(26,20,16,0.95) 0%, rgba(18,14,10,0.9) 100%)',
        border: '1px solid rgba(255, 107, 61, 0.14)',
        boxShadow: '0 4px 24px rgba(255, 107, 61, 0.06)',
      }}
    >
      <p className="text-xs text-muted mb-4 text-left font-mono">
        Current team · {members.length} members
      </p>

      <div className="flex flex-col gap-2">
        {members.map((m, i) => (
          <TeamMemberRow
            key={m.id}
            member={m}
            index={i}
            isLast={i === members.length - 1}
          />
        ))}
      </div>

      {/* Disabled invite button */}
      <button
        disabled
        className="w-full mt-4 text-sm font-semibold rounded-xl py-2.5 opacity-40 cursor-not-allowed"
        style={{
          background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
          color: 'white',
        }}
      >
        + Invite teammate — Coming soon
      </button>
    </div>
  )
}
