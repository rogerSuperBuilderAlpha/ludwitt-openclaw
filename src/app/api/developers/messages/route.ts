/**
 * API Route: GET /api/developers/messages
 * 
 * Returns all customer messages/comments across documents for the developer inbox
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { isDeveloper, isAdmin } from '@/config/developers'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

interface Message {
  id: string
  documentId: string
  documentTitle: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhotoURL?: string
  content: string
  createdAt: string
  read: boolean
  type: 'comment' | 'note' | 'system'
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { decodedToken } = authResult
    
    const email = decodedToken.email || ''
    if (!isDeveloper(email) && !isAdmin(email)) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    // Fetch all documents with comments
    const docsSnapshot = await db.collection('customerDocuments').get()
    
    const messages: Message[] = []
    
    docsSnapshot.docs.forEach((doc) => {
      const data = doc.data()
      const documentId = doc.id
      const documentTitle = data.googleDocTitle || data.title || 'Untitled'
      const customerId = data.customerId || data.userId || ''
      const customerName = data.customerDisplayName || data.customer?.displayName || 'Unknown'
      const customerEmail = data.customerEmail || data.customer?.email || ''
      const customerPhotoURL = data.customer?.photoURL
      
      // Add customer comments
      if (data.customerComments) {
        const content = typeof data.customerComments === 'string' 
          ? data.customerComments 
          : JSON.stringify(data.customerComments)
        
        if (content.trim()) {
          const createdAt = data.createdAt?.seconds 
            ? new Date(data.createdAt.seconds * 1000).toISOString()
            : data.createdAt || new Date().toISOString()
          
          messages.push({
            id: `${documentId}-customer-comment`,
            documentId,
            documentTitle,
            customerId,
            customerName,
            customerEmail,
            customerPhotoURL,
            content,
            createdAt,
            read: false,
            type: 'comment',
          })
        }
      }
      
      // Add any notes from notes array
      if (data.notes && Array.isArray(data.notes)) {
        data.notes.forEach((note: { content?: string; text?: string; createdAt?: { seconds?: number } | string; author?: string }, index: number) => {
          const noteContent = note.content || note.text || ''
          if (noteContent.trim() && note.author !== 'developer') {
            let noteCreatedAt: string
            if (typeof note.createdAt === 'object' && note.createdAt?.seconds) {
              noteCreatedAt = new Date(note.createdAt.seconds * 1000).toISOString()
            } else if (typeof note.createdAt === 'string') {
              noteCreatedAt = note.createdAt
            } else {
              noteCreatedAt = new Date().toISOString()
            }
            
            messages.push({
              id: `${documentId}-note-${index}`,
              documentId,
              documentTitle,
              customerId,
              customerName,
              customerEmail,
              customerPhotoURL,
              content: noteContent,
              createdAt: noteCreatedAt,
              read: false,
              type: 'note',
            })
          }
        })
      }
    })
    
    // Sort by date (newest first)
    messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    apiLogger.success('developers/messages', 'Fetched messages', { 
      count: messages.length,
    })

    return successResponse({
      messages,
      total: messages.length,
      unread: messages.filter(m => !m.read).length,
    })

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    apiLogger.apiError('developers/messages', 'Failed to fetch messages', error)
    return serverError(error, errorMessage)
  }
}
