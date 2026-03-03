import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'

// Generic CRUD operations

export const createDocument = async (
  collectionName: string,
  data: DocumentData
) => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export const getDocument = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  }
  return null
}

export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: DocumentData
) => {
  const docRef = doc(db, collectionName, docId)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export const deleteDocument = async (
  collectionName: string,
  docId: string
) => {
  const docRef = doc(db, collectionName, docId)
  await deleteDoc(docRef)
}

export const getDocuments = async (
  collectionName: string,
  queryConstraints?: QueryConstraint[]
) => {
  const collectionRef = collection(db, collectionName)
  const q = queryConstraints
    ? query(collectionRef, ...queryConstraints)
    : collectionRef

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

// Example: Get user's documents
export const getUserDocuments = async (userId: string) => {
  return await getDocuments('documents', [
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  ])
}

