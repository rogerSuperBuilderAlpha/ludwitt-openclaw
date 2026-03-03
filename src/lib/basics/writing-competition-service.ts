/**
 * Writing Competition Service
 * 
 * Handles all database operations for the weekly writing competition.
 */

import { adminDb } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { addCredits } from '@/lib/credits/balance'
import {
  WritingCompetition,
  WritingSubmission,
  WritingDraft,
  CompetitionWinner,
  CompetitionStatus,
  PromptCategory,
  WordCountValidation,
  SubmissionEligibility,
  WRITING_COMPETITION_CONSTANTS as CONSTANTS
} from '@/lib/types/writing-competition'
import { logger } from '@/lib/logger'

// Helper to ensure db is available
function getDb() {
  if (!adminDb) {
    throw new Error('Firebase Admin SDK not configured')
  }
  return adminDb
}

// Collections
const COLLECTIONS = {
  COMPETITIONS: 'writingCompetitions',
  SUBMISSIONS: 'writingSubmissions',
  DRAFTS: 'writingDrafts',
  WINNERS: 'writingWinners',
} as const

/**
 * Calculate the week number using the SAME formula as the seeding script.
 * This ensures consistency between seeded competitions and lookups.
 * 
 * Competition schedule: Friday 5pm EST → Next Friday 5pm EST (7 days)
 */
