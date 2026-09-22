export default function TeammatesHeading() {
  return (
    <>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-3">
        <span style={{ color: '#fff0e8' }}>Manage your </span>
        <span
          style={{
            background: 'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          teammates
        </span>
      </h1>
      <p className="text-sm text-muted max-w-sm leading-relaxed mb-10">
        Invite, manage and assign roles to your team members.
      </p>
    </>
  )
}
