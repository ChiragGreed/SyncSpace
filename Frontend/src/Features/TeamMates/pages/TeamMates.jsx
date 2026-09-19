import TeammatesHeroIcon from '../components/TeammatesHeroIcon.jsx'
import ComingSoonBadge from '../components/ComingSoonBadge.jsx'
import TeammatesHeading from '../components/TeammatesHeading.jsx'
import TeamPreviewCard from '../components/TeamPreviewCard.jsx'

export default function TeammatesPage() {
  return (
    <div className="px-5 md:px-8 py-10 max-w-2xl mx-auto relative z-10 min-h-[80vh] flex flex-col items-center justify-center text-center">
      <TeammatesHeroIcon />
      <ComingSoonBadge />
      <TeammatesHeading />
      <TeamPreviewCard />
    </div>
  )
}
