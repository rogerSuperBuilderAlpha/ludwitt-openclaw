'use client'

import React, { useState } from 'react'
import {
  X,
  Link as LinkIcon,
  FileText,
  User,
  FolderOpen,
} from '@phosphor-icons/react'
import { DevButton, DevInput, DevCard } from '../ui'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { useAuth } from '@/components/auth/ClientProvider'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { useCustomerProjects } from '@/lib/hooks/useCustomerProjects'
import { StatusSelector } from './StatusSelector'

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 'var(--dev-space-1-5)',
  fontSize: 'var(--dev-text-sm)',
  fontWeight: 'var(--dev-font-medium)',
}

const selectIconStyle: React.CSSProperties = {
  position: 'absolute',
  left: 12,
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'var(--dev-text-muted)',
  pointerEvents: 'none',
}

/**
 * AddDocumentModal - Modal to add a new document for a customer
 */
export function AddDocumentModal() {
  const { closeModal } = useDevPortalStore()
  const { user } = useAuth()
  const { customers, projects, error: loadError } = useCustomerProjects()

  const [shareUrl, setShareUrl] = useState('')
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [projectId, setProjectId] = useState('')
  const [status, setStatus] = useState<'pending' | 'in-progress'>('pending')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filteredProjects = projects.filter(
    (p) => !customerId || p.customerId === customerId
  )
  const displayError = error || loadError

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!shareUrl.trim()) {
      setError('Please enter a Google Doc URL')
      return
    }
    if (!customerId) {
      setError('Please select a customer')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const docData: Record<string, any> = {
        googleDocUrl: shareUrl.trim(),
        googleDocTitle: title.trim() || 'Untitled Document',
        customerId,
        projectId: projectId || null,
        status: status === 'pending' ? 'approved' : 'in-progress',
        notes: notes.trim() || null,
        approvedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        requirements: [],
        sessions: [],
        communications: [],
      }

      // If in-progress, assign to current developer
      if (status === 'in-progress' && user) {
        docData.assignedTo = user.uid
        docData.assignedAt = serverTimestamp()
      }

      await addDoc(collection(db, 'customerDocuments'), docData)
      closeModal()
    } catch {
      setError('Failed to create document')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="dev-command-backdrop"
        role="button"
        tabIndex={-1}
        onClick={closeModal}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') closeModal()
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add document"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 520,
          zIndex: 101,
        }}
        className="dev-animate-scale-in"
      >
        <DevCard padding="none">
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--dev-space-4)',
              borderBottom: '1px solid var(--dev-border-subtle)',
            }}
          >
            <h2
              style={{
                fontWeight: 'var(--dev-font-semibold)',
                fontSize: 'var(--dev-text-lg)',
              }}
            >
              Add Document
            </h2>
            <DevButton variant="ghost" size="sm" icon onClick={closeModal}>
              <X size={18} />
            </DevButton>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                padding: 'var(--dev-space-4)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--dev-space-4)',
              }}
            >
              {displayError && (
                <div
                  style={{
                    padding: 'var(--dev-space-3)',
                    background: 'var(--dev-accent-danger-light)',
                    color: 'var(--dev-accent-danger)',
                    borderRadius: 'var(--dev-radius-md)',
                    fontSize: 'var(--dev-text-sm)',
                  }}
                >
                  {displayError}
                </div>
              )}

              {/* Google Doc URL */}
              <div>
                <label htmlFor="v2-add-doc-url" style={labelStyle}>
                  Google Doc URL *
                </label>
                <DevInput
                  id="v2-add-doc-url"
                  value={shareUrl}
                  onChange={(e) => setShareUrl(e.target.value)}
                  placeholder="https://docs.google.com/document/d/..."
                  leftIcon={<LinkIcon size={16} />}
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label htmlFor="v2-add-doc-title" style={labelStyle}>
                  Document Title
                </label>
                <DevInput
                  id="v2-add-doc-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for this document"
                  leftIcon={<FileText size={16} />}
                />
              </div>

              {/* Customer */}
              <div>
                <label htmlFor="v2-add-doc-customer" style={labelStyle}>
                  Customer *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={selectIconStyle} />
                  <select
                    id="v2-add-doc-customer"
                    value={customerId}
                    onChange={(e) => {
                      setCustomerId(e.target.value)
                      setProjectId('')
                    }}
                    className="dev-input"
                    style={{ paddingLeft: 'var(--dev-space-10)' }}
                    required
                  >
                    <option value="">Select a customer...</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.displayName} ({c.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Project (optional) */}
              <div>
                <label htmlFor="v2-add-doc-project" style={labelStyle}>
                  Project (optional)
                </label>
                <div style={{ position: 'relative' }}>
                  <FolderOpen size={16} style={selectIconStyle} />
                  <select
                    id="v2-add-doc-project"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="dev-input"
                    style={{ paddingLeft: 'var(--dev-space-10)' }}
                    disabled={!customerId}
                  >
                    <option value="">No project</option>
                    {filteredProjects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Initial Status */}
              <StatusSelector status={status} onStatusChange={setStatus} />

              {/* Notes */}
              <div>
                <label htmlFor="v2-add-doc-notes" style={labelStyle}>
                  Notes
                </label>
                <textarea
                  id="v2-add-doc-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about this document..."
                  className="dev-input"
                  style={{ minHeight: 80, resize: 'vertical' }}
                />
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 'var(--dev-space-2)',
                padding: 'var(--dev-space-4)',
                borderTop: '1px solid var(--dev-border-subtle)',
              }}
            >
              <DevButton type="button" variant="ghost" onClick={closeModal}>
                Cancel
              </DevButton>
              <DevButton type="submit" variant="primary" loading={submitting}>
                Add Document
              </DevButton>
            </div>
          </form>
        </DevCard>
      </div>
    </>
  )
}
