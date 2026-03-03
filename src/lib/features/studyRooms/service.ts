/**
 * Study Rooms Service
 * Handles room creation, joining, and real-time updates
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  increment,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { StudyRoom, RoomParticipant, RoomMessage, RoomActivity, RoomType } from './types'
import { logger } from '@/lib/logger'

/**
 * Create a new study room
 */
export async function createStudyRoom(
  creatorId: string,
  creatorName: string,
  roomType: RoomType,
  roomName: string,
  maxParticipants: number = 6,
  isPublic: boolean = true
): Promise<string> {
  try {
    const room: Omit<StudyRoom, 'id'> = {
      name: roomName,
      creatorId,
      creatorName,
      type: roomType,
      maxParticipants,
      currentParticipants: 0,
      isPublic,
      status: 'active',
      createdAt: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, 'studyRooms'), room)
    
    // Creator automatically joins
    await joinStudyRoom(docRef.id, creatorId, creatorName)
    
    return docRef.id
  } catch (error) {
    logger.error('Service', 'Error creating study room', { error: error })
    throw error
  }
}

/**
 * Join a study room
 */
export async function joinStudyRoom(
  roomId: string,
  userId: string,
  userName: string,
  userPhotoURL?: string
): Promise<void> {
  try {
    // Check if room exists and has space
    const roomDoc = await getDoc(doc(db, 'studyRooms', roomId))
    if (!roomDoc.exists()) {
      throw new Error('Room not found')
    }

    const room = roomDoc.data() as StudyRoom
    if (room.currentParticipants >= room.maxParticipants) {
      throw new Error('Room is full')
    }

    // Add participant
    const participantId = `${roomId}_${userId}`
    const participant: RoomParticipant = {
      userId,
      userName,
      userPhotoURL,
      joinedAt: new Date().toISOString(),
      status: 'active',
      lastActivity: new Date().toISOString(),
    }

    await setDoc(doc(db, 'roomParticipants', participantId), participant, { merge: true })

    // Update room participant count
    await updateDoc(doc(db, 'studyRooms', roomId), {
      currentParticipants: increment(1),
    })

    // Add system activity
    await addRoomActivity(roomId, userId, userName, 'joined', `${userName} joined the room`, false)
  } catch (error) {
    logger.error('Service', 'Error joining study room', { error: error })
    throw error
  }
}

/**
 * Leave a study room
 */
export async function leaveStudyRoom(roomId: string, userId: string, userName: string): Promise<void> {
  try {
    const participantId = `${roomId}_${userId}`
    const participantDoc = await getDoc(doc(db, 'roomParticipants', participantId))
    
    if (participantDoc.exists()) {
      // Remove participant
      await updateDoc(doc(db, 'roomParticipants', participantId), {
        status: 'away',
        lastActivity: new Date().toISOString(),
      })

      // Update room participant count
      await updateDoc(doc(db, 'studyRooms', roomId), {
        currentParticipants: increment(-1),
      })

      // Add system activity
      await addRoomActivity(roomId, userId, userName, 'left', `${userName} left the room`, false)
    }
  } catch (error) {
    logger.error('Service', 'Error leaving study room', { error: error })
    throw error
  }
}

/**
 * Send a message in a study room
 */
export async function sendRoomMessage(
  roomId: string,
  userId: string,
  userName: string,
  message: string,
  type: RoomMessage['type'] = 'text'
): Promise<void> {
  try {
    const messageData: Omit<RoomMessage, 'id'> = {
      roomId,
      userId,
      userName,
      message,
      type,
      timestamp: new Date().toISOString(),
    }

    await addDoc(collection(db, 'roomMessages'), messageData)
  } catch (error) {
    logger.error('Service', 'Error sending message', { error: error })
    throw error
  }
}

/**
 * Add room activity (system events, celebrations)
 */
export async function addRoomActivity(
  roomId: string,
  userId: string,
  userName: string,
  type: RoomActivity['type'],
  description: string,
  celebratory: boolean = false
): Promise<void> {
  try {
    const activity: Omit<RoomActivity, 'id'> = {
      roomId,
      userId,
      userName,
      type,
      description,
      timestamp: new Date().toISOString(),
      celebratory,
    }

    await addDoc(collection(db, 'roomActivities'), activity)
  } catch (error) {
    logger.error('Service', 'Error adding room activity', { error: error })
  }
}

/**
 * Get active public study rooms
 */
export async function getActiveRooms(): Promise<StudyRoom[]> {
  try {
    const roomsRef = collection(db, 'studyRooms')
    const q = query(
      roomsRef,
      where('status', '==', 'active'),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc'),
      limit(20)
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as StudyRoom[]
  } catch (error) {
    logger.error('Service', 'Error getting active rooms', { error: error })
    return []
  }
}

/**
 * Subscribe to room participants (real-time)
 */
export function subscribeToRoomParticipants(
  roomId: string,
  callback: (participants: RoomParticipant[]) => void
): () => void {
  const participantsRef = collection(db, 'roomParticipants')
  // Using document ID pattern: roomId_userId
  // Filter to this room's participants by ID prefix
  const q = query(
    participantsRef,
    where('__name__', '>=', `${roomId}_`),
    where('__name__', '<', `${roomId}_\uf8ff`)
  )

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const participants = snapshot.docs
      .map(doc => doc.data() as RoomParticipant)
      .filter(p => p.status === 'active')
    
    callback(participants)
  })

  return unsubscribe
}

/**
 * Subscribe to room messages (real-time)
 */
export function subscribeToRoomMessages(
  roomId: string,
  callback: (messages: RoomMessage[]) => void
): () => void {
  const messagesRef = collection(db, 'roomMessages')
  const q = query(
    messagesRef,
    where('roomId', '==', roomId),
    orderBy('timestamp', 'desc'),
    limit(50)
  )

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as RoomMessage[]
    
    callback(messages.reverse()) // Show oldest first
  })

  return unsubscribe
}

/**
 * Subscribe to room activities (real-time celebrations)
 */
export function subscribeToRoomActivities(
  roomId: string,
  callback: (activities: RoomActivity[]) => void
): () => void {
  const activitiesRef = collection(db, 'roomActivities')
  const q = query(
    activitiesRef,
    where('roomId', '==', roomId),
    orderBy('timestamp', 'desc'),
    limit(20)
  )

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const activities = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as RoomActivity[]
    
    callback(activities)
  })

  return unsubscribe
}

/**
 * Update participant activity status
 */
export async function updateParticipantActivity(
  roomId: string,
  userId: string,
  activity?: RoomParticipant['currentActivity']
): Promise<void> {
  try {
    const participantId = `${roomId}_${userId}`
    await updateDoc(doc(db, 'roomParticipants', participantId), {
      lastActivity: new Date().toISOString(),
      currentActivity: activity || null,
      status: 'active',
    })
  } catch (error) {
    logger.error('Service', 'Error updating participant activity', { error: error })
  }
}

