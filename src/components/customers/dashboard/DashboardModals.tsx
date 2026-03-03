import type { DateFormatter } from '@/lib/types/common'
import { UnifiedInbox } from '@/components/inbox/UnifiedInbox'
import { DocumentApprovalModal } from '@/components/customers/DocumentApprovalModal'
import { DocumentHistoryTimeline } from '@/components/customers/DocumentHistoryTimeline'
import { ProjectsListModal } from '@/components/customers/dashboard/ProjectsListModal'
import { PaymentModal } from '@/components/payments/PaymentModal'
import { CustomerDocument } from '@/lib/types/customer'
import { Project } from '@/lib/types/project'
import { RequirementsModal } from '@/components/customers/dashboard/RequirementsModal'
import { SessionsModal } from '@/components/customers/dashboard/SessionsModal'
import { ProjectOnboardingModal } from '@/components/customers/ProjectOnboardingModal'

type DashboardModalsProps = {
  // Projects modal
  showProjectsListModal: boolean
  setShowProjectsListModal: (v: boolean) => void
  projects: Project[]
  projectsLoading: boolean
  projectSearch: string
  setProjectSearch: (v: string) => void
  projectSort: 'date-desc' | 'date-asc' | 'budget-desc' | 'budget-asc'
  setProjectSort: (
    v: 'date-desc' | 'date-asc' | 'budget-desc' | 'budget-asc'
  ) => void
  projectStatusFilter: string
  setProjectStatusFilter: (v: string) => void
  filteredProjects: Project[]
  getPaymentStatusColor: (status: string) => string
  handlePayNow: (project: Project) => void
  setSelectedProject: (p: Project | null) => void
  setShowProjectModal: (v: boolean) => void

  // Inbox modal
  showInboxModal: boolean
  setShowInboxModal: (v: boolean) => void

  // Payment modal
  showPaymentModal: boolean
  setShowPaymentModal: (v: boolean) => void
  paymentProject: Project | null
  setPaymentProject: (p: Project | null) => void

  // Approval modal
  showApprovalModal: boolean
  setShowApprovalModal: (v: boolean) => void
  documentToApprove: CustomerDocument | null
  setDocumentToApprove: (d: CustomerDocument | null) => void
  handleConfirmApproval: () => Promise<void>
  approvalSource?: 'after_add' | 'existing'
  projectsByIdTitle: (id?: string) => string | undefined

  // History modal
  showHistoryModal: boolean
  setShowHistoryModal: (v: boolean) => void
  documentForHistory: CustomerDocument | null
  setDocumentForHistory: (d: CustomerDocument | null) => void

  // Requirements/Sessions modals
  showRequirementsModal: boolean
  setShowRequirementsModal: (v: boolean) => void
  showSessionsModal: boolean
  setShowSessionsModal: (v: boolean) => void
  selectedDocForModal: CustomerDocument | null
  formatDate: DateFormatter
  // Project onboarding modal
  showProjectModal?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Accepts various project data shapes from different callers
  onCreateProject?: (data: any) => Promise<void>
}

export function DashboardModals(props: DashboardModalsProps) {
  const {
    showProjectsListModal,
    setShowProjectsListModal,
    projects,
    projectsLoading,
    projectSearch,
    setProjectSearch,
    projectSort,
    setProjectSort,
    projectStatusFilter,
    setProjectStatusFilter,
    filteredProjects,
    getPaymentStatusColor,
    handlePayNow,
    setSelectedProject,
    setShowProjectModal,
    showInboxModal,
    setShowInboxModal,
    showPaymentModal,
    setShowPaymentModal,
    paymentProject,
    setPaymentProject,
    showApprovalModal,
    setShowApprovalModal,
    documentToApprove,
    setDocumentToApprove,
    handleConfirmApproval,
    approvalSource,
    projectsByIdTitle,
    showHistoryModal,
    setShowHistoryModal,
    documentForHistory,
    setDocumentForHistory,
    // Requirements/Sessions
    showRequirementsModal,
    setShowRequirementsModal,
    showSessionsModal,
    setShowSessionsModal,
    selectedDocForModal,
    formatDate,
  } = props

  return (
    <>
      {showProjectsListModal && (
        <ProjectsListModal
          isOpen={showProjectsListModal}
          onClose={() => setShowProjectsListModal(false)}
          onNewProject={() => setShowProjectModal(true)}
          projects={projects}
          projectsLoading={projectsLoading}
          projectSearch={projectSearch}
          projectSort={projectSort}
          projectStatusFilter={projectStatusFilter}
          setProjectSearch={setProjectSearch}
          setProjectSort={setProjectSort}
          setProjectStatusFilter={setProjectStatusFilter}
          filteredProjects={filteredProjects}
          getPaymentStatusColor={getPaymentStatusColor}
          handlePayNow={handlePayNow}
          setSelectedProject={setSelectedProject}
        />
      )}

      {showInboxModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* eslint-disable jsx-a11y/aria-role -- role is a component prop, not an HTML aria role */}
            <UnifiedInbox
              role="customer"
              onClose={() => setShowInboxModal(false)}
            />
            {/* eslint-enable jsx-a11y/aria-role */}
          </div>
        </div>
      )}

      {paymentProject && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false)
            setPaymentProject(null)
          }}
          projectId={paymentProject.id}
          projectTitle={paymentProject.title}
          amount={paymentProject.totalCost - (paymentProject.paidAmount || 0)}
          currency={paymentProject.currency}
        />
      )}

      {documentToApprove && (
        <DocumentApprovalModal
          isOpen={showApprovalModal}
          onClose={() => {
            setShowApprovalModal(false)
            setDocumentToApprove(null)
          }}
          onConfirm={handleConfirmApproval}
          document={{
            id: documentToApprove.id,
            googleDocTitle: documentToApprove.googleDocTitle,
            googleDocUrl: documentToApprove.googleDocUrl,
            projectTitle: projectsByIdTitle(documentToApprove.projectId),
          }}
          source={approvalSource}
        />
      )}

      {documentForHistory && (
        <DocumentHistoryTimeline
          documentId={documentForHistory.id}
          documentTitle={documentForHistory.googleDocTitle}
          isOpen={showHistoryModal}
          onClose={() => {
            setShowHistoryModal(false)
            setDocumentForHistory(null)
          }}
        />
      )}

      {props.showProjectModal &&
        props.setShowProjectModal &&
        props.onCreateProject && (
          <ProjectOnboardingModal
            isOpen={!!props.showProjectModal}
            onClose={() => props.setShowProjectModal!(false)}
            onSubmit={props.onCreateProject}
          />
        )}

      {selectedDocForModal && (
        <RequirementsModal
          isOpen={showRequirementsModal}
          onClose={() => setShowRequirementsModal(false)}
          document={selectedDocForModal}
          formatDate={formatDate}
        />
      )}

      {selectedDocForModal && (
        <SessionsModal
          isOpen={showSessionsModal}
          onClose={() => setShowSessionsModal(false)}
          document={selectedDocForModal}
          formatDate={formatDate}
        />
      )}
    </>
  )
}
