import TeammatesHeroIcon from '../components/TeammatesHeroIcon.jsx'
import ComingSoonBadge from '../components/ComingSoonBadge.jsx'
import TeammatesHeading from '../components/TeammatesHeading.jsx'
import TeamPreviewCard from '../components/TeamPreviewCard.jsx'
import useTeam from '../hook/useTeam.js'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function TeammatesPage() {
  const { getRecentTeammates } = useTeam();
  const recentTeammates = useSelector((state) => state.team.recentTeammates)

  useEffect(() => {
    getRecentTeammates()
  }, [getRecentTeammates])

  return (
    <div className="px-5 md:px-8 py-10 max-w-2xl mx-auto relative z-10 min-h-[80vh] flex flex-col items-center justify-center text-center">
      <TeammatesHeroIcon />
      <TeammatesHeading />
      <TeamPreviewCard members={recentTeammates} />
    </div>
  )
}
