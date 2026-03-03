import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { Timestamp } from 'firebase-admin/firestore'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'
import { getErrorMessage } from '@/lib/utils/error-helpers'

const GOOGLE_DRIVE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_DRIVE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
}

interface DriveFile {
  id: string
  name: string
  mimeType: string
  webViewLink: string
  iconLink: string
  modifiedTime: string
  owners?: { displayName: string; emailAddress: string }[]
}

/**
 * Refresh the access token using refresh token
 */
async function refreshAccessToken(userId: string, refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: GOOGLE_DRIVE_OAUTH_CONFIG.clientId!,
        client_secret: GOOGLE_DRIVE_OAUTH_CONFIG.clientSecret!,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      })
    })

    if (!response.ok) {
      return null
    }

    const tokens = await response.json()
    
    // Update stored tokens
    await db.collection('driveIntegrations').doc(userId).update({
      accessToken: tokens.access_token,
      expiresAt: Timestamp.fromMillis(Date.now() + ((tokens.expires_in || 3600) * 1000)),
      updatedAt: Timestamp.now()
    })

    return tokens.access_token
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const pageToken = searchParams.get('pageToken') || ''
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10)

    // Get integration
    const integrationDoc = await db.collection('driveIntegrations').doc(userId).get()
    
    if (!integrationDoc.exists) {
      return NextResponse.json(
        { error: 'Google Drive not connected', needsConnect: true },
        { status: 401 }
      )
    }

    const integration = integrationDoc.data()
    let accessToken = integration?.accessToken

    // Check if token needs refresh
    const isExpired = integration?.expiresAt?.toMillis() < Date.now()
    
    if (isExpired && integration?.refreshToken) {
      const newToken = await refreshAccessToken(userId, integration.refreshToken)
      if (newToken) {
        accessToken = newToken
      } else {
        return NextResponse.json(
          { error: 'Session expired. Please reconnect Google Drive.', needsConnect: true },
          { status: 401 }
        )
      }
    }

    // Build Drive API query
    // Only show Google Docs and Sheets (most common document types)
    let driveQuery = "(mimeType='application/vnd.google-apps.document' or mimeType='application/vnd.google-apps.spreadsheet' or mimeType='application/vnd.google-apps.presentation')"
    
    if (query) {
      driveQuery = `${driveQuery} and name contains '${query.replace(/'/g, "\\'")}'`
    }

    // Call Google Drive API
    const driveUrl = new URL('https://www.googleapis.com/drive/v3/files')
    driveUrl.searchParams.set('q', driveQuery)
    driveUrl.searchParams.set('pageSize', String(pageSize))
    driveUrl.searchParams.set('fields', 'nextPageToken, files(id, name, mimeType, webViewLink, iconLink, modifiedTime, owners)')
    driveUrl.searchParams.set('orderBy', 'modifiedTime desc')
    
    if (pageToken) {
      driveUrl.searchParams.set('pageToken', pageToken)
    }

    const driveResponse = await fetch(driveUrl.toString(), {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (!driveResponse.ok) {
      const errorData = await driveResponse.text()
      apiLogger.apiError('customers/drive/files', 'Drive API error', { error: errorData })
      
      if (driveResponse.status === 401) {
        return NextResponse.json(
          { error: 'Session expired. Please reconnect Google Drive.', needsConnect: true },
          { status: 401 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch files from Google Drive' },
        { status: 500 }
      )
    }

    const data = await driveResponse.json()
    const files: DriveFile[] = data.files || []

    // Transform files for frontend
    const transformedFiles = files.map(file => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      url: file.webViewLink,
      iconUrl: file.iconLink,
      modifiedAt: file.modifiedTime,
      owner: file.owners?.[0]?.displayName || 'Unknown',
      type: getMimeTypeLabel(file.mimeType)
    }))

    return NextResponse.json({
      success: true,
      files: transformedFiles,
      nextPageToken: data.nextPageToken || null,
      hasMore: !!data.nextPageToken
    })
  } catch (error) {
    apiLogger.apiError('customers/drive/files', 'Failed to list files', error)
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to list files') },
      { status: 500 }
    )
  }
}

function getMimeTypeLabel(mimeType: string): string {
  const types: Record<string, string> = {
    'application/vnd.google-apps.document': 'Google Docs',
    'application/vnd.google-apps.spreadsheet': 'Google Sheets',
    'application/vnd.google-apps.presentation': 'Google Slides',
  }
  return types[mimeType] || 'Document'
}

