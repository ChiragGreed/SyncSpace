export default function DashboardBackground() {
  return (
    <>
      {/* Orange background image — rotated to landscape, blended into theme */}
       <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            zIndex: 1,
            pointerEvents: 'none',
            backgroundImage: 'url("/OrangeBackground.jpg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: 0.13,
            mixBlendMode: 'screen',
            filter: 'blur(2px) saturate(1.4)',
            borderRadius: '10%',
          }}
        />


      {/* Radial vignette overlay — keeps edges dark so content is readable */}
      <div
        aria-hidden="true"
        className="fixed left-0 md:left-[256px]"
        style={{
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 80% 20%, transparent 20%, rgba(10,8,6,0.75) 65%, rgba(10,8,6,0.97) 100%)',
        }}
      />
    </>
  )
}
