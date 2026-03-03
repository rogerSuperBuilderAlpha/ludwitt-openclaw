import { logout } from '@/lib/firebase/auth'
import { addCustomerDocument, approveCustomerDocument, updateDocumentPriority, updateDocumentProject, sendCustomerMessage } from '@/lib/actions/customerDocuments'

export async function handleLogout(router: any) {
  await logout()
  router.push('/customers')
}

export async function handleAddDocumentSubmit(
  getToken: () => Promise<string | undefined> | undefined,
  payload: { shareUrl: string; title: string; notes: string; projectId: string | null; estimatedCostCents?: number; estimateMarkup?: number }
) {
  const token = (await getToken?.()) as string | undefined
  return await addCustomerDocument(token, payload)
}

export async function handleApproveDocument(getToken: () => Promise<string | undefined> | undefined, documentId: string) {
  const token = (await getToken?.()) as string | undefined
  return await approveCustomerDocument(token, documentId)
}

export async function handleUpdateProject(getToken: () => Promise<string | undefined> | undefined, documentId: string, projectId: string | null) {
  const token = (await getToken?.()) as string | undefined
  return await updateDocumentProject(token, { documentId, projectId })
}

export async function handleUpdatePriority(getToken: () => Promise<string | undefined> | undefined, documentId: string, priority: string | null) {
  const token = (await getToken?.()) as string | undefined
  return await updateDocumentPriority(token, { documentId, priority })
}

export async function handleSendDocMessage(
  getToken: () => Promise<string | undefined> | undefined,
  payload: { documentId: string; customerId: string; message: string }
) {
  const token = (await getToken?.()) as string | undefined
  return await sendCustomerMessage(token, payload)
}