export function getCompetitionWeek(date: Date = new Date()): { week: number; year: number } {
  // Find the Friday 5pm EST that starts this competition period
  // If we're after Friday 5pm, we're in the current week's competition
  // If we're before Friday 5pm, we're still in last week's competition
  const friday = getMostRecentFriday5pmEST(date)
  const year = friday.getFullYear()
  const startOfYear = new Date(year, 0, 1)
  const week = Math.ceil(((friday.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7)
  return { week, year }
}

// Keep old function name for compatibility but use new calculation
export function getISOWeek(date: Date = new Date()): { week: number; year: number } {
  return getCompetitionWeek(date)
}

/**
 * Find the most recent Friday 5pm EST relative to the given date.
 * This is when the current competition started.
 */
function getMostRecentFriday5pmEST(date: Date = new Date()): Date {
  const result = new Date(date)
  const dayOfWeek = result.getDay() // 0=Sun, 5=Fri
  
  // Calculate days since last Friday
  let daysSinceFriday = (dayOfWeek - 5 + 7) % 7
  if (daysSinceFriday === 0) {
    // It's Friday - check if we're before or after 5pm EST (22:00 UTC)
    const hour = result.getUTCHours()
    if (hour < 22) {
      // Before 5pm EST, still in last week's competition
      daysSinceFriday = 7
    }
  }
  
  result.setDate(result.getDate() - daysSinceFriday)
  result.setUTCHours(22, 0, 0, 0) // 5pm EST = 22:00 UTC
  return result
}

// Generate competition ID from week and year
export function getCompetitionId(week: number, year: number): string {
  return `${year}-W${week.toString().padStart(2, '0')}`
}

/**
 * Get the start date (Friday 5pm EST) for a competition week.
 * Competitions run Friday 5pm → Next Friday 5pm.
 */
export function getWeekStartDate(week: number, year: number): Date {
  // Calculate the Friday of that week
  const startOfYear = new Date(year, 0, 1)
  const dayOfWeekJan1 = startOfYear.getDay()
  
  // Days until first Friday from Jan 1
  const daysToFirstFriday = (5 - dayOfWeekJan1 + 7) % 7
  const firstFriday = new Date(year, 0, 1 + daysToFirstFriday)
  
  // Add (week - 1) * 7 days to get to the target week's Friday
  // But we need to account for the week calculation formula
  const targetFriday = new Date(startOfYear)
  targetFriday.setDate(startOfYear.getDate() + (week - 1) * 7 - dayOfWeekJan1 + 5)
  targetFriday.setUTCHours(22, 0, 0, 0) // 5pm EST = 22:00 UTC
  
  return targetFriday
}

/**
 * Get the end date (Next Friday 5pm EST) for a competition week.
 * Competitions run Friday 5pm → Next Friday 5pm (7 days).
 */
export function getWeekEndDate(week: number, year: number): Date {
  const startDate = getWeekStartDate(week, year)
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 7) // Exactly 7 days later
  return endDate
}

// Check if before deadline
export function isBeforeDeadline(competition: WritingCompetition): boolean {
  return new Date() < new Date(competition.endDate)
}

// Get time remaining in seconds
export function getTimeRemaining(competition: WritingCompetition): number {
  const diff = new Date(competition.endDate).getTime() - Date.now()
  return Math.max(0, Math.floor(diff / 1000))
}

// Count words in text
export function countWords(text: string): number {
  if (!text) return 0
  return text.trim().split(/\s+/).filter(w => w.length > 0).length
}

// Validate word count
export function validateWordCount(text: string): WordCountValidation {
  const count = countWords(text)
  if (count < CONSTANTS.MIN_WORD_COUNT) {
    return { count, isValid: false, message: `${CONSTANTS.MIN_WORD_COUNT - count} more words needed`, status: 'too-short' }
  }
  if (count > CONSTANTS.MAX_WORD_COUNT) {
    return { count, isValid: false, message: `${count - CONSTANTS.MAX_WORD_COUNT} words over limit`, status: 'too-long' }
  }
  return { count, isValid: true, message: `${count} words ✓`, status: 'valid' }
}

// Get the current active competition based on current date
export async function getCurrentCompetition(): Promise<WritingCompetition | null> {
  const db = getDb()
  const now = new Date()
  const nowISO = now.toISOString()
  
  // Primary approach: Query for any competition where current time is within its date range
  // This handles the Friday-to-Friday schedule correctly regardless of ISO week calculations
  try {
    const activeQuery = await db.collection(COLLECTIONS.COMPETITIONS)
      .where('startDate', '<=', nowISO)
      .orderBy('startDate', 'desc')
      .limit(5)
      .get()
    
    for (const doc of activeQuery.docs) {
      const data = doc.data()
      const endDate = new Date(data?.endDate)
      if (now < endDate) {
        return { ...data, id: doc.id } as WritingCompetition
      }
    }
  } catch (error) {
    logger.error('Getcurrentcompetition', 'Error querying by date range', { error: error })
  }
  
  // Fallback: try looking up by current ISO week ID
  const { week, year } = getISOWeek()
  const weekId = getCompetitionId(week, year)
  
  try {
    const weekDoc = await db.collection(COLLECTIONS.COMPETITIONS).doc(weekId).get()
    if (weekDoc.exists) {
      const data = weekDoc.data()
      const endDate = new Date(data?.endDate)
      if (now < endDate) {
        return { ...data, id: weekDoc.id } as WritingCompetition
      }
    }
  } catch (error) {
    logger.error('Getcurrentcompetition', 'Error fetching by week ID', { error: error })
  }
  
  // Last resort: try previous week (in case we're in the overlap period)
  try {
    const prevWeek = week > 1 ? week - 1 : 52
    const prevYear = week > 1 ? year : year - 1
    const prevWeekId = getCompetitionId(prevWeek, prevYear)
    const prevDoc = await db.collection(COLLECTIONS.COMPETITIONS).doc(prevWeekId).get()
    if (prevDoc.exists) {
      const data = prevDoc.data()
      const endDate = new Date(data?.endDate)
      if (now < endDate) {
        return { ...data, id: prevDoc.id } as WritingCompetition
      }
    }
  } catch (error) {
    logger.error('Getcurrentcompetition', 'Error fetching previous week', { error: error })
  }
  
  return null
}

// Create a new competition
export async function createCompetition(prompt: string, category: PromptCategory): Promise<WritingCompetition> {
  const db = getDb()
  const { week, year } = getISOWeek()
  const competitionId = getCompetitionId(week, year)
  const timestamp = createISOTimestamp()
  const competition: WritingCompetition = {
    id: competitionId, weekNumber: week, year, prompt, promptCategory: category,
    startDate: getWeekStartDate(week, year).toISOString(),
    endDate: getWeekEndDate(week, year).toISOString(),
    status: 'active', winnersAnnounced: false, totalSubmissions: 0,
    createdAt: timestamp, updatedAt: timestamp,
  }
  await db.collection(COLLECTIONS.COMPETITIONS).doc(competitionId).set(competition)
  return competition
}

// Update competition status
export async function updateCompetitionStatus(competitionId: string, status: CompetitionStatus): Promise<void> {
  const db = getDb()
  await db.collection(COLLECTIONS.COMPETITIONS).doc(competitionId).update({ status, updatedAt: createISOTimestamp() })
}

// Get user's draft
export async function getUserDraft(userId: string, competitionId: string): Promise<WritingDraft | null> {
  const db = getDb()
  const doc = await db.collection('users').doc(userId).collection(COLLECTIONS.DRAFTS).doc(competitionId).get()
  return doc.exists ? doc.data() as WritingDraft : null
}

// Save user's draft
export async function saveDraft(userId: string, competitionId: string, essay: string, typingTimeIncrement: number = 0): Promise<WritingDraft> {
  const db = getDb()
  const timestamp = createISOTimestamp()
  const draftRef = db.collection('users').doc(userId).collection(COLLECTIONS.DRAFTS).doc(competitionId)
  const existing = await draftRef.get()
  if (existing.exists) {
    const prev = existing.data() as WritingDraft
    const updated: WritingDraft = { ...prev, essay, wordCount: countWords(essay), lastSavedAt: timestamp, totalTypingTime: prev.totalTypingTime + typingTimeIncrement }
    await draftRef.set(updated)
    return updated
  }
  const newDraft: WritingDraft = { competitionId, essay, wordCount: countWords(essay), lastSavedAt: timestamp, totalTypingTime: typingTimeIncrement, startedAt: timestamp }
  await draftRef.set(newDraft)
  return newDraft
}

// Check if user has submitted
export async function hasUserSubmitted(userId: string, competitionId: string): Promise<boolean> {
  const db = getDb()
  const snapshot = await db.collection(COLLECTIONS.SUBMISSIONS).where('userId', '==', userId).where('competitionId', '==', competitionId).limit(1).get()
  return !snapshot.empty
}

// Get user's submission
export async function getUserSubmission(userId: string, competitionId: string): Promise<WritingSubmission | null> {
  const db = getDb()
  const snapshot = await db.collection(COLLECTIONS.SUBMISSIONS).where('userId', '==', userId).where('competitionId', '==', competitionId).limit(1).get()
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  return { id: doc.id, ...doc.data() } as WritingSubmission
}

// Check submission eligibility
export async function checkSubmissionEligibility(userId: string, competition: WritingCompetition, essay: string): Promise<SubmissionEligibility> {
  const wordValidation = validateWordCount(essay)
  const beforeDeadline = isBeforeDeadline(competition)
  const alreadySubmitted = await hasUserSubmitted(userId, competition.id)
  const canSubmit = wordValidation.isValid && beforeDeadline && !alreadySubmitted
  let reason: string | undefined
  if (!wordValidation.isValid) reason = `Word count issue: ${wordValidation.message}`
  else if (!beforeDeadline) reason = 'The submission deadline has passed'
  else if (alreadySubmitted) reason = 'You have already submitted for this competition'
  return { canSubmit, reason, hasValidWordCount: wordValidation.isValid, isBeforeDeadline: beforeDeadline, hasNotAlreadySubmitted: !alreadySubmitted }
}

// Submit an essay
export async function submitEssay(userId: string, userDisplayName: string, gradeLevel: number, competitionId: string, essay: string): Promise<WritingSubmission> {
  const db = getDb()
  const timestamp = createISOTimestamp()
  const submission: Omit<WritingSubmission, 'id'> = { competitionId, userId, userDisplayName, gradeLevel, essay, wordCount: countWords(essay), submittedAt: timestamp, isWinner: false, prizeAwarded: false }
  const docRef = await db.collection(COLLECTIONS.SUBMISSIONS).add(submission)
  // Use atomic increment to prevent race conditions from simultaneous submissions
  await db.collection(COLLECTIONS.COMPETITIONS).doc(competitionId).update({ totalSubmissions: FieldValue.increment(1), updatedAt: timestamp })
  return { id: docRef.id, ...submission }
}

// Get submissions by grade
export async function getSubmissionsByGrade(competitionId: string, gradeLevel: number, limit: number = 50): Promise<WritingSubmission[]> {
  const db = getDb()
  const snapshot = await db.collection(COLLECTIONS.SUBMISSIONS).where('competitionId', '==', competitionId).where('gradeLevel', '==', gradeLevel).orderBy('submittedAt', 'asc').limit(limit).get()
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WritingSubmission))
}

