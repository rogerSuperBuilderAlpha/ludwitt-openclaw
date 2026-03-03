'use client'

import { useState, useMemo } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useUniversityLearningPaths } from '@/lib/hooks/useUniversityLearningPaths'
import { useUniversityLearningPath } from '@/lib/hooks/useUniversityLearningPath'
import { useCreateLearningPath } from '@/lib/hooks/useCreateLearningPath'
import { usePublishPath } from '@/lib/hooks/usePublishPath'
import { usePublishedPaths } from '@/lib/hooks/usePublishedPaths'
import { useJoinPath } from '@/lib/hooks/useJoinPath'
import { useToggleCreatorAnonymous } from '@/lib/hooks/useToggleCreatorAnonymous'
import { usePathActivityStats } from '@/lib/hooks/usePathActivityStats'
import { useCourseProfessors } from '@/lib/hooks/useCourseProfessors'
import { usePathDocuments } from '@/lib/hooks/usePathDocuments'
import { useBusinessIdeas } from '@/lib/hooks/useBusinessIdeas'
import { useThesisIdeas } from '@/lib/hooks/useThesisIdeas'
import { useCreateBusinessIdea } from '@/lib/hooks/useCreateBusinessIdea'
import { useCreateThesisIdea } from '@/lib/hooks/useCreateThesisIdea'
import { useUpdateIdea } from '@/lib/hooks/useUpdateIdea'
import { UniversityDashboard } from '@/components/university/UniversityDashboard'
import { PathDetailView } from '@/components/university/PathDetailView'
import { TopicInputForm } from '@/components/university/TopicInputForm'
import { GeneratingPathLoader } from '@/components/university/GeneratingPathLoader'
import { CourseDetailView } from '@/components/university/CourseDetailView'
import { PublishedPathsBrowser } from '@/components/university/PublishedPathsBrowser'
import { ProfessorsBrowser } from '@/components/university/ProfessorsBrowser'
import { IdeaCreateForm } from '@/components/university/IdeaCreateForm'
import { IdeaEditView } from '@/components/university/IdeaEditView'
import { PeerReviewQueue } from '@/components/university/peer-reviews/PeerReviewQueue'
import { PeerReviewForm } from '@/components/university/peer-reviews/PeerReviewForm'
import { GuidedExploration } from '@/components/university/exploration/GuidedExploration'
import { ContributionView } from '@/components/university/contributions/ContributionView'
import { StudentAnalyticsView } from '@/components/university/analytics/StudentAnalyticsView'
import { PortfolioEditor } from '@/components/university/portfolio/PortfolioEditor'
import { SkillGraph } from '@/components/university/skills/SkillGraph'
import { RecommendationsList } from '@/components/university/recommendations/RecommendationsList'
import { StudyRoomList } from '@/components/university/study-rooms/StudyRoomList'
import { CredentialsList } from '@/components/university/credentials/CredentialsList'
import { CredentialView } from '@/components/university/credentials/CredentialView'
import { SandboxView } from '@/components/university/sandbox/SandboxView'
import { AssistantChat } from '@/components/university/assistant/AssistantChat'
import { useProfessors } from '@/lib/hooks/useProfessors'
import type {
  UniversityCourseDisplay,
  UniversityLearningPathDisplay,
  UniversityBusinessIdeaDisplay,
  UniversityThesisIdeaDisplay,
  IdeaDocument,
  PeerReview,
  DigitalCredential,
} from '@/lib/types/university'

type View =
  | 'dashboard'
  | 'path-detail'
  | 'course-detail'
  | 'create'
  | 'generating'
  | 'browse'
  | 'professors'
  | 'create-business'
  | 'create-thesis'
  | 'edit-business'
  | 'edit-thesis'
  | 'peer-reviews'
  | 'peer-review-form'
  | 'exploration'
  | 'contributions'
  | 'analytics'
  | 'portfolio'
  | 'skills'
  | 'recommendations'
  | 'study-rooms'
  | 'credentials'
  | 'credential-detail'
  | 'sandbox'

export default function UniversityPage() {
  const { user } = useAuth()
  const { paths, loading: pathsLoading } = useUniversityLearningPaths(user?.uid)
  const { createPath, error: createError } = useCreateLearningPath()
  const { publishPath, isPublishing } = usePublishPath()
  const { publishedPaths, loading: browseLoading, error: browseError, refetch: refetchPublished } = usePublishedPaths()
  const { joinPath, isJoining } = useJoinPath()
  const { toggleAnonymous, isToggling: isTogglingAnonymous } = useToggleCreatorAnonymous()

  // Business & Thesis hooks
  const { ideas: businessIdeas } = useBusinessIdeas(user?.uid)
  const { ideas: thesisIdeas } = useThesisIdeas(user?.uid)
  const { createIdea: createBusinessIdea, isCreating: isCreatingBusiness, error: createBusinessError } = useCreateBusinessIdea()
  const { createIdea: createThesisIdea, isCreating: isCreatingThesis, error: createThesisError } = useCreateThesisIdea()
  const { updateIdea, isUpdating, error: updateError } = useUpdateIdea()

  // Professor listing
  const { professors, loading: professorsLoading, error: professorsError } = useProfessors()
  const [professorFilterId, setProfessorFilterId] = useState<string | null>(null)

  const [view, setView] = useState<View>('dashboard')
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [selectedBusinessIdeaId, setSelectedBusinessIdeaId] = useState<string | null>(null)
  const [selectedThesisIdeaId, setSelectedThesisIdeaId] = useState<string | null>(null)
  const [selectedPeerReview, setSelectedPeerReview] = useState<PeerReview | null>(null)
  const [explorationCourseId, setExplorationCourseId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [joiningPathId, setJoiningPathId] = useState<string | null>(null)
  const [showAssistant, setShowAssistant] = useState(false)
  const [selectedCredential, setSelectedCredential] = useState<DigitalCredential | null>(null)
  const [sandboxDeliverableId, setSandboxDeliverableId] = useState<string | null>(null)
  const [studyRoomPathId, setStudyRoomPathId] = useState<string | null>(null)

  // Fallback data from API response (used while real-time hooks catch up)
  const [fallbackPath, setFallbackPath] = useState<UniversityLearningPathDisplay | null>(null)
  const [fallbackCourses, setFallbackCourses] = useState<UniversityCourseDisplay[]>([])
  const [fallbackBusinessIdea, setFallbackBusinessIdea] = useState<UniversityBusinessIdeaDisplay | null>(null)
  const [fallbackThesisIdea, setFallbackThesisIdea] = useState<UniversityThesisIdeaDisplay | null>(null)

  // Load activity stats for the selected path
  const { stats } = usePathActivityStats(selectedPathId || undefined)

  // Load resolved professors for the selected path
  const { professorsByOrder } = useCourseProfessors(selectedPathId || undefined)

  // Load professor documents for the selected path
  const { documents: professorDocuments } = usePathDocuments(selectedPathId || undefined)

  // Load the selected path's courses via real-time hook
  const { learningPath: livePath, courses: liveCourses, loading: pathLoading } = useUniversityLearningPath(
    selectedPathId || undefined,
    user?.uid
  )

  // Use live data when available, fallback to API response
  const selectedPath = livePath || (selectedPathId === fallbackPath?.id ? fallbackPath : null)
  const selectedCourses = liveCourses.length > 0 ? liveCourses : (selectedPathId === fallbackPath?.id ? fallbackCourses : [])

  const selectedCourse = selectedCourses.find(c => c.id === selectedCourseId) || null

  // Include fallback path in the paths list if not yet in live data
  const allPaths = useMemo(() => {
    if (fallbackPath && !paths.find(p => p.id === fallbackPath.id)) {
      return [fallbackPath, ...paths]
    }
    return paths
  }, [paths, fallbackPath])

  // Include fallback ideas in lists if not yet in live data
  const allBusinessIdeas = useMemo(() => {
    if (fallbackBusinessIdea && !businessIdeas.find(i => i.id === fallbackBusinessIdea.id)) {
      return [fallbackBusinessIdea, ...businessIdeas]
    }
    return businessIdeas
  }, [businessIdeas, fallbackBusinessIdea])

  const allThesisIdeas = useMemo(() => {
    if (fallbackThesisIdea && !thesisIdeas.find(i => i.id === fallbackThesisIdea.id)) {
      return [fallbackThesisIdea, ...thesisIdeas]
    }
    return thesisIdeas
  }, [thesisIdeas, fallbackThesisIdea])

  // Collect all subjects from the user's paths for recommendation scoring
  const userSubjects = useMemo(() => {
    const set = new Set<string>()
    for (const p of allPaths) {
      for (const s of p.subjects || []) set.add(s)
    }
    return [...set]
  }, [allPaths])

  // Track which published paths the user has already joined
  const joinedSourceIds = useMemo(() => {
    const ids = new Set<string>()
    for (const p of allPaths) {
      if (p.sourcePathId) ids.add(p.sourcePathId)
    }
    return ids
  }, [allPaths])

  // Resolve selected ideas
  const selectedBusinessIdea = allBusinessIdeas.find(i => i.id === selectedBusinessIdeaId) || null
  const selectedThesisIdea = allThesisIdeas.find(i => i.id === selectedThesisIdeaId) || null

  function handleSelectPath(pathId: string) {
    setSelectedPathId(pathId)
    setView('path-detail')
  }

  function handleSelectCourse(courseId: string) {
    setSelectedCourseId(courseId)
    setView('course-detail')
  }

  async function handleTopicSubmit(topic: string, description?: string) {
    setError(null)
    setView('generating')

    const { data, error: createErr } = await createPath({ targetTopic: topic, targetDescription: description })

    if (!data) {
      setError(createErr || 'Failed to generate learning path. Please try again.')
      setView('create')
      return
    }

    // Store fallback and navigate to the new path's detail view
    setFallbackPath(data.learningPath)
    setFallbackCourses(data.courses)
    setSelectedPathId(data.learningPath.id)
    setView('path-detail')
  }

  async function handlePublish(pathId: string, anonymous?: boolean) {
    setError(null)
    const result = await publishPath(pathId, { anonymous })
    if (!result.success) {
      setError(result.error || 'Failed to publish path')
    }
  }

  async function handleJoin(pathId: string) {
    setError(null)
    setJoiningPathId(pathId)

    const { data, error: joinErr } = await joinPath(pathId)
    setJoiningPathId(null)

    if (!data) {
      setError(joinErr || 'Failed to join path')
      return
    }

    // Store fallback and navigate to the joined path's detail view
    setFallbackPath(data.learningPath)
    setFallbackCourses(data.courses)
    setSelectedPathId(data.learningPath.id)
    setView('path-detail')
  }

  function handleBrowsePublished() {
    setError(null)
    setProfessorFilterId(null)
    refetchPublished()
    setView('browse')
  }

  function handleBrowseProfessors() {
    setError(null)
    setView('professors')
  }

  function handleFilterByProfessor(professorId: string) {
    setProfessorFilterId(professorId)
    refetchPublished()
    setView('browse')
  }

  async function handleToggleAnonymous(pathId: string, creatorAnonymous: boolean) {
    setError(null)
    const result = await toggleAnonymous(pathId, creatorAnonymous)
    if (!result.success) {
      setError(result.error || 'Failed to toggle anonymity')
    } else {
      refetchPublished()
    }
  }

  async function handleBusinessIdeaSubmit(concept: string, description?: string) {
    setError(null)

    const { data, error: err } = await createBusinessIdea({ concept, description })

    if (!data) {
      setError(err || 'Failed to create business idea. Please try again.')
      return
    }

    setFallbackBusinessIdea(data.idea)
    setSelectedBusinessIdeaId(data.idea.id)
    setView('edit-business')
  }

  async function handleThesisIdeaSubmit(topic: string, description?: string) {
    setError(null)

    const { data, error: err } = await createThesisIdea({ topic, description })

    if (!data) {
      setError(err || 'Failed to create thesis idea. Please try again.')
      return
    }

    setFallbackThesisIdea(data.idea)
    setSelectedThesisIdeaId(data.idea.id)
    setView('edit-thesis')
  }

  async function handleSaveBusinessIdea(documents: IdeaDocument[]) {
    if (!selectedBusinessIdeaId) return
    setError(null)
    const { error: err } = await updateIdea({
      ideaId: selectedBusinessIdeaId,
      collection: 'business',
      documents,
    })
    if (err) setError(err)
  }

  async function handleSubmitBusinessIdea(documents: IdeaDocument[]) {
    if (!selectedBusinessIdeaId) return
    setError(null)
    const { error: err } = await updateIdea({
      ideaId: selectedBusinessIdeaId,
      collection: 'business',
      documents,
      submit: true,
    })
    if (err) setError(err)
  }

  async function handleSaveThesisIdea(documents: IdeaDocument[]) {
    if (!selectedThesisIdeaId) return
    setError(null)
    const { error: err } = await updateIdea({
      ideaId: selectedThesisIdeaId,
      collection: 'thesis',
      documents,
    })
    if (err) setError(err)
  }

  async function handleSubmitThesisIdea(documents: IdeaDocument[]) {
    if (!selectedThesisIdeaId) return
    setError(null)
    const { error: err } = await updateIdea({
      ideaId: selectedThesisIdeaId,
      collection: 'thesis',
      documents,
      submit: true,
    })
    if (err) setError(err)
  }

  const anyError = error || createError || createBusinessError || createThesisError || updateError
  const isGeneratingView = view === 'generating'

  return (
    <div className="min-h-[calc(100vh-48px)] bg-gray-50">
      <div className="px-4 py-8">
        {/* Error banner */}
        {anyError && !isGeneratingView && (
          <div className="max-w-2xl mx-auto mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
            {anyError}
          </div>
        )}

        {view === 'dashboard' && (
          <UniversityDashboard
            paths={allPaths}
            businessIdeas={allBusinessIdeas}
            thesisIdeas={allThesisIdeas}
            loading={pathsLoading}
            onStartNew={() => { setError(null); refetchPublished(); setView('create') }}
            onSelectPath={handleSelectPath}
            onBrowsePublished={handleBrowsePublished}
            onStartNewBusinessIdea={() => { setError(null); setView('create-business') }}
            onStartNewThesisIdea={() => { setError(null); setView('create-thesis') }}
            onSelectBusinessIdea={(id) => { setSelectedBusinessIdeaId(id); setView('edit-business') }}
            onSelectThesisIdea={(id) => { setSelectedThesisIdeaId(id); setView('edit-thesis') }}
            onBrowseProfessors={handleBrowseProfessors}
            onViewPeerReviews={() => { setError(null); setView('peer-reviews') }}
            onViewExplorations={() => { setError(null); setView('exploration') }}
            onViewContributions={() => { setError(null); setView('contributions') }}
            onViewAnalytics={() => { setError(null); setView('analytics') }}
            onViewPortfolio={() => { setError(null); setView('portfolio') }}
            onViewSkills={() => { setError(null); setView('skills') }}
            onViewRecommendations={() => { setError(null); setView('recommendations') }}
            onViewStudyRooms={() => {
              if (allPaths.length > 0) {
                setStudyRoomPathId(allPaths[0].id)
              }
              setError(null)
              setView('study-rooms')
            }}
            onViewCredentials={() => { setError(null); setView('credentials') }}
          />
        )}

        {view === 'path-detail' && selectedPath && (
          <PathDetailView
            learningPath={selectedPath}
            courses={selectedCourses}
            loading={pathLoading && selectedCourses.length === 0}
            stats={stats}
            professorDocuments={professorDocuments}
            onSelectCourse={handleSelectCourse}
            onBack={() => setView('dashboard')}
            onPublish={handlePublish}
            isPublishing={isPublishing}
          />
        )}

        {view === 'course-detail' && selectedCourse && (
          <CourseDetailView
            course={selectedCourse}
            stats={stats?.courses.find(s => s.order === selectedCourse.order)}
            onBack={() => setView('path-detail')}
            resolvedProfessors={professorsByOrder.get(selectedCourse.order)}
            onExplore={() => {
              setExplorationCourseId(selectedCourse.id)
              setError(null)
              setView('exploration')
            }}
          />
        )}

        {view === 'create' && (
          <TopicInputForm
            onSubmit={handleTopicSubmit}
            onBack={() => setView('dashboard')}
            isLoading={false}
            publishedPaths={publishedPaths}
            joinedSourceIds={joinedSourceIds}
            joiningPathId={joiningPathId}
            onJoin={handleJoin}
            onToggleAnonymous={handleToggleAnonymous}
            isTogglingAnonymous={isTogglingAnonymous}
          />
        )}

        {view === 'generating' && <GeneratingPathLoader />}

        {view === 'browse' && (
          <PublishedPathsBrowser
            paths={publishedPaths}
            loading={browseLoading}
            error={browseError}
            joinedSourceIds={joinedSourceIds}
            joiningPathId={joiningPathId}
            onJoin={handleJoin}
            onBack={() => { setProfessorFilterId(null); setView('dashboard') }}
            onToggleAnonymous={handleToggleAnonymous}
            isTogglingAnonymous={isTogglingAnonymous}
            userSubjects={userSubjects}
            initialProfessorId={professorFilterId}
          />
        )}

        {view === 'professors' && (
          <ProfessorsBrowser
            professors={professors}
            loading={professorsLoading}
            error={professorsError}
            onBack={() => setView('dashboard')}
            onFilterByProfessor={handleFilterByProfessor}
          />
        )}

        {view === 'create-business' && (
          <IdeaCreateForm
            type="business"
            onSubmit={handleBusinessIdeaSubmit}
            onBack={() => setView('dashboard')}
            isLoading={isCreatingBusiness}
          />
        )}

        {view === 'create-thesis' && (
          <IdeaCreateForm
            type="thesis"
            onSubmit={handleThesisIdeaSubmit}
            onBack={() => setView('dashboard')}
            isLoading={isCreatingThesis}
          />
        )}

        {view === 'edit-business' && selectedBusinessIdea && (
          <IdeaEditView
            type="business"
            idea={selectedBusinessIdea}
            onSave={handleSaveBusinessIdea}
            onSubmit={handleSubmitBusinessIdea}
            isSaving={isUpdating}
            onBack={() => setView('dashboard')}
          />
        )}

        {view === 'edit-thesis' && selectedThesisIdea && (
          <IdeaEditView
            type="thesis"
            idea={selectedThesisIdea}
            onSave={handleSaveThesisIdea}
            onSubmit={handleSubmitThesisIdea}
            isSaving={isUpdating}
            onBack={() => setView('dashboard')}
          />
        )}

        {view === 'peer-reviews' && (
          <PeerReviewQueue
            onBack={() => setView('dashboard')}
            onSelectReview={(review) => {
              setSelectedPeerReview(review)
              setView('peer-review-form')
            }}
          />
        )}

        {view === 'peer-review-form' && selectedPeerReview && (
          <PeerReviewForm
            review={selectedPeerReview}
            onBack={() => setView('peer-reviews')}
            onSubmitted={() => {
              setSelectedPeerReview(null)
              setView('peer-reviews')
            }}
          />
        )}

        {view === 'exploration' && (
          <GuidedExploration
            courseId={explorationCourseId || undefined}
            onBack={() => {
              if (explorationCourseId) {
                setExplorationCourseId(null)
                setView('course-detail')
              } else {
                setView('dashboard')
              }
            }}
          />
        )}

        {view === 'contributions' && (
          <ContributionView onBack={() => setView('dashboard')} />
        )}

        {view === 'analytics' && (
          <StudentAnalyticsView
            learningPathId={selectedPathId || undefined}
            onBack={() => setView('dashboard')}
          />
        )}

        {view === 'portfolio' && (
          <PortfolioEditor onBack={() => setView('dashboard')} />
        )}

        {view === 'skills' && (
          <SkillGraph onBack={() => setView('dashboard')} />
        )}

        {view === 'recommendations' && (
          <RecommendationsList
            onSelectPath={(pathId) => {
              handleSelectPath(pathId)
            }}
            onBack={() => setView('dashboard')}
          />
        )}

        {view === 'study-rooms' && studyRoomPathId && (
          <StudyRoomList
            learningPathId={studyRoomPathId}
            onBack={() => setView('dashboard')}
          />
        )}

        {view === 'credentials' && (
          <CredentialsList
            onBack={() => setView('dashboard')}
            onViewCredential={(id) => {
              // Fetch credential data and navigate to detail
              setError(null)
              setView('credential-detail')
            }}
          />
        )}

        {view === 'credential-detail' && selectedCredential && (
          <div className="max-w-2xl mx-auto">
            <CredentialView credential={selectedCredential} />
          </div>
        )}

        {view === 'sandbox' && selectedCourseId && sandboxDeliverableId && (
          <SandboxView
            courseId={selectedCourseId}
            deliverableId={sandboxDeliverableId}
            onBack={() => {
              setSandboxDeliverableId(null)
              setView('course-detail')
            }}
          />
        )}
      </div>

      {/* AI Teaching Assistant (floating) */}
      {showAssistant && (
        <AssistantChat
          courseId={selectedCourseId || undefined}
          deliverableId={undefined}
          learningPathId={selectedPathId || undefined}
          onClose={() => setShowAssistant(false)}
        />
      )}

      {/* Assistant toggle button */}
      {!showAssistant && (
        <button
          onClick={() => setShowAssistant(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center z-50"
          title="AI Teaching Assistant"
        >
          <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
            <path d="M216,80H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48V80H40A16,16,0,0,0,24,96V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V96A16,16,0,0,0,216,80ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8V80H96ZM216,208H40V96H216V208Zm-56-72a12,12,0,1,1-12-12A12,12,0,0,1,160,136Zm-48,0a12,12,0,1,1-12-12A12,12,0,0,1,112,136Zm-8,40a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,176Z"/>
          </svg>
        </button>
      )}
    </div>
  )
}
