/**
 * Shared Firestore timestamp type.
 *
 * Uses structural typing so both the client SDK (`firebase/firestore`)
 * and the Admin SDK (`firebase-admin/firestore`) Timestamp objects satisfy it,
 * along with serialized representations commonly stored in Firestore documents.
 */
export type FirestoreTimestamp =
  | { seconds: number; nanoseconds: number; toDate: () => Date }
  | Date
  | string
  | null
