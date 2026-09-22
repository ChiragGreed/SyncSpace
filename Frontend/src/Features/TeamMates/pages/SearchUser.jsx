import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  Search,
  Send,
  UserRound,
  Users,
  X,
} from 'lucide-react'
import { useSelector } from 'react-redux'
import SearchUserBackground from '../components/SearchUserBackground.jsx'
import useInvitation from '../../Invitations/hook/useInvitation.js'
import useProject from '../../Projects/hook/useProject.js'
import useTeam from '../hook/useTeam.js'

const statusStyles = {
  pending: 'border-amber/30 bg-amber/10 text-amber',
  accepted: 'border-teal/30 bg-teal/10 text-teal',
  rejected: 'border-rose/30 bg-rose/10 text-rose',
}

const dashboardCardStyle = {
  background:
    'linear-gradient(145deg, rgba(26,20,16,0.95) 0%, rgba(18,14,10,0.9) 100%)',
  border: '1px solid rgba(255, 107, 61, 0.14)',
  boxShadow: '0 4px 24px rgba(255, 107, 61, 0.06)',
}

const initials = (name = 'User') =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const getPerson = (invitation, direction) =>
  direction === 'sent' ? invitation.receiverId : invitation.senderId

const SearchUser = () => {
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [invitedIds, setInvitedIds] = useState([])
  const [selectedProject, setSelectedProject] = useState('')
  const [projectMenuOpen, setProjectMenuOpen] = useState(false)
  const [notice, setNotice] = useState(null)

  const users = useSelector((state) => state.team.users ?? [])
  const projects = useSelector((state) => state.project.projects ?? [])
  const sentInvitations = useSelector(
    (state) => state.invitation.sentInvitations ?? [],
  )
  const receivedInvitations = useSelector(
    (state) => state.invitation.receivedInvitations ?? [],
  )

  const { searchUsers } = useTeam()
  const { getProjects } = useProject()
  const {
    createInvitation,
    getReceivedInvitations,
    getSentInvitations,
  } = useInvitation()

  const activeProject = selectedProject || projects[0]?._id || ''
  const selectedProjectLabel =
    projects.find((project) => project._id === activeProject)?.title ||
    projects.find((project) => project._id === activeProject)?.name ||
    'No projects available'

  useEffect(() => {
    getProjects()
    getReceivedInvitations()
    getSentInvitations()
  }, [getProjects, getReceivedInvitations, getSentInvitations])

  const pendingRecipientIds = useMemo(
    () =>
      new Set(
        sentInvitations
          .filter((invitation) => invitation.status === 'pending')
          .map(
            (invitation) =>
              invitation.receiverId?._id || invitation.receiverId,
          ),
      ),
    [sentInvitations],
  )

  const handleSearch = async (event) => {
    event.preventDefault()

    const value = query.trim()

    setSearched(Boolean(value))

    if (value) {
      await searchUsers(value)
    }
  }

  const handleInvite = async (user) => {
    if (!activeProject) {
      setNotice({
        type: 'error',
        text: 'Choose a project before sending an invitation.',
      })
      return
    }

    try {
      await createInvitation(activeProject, [user._id])

      setInvitedIds((current) => [...current, user._id])

      setNotice({
        type: 'success',
        text: `Invitation sent to ${user.fullName}.`,
      })

      await getSentInvitations()
    } catch (error) {
      setNotice({
        type: 'error',
        text:
          error.response?.data?.message ||
          'The invitation could not be sent.',
      })
    }
  }

  const isInvited = (user) =>
    invitedIds.includes(user._id) || pendingRecipientIds.has(user._id)

  return (
    <>
      <SearchUserBackground />

      <div className="relative z-10 min-h-screen px-5 py-8 text-ink md:px-10 md:py-12">

        <button
          type="button"
          onClick={() => window.history.back()}
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'rgba(17, 17, 24, 0.7)',
            borderColor: 'rgba(255, 107, 61, 0.18)',
            boxShadow: '0 6px 18px rgba(255,107,61,0.1)',
          }}
        >
          <ArrowLeft className="h-4 w-4 text-accentLight" />
          Back
        </button>

        <main className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-accentLight">
              <Users className="h-4 w-4" />
              Team directory
            </div>

            <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Find your next teammate.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted md:text-base">
              Search by full name, email, or user ID, then invite someone to
              one of your active projects.
            </p>
          </div>

          <section
            className="rounded-2xl p-4 md:p-6"
            style={dashboardCardStyle}
          >
            <form
              className="flex flex-col gap-3 md:flex-row"
              onSubmit={handleSearch}
            >
              <label className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search name, email, or user ID"
                  className="h-14 w-full rounded-xl border pl-12 pr-4 text-sm text-ink placeholder:text-muted focus:outline-none"
                  style={{
                    background: 'linear-gradient(145deg, rgba(18,12,10,0.96) 0%, rgba(22,16,12,0.9) 100%)',
                    borderColor: 'rgba(255, 107, 61, 0.18)',
                    boxShadow: 'inset 0 0 0 1px rgba(255, 107, 61, 0.04)',
                    color: '#fff0e8',
                  }}
                />
              </label>

              <button
                type="submit"
                className="h-14 rounded-xl px-6 font-display text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background:
                    'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
                  boxShadow: '0 8px 20px rgba(255,107,61,0.35)',
                  border: '1px solid rgba(255, 140, 66, 0.28)',
                }}
              >
                Search directory
              </button>
            </form>

            <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-muted">
                  Invite to project
                </p>

                <p className="mt-1 text-sm text-ink">
                  New invitations will be attached to this project.
                </p>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProjectMenuOpen((open) => !open)}
                  className="flex h-11 min-w-[220px] items-center justify-between rounded-lg border px-3 text-sm text-ink transition-all duration-200 focus:outline-none"
                  style={{
                    background: 'linear-gradient(145deg, rgba(18,12,10,0.96) 0%, rgba(22,16,12,0.9) 100%)',
                    borderColor: 'rgba(255, 107, 61, 0.18)',
                    boxShadow: 'inset 0 0 0 1px rgba(255, 107, 61, 0.04)',
                    color: '#fff0e8',
                  }}
                  aria-label="Select project for invitation"
                >
                  <span className="truncate">{selectedProjectLabel}</span>
                  <ChevronDown className="h-4 w-4 text-accentLight" />
                </button>

                {projectMenuOpen && (
                  <div
                    className="absolute right-0 z-20 mt-2 w-full overflow-hidden rounded-xl border"
                    style={{
                      background: 'linear-gradient(145deg, rgba(18,12,10,0.98) 0%, rgba(22,16,12,0.96) 100%)',
                      borderColor: 'rgba(255, 107, 61, 0.18)',
                      boxShadow: '0 16px 32px rgba(0,0,0,0.28)',
                    }}
                  >
                    {projects.length ? (
                      projects.map((project) => (
                        <button
                          key={project._id}
                          type="button"
                          onClick={() => {
                            setSelectedProject(project._id)
                            setProjectMenuOpen(false)
                          }}
                          className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition hover:bg-white/5"
                          style={{
                            color: activeProject === project._id ? '#ffb347' : '#fff0e8',
                            background: activeProject === project._id ? 'rgba(255, 107, 61, 0.08)' : 'transparent',
                          }}
                        >
                          <span className="truncate">{project.title || project.name}</span>
                          {activeProject === project._id && (
                            <Check className="h-4 w-4 text-accentLight" />
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2.5 text-sm text-muted">
                        No projects available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {notice && (
            <div
              className={`mt-4 flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${notice.type === 'success'
                ? 'border-teal/30 bg-teal/10 text-teal'
                : 'border-rose/30 bg-rose/10 text-rose'
                }`}
              role="status"
            >
              {notice.text}

              <button
                onClick={() => setNotice(null)}
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <section className="mt-8">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-accentLight">
                  Directory results
                </p>

                <h2 className="mt-1 font-display text-xl font-semibold">
                  People you can invite
                </h2>
              </div>

              {searched && (
                <span className="text-xs text-muted">
                  {users.length} result{users.length === 1 ? '' : 's'}
                </span>
              )}
            </div>

            {!searched ? (
              <div
                className="rounded-2xl border border-dashed border-border p-10 text-center"
                style={dashboardCardStyle}
              >
                <Search className="mx-auto h-8 w-8 text-accent" />

                <p className="mt-3 text-sm text-muted">
                  Start with a name, email, or user ID to find teammates.
                </p>
              </div>
            ) : users.length ? (
              <div className="grid gap-3">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="flex flex-col gap-4 rounded-2xl p-4 transition sm:flex-row sm:items-center sm:justify-between"
                    style={dashboardCardStyle}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accentSoft font-display font-semibold text-accentLight">
                        {initials(user.fullName)}
                      </div>

                      <div>
                        <p className="font-display font-semibold">
                          {user.fullName}
                        </p>

                        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5" />
                            {user.email}
                          </span>

                          <span className="flex items-center gap-1">
                            <UserRound className="h-3.5 w-3.5" />
                            {user.userId}
                          </span>
                        </p>
                      </div>
                    </div>

                    <button
                      disabled={isInvited(user)}
                      onClick={() => handleInvite(user)}
                      className={`flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all duration-200 ${isInvited(user)
                        ? 'cursor-default border border-teal/30 bg-teal/10 text-teal'
                        : 'text-white hover:-translate-y-0.5'
                        }`}
                      style={
                        isInvited(user)
                          ? undefined
                          : {
                            background:
                              'linear-gradient(135deg, #ff6b3d 0%, #ffb347 100%)',
                            boxShadow:
                              '0 6px 18px rgba(255,107,61,0.32)',
                            border:
                              '1px solid rgba(255, 140, 66, 0.26)',
                          }
                      }
                    >
                      {isInvited(user) ? (
                        <>
                          <Check className="h-4 w-4" />
                          Invited
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Invite
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="rounded-2xl border border-dashed border-border p-10 text-center"
                style={dashboardCardStyle}
              >
                <UserRound className="mx-auto h-8 w-8 text-muted" />

                <p className="mt-3 text-sm text-muted">
                  No teammates matched “{query}”.
                </p>
              </div>
            )}
          </section>

          <section className="mt-14 border-t border-border pt-10">
            <div className="mb-6">
              <p className="text-xs font-mono uppercase tracking-wider text-accentLight">
                Activity log
              </p>

              <h2 className="mt-1 font-display text-2xl font-semibold">
                Invitation history
              </h2>

              <p className="mt-2 text-sm text-muted">
                A record of invitations you have sent and received.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {[
                ['Sent by you', sentInvitations, 'sent'],
                ['Received by you', receivedInvitations, 'received'],
              ].map(([title, invitations, direction]) => (
                <div
                  key={title}
                  className="rounded-2xl p-5"
                  style={dashboardCardStyle}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display font-semibold">{title}</h3>

                    <span className="rounded-full bg-[#ffb347]/12 border border-[rgba(255, 179, 71, 0.15)] px-2.5 py-1 text-[#ffb347] text-xs " >
                      {invitations.length}
                    </span>
                  </div>

                  {invitations.length ? (
                    <div className="space-y-3">
                      {invitations.map((invitation) => {
                        const person = getPerson(invitation, direction)

                        return (
                          <div
                            key={invitation._id}
                            className="flex items-center justify-between gap-3 border-t border-border pt-3 first:border-0 first:pt-0"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {person?.fullName ||
                                  person?.email ||
                                  'Teammate'}
                              </p>

                              <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                                <Clock3 className="h-3.5 w-3.5" />
                                {invitation.projectId?.title ||
                                  'Project invitation'}
                              </p>
                            </div>

                            <span
                              className={`shrink-0 rounded-full border px-2 py-1 text-[11px] capitalize ${statusStyles[invitation.status] ||
                                statusStyles.pending
                                }`} style={{
                                  background: 'rgba(255,107,61,0.1)',
                                  color: '#ff8c42',
                                  border: '1px solid rgba(255,107,61,0.15)',
                                }}
                            >
                              {invitation.status}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="py-5 text-sm text-muted">
                      No invitation activity yet.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default SearchUser