'use client'

/**
 * Near Peer Tutor Modal
 *
 * A peer tutoring marketplace where students can:
 * - Request help and offer credits
 * - Browse and accept tutors
 * - Have 10-minute chat sessions
 * - Rate each other after
 */

import {
  GraduationCap,
  Student,
  ChatsCircle,
  Warning,
} from '@phosphor-icons/react'
import { UnifiedModal } from './UnifiedModal'
import { useTutorSession } from '@/lib/hooks/useTutorSession'
import { StudentModeView } from './tutor/StudentModeView'
import { TutorModeView } from './tutor/TutorModeView'
import { ChatView } from './tutor/ChatView'
import { RatingView } from './tutor/RatingView'

interface NearPeerTutorModalProps {
  isOpen: boolean
  onClose: () => void
  userGrade: number
}

export function NearPeerTutorModal({
  isOpen,
  onClose,
  userGrade,
}: NearPeerTutorModalProps) {
  const {
    userId,
    mode,
    setMode,
    viewState,
    loading,
    error,
    myRequest,
    description,
    setDescription,
    creditsOffer,
    setCreditsOffer,
    balance,
    availableRequests,
    offerMessage,
    setOfferMessage,
    activeSession,
    messages,
    newMessage,
    setNewMessage,
    remainingSeconds,
    rating,
    setRating,
    ratingSubmitted,
    handleCreateRequest,
    handleOfferHelp,
    handleAcceptTutor,
    handleSendMessage,
    handleSubmitRating,
    formatTime,
  } = useTutorSession(isOpen)

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title="Near Peer Tutor"
      subtitle="Get help from peers or earn credits tutoring"
      icon={<ChatsCircle size={20} />}
      size="md"
      showCloseButton={viewState === 'list'}
    >
      {/* Mode Tabs */}
      {viewState === 'list' && (
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('student')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
              mode === 'student'
                ? 'b-bg-math text-white'
                : 'b-bg-muted b-text-secondary hover:b-bg-muted'
            }`}
          >
            <Student size={18} />
            Get Help
          </button>
          <button
            onClick={() => setMode('tutor')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
              mode === 'tutor'
                ? 'b-bg-math text-white'
                : 'b-bg-muted b-text-secondary hover:b-bg-muted'
            }`}
          >
            <GraduationCap size={18} />
            Tutor Others
          </button>
        </div>
      )}

      {/* Content */}
      <div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
            <Warning size={18} className="text-red-600" />
            <p className="text-red-600-dark text-sm">{error}</p>
          </div>
        )}

        {loading && viewState === 'list' && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 b-border-greek"></div>
          </div>
        )}

        {/* Student Mode - List View */}
        {!loading && viewState === 'list' && mode === 'student' && (
          <StudentModeView
            myRequest={myRequest}
            description={description}
            onDescriptionChange={setDescription}
            creditsOffer={creditsOffer}
            onCreditsOfferChange={setCreditsOffer}
            balance={balance}
            loading={loading}
            onCreateRequest={handleCreateRequest}
            onAcceptTutor={handleAcceptTutor}
          />
        )}

        {/* Tutor Mode - List View */}
        {!loading && viewState === 'list' && mode === 'tutor' && (
          <TutorModeView
            userGrade={userGrade}
            availableRequests={availableRequests}
            offerMessage={offerMessage}
            onOfferMessageChange={setOfferMessage}
            onOfferHelp={handleOfferHelp}
          />
        )}

        {/* Chat View */}
        {viewState === 'chat' && activeSession && (
          <ChatView
            activeSession={activeSession}
            messages={messages}
            newMessage={newMessage}
            onNewMessageChange={setNewMessage}
            onSendMessage={handleSendMessage}
            remainingSeconds={remainingSeconds}
            formatTime={formatTime}
            userId={userId}
          />
        )}

        {/* Rating View */}
        {viewState === 'rating' && activeSession && (
          <RatingView
            activeSession={activeSession}
            rating={rating}
            onRatingChange={setRating}
            ratingSubmitted={ratingSubmitted}
            loading={loading}
            onSubmitRating={handleSubmitRating}
            userId={userId}
          />
        )}
      </div>
    </UnifiedModal>
  )
}
