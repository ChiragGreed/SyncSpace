const AVATAR_BG = [
  'linear-gradient(135deg, #ff6b3d 0%, #ff8c42 100%)',
  'linear-gradient(135deg, #ff8c42 0%, #ffb347 100%)',
  'linear-gradient(135deg, #e85d2e 0%, #ff6b3d 100%)',
  'linear-gradient(135deg, #ffb347 0%, #ff8c42 100%)',
]

export default function TeamMemberRow({ member, index, isLast }) {
  const initials = member.fullName
    .split(' ')
    .map((name) => name[0])
    .join('')
    .slice(0, 2)

  return (
    <div
      className="flex items-center gap-3 py-2 px-1 rounded-xl"
      style={{ borderBottom: !isLast ? '1px solid rgba(255,107,61,0.07)' : 'none' }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono text-white shrink-0"
        style={{ background: AVATAR_BG[index % AVATAR_BG.length] }}
      >
        {initials}
      </div>
      <p className="text-sm text-left" style={{ color: '#fff0e8' }}>{member.fullName}</p>
      <span
        className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full"
        style={{
          background: 'rgba(255,107,61,0.1)',
          color: '#ff8c42',
          border: '1px solid rgba(255,107,61,0.15)',
        }}
      >
        {member.role || 'Member'}
      </span>
    </div>
  )
}
