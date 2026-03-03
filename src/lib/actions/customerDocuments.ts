export async function addCustomerDocument(token: string | undefined, payload: {
  shareUrl: string
  title: string
  notes: string
  projectId: string | null
  estimatedCostCents?: number
  estimateMarkup?: number
}) {
  const response = await fetch('/api/customers/documents/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return { ok: response.ok, data }
}

export async function approveCustomerDocument(token: string | undefined, documentId: string) {
  const response = await fetch('/api/customers/documents/approve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ documentId }),
  })
  const data = await response.json()
  return { ok: response.ok, data }
}

export async function updateDocumentProject(token: string | undefined, payload: { documentId: string; projectId: string | null }) {
  const response = await fetch('/api/customers/documents/update-project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return { ok: response.ok, data }
}

export async function updateDocumentPriority(token: string | undefined, payload: { documentId: string; priority: string | null }) {
  const response = await fetch('/api/customers/documents/update-priority', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return { ok: response.ok, data }
}

export async function sendCustomerMessage(token: string | undefined, payload: { documentId: string; customerId: string; message: string }) {
  const response = await fetch('/api/customers/documents/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return { ok: response.ok, data }
}


