'use client'

import { useState, useEffect } from 'react'
import {
  X,
  User,
  FolderOpen,
  CurrencyDollar,
  Calendar,
  Tag,
  FileText,
} from '@phosphor-icons/react'
import { DevButton, DevInput, DevCard } from '../ui'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { useAuth } from '@/components/auth/ClientProvider'
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { ProjectType, ProjectStatus } from '@/lib/types/project'

interface Customer {
  id: string
  email: string
  displayName: string
}

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: 'website', label: 'Website' },
  { value: 'app', label: 'Application' },
  { value: 'design', label: 'Design' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'custom', label: 'Custom' },
]

const INITIAL_STATUSES: {
  value: ProjectStatus
  label: string
  description: string
}[] = [
  {
    value: 'intake',
    label: 'Intake',
    description: 'Gathering requirements from customer',
  },
  {
    value: 'discovery',
    label: 'Discovery',
    description: 'Planning and reviewing requirements',
  },
  {
    value: 'in-progress',
    label: 'In Progress',
    description: 'Active development',
  },
]

/**
 * AddProjectModal - Modal to create a new project
 */
export function AddProjectModal() {
  const { closeModal } = useDevPortalStore()
  const { user } = useAuth()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [projectType, setProjectType] = useState<ProjectType>('website')
  const [status, setStatus] = useState<ProjectStatus>('intake')
  const [totalCost, setTotalCost] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState('')
  const [notes, setNotes] = useState('')

  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch customers
  useEffect(() => {
    async function fetchCustomers() {
      setLoading(true)
      try {
        const customersSnap = await getDocs(collection(db, 'users'))
        const customersData = customersSnap.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email || '',
          displayName: doc.data().displayName || doc.data().email || 'Unknown',
        }))
        setCustomers(customersData)
      } catch (err) {
        setError('Failed to load customers')
      } finally {
        setLoading(false)
      }
    }
    fetchCustomers()
  }, [])

  const selectedCustomer = customers.find((c) => c.id === customerId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Please enter a project title')
      return
    }
    if (!customerId) {
      setError('Please select a customer')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const costNumber = totalCost ? parseFloat(totalCost) : 0

      const projectData = {
        title: title.trim(),
        description: description.trim() || '',
        customerId,
        customerName: selectedCustomer?.displayName || 'Unknown',
        customerEmail: selectedCustomer?.email || '',
        type: projectType,
        status,
        totalCost: costNumber,
        currency,
        paymentStatus: 'pending' as const,
        paidAmount: 0,
        estimatedCompletionDate: estimatedCompletionDate || null,
        notes: notes.trim() || null,
        milestones: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: user?.uid || null,
      }

      await addDoc(collection(db, 'projects'), projectData)
      closeModal()
    } catch (err) {
      setError('Failed to create project')
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
        aria-label="Add project"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 560,
          maxHeight: '90vh',
          overflow: 'auto',
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
              position: 'sticky',
              top: 0,
              background: 'var(--dev-bg-elevated)',
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--dev-space-2)',
              }}
            >
              <FolderOpen
                size={20}
                weight="fill"
                style={{ color: 'var(--dev-accent-primary)' }}
              />
              <h2
                style={{
                  fontWeight: 'var(--dev-font-semibold)',
                  fontSize: 'var(--dev-text-lg)',
                }}
              >
                New Project
              </h2>
            </div>
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
              {error && (
                <div
                  style={{
                    padding: 'var(--dev-space-3)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: 'var(--dev-accent-danger)',
                    borderRadius: 'var(--dev-radius-md)',
                    fontSize: 'var(--dev-text-sm)',
                  }}
                >
                  {error}
                </div>
              )}

              {/* Project Title */}
              <div>
                <label
                  htmlFor="v2-add-project-title"
                  style={{
                    display: 'block',
                    marginBottom: 'var(--dev-space-1-5)',
                    fontSize: 'var(--dev-text-sm)',
                    fontWeight: 'var(--dev-font-medium)',
                  }}
                >
                  Project Title *
                </label>
                <DevInput
                  id="v2-add-project-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter project title..."
                  leftIcon={<FileText size={16} />}
                  required
                />
              </div>

              {/* Customer */}
              <div>
                <label
                  htmlFor="v2-add-project-customer"
                  style={{
                    display: 'block',
                    marginBottom: 'var(--dev-space-1-5)',
                    fontSize: 'var(--dev-text-sm)',
                    fontWeight: 'var(--dev-font-medium)',
                  }}
                >
                  Customer *
                </label>
                <div style={{ position: 'relative' }}>
                  <User
                    size={16}
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--dev-text-muted)',
                      pointerEvents: 'none',
                    }}
                  />
                  <select
                    id="v2-add-project-customer"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="dev-input"
                    style={{ paddingLeft: 'var(--dev-space-10)' }}
                    required
                    disabled={loading}
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

              {/* Project Type & Status */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--dev-space-3)',
                }}
              >
                <div>
                  <label
                    htmlFor="v2-add-project-type"
                    style={{
                      display: 'block',
                      marginBottom: 'var(--dev-space-1-5)',
                      fontSize: 'var(--dev-text-sm)',
                      fontWeight: 'var(--dev-font-medium)',
                    }}
                  >
                    Project Type
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Tag
                      size={16}
                      style={{
                        position: 'absolute',
                        left: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--dev-text-muted)',
                        pointerEvents: 'none',
                      }}
                    />
                    <select
                      id="v2-add-project-type"
                      value={projectType}
                      onChange={(e) =>
                        setProjectType(e.target.value as ProjectType)
                      }
                      className="dev-input"
                      style={{ paddingLeft: 'var(--dev-space-10)' }}
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="v2-add-project-status"
                    style={{
                      display: 'block',
                      marginBottom: 'var(--dev-space-1-5)',
                      fontSize: 'var(--dev-text-sm)',
                      fontWeight: 'var(--dev-font-medium)',
                    }}
                  >
                    Initial Status
                  </label>
                  <select
                    id="v2-add-project-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                    className="dev-input"
                  >
                    {INITIAL_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cost & Currency */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gap: 'var(--dev-space-3)',
                }}
              >
                <div>
                  <label
                    htmlFor="v2-add-project-cost"
                    style={{
                      display: 'block',
                      marginBottom: 'var(--dev-space-1-5)',
                      fontSize: 'var(--dev-text-sm)',
                      fontWeight: 'var(--dev-font-medium)',
                    }}
                  >
                    Total Cost
                  </label>
                  <DevInput
                    id="v2-add-project-cost"
                    type="number"
                    min="0"
                    step="0.01"
                    value={totalCost}
                    onChange={(e) => setTotalCost(e.target.value)}
                    placeholder="0.00"
                    leftIcon={<CurrencyDollar size={16} />}
                  />
                </div>

                <div>
                  <label
                    htmlFor="v2-add-project-currency"
                    style={{
                      display: 'block',
                      marginBottom: 'var(--dev-space-1-5)',
                      fontSize: 'var(--dev-text-sm)',
                      fontWeight: 'var(--dev-font-medium)',
                    }}
                  >
                    Currency
                  </label>
                  <select
                    id="v2-add-project-currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="dev-input"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                    <option value="AUD">AUD</option>
                  </select>
                </div>
              </div>

              {/* Estimated Completion */}
              <div>
                <label
                  htmlFor="v2-add-project-completion-date"
                  style={{
                    display: 'block',
                    marginBottom: 'var(--dev-space-1-5)',
                    fontSize: 'var(--dev-text-sm)',
                    fontWeight: 'var(--dev-font-medium)',
                  }}
                >
                  Estimated Completion Date
                </label>
                <DevInput
                  id="v2-add-project-completion-date"
                  type="date"
                  value={estimatedCompletionDate}
                  onChange={(e) => setEstimatedCompletionDate(e.target.value)}
                  leftIcon={<Calendar size={16} />}
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="v2-add-project-description"
                  style={{
                    display: 'block',
                    marginBottom: 'var(--dev-space-1-5)',
                    fontSize: 'var(--dev-text-sm)',
                    fontWeight: 'var(--dev-font-medium)',
                  }}
                >
                  Description
                </label>
                <textarea
                  id="v2-add-project-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the project scope and objectives..."
                  className="dev-input"
                  style={{ minHeight: 80, resize: 'vertical' }}
                />
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="v2-add-project-notes"
                  style={{
                    display: 'block',
                    marginBottom: 'var(--dev-space-1-5)',
                    fontSize: 'var(--dev-text-sm)',
                    fontWeight: 'var(--dev-font-medium)',
                  }}
                >
                  Internal Notes
                </label>
                <textarea
                  id="v2-add-project-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Internal notes (not visible to customer)..."
                  className="dev-input"
                  style={{ minHeight: 60, resize: 'vertical' }}
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
                position: 'sticky',
                bottom: 0,
                background: 'var(--dev-bg-elevated)',
              }}
            >
              <DevButton type="button" variant="ghost" onClick={closeModal}>
                Cancel
              </DevButton>
              <DevButton type="submit" variant="primary" loading={submitting}>
                Create Project
              </DevButton>
            </div>
          </form>
        </DevCard>
      </div>
    </>
  )
}
