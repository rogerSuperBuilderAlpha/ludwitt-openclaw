import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

interface DriveFile {
  id: string
  name: string
  mimeType: string
  url: string
  iconUrl: string
  modifiedAt: string
  owner: string
  type: string
}

interface DriveStatus {
  connected: boolean
  email: string | null
  displayName: string | null
  needsReconnect?: boolean
}

interface UseGoogleDriveReturn {
  // Connection state
  isConnected: boolean
  isConnecting: boolean
  driveEmail: string | null
  needsReconnect: boolean
  
  // Files state
  files: DriveFile[]
  isLoadingFiles: boolean
  hasMoreFiles: boolean
  
  // Search state
  searchQuery: string
  setSearchQuery: (q: string) => void
  
  // Actions
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  loadFiles: (query?: string) => Promise<void>
  loadMoreFiles: () => Promise<void>
  refreshStatus: () => Promise<void>
  
  // Error state
  error: string | null
  clearError: () => void
}

export function useGoogleDrive(): UseGoogleDriveReturn {
  const { user } = useAuth()
  
  // Connection state
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [driveEmail, setDriveEmail] = useState<string | null>(null)
  const [needsReconnect, setNeedsReconnect] = useState(false)
  
  // Files state
  const [files, setFiles] = useState<DriveFile[]>([])
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [hasMoreFiles, setHasMoreFiles] = useState(false)
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  
  // Error state
  const [error, setError] = useState<string | null>(null)

  // Helper to get auth token
  const getAuthHeaders = useCallback(async () => {
    if (!user) throw new Error('Not authenticated')
    const token = await user.getIdToken()
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }, [user])

  // Check connection status
  const refreshStatus = useCallback(async () => {
    if (!user) return
    
    try {
      const headers = await getAuthHeaders()
      const response = await fetch('/api/customers/drive/status', { headers })
      const data: DriveStatus = await response.json()
      
      setIsConnected(data.connected)
      setDriveEmail(data.email)
      setNeedsReconnect(data.needsReconnect || false)
    } catch (err) {
      setIsConnected(false)
      setDriveEmail(null)
    }
  }, [user, getAuthHeaders])

  // Initial status check
  useEffect(() => {
    refreshStatus()
  }, [refreshStatus])

  // Connect to Google Drive
  const connect = useCallback(async () => {
    if (!user) {
      setError('Please sign in to connect Google Drive')
      return
    }
    
    setIsConnecting(true)
    setError(null)
    
    try {
      const headers = await getAuthHeaders()
      const response = await fetch('/api/customers/drive/connect', { headers })
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to start connection')
      }
      
      // Open OAuth popup
      const width = 600
      const height = 700
      const left = window.screenX + (window.outerWidth - width) / 2
      const top = window.screenY + (window.outerHeight - height) / 2
      
      const popup = window.open(
        data.authUrl,
        'google-drive-oauth',
        `width=${width},height=${height},left=${left},top=${top},popup=yes`
      )
      
      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site.')
      }
      
      // Check if popup was closed without completing
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed)
          setIsConnecting(false)
        }
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect')
      setIsConnecting(false)
    }
  }, [user, getAuthHeaders])

  // Disconnect from Google Drive
  const disconnect = useCallback(async () => {
    if (!user) return
    
    try {
      const headers = await getAuthHeaders()
      await fetch('/api/customers/drive/disconnect', {
        method: 'POST',
        headers
      })
      
      setIsConnected(false)
      setDriveEmail(null)
      setFiles([])
      setNextPageToken(null)
      setHasMoreFiles(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect')
    }
  }, [user, getAuthHeaders])

  // Load files from Drive
  const loadFiles = useCallback(async (query?: string) => {
    if (!user || !isConnected) return
    
    setIsLoadingFiles(true)
    setError(null)
    
    try {
      const headers = await getAuthHeaders()
      const searchParam = query !== undefined ? query : searchQuery
      const url = new URL('/api/customers/drive/files', window.location.origin)
      if (searchParam) {
        url.searchParams.set('q', searchParam)
      }
      
      const response = await fetch(url.toString(), { headers })
      const data = await response.json()
      
      if (!response.ok) {
        if (data.needsConnect) {
          setIsConnected(false)
          setNeedsReconnect(true)
        }
        throw new Error(data.error || 'Failed to load files')
      }
      
      setFiles(data.files || [])
      setNextPageToken(data.nextPageToken || null)
      setHasMoreFiles(data.hasMore || false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load files')
    } finally {
      setIsLoadingFiles(false)
    }
  }, [user, isConnected, searchQuery, getAuthHeaders])

  // Listen for OAuth popup messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== window.location.origin) return
      
      if (event.data?.type === 'drive-connected' && event.data?.success) {
        setIsConnected(true)
        setDriveEmail(event.data.email || null)
        setIsConnecting(false)
        setNeedsReconnect(false)
        // Refresh files after connecting
        loadFiles()
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [loadFiles])
  
  // Handle URL parameter fallback (for when popup doesn't close properly)
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const params = new URLSearchParams(window.location.search)
    if (params.get('drive') === 'connected') {
      // Remove the parameter from URL without refresh
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('drive')
      window.history.replaceState({}, '', newUrl.toString())
      
      // Refresh connection status
      setIsConnecting(false)
      refreshStatus()
    }
  }, [refreshStatus])

  // Load more files (pagination)
  const loadMoreFiles = useCallback(async () => {
    if (!user || !isConnected || !nextPageToken || isLoadingFiles) return
    
    setIsLoadingFiles(true)
    
    try {
      const headers = await getAuthHeaders()
      const url = new URL('/api/customers/drive/files', window.location.origin)
      url.searchParams.set('pageToken', nextPageToken)
      if (searchQuery) {
        url.searchParams.set('q', searchQuery)
      }
      
      const response = await fetch(url.toString(), { headers })
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load more files')
      }
      
      setFiles(prev => [...prev, ...(data.files || [])])
      setNextPageToken(data.nextPageToken || null)
      setHasMoreFiles(data.hasMore || false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more files')
    } finally {
      setIsLoadingFiles(false)
    }
  }, [user, isConnected, nextPageToken, searchQuery, isLoadingFiles, getAuthHeaders])

  // Clear error
  const clearError = useCallback(() => setError(null), [])

  return {
    isConnected,
    isConnecting,
    driveEmail,
    needsReconnect,
    files,
    isLoadingFiles,
    hasMoreFiles,
    searchQuery,
    setSearchQuery,
    connect,
    disconnect,
    loadFiles,
    loadMoreFiles,
    refreshStatus,
    error,
    clearError
  }
}

