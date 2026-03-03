/**
 * Project Entity Types
 * Core types for customer projects, connecting customers, developers, and deliverables
 */

export type ProjectStatus =
  | 'intake' // Customer onboarding, gathering requirements
  | 'discovery' // Developer reviewing requirements, planning
  | 'in-progress' // Active development
  | 'review' // Customer review phase
  | 'revision' // Revisions based on feedback
  | 'completed' // Project delivered and approved
  | 'paused' // Temporarily paused
  | 'cancelled' // Project cancelled

export type ProjectType =
  | 'website' // Website development
  | 'app' // Application development
  | 'design' // Design work
  | 'consulting' // Technical consulting
  | 'custom' // Custom project type

export type PaymentStatus =
  | 'pending' // Awaiting payment
  | 'partial' // Partial payment received
  | 'paid' // Fully paid
  | 'refunded' // Refunded
  | 'cancelled' // Payment cancelled

export interface ProjectMilestone {
  id: string
  title: string
  description: string
  dueDate: string
  completedAt?: string
  status: 'pending' | 'in-progress' | 'completed'
  order: number
}

export interface Project {
  id: string
  customerId: string
  customerName: string
  customerEmail: string

  // Developer assignment (supports multiple developers per project)
  assignedDeveloperIds?: string[] // Array of developer user IDs
  assignedDevelopers?: Array<{ // Developer details for display
    id: string
    name: string
    email: string
  }>
  assignedAt?: string

  // Legacy fields (deprecated, use assignedDeveloperIds instead)
  assignedDeveloperId?: string
  assignedDeveloperName?: string

  // Project details
  title: string
  description: string
  type: ProjectType
  status: ProjectStatus

  // Payment
  totalCost: number
  currency: string
  paymentStatus: PaymentStatus
  stripePaymentIntentId?: string
  stripeInvoiceId?: string
  paidAmount: number

  // Timeline
  estimatedCompletionDate?: string
  actualCompletionDate?: string
  createdAt: string
  updatedAt: string
  startedAt?: string

  // Milestones
  milestones: ProjectMilestone[]

  // Metadata
  tags?: string[]
  notes?: string
}

export interface ProjectDocument {
  id: string
  projectId: string
  customerId: string
  developerId?: string

  title: string
  description?: string
  documentUrl: string
  type: 'requirement' | 'design' | 'deliverable' | 'contract' | 'other'

  status: 'pending' | 'approved' | 'revision-requested'
  approvedAt?: string
  approvedBy?: string

  version: number
  previousVersionId?: string

  feedback?: string

  uploadedAt: string
  updatedAt: string
}

export interface ProjectRequirement {
  id: string
  projectId: string
  addedBy: string // userId
  addedByName: string

  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'

  status: 'pending' | 'in-progress' | 'completed' | 'approved' | 'rejected'

  // Customer approval
  requiresCustomerApproval: boolean
  customerApprovalStatus?: 'pending' | 'approved' | 'rejected'
  customerFeedback?: string
  approvedAt?: string

  dueDate?: string
  completedAt?: string

  createdAt: string
  updatedAt: string
}

export interface ProjectSession {
  id: string
  projectId: string
  developerId: string
  developerName: string

  title: string
  description: string
  duration: number // minutes

  type: 'planning' | 'development' | 'review' | 'meeting' | 'other'

  // Visibility
  visibleToCustomer: boolean

  sessionDate: string
  createdAt: string
  updatedAt: string
}

export interface ProjectMessage {
  id: string
  projectId: string
  senderId: string
  senderName: string
  senderType: 'customer' | 'developer' | 'admin'

  content: string

  // Attachments
  attachmentUrl?: string
  attachmentType?: string

  // Threading
  replyToId?: string

  // Read tracking
  readAt?: string
  readBy?: string[]

  createdAt: string
  updatedAt: string
}

export interface ProjectNotification {
  id: string
  userId: string
  projectId: string

  type: 'requirement_added' | 'requirement_completed' | 'session_logged' |
        'document_approved' | 'message_received' | 'milestone_completed' |
        'status_changed' | 'payment_received' | 'project_completed'

  title: string
  message: string

  // Link to relevant entity
  entityType: 'requirement' | 'session' | 'document' | 'message' | 'milestone' | 'project'
  entityId: string

  read: boolean
  readAt?: string

  createdAt: string
}

export interface ProjectInvoice {
  id: string
  projectId: string
  customerId: string

  invoiceNumber: string
  amount: number
  currency: string

  description: string
  lineItems: {
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]

  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

  dueDate: string
  paidAt?: string

  stripeInvoiceId?: string
  stripePaymentIntentId?: string

  createdAt: string
  updatedAt: string
}

// Stripe-specific types
export type StripeWebhookEvent =
  | 'payment_intent.succeeded'
  | 'payment_intent.payment_failed'
  | 'invoice.paid'
  | 'invoice.payment_failed'
  | 'customer.subscription.created'
  | 'customer.subscription.updated'
  | 'customer.subscription.deleted'

export interface StripePaymentMetadata {
  projectId: string
  customerId: string
  invoiceId?: string
  description: string
}

export interface PaymentIntentCreate {
  projectId: string
  amount: number
  currency: string
  description: string
  metadata?: Record<string, string>
}

export interface InvoiceCreate {
  projectId: string
  customerId: string
  amount: number
  currency: string
  description: string
  lineItems: {
    description: string
    quantity: number
    unitPrice: number
  }[]
  dueDate: string
}
