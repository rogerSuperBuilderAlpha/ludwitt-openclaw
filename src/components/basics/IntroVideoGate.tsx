/* eslint-disable jsx-a11y/media-has-caption */
/**
 * Intro Video Gate Component
 *
 * Shows required intro videos for Latin and Greek before allowing
 * users to access the learning content. Supports multiple videos
 * with carousel-style dot navigation.
 */

'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play,
  CheckCircle,
  Scroll,
  Buildings,
  BookOpen,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { logger } from '@/lib/logger'

type Language = 'latin' | 'greek'

interface VideoInfo {
  id: string
  title: string
  src: string
  description: string
  captionsSrc?: string
}

interface IntroVideoGateProps {
  language: Language
  onComplete: () => void
  isLoading?: boolean
}

// Video library for each language - add more videos here
const VIDEO_LIBRARY: Record<Language, VideoInfo[]> = {
  latin: [
    {
      id: 'latin-intro-1',
      title: 'Latin: The Ultimate Cheat Code',
      src: '/videos/Latin_The_Ultimate_Cheat_Code.mp4',
      description:
        'Discover why Latin is the secret weapon for mastering English vocabulary, Romance languages, and academic success.',
    },
    {
      id: 'latin-intro-2',
      title: 'Latin, Math & Logic',
      src: '/videos/Latin_2_Video_Math_and_Logic.mp4',
      description:
        'Explore the deep connections between Latin, mathematical thinking, and logical reasoning.',
    },
    {
      id: 'latin-intro-3',
      title: 'Latin Tutorial',
      src: '/videos/Latin_3_LatinTutorial-Landscape.mp4',
      description:
        'A hands-on introduction to reading and understanding Latin sentences.',
    },
  ],
  greek: [
    {
      id: 'greek-intro-1',
      title: 'Greek: The Language of Ideas',
      src: '/videos/Greek_Study_Video_Ready.mp4',
      description:
        'Explore how Ancient Greek shaped philosophy, science, and the way we think about the world.',
    },
    {
      id: 'greek-intro-2',
      title: 'Greek Tutorial',
      src: '/videos/Greek_2_Tutorial-Landscape.mp4',
      description:
        'A hands-on introduction to reading and understanding Ancient Greek letters and words.',
    },
  ],
}

const LANGUAGE_CONFIG: Record<
  Language,
  {
    icon: typeof Scroll
    title: string
    subtitle: string
    color: string
    bgColor: string
    borderColor: string
    accentColor: string
  }
> = {
  latin: {
    icon: Scroll,
    title: 'Welcome to Latin!',
    subtitle: 'The Language of Ancient Rome',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    accentColor: 'purple',
  },
  greek: {
    icon: Buildings,
    title: 'Welcome to Ancient Greek!',
    subtitle: 'The Language of Philosophy & Democracy',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    accentColor: 'blue',
  },
}

