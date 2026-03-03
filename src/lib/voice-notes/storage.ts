// Local Storage utilities for Voice Notes

import { Recording } from '@/lib/types/voice-notes'
import { logger } from '@/lib/logger'

const STORAGE_KEY = 'voice-notes-recordings'
const MAX_STORAGE_MB = 50 // Limit to 50MB

// Convert Blob to base64 for storage
async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// Convert base64 back to Blob
function base64ToBlob(base64: string): Blob {
  const parts = base64.split(',')
  const contentType = parts[0].match(/:(.*?);/)?.[1] || 'audio/webm'
  const raw = atob(parts[1])
  const array = new Uint8Array(raw.length)
  
  for (let i = 0; i < raw.length; i++) {
    array[i] = raw.charCodeAt(i)
  }
  
  return new Blob([array], { type: contentType })
}

// Get estimated storage size
function getStorageSize(): number {
  try {
    let total = 0
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length
      }
    }
    return total / (1024 * 1024) // Convert to MB
  } catch (error) {
    logger.error('Storage', 'Error calculating storage size', { error: error })
    return 0
  }
}

// Save recordings to localStorage
export async function saveRecordingsToLocal(recordings: Recording[]): Promise<void> {
  try {
    // Check storage limit
    const currentSize = getStorageSize()
    if (currentSize > MAX_STORAGE_MB) {
      logger.warn('Storage', 'Storage limit reached, clearing old recordings')
      // Keep only the 10 most recent recordings
      recordings = recordings.slice(0, 10)
    }

    // Convert recordings to storable format
    const storableRecordings = await Promise.all(
      recordings.map(async (rec) => {
        const storable: any = { ...rec }
        
        // Convert dates to ISO strings
        storable.date = rec.date.toISOString()
        if (rec.createdAt) storable.createdAt = rec.createdAt.toISOString()
        if (rec.updatedAt) storable.updatedAt = rec.updatedAt.toISOString()
        
        // Convert audio blob to base64 (only for recent recordings)
        if (rec.audioBlob) {
          // Only store audio for recordings from last 7 days
          const daysSinceRecording = (Date.now() - rec.date.getTime()) / (1000 * 60 * 60 * 24)
          if (daysSinceRecording <= 7) {
            storable.audioData = await blobToBase64(rec.audioBlob)
          }
          delete storable.audioBlob
          delete storable.audioUrl
        }
        
        return storable
      })
    )

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storableRecordings))
  } catch (error) {
    logger.error('Storage', 'Error saving recordings to local storage', { error: error })
    
    // If storage is full, try clearing and saving just the latest
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      logger.warn('Storage', 'Storage quota exceeded, keeping only latest recording')
      try {
        const latestOnly = recordings.slice(0, 1).map(rec => {
          const storable: any = { ...rec }
          storable.date = rec.date.toISOString()
          delete storable.audioBlob
          delete storable.audioUrl
          return storable
        })
        localStorage.setItem(STORAGE_KEY, JSON.stringify(latestOnly))
      } catch (retryError) {
        logger.error('Storage', 'Failed to save even single recording', { error: retryError })
      }
    }
  }
}

// Load recordings from localStorage
export function loadRecordingsFromLocal(): Recording[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    
    return parsed.map((item: any) => {
      const recording: Recording = {
        ...item,
        date: new Date(item.date),
        createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
        updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
      }
      
      // Restore audio from base64 if available
      if (item.audioData) {
        recording.audioBlob = base64ToBlob(item.audioData)
        recording.audioUrl = URL.createObjectURL(recording.audioBlob)
      }
      
      return recording
    })
  } catch (error) {
    logger.error('Storage', 'Error loading recordings from local storage', { error: error })
    return []
  }
}

// Delete a recording from localStorage
export async function deleteRecordingFromLocal(id: string, recordings: Recording[]): Promise<void> {
  const filtered = recordings.filter(rec => rec.id !== id)
  await saveRecordingsToLocal(filtered)
}

// Clear all recordings
export function clearAllRecordings(): void {
  localStorage.removeItem(STORAGE_KEY)
}

// Export recordings as JSON
export function exportRecordingsAsJSON(recordings: Recording[]): string {
  const exportData = recordings.map(rec => ({
    id: rec.id,
    title: rec.title,
    date: rec.date.toISOString(),
    duration: rec.duration,
    transcript: rec.transcript,
    summary: rec.summary,
    actionItems: rec.actionItems,
    nextSteps: rec.nextSteps,
    keyMoments: rec.keyMoments,
    speakers: rec.speakers,
    sentiment: rec.sentiment,
    tags: rec.tags,
    starred: rec.starred
  }))
  
  return JSON.stringify(exportData, null, 2)
}

// Download recording as file
export function downloadRecording(recording: Recording): void {
  if (!recording.audioUrl) {
    alert('No audio available for this recording')
    return
  }
  
  const a = document.createElement('a')
  a.href = recording.audioUrl
  a.download = `${recording.title}.webm`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// Share recording summary
export async function shareRecordingSummary(recording: Recording): Promise<void> {
  const summary = `
📝 Recording: ${recording.title}
📅 Date: ${recording.date.toLocaleDateString()}
⏱️ Duration: ${Math.floor(recording.duration / 60)}:${(recording.duration % 60).toString().padStart(2, '0')}

${recording.summary ? `📋 Summary:\n${recording.summary}\n` : ''}
${recording.actionItems && recording.actionItems.length > 0 ? `\n✅ Action Items:\n${recording.actionItems.map(item => `• ${item}`).join('\n')}` : ''}
${recording.nextSteps && recording.nextSteps.length > 0 ? `\n🔜 Next Steps:\n${recording.nextSteps.map(step => `• ${step}`).join('\n')}` : ''}
  `.trim()

  if (navigator.share) {
    try {
      await navigator.share({
        title: recording.title,
        text: summary
      })
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        logger.error('Storage', 'Error sharing', { error: error })
      }
    }
  } else {
    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(summary)
    alert('Summary copied to clipboard!')
  }
}

// Get storage statistics
export function getStorageStats(): {
  usedMB: number
  limitMB: number
  percentUsed: number
} {
  const usedMB = getStorageSize()
  const percentUsed = (usedMB / MAX_STORAGE_MB) * 100
  
  return {
    usedMB: Math.round(usedMB * 100) / 100,
    limitMB: MAX_STORAGE_MB,
    percentUsed: Math.round(percentUsed)
  }
}


