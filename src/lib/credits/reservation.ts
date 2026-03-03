/**
 * Credit Reservation System
 * 
 * Handles reserving credits when a customer submits a document,
 * and releasing/converting reservations when work is completed or cancelled.
 */

import { db } from '@/lib/firebase/admin'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { getUserCredits } from './balance'
import { CREDIT_CONSTANTS } from './types'

/**
 * Credit reservation status
 */
export type ReservationStatus = 'reserved' | 'released' | 'converted'

/**
 * Credit reservation record
 */
export interface CreditReservation {
  id?: string
  userId: string
  documentId: string
  amount: number              // Reserved amount in cents (with markup)
  rawAmount: number           // Raw cost estimate in cents
  markup: number              // Markup multiplier used
  status: ReservationStatus
  createdAt: string
  resolvedAt: string | null
  transactionId: string | null  // If converted to transaction
}

/**
 * Result of a reservation operation
 */
export interface ReservationResult {
  success: boolean
  reservationId?: string
  error?: string
  insufficientCredits?: boolean
  currentBalance?: number
  requiredAmount?: number
}

/**
 * Collection name for reservations
 */
const RESERVATIONS_COLLECTION = 'credit_reservations'

/**
 * Create a credit reservation for a document
 * Does NOT deduct credits yet - just reserves them
 * 
 * @param userId - The user's ID
 * @param documentId - The document ID
 * @param estimatedCostCents - The estimated cost to reserve (already with markup)
 * @param rawCostCents - The raw cost estimate (before markup)
 * @returns Reservation result
 */
export async function createReservation(
  userId: string,
  documentId: string,
  estimatedCostCents: number,
  rawCostCents: number
): Promise<ReservationResult> {
  try {
    // Check if user has sufficient balance for this reservation
    const credits = await getUserCredits(userId)
    
    // Get total existing reservations for this user
    const existingReservations = await db
      .collection(RESERVATIONS_COLLECTION)
      .where('userId', '==', userId)
      .where('status', '==', 'reserved')
      .get()
    
    const totalReserved = existingReservations.docs.reduce(
      (sum, doc) => sum + (doc.data().amount || 0),
      0
    )
    
    // Infinite debt is allowed - no balance check needed
    // Users can always create reservations (charged at 5x when going negative)
    
    // Create the reservation
    const timestamp = createISOTimestamp()
    const reservation: Omit<CreditReservation, 'id'> = {
      userId,
      documentId,
      amount: estimatedCostCents,
      rawAmount: rawCostCents,
      markup: CREDIT_CONSTANTS.CUSTOMER_MARKUP_MULTIPLIER,
      status: 'reserved',
      createdAt: timestamp,
      resolvedAt: null,
      transactionId: null,
    }
    
    const docRef = await db.collection(RESERVATIONS_COLLECTION).add(reservation)
    
    return {
      success: true,
      reservationId: docRef.id,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create reservation',
    }
  }
}

/**
 * Release a reservation (when document is cancelled or deleted)
 * Returns the credits back to available balance
 * 
 * @param reservationId - The reservation ID
 * @returns Success or failure
 */
export async function releaseReservation(
  reservationId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const timestamp = createISOTimestamp()
    
    await db.collection(RESERVATIONS_COLLECTION).doc(reservationId).update({
      status: 'released',
      resolvedAt: timestamp,
    })
    
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to release reservation',
    }
  }
}

/**
 * Release a reservation by document ID (when document is cancelled or deleted)
 * 
 * @param documentId - The document ID
 * @returns Success or failure
 */
export async function releaseReservationByDocument(
  documentId: string
): Promise<{ success: boolean; error?: string; reservationId?: string }> {
  try {
    const reservations = await db
      .collection(RESERVATIONS_COLLECTION)
      .where('documentId', '==', documentId)
      .where('status', '==', 'reserved')
      .get()
    
    if (reservations.empty) {
      // No reservation to release - that's OK
      return { success: true }
    }
    
    const timestamp = createISOTimestamp()
    const reservationId = reservations.docs[0].id
    
    await db.collection(RESERVATIONS_COLLECTION).doc(reservationId).update({
      status: 'released',
      resolvedAt: timestamp,
    })
    
    return { success: true, reservationId }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to release reservation',
    }
  }
}

/**
 * Convert a reservation to an actual charge (when work is completed)
 * Marks the reservation as converted and links to the transaction
 * 
 * @param reservationId - The reservation ID
 * @param transactionId - The credit transaction ID from the charge
 * @returns Success or failure
 */
export async function convertReservation(
  reservationId: string,
  transactionId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const timestamp = createISOTimestamp()
    
    await db.collection(RESERVATIONS_COLLECTION).doc(reservationId).update({
      status: 'converted',
      resolvedAt: timestamp,
      transactionId,
    })
    
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to convert reservation',
    }
  }
}

/**
 * Convert a reservation by document ID
 * 
 * @param documentId - The document ID
 * @param transactionId - The credit transaction ID from the charge
 * @returns Success or failure with reservation details
 */
export async function convertReservationByDocument(
  documentId: string,
  transactionId: string
): Promise<{ success: boolean; error?: string; reservationId?: string; reservedAmount?: number }> {
  try {
    const reservations = await db
      .collection(RESERVATIONS_COLLECTION)
      .where('documentId', '==', documentId)
      .where('status', '==', 'reserved')
      .get()
    
    if (reservations.empty) {
      // No reservation to convert - that's OK, proceed anyway
      return { success: true }
    }
    
    const timestamp = createISOTimestamp()
    const reservationDoc = reservations.docs[0]
    const reservationId = reservationDoc.id
    const reservedAmount = reservationDoc.data().amount
    
    await db.collection(RESERVATIONS_COLLECTION).doc(reservationId).update({
      status: 'converted',
      resolvedAt: timestamp,
      transactionId,
    })
    
    return { success: true, reservationId, reservedAmount }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to convert reservation',
    }
  }
}

/**
 * Get all active reservations for a user
 * 
 * @param userId - The user's ID
 * @returns Array of active reservations
 */
export async function getActiveReservations(
  userId: string
): Promise<CreditReservation[]> {
  const snapshot = await db
    .collection(RESERVATIONS_COLLECTION)
    .where('userId', '==', userId)
    .where('status', '==', 'reserved')
    .get()
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as CreditReservation))
}

/**
 * Get total reserved amount for a user
 * 
 * @param userId - The user's ID
 * @returns Total reserved amount in cents
 */
export async function getTotalReserved(userId: string): Promise<number> {
  const reservations = await getActiveReservations(userId)
  return reservations.reduce((sum, r) => sum + r.amount, 0)
}

