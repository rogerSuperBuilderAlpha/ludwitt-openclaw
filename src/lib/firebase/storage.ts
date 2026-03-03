import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  UploadTask,
} from 'firebase/storage'
import { storage } from './config'

// Upload file
export const uploadFile = async (
  path: string,
  file: File
): Promise<string> => {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}

// Upload file with progress tracking
export const uploadFileWithProgress = (
  path: string,
  file: File,
  onProgress?: (progress: number) => void
): UploadTask => {
  const storageRef = ref(storage, path)
  const uploadTask = uploadBytesResumable(storageRef, file)

  if (onProgress) {
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      onProgress(progress)
    })
  }

  return uploadTask
}

// Get download URL
export const getFileURL = async (path: string): Promise<string> => {
  const storageRef = ref(storage, path)
  return await getDownloadURL(storageRef)
}

// Delete file
export const deleteFile = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}

// List files in directory
export const listFiles = async (path: string) => {
  const storageRef = ref(storage, path)
  const result = await listAll(storageRef)
  return result.items
}

// Helper: Generate unique filename
export const generateUniqueFileName = (
  userId: string,
  originalName: string
): string => {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split('.').pop()
  return `${userId}/${timestamp}_${randomString}.${extension}`
}

