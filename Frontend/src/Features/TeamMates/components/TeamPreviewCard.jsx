import { useNavigate } from 'react-router-dom'
import TeamMemberRow from './TeamMemberRow.jsx'

export default function TeamPreviewCard({ members }) {

  const navigate = useNavigate();
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
        Recent team · {members.length} members
      </p>

      <div className="flex flex-col gap-2">
        {members.length === 0 ? (
          <p className="text-sm text-muted py-2">No recent teammates yet.</p>
        ) : (
          members.map((member, i) => (
            <TeamMemberRow
              key={member._id}
              member={member}
              index={i}
              isLast={i === members.length - 1}
            />
          ))
        )}
      </div>

      <button
        onClick={() => navigate('/team/search')}
        className="w-full mt-4 text-sm font-semibold rounded-xl py-2.5 opacity-100 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
          color: 'white',
        }}
      >
        + Add More Team Mates
      </button>
    </div>
  )
}
