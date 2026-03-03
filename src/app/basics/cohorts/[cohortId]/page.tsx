'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { db, auth as firebaseAuth } from '@/lib/firebase/config'
import Link from 'next/link'
import {
  ShareNetwork,
  Copy,
  Check,
  Users,
  CalendarBlank,
  CurrencyDollar,
  ArrowLeft,
  Eye,
} from '@phosphor-icons/react'
import { logger } from '@/lib/logger'

interface Cohort {
  id: string
  name: string
  creatorId: string
  creatorName: string
  description: string
  targetSize: number
  currentSize: number
  pricePerPerson: number
  totalCost: number
  startDate: string
  status: 'open' | 'full' | 'in-progress' | 'completed'
  discordUrl?: string
  meetingSchedule?: string[]
  createdAt: string
}

interface Member {
  id: string
  userId: string
  userName: string
  userEmail: string
  joinedAt: string
}

export default function CohortDetailPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const cohortId = params.cohortId as string

  const [cohort, setCohort] = useState<Cohort | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [isMember, setIsMember] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [activeTab, setActiveTab] = useState<
    'overview' | 'members' | 'schedule'
  >('overview')
  const [copiedLink, setCopiedLink] = useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [showSeatSelector, setShowSeatSelector] = useState(false)

  // Load cohort data (no auth required for viewing)
  useEffect(() => {
    const loadCohortData = async () => {
      if (!cohortId) return

      setLoadingData(true)
      try {
        // Load cohort
        const cohortDoc = await getDoc(doc(db, 'cohorts', cohortId))
        if (!cohortDoc.exists()) {
          router.push('/basics/cohorts')
          return
        }

        const cohortData = { id: cohortDoc.id, ...cohortDoc.data() } as Cohort
        setCohort(cohortData)

        // Load members count (but not details unless user is authenticated)
        if (user) {
          const membersRef = collection(db, 'cohortMembers')
          const membersQuery = query(
            membersRef,
            where('cohortId', '==', cohortId)
          )
          const membersSnapshot = await getDocs(membersQuery)

          const loadedMembers = membersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Member[]

          setMembers(loadedMembers)

          // Check if current user is a member
          const userIsMember = loadedMembers.some((m) => m.userId === user.uid)
          setIsMember(userIsMember)
        }
      } catch (error) {
        logger.error('CohortDetailPage', 'Failed to load cohort data', {
          error,
        })
      } finally {
        setLoadingData(false)
      }
    }

    loadCohortData()
  }, [cohortId, user, router])

  const handleCopyLink = async () => {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleShareTwitter = () => {
    const url = window.location.href
    const text = `Join me in the ${cohort?.name} cohort! 6 weeks of guided learning with a professional mentor.`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank'
    )
  }

  const handleShareFacebook = () => {
    const url = window.location.href
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank'
    )
  }

  const handleShareLinkedIn = () => {
    const url = window.location.href
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank'
    )
  }

  const handleJoinCohort = async (quantity: number) => {
    if (!user) {
      // Redirect to login with return URL
      router.push(
        `/login?redirect=${encodeURIComponent(window.location.pathname)}`
      )
      return
    }

    try {
      const token = await firebaseAuth.currentUser?.getIdToken()
      if (!token) throw new Error('Authentication error')

      const response = await fetch('/api/cohorts/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cohortId, quantity }),
      })

      const data = await response.json()
      if (!data.success)
        throw new Error(data.error || 'Failed to initiate checkout')

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      logger.error('CohortDetailPage', 'Checkout error', { error })
      alert(error instanceof Error ? error.message : 'Failed to join cohort')
    }
  }

  if (loadingData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </main>
    )
  }

  if (!cohort) {
    return null
  }

  const spotsLeft = cohort.targetSize - cohort.currentSize
  const fillPercentage = (cohort.currentSize / cohort.targetSize) * 100

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/basics/cohorts"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>
          {user ? (
            <span className="text-sm text-gray-600">
              {user.displayName || user.email}
            </span>
          ) : (
            <Link href="/login" className="text-sm text-gray-900">
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Cohort Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {cohort.name}
          </h1>
          <p className="text-lg text-gray-600 mb-8">{cohort.description}</p>

          {/* Key Info */}
          <div className="flex flex-wrap gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Users size={20} weight="regular" />
              <span>
                {cohort.currentSize}/{cohort.targetSize}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CalendarBlank size={20} weight="regular" />
              <span>{new Date(cohort.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CurrencyDollar size={20} weight="regular" />
              <span>${cohort.pricePerPerson}</span>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Spots filled</span>
              <span>{spotsLeft} remaining</span>
            </div>
            <div className="w-full bg-gray-200 h-1">
              <div
                className="bg-gray-900 h-1"
                style={{ width: `${fillPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {cohort.status === 'open' && !isMember && (
              <button
                onClick={() => setShowSeatSelector(!showSeatSelector)}
                className="px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800"
              >
                Join Cohort
              </button>
            )}

            {isMember && (
              <div className="px-6 py-2 bg-gray-100 text-gray-900 font-medium">
                Member
              </div>
            )}

            {cohort.status === 'full' && (
              <div className="px-6 py-2 bg-gray-100 text-gray-600 font-medium">
                Full
              </div>
            )}

            <button
              onClick={handleCopyLink}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2"
            >
              {copiedLink ? <Check size={20} /> : <Copy size={20} />}
              {copiedLink ? 'Copied' : 'Copy Link'}
            </button>

            <button
              onClick={handleShareTwitter}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2"
            >
              <ShareNetwork size={20} />
              Share
            </button>
          </div>

          {/* Seat Selector */}
          {showSeatSelector && cohort.status === 'open' && (
            <div className="mt-6 p-6 border border-gray-300 bg-gray-50">
              <p className="text-sm font-medium text-gray-900 mb-4">
                Select seats
              </p>
              <div className="space-y-2 mb-4">
                <button
                  onClick={() => handleJoinCohort(1)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 text-left"
                >
                  1 seat - ${cohort.pricePerPerson}
                </button>

                {spotsLeft >= 2 && (
                  <button
                    onClick={() => handleJoinCohort(Math.ceil(spotsLeft / 2))}
                    className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 text-left"
                  >
                    {Math.ceil(spotsLeft / 2)} seats - $
                    {cohort.pricePerPerson * Math.ceil(spotsLeft / 2)}
                  </button>
                )}

                {spotsLeft > 1 && (
                  <button
                    onClick={() => handleJoinCohort(spotsLeft)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 text-left"
                  >
                    All {spotsLeft} seats - ${cohort.pricePerPerson * spotsLeft}
                  </button>
                )}

                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max={spotsLeft}
                    value={selectedQuantity}
                    onChange={(e) =>
                      setSelectedQuantity(parseInt(e.target.value))
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-900"
                    placeholder="Custom"
                  />
                  <button
                    onClick={() => {
                      if (
                        selectedQuantity >= 1 &&
                        selectedQuantity <= spotsLeft
                      ) {
                        handleJoinCohort(selectedQuantity)
                      }
                    }}
                    className="px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800"
                  >
                    Buy
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowSeatSelector(false)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {['overview', 'members', 'schedule'].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab as 'overview' | 'members' | 'schedule')
                }
                className={`pb-3 font-medium ${
                  activeTab === tab
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Program</h2>
              <ul className="space-y-2 text-gray-700">
                <li>6 weeks</li>
                <li>3 meetings per week</li>
                <li>1 hour per session</li>
                <li>18 hours total</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Includes</h2>
              <ul className="space-y-2 text-gray-700">
                <li>Expert mentorship</li>
                <li>Code reviews</li>
                <li>Peer support</li>
                <li>Career advice</li>
                <li>Discord community</li>
                <li>Session recordings</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Details</h2>
              <dl className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <dt>Creator</dt>
                  <dd className="font-medium">{cohort.creatorName}</dd>
                </div>
                <div className="flex justify-between text-gray-700">
                  <dt>Group size</dt>
                  <dd className="font-medium">{cohort.targetSize} people</dd>
                </div>
                <div className="flex justify-between text-gray-700">
                  <dt>Price</dt>
                  <dd className="font-medium">
                    ${cohort.pricePerPerson}/person
                  </dd>
                </div>
                <div className="flex justify-between text-gray-700">
                  <dt>Total pool</dt>
                  <dd className="font-medium">
                    ${cohort.totalCost.toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Members ({members.length})
            </h2>

            {!user ? (
              <div className="text-center py-12 border border-gray-200 bg-gray-50">
                <Users size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">Sign in to see members</p>
                <Link
                  href="/login"
                  className="inline-block px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800"
                >
                  Sign In
                </Link>
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-12 border border-gray-200 bg-gray-50">
                <Users size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">No members yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 border border-gray-200 bg-gray-50"
                  >
                    <div className="font-medium text-gray-900">
                      {member.userName}
                    </div>
                    <div className="text-sm text-gray-600">
                      Joined {new Date(member.joinedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="p-6 border border-gray-200 bg-gray-50">
              <h3 className="font-bold text-gray-900 mb-2">Schedule</h3>
              <p className="text-gray-700">
                Meetings scheduled after cohort fills. Calendar invites sent via
                email.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Typical week</h3>
              <div className="space-y-3">
                <div className="p-4 border border-gray-200">
                  <div className="font-medium text-gray-900">Monday 7-8pm</div>
                  <div className="text-sm text-gray-600">
                    Kickoff & planning
                  </div>
                </div>
                <div className="p-4 border border-gray-200">
                  <div className="font-medium text-gray-900">
                    Wednesday 7-8pm
                  </div>
                  <div className="text-sm text-gray-600">Code review & Q&A</div>
                </div>
                <div className="p-4 border border-gray-200">
                  <div className="font-medium text-gray-900">Friday 7-8pm</div>
                  <div className="text-sm text-gray-600">Demo & feedback</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      {cohort.status === 'open' && !isMember && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 py-8 text-center">
            <p className="text-gray-600 mb-4">
              {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} remaining
            </p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setShowSeatSelector(true)
              }}
              className="px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800"
            >
              Join Cohort
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