export function IntroVideoGate({
  language,
  onComplete,
  isLoading: externalLoading,
}: IntroVideoGateProps) {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  const videoRef = useRef<HTMLVideoElement>(null)

  const videos = VIDEO_LIBRARY[language]
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set())
  const [videoState, setVideoState] = useState<'ready' | 'playing' | 'ended'>(
    'ready'
  )
  const [watchProgress, setWatchProgress] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const config = LANGUAGE_CONFIG[language]
  const Icon = config.icon
  const currentVideo = videos[currentVideoIndex]

  // Check if current video has been watched enough (80%)
  const hasWatchedCurrentVideo = watchedVideos.has(currentVideoIndex)

  // All videos must be watched to continue
  const allVideosWatched = videos.every((_, index) => watchedVideos.has(index))

  // Track video progress
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    // Guard against NaN when video duration is not yet available
    if (!video.duration || isNaN(video.duration) || video.duration === 0) return

    const progress = (video.currentTime / video.duration) * 100
    setWatchProgress(progress)

    // Mark video as watched at 80% completion
    if (progress >= 80 && !watchedVideos.has(currentVideoIndex)) {
      setWatchedVideos((prev) => new Set([...prev, currentVideoIndex]))
    }
  }, [currentVideoIndex, watchedVideos])

  const handleVideoEnd = useCallback(() => {
    setVideoState('ended')
    setWatchedVideos((prev) => new Set([...prev, currentVideoIndex]))
  }, [currentVideoIndex])

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setVideoState('playing')
    }
  }

  const handleVideoChange = (index: number) => {
    if (index === currentVideoIndex) return

    // Pause current video
    if (videoRef.current) {
      videoRef.current.pause()
    }

    setCurrentVideoIndex(index)
    setVideoState('ready')
    setWatchProgress(0)
  }

  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      handleVideoChange(currentVideoIndex - 1)
    }
  }

  const handleNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      handleVideoChange(currentVideoIndex + 1)
    }
  }

  const handleContinue = async () => {
    if (!user || !allVideosWatched) return

    setIsSaving(true)
    setError(null)

    try {
      await fetchApi('/api/basics/intro-video/complete', {
        method: 'POST',
        body: JSON.stringify({ language }),
      })
      onComplete()
    } catch (err) {
      logger.error('IntroVideoGate', 'Failed to save intro video completion', {
        error: err,
      })
      setError('Failed to save your progress. Please try again.')
      setIsSaving(false)
    }
  }

  // Set up video event listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleVideoEnd)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleVideoEnd)
    }
  }, [handleTimeUpdate, handleVideoEnd])

  // Reset video state when changing videos
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
    }
    setWatchProgress(watchedVideos.has(currentVideoIndex) ? 100 : 0)
    setVideoState(watchedVideos.has(currentVideoIndex) ? 'ended' : 'ready')
  }, [currentVideoIndex, watchedVideos])

  if (externalLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200" />
          <div className="h-6 w-48 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`rounded-xl border-2 ${config.borderColor} ${config.bgColor} overflow-hidden`}
    >
      {/* Header */}
      <div className="p-6 text-center border-b border-gray-200 bg-white">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${config.bgColor} mb-4`}
        >
          <Icon size={32} className={config.color} weight="duotone" />
        </div>
        <h2 className={`text-2xl font-bold ${config.color} mb-1`}>
          {config.title}
        </h2>
        <p className="text-lg text-gray-600">{config.subtitle}</p>
        {videos.length > 1 && (
          <p className="text-sm text-gray-500 mt-2">
            Watch all {videos.length} videos to continue
          </p>
        )}
      </div>

      {/* Video Section */}
      <div className="p-6">
        {/* Video Title */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 text-lg">
            {currentVideo.title}
          </h3>
          <p className="text-sm text-gray-600">{currentVideo.description}</p>
        </div>

        {/* Video Player with Navigation */}
        <div className="relative">
          {/* Previous Button */}
          {videos.length > 1 && currentVideoIndex > 0 && (
            <button
              onClick={handlePrevVideo}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Previous video"
            >
              <CaretLeft size={24} className="text-gray-700" weight="bold" />
            </button>
          )}

          {/* Video */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
            <video
              ref={videoRef}
              src={currentVideo.src}
              className="w-full h-full object-contain"
              playsInline
              preload="metadata"
              controls={videoState === 'playing'}
              aria-label={`${currentVideo.title} introduction video`}
              title={currentVideo.title}
            >
              {currentVideo.captionsSrc && (
                <track
                  kind="captions"
                  src={currentVideo.captionsSrc}
                  srcLang="en"
                  label="English captions"
                  default
                />
              )}
              Your browser does not support video playback.
            </video>

            {/* Play Overlay */}
            {videoState === 'ready' && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group"
                aria-label={`Play ${currentVideo.title}`}
              >
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={40} className={config.color} weight="fill" />
                </div>
              </button>
            )}

            {/* Video Completed Overlay */}
            {videoState === 'ended' && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/60 group cursor-pointer"
              >
                <div className="text-center text-white">
                  <CheckCircle
                    size={64}
                    className="mx-auto mb-2 text-green-400"
                    weight="fill"
                  />
                  <p className="text-xl font-semibold">Video Complete!</p>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    {currentVideoIndex < videos.length - 1
                      ? 'Click to rewatch or continue to next video'
                      : allVideosWatched
                        ? 'Click continue below to start learning'
                        : 'Click to rewatch'}
                  </p>
                </div>
              </button>
            )}
          </div>

          {/* Next Button */}
          {videos.length > 1 && currentVideoIndex < videos.length - 1 && (
            <button
              onClick={handleNextVideo}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Next video"
            >
              <CaretRight size={24} className="text-gray-700" weight="bold" />
            </button>
          )}
        </div>

        {/* Carousel Dots */}
        {videos.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => handleVideoChange(index)}
                className={`relative w-3 h-3 rounded-full transition-all ${
                  index === currentVideoIndex
                    ? `${config.color.replace('text-', 'bg-')} scale-125`
                    : watchedVideos.has(index)
                      ? 'bg-green-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to video ${index + 1}: ${video.title}`}
                title={video.title}
              >
                {watchedVideos.has(index) && index !== currentVideoIndex && (
                  <CheckCircle
                    size={12}
                    className="absolute -top-0.5 -right-0.5 text-green-600 bg-white rounded-full"
                    weight="fill"
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-4 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>
              {videos.length > 1
                ? `Video ${currentVideoIndex + 1} of ${videos.length}`
                : 'Watch Progress'}
            </span>
            <span>
              {hasWatchedCurrentVideo
                ? '✓ Complete'
                : `${Math.round(watchProgress || 0)}%`}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                hasWatchedCurrentVideo
                  ? 'bg-green-500'
                  : config.color.replace('text-', 'bg-')
              }`}
              style={{
                width: `${hasWatchedCurrentVideo ? 100 : watchProgress || 0}%`,
              }}
            />
          </div>
          {!hasWatchedCurrentVideo && videoState === 'playing' && (
            <p className="text-xs text-gray-500 mt-1">
              Watch at least 80% to mark as complete
            </p>
          )}
        </div>

        {/* Videos Progress Summary (for multiple videos) */}
        {videos.length > 1 && (
          <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <BookOpen size={24} className={config.color} weight="duotone" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Required Videos
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{
                        width: `${(watchedVideos.size / videos.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">
                    {watchedVideos.size}/{videos.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!allVideosWatched || isSaving}
          className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
            allVideosWatched
              ? `${config.color.replace('text-', 'bg-')} text-white hover:opacity-90 shadow-md`
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSaving ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving...
            </span>
          ) : allVideosWatched ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle size={24} weight="bold" />
              Continue to {language === 'latin' ? 'Latin' : 'Greek'}
            </span>
          ) : (
            `Watch ${videos.length > 1 ? 'all videos' : 'the intro video'} to continue`
          )}
        </button>

        {/* Skip hint for development */}
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={() => {
              setWatchedVideos(new Set(videos.map((_, i) => i)))
            }}
            className="mt-4 w-full py-2 text-xs text-gray-400 hover:text-gray-600"
          >
            [DEV] Skip video requirement
          </button>
        )}
      </div>
    </div>
  )
}

// Export video library for use in rewatch modal
export { VIDEO_LIBRARY, LANGUAGE_CONFIG }
export type { Language, VideoInfo }
