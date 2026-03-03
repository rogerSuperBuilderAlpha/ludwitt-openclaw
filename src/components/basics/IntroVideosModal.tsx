/* eslint-disable jsx-a11y/media-has-caption */
/**
 * Intro Videos Modal Component
 *
 * Modal for rewatching intro videos for Latin and Greek.
 * Allows users to browse and rewatch videos they've already seen.
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import FocusTrap from 'focus-trap-react'
import {
  X,
  Play,
  CaretLeft,
  CaretRight,
  CheckCircle,
} from '@phosphor-icons/react'
import {
  VIDEO_LIBRARY,
  LANGUAGE_CONFIG,
  type Language,
  type VideoInfo,
} from './IntroVideoGate'
import { Portal } from './Portal'

interface IntroVideosModalProps {
  isOpen: boolean
  onClose: () => void
  language: Language
}

export function IntroVideosModal({
  isOpen,
  onClose,
  language,
}: IntroVideosModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videos = VIDEO_LIBRARY[language]
  const config = LANGUAGE_CONFIG[language]
  const Icon = config.icon

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const currentVideo = videos[currentVideoIndex]

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleVideoChange = (index: number) => {
    if (index === currentVideoIndex) return

    if (videoRef.current) {
      videoRef.current.pause()
    }

    setCurrentVideoIndex(index)
    setIsPlaying(false)
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

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentVideoIndex(0)
      setIsPlaying(false)
    }
  }, [isOpen])

  // Load new video when index changes
  useEffect(() => {
    if (videoRef.current && isOpen) {
      videoRef.current.load()
      setIsPlaying(false)
    }
  }, [currentVideoIndex, isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal */}
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="intro-videos-modal-title"
            className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between p-4 border-b ${config.bgColor}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`}
                >
                  <Icon size={24} className={config.color} weight="duotone" />
                </div>
                <div>
                  <h2
                    id="intro-videos-modal-title"
                    className={`font-bold ${config.color}`}
                  >
                    {language === 'latin' ? 'Latin' : 'Greek'} Intro Videos
                  </h2>
                  <p className="text-sm text-gray-600">
                    {videos.length} video{videos.length > 1 ? 's' : ''}{' '}
                    available
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/50 transition-colors"
                aria-label="Close"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Video Title */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 text-lg">
                  {currentVideo.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {currentVideo.description}
                </p>
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
                    <CaretLeft
                      size={24}
                      className="text-gray-700"
                      weight="bold"
                    />
                  </button>
                )}

                {/* Video */}
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                  <video
                    ref={videoRef}
                    src={currentVideo.src}
                    className="w-full h-full object-contain"
                    playsInline
                    controls={isPlaying}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
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
                  {!isPlaying && (
                    <button
                      onClick={handlePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group"
                      aria-label={`Play ${currentVideo.title}`}
                    >
                      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play
                          size={40}
                          className={config.color}
                          weight="fill"
                        />
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
                    <CaretRight
                      size={24}
                      className="text-gray-700"
                      weight="bold"
                    />
                  </button>
                )}
              </div>

              {/* Video Tabs */}
              {videos.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6 px-4">
                  {videos.map((video, index) => (
                    <button
                      key={video.id}
                      onClick={() => handleVideoChange(index)}
                      className={`relative px-4 py-2.5 rounded-lg text-sm font-semibold transition-all border-2 shadow-sm ${
                        index === currentVideoIndex
                          ? `${config.color.replace('text-', 'bg-')} text-white border-transparent shadow-md`
                          : `bg-white ${config.borderColor} ${config.color} hover:${config.bgColor}`
                      }`}
                      aria-label={`Go to video ${index + 1}: ${video.title}`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === currentVideoIndex
                              ? 'bg-white/20'
                              : config.bgColor
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span className="hidden sm:inline truncate max-w-[120px]">
                          {video.title.split(':')[0]}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Video List (for more than 2 videos) */}
              {videos.length > 2 && (
                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    All Videos
                  </h4>
                  <div className="space-y-2">
                    {videos.map((video, index) => (
                      <button
                        key={video.id}
                        onClick={() => handleVideoChange(index)}
                        className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                          index === currentVideoIndex
                            ? `${config.bgColor} ${config.borderColor} border`
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            index === currentVideoIndex
                              ? `${config.color.replace('text-', 'bg-')} text-white`
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-medium truncate ${
                              index === currentVideoIndex
                                ? config.color
                                : 'text-gray-900'
                            }`}
                          >
                            {video.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {video.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </FocusTrap>
      </div>
    </Portal>
  )
}