// Get past winners
export async function getPastWinners(gradeLevel?: number, limit: number = 10): Promise<CompetitionWinner[]> {
  const db = getDb()
  let query = db.collection(COLLECTIONS.WINNERS).orderBy('awardedAt', 'desc').limit(limit)
  if (gradeLevel !== undefined) {
    query = db.collection(COLLECTIONS.WINNERS).where('gradeLevel', '==', gradeLevel).orderBy('awardedAt', 'desc').limit(limit)
  }
  const snapshot = await query.get()
  return snapshot.docs.map(doc => doc.data() as CompetitionWinner)
}

// Award prize to winner
export async function awardPrize(submission: WritingSubmission, competition: WritingCompetition): Promise<void> {
  const db = getDb()
  const timestamp = createISOTimestamp()
  await addCredits(submission.userId, CONSTANTS.PRIZE_AMOUNT_CENTS, { source: 'writing_competition', competitionId: competition.id, reason: `Weekly Writing Competition Winner - Grade ${submission.gradeLevel}` })
  await db.collection(COLLECTIONS.SUBMISSIONS).doc(submission.id).update({ prizeAwarded: true, prizeAwardedAt: timestamp, prizeAmountCents: CONSTANTS.PRIZE_AMOUNT_CENTS })
  const winner: CompetitionWinner = { competitionId: competition.id, weekNumber: competition.weekNumber, year: competition.year, userId: submission.userId, displayName: submission.userDisplayName, gradeLevel: submission.gradeLevel, essayExcerpt: submission.essay.slice(0, 50) + '...', promptExcerpt: competition.prompt.slice(0, 50) + '...', awardedAt: timestamp }
  await db.collection(COLLECTIONS.WINNERS).add(winner)
}

// Get user's grade level from reading progress
export async function getUserGradeLevel(userId: string): Promise<number> {
  const db = getDb()
  const progressDoc = await db.collection('userBasicsProgress').doc(userId).get()
  if (!progressDoc.exists) return 5
  return Math.floor(progressDoc.data()?.reading?.currentDifficulty || 5)
}
