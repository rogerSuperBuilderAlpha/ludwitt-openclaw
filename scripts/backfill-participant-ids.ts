/**
 * One-time backfill script: Add `participantIds` array to existing
 * `documentCommunications` and `clientRequirements` documents.
 *
 * For each document, it resolves the parent `customerDocument` to get
 * `customerId` and `assignedDeveloperId`/`assignedTo`, then writes
 * a `participantIds` array containing all relevant UIDs.
 *
 * Usage:
 *   npx tsx scripts/backfill-participant-ids.ts
 *
 * Prerequisites:
 *   - GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_ADMIN_* env vars set
 *   - Run from the project root
 */

import * as admin from 'firebase-admin'

// Initialize Firebase Admin (uses env vars or default credentials)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  })
}

const db = admin.firestore()

async function getParticipantIds(documentId: string): Promise<string[]> {
  const docSnap = await db.collection('customerDocuments').doc(documentId).get()
  if (!docSnap.exists) return []

  const data = docSnap.data()!
  const ids = new Set<string>()

  if (data.customerId) ids.add(data.customerId)
  if (data.assignedTo) ids.add(data.assignedTo)
  if (data.assignedDeveloperId) ids.add(data.assignedDeveloperId)

  return Array.from(ids)
}

async function backfillCollection(collectionName: string) {
  console.log(`\nBackfilling ${collectionName}...`)

  const snapshot = await db.collection(collectionName).get()
  let updated = 0
  let skipped = 0
  let errors = 0

  // Process in batches of 500 (Firestore batch limit)
  const batchSize = 500
  let batch = db.batch()
  let batchCount = 0

  for (const doc of snapshot.docs) {
    const data = doc.data()

    // Skip if already has participantIds
    if (data.participantIds && Array.isArray(data.participantIds) && data.participantIds.length > 0) {
      skipped++
      continue
    }

    const documentId = data.documentId
    if (!documentId) {
      console.warn(`  Skipping ${doc.id}: no documentId field`)
      skipped++
      continue
    }

    try {
      const participantIds = await getParticipantIds(documentId)
      if (participantIds.length === 0) {
        console.warn(`  Skipping ${doc.id}: parent document not found`)
        skipped++
        continue
      }

      batch.update(doc.ref, { participantIds })
      batchCount++
      updated++

      if (batchCount >= batchSize) {
        await batch.commit()
        console.log(`  Committed batch of ${batchCount}`)
        batch = db.batch()
        batchCount = 0
      }
    } catch (err) {
      console.error(`  Error processing ${doc.id}:`, err)
      errors++
    }
  }

  // Commit remaining
  if (batchCount > 0) {
    await batch.commit()
    console.log(`  Committed final batch of ${batchCount}`)
  }

  console.log(`  Done: ${updated} updated, ${skipped} skipped, ${errors} errors (${snapshot.size} total)`)
}

async function main() {
  console.log('Starting participantIds backfill...')

  await backfillCollection('documentCommunications')
  await backfillCollection('clientRequirements')

  console.log('\nBackfill complete!')
  process.exit(0)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
