'use client'

import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { useAllProjects } from '@/lib/hooks/developers/useAllProjects'
import { AddDocumentModal } from './AddDocumentModal'
import { AddProjectModal } from './AddProjectModal'
import { DocumentDetailModal } from './DocumentDetailModal'
import { AssignDeveloperModalWrapper } from './AssignDeveloperModalWrapper'
import { ProjectDetailModal } from '@/components/developers/ProjectDetailModal'

/**
 * DevModalsHost - Renders the active modal based on store state
 *
 * Supported modals:
 * - add-document: Create a new customer document
 * - add-project: Create a new project
 * - document-detail: View/edit document details
 * - project-detail: View project details
 * - assign-developer: Assign a developer to a document
 */
export function DevModalsHost() {
  const { activeModal, selectedProjectId, closeModal } = useDevPortalStore()
  const { projects } = useAllProjects()

  if (!activeModal) return null

  // Get selected project for project modals
  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId) || null
    : null

  switch (activeModal) {
    case 'add-document':
      return <AddDocumentModal />

    case 'add-project':
      return <AddProjectModal />

    case 'document-detail':
      return <DocumentDetailModal />

    case 'project-detail':
      return (
        <ProjectDetailModal project={selectedProject} onClose={closeModal} />
      )

    case 'assign-developer':
      return <AssignDeveloperModalWrapper />

    default:
      return null
  }
}
