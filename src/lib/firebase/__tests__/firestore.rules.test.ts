/**
 * Firestore Security Rules Unit Tests
 * 
 * Tests the security rules defined in firestore.rules
 * 
 * PREREQUISITES:
 * 1. Java must be installed (required by Firebase emulator)
 * 2. Start the Firestore emulator: npx firebase emulators:start --only firestore
 * 3. Run tests: npm test -- firestore.rules.test
 * 
 * Or run both together:
 * npx firebase emulators:exec --only firestore "npm test -- firestore.rules.test"
 * 
 * @jest-environment node
 */

// Unmock Firebase modules for rules testing (they're mocked in jest.setup.js)
jest.unmock('firebase/app')
jest.unmock('firebase/firestore')
jest.unmock('firebase/auth')

import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import * as fs from 'fs'
import * as path from 'path'

let testEnv: RulesTestEnvironment | null = null

const PROJECT_ID = 'pitch-rise-test'
const USER_A_ID = 'userA123'
const USER_B_ID = 'userB456'

// Check if emulator is available before running tests
const checkEmulatorAvailability = async (): Promise<boolean> => {
  try {
    const rulesPath = path.join(process.cwd(), 'firestore.rules')
    const rules = fs.readFileSync(rulesPath, 'utf8')
    
    // Use FIRESTORE_EMULATOR_HOST if set, otherwise default to localhost:8080
    const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST || 'localhost:8080'
    const [host, portStr] = emulatorHost.split(':')
    const port = parseInt(portStr, 10) || 8080
    
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules,
        host,
        port,
      },
    })
    return true
  } catch (error) {
    console.error('Emulator connection error:', error)
    return false
  }
}

// Helper to get authenticated Firestore instance
function getAuthenticatedFirestore(userId: string) {
  if (!testEnv) throw new Error('Test environment not initialized')
  return testEnv.authenticatedContext(userId).firestore()
}

// Helper to get unauthenticated Firestore instance
function getUnauthenticatedFirestore() {
  if (!testEnv) throw new Error('Test environment not initialized')
  return testEnv.unauthenticatedContext().firestore()
}

// Helper to run with security rules disabled
async function withSecurityRulesDisabled(fn: (firestore: ReturnType<typeof getAuthenticatedFirestore>) => Promise<void>) {
  if (!testEnv) throw new Error('Test environment not initialized')
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await fn(context.firestore() as ReturnType<typeof getAuthenticatedFirestore>)
  })
}

describe('Firestore Security Rules', () => {
  let isEmulatorAvailable = false

  beforeAll(async () => {
    isEmulatorAvailable = await checkEmulatorAvailability()
    if (!isEmulatorAvailable) {
      console.warn('\n⚠️  Firebase emulator not available. Tests will be skipped.')
      console.warn('   To run these tests:')
      console.warn('   1. Install Java: brew install openjdk')
      console.warn('   2. Start emulator: npx firebase emulators:start --only firestore')
      console.warn('   3. Run tests: npm test -- firestore.rules.test\n')
    }
  })

  afterAll(async () => {
    if (testEnv) {
      await testEnv.cleanup()
    }
  })

  beforeEach(async () => {
    if (testEnv) {
      await testEnv.clearFirestore()
    }
  })

  // ==========================================================================
  // UNAUTHENTICATED ACCESS
  // ==========================================================================
  describe('Unauthenticated Access', () => {
    it('should deny unauthenticated read to any collection', async () => {
      if (!isEmulatorAvailable) return
      const db = getUnauthenticatedFirestore()
      await assertFails(getDoc(doc(db, 'users', USER_A_ID)))
    })

    it('should deny unauthenticated write to any collection', async () => {
      if (!isEmulatorAvailable) return
      const db = getUnauthenticatedFirestore()
      await assertFails(setDoc(doc(db, 'users', USER_A_ID), { name: 'Test' }))
    })
  })

  // ==========================================================================
  // USER PROGRESS COLLECTIONS (Owner-only)
  // ==========================================================================
  describe('User Progress Collections', () => {
    const ownerOnlyCollections = [
      'cursorSetupProgress',
      'personalWebsiteProgress',
      'vercelDeploymentProgress',
      'loomVideoProgress',
      'localSiteVerifications',
      'userVisions',
      'surveyProgress',
      'basics-progress',
    ]

    ownerOnlyCollections.forEach((collectionName) => {
      describe(`${collectionName}`, () => {
        it('should allow owner to read their own document', async () => {
          if (!isEmulatorAvailable) return
          const db = getAuthenticatedFirestore(USER_A_ID)
          await withSecurityRulesDisabled(async (adminDb) => {
            await setDoc(doc(adminDb, collectionName, USER_A_ID), { test: true })
          })
          await assertSucceeds(getDoc(doc(db, collectionName, USER_A_ID)))
        })

        it('should allow owner to write their own document', async () => {
          if (!isEmulatorAvailable) return
          const db = getAuthenticatedFirestore(USER_A_ID)
          await assertSucceeds(setDoc(doc(db, collectionName, USER_A_ID), { test: true }))
        })

        it('should deny reading another user\'s document', async () => {
          if (!isEmulatorAvailable) return
          const db = getAuthenticatedFirestore(USER_A_ID)
          await withSecurityRulesDisabled(async (adminDb) => {
            await setDoc(doc(adminDb, collectionName, USER_B_ID), { test: true })
          })
          await assertFails(getDoc(doc(db, collectionName, USER_B_ID)))
        })

        it('should deny writing to another user\'s document', async () => {
          if (!isEmulatorAvailable) return
          const db = getAuthenticatedFirestore(USER_A_ID)
          await assertFails(setDoc(doc(db, collectionName, USER_B_ID), { test: true }))
        })
      })
    })
  })

  // ==========================================================================
  // userBasicsProgress - CRITICAL: Test the userId_math/userId_reading fix
  // ==========================================================================
  describe('userBasicsProgress (with suffix support)', () => {
    it('should allow reading document with just userId', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'userBasicsProgress', USER_A_ID), { test: true })
      })
      await assertSucceeds(getDoc(doc(db, 'userBasicsProgress', USER_A_ID)))
    })

    it('should allow reading document with userId_math suffix', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      const docId = `${USER_A_ID}_math`
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'userBasicsProgress', docId), { subject: 'math' })
      })
      await assertSucceeds(getDoc(doc(db, 'userBasicsProgress', docId)))
    })

    it('should allow reading document with userId_reading suffix', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      const docId = `${USER_A_ID}_reading`
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'userBasicsProgress', docId), { subject: 'reading' })
      })
      await assertSucceeds(getDoc(doc(db, 'userBasicsProgress', docId)))
    })

    it('should allow writing document with userId_math suffix', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      const docId = `${USER_A_ID}_math`
      await assertSucceeds(setDoc(doc(db, 'userBasicsProgress', docId), { subject: 'math' }))
    })

    it('should deny reading another user\'s math progress', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      const docId = `${USER_B_ID}_math`
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'userBasicsProgress', docId), { subject: 'math' })
      })
      await assertFails(getDoc(doc(db, 'userBasicsProgress', docId)))
    })

    it('should deny writing to another user\'s reading progress', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      const docId = `${USER_B_ID}_reading`
      await assertFails(setDoc(doc(db, 'userBasicsProgress', docId), { subject: 'reading' }))
    })
  })

  // ==========================================================================
  // USERS COLLECTION
  // ==========================================================================
  describe('users collection', () => {
    it('should allow authenticated user to read any user', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'users', USER_B_ID), { name: 'User B' })
      })
      await assertSucceeds(getDoc(doc(db, 'users', USER_B_ID)))
    })

    it('should allow owner to write their own user doc', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertSucceeds(setDoc(doc(db, 'users', USER_A_ID), { name: 'User A' }))
    })

    it('should deny writing to another user\'s doc', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertFails(setDoc(doc(db, 'users', USER_B_ID), { name: 'Hacked' }))
    })
  })

  // ==========================================================================
  // USER PROFILES (Auth read, owner write)
  // ==========================================================================
  describe('userProfiles', () => {
    it('should allow any authenticated user to read profiles', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'userProfiles', USER_B_ID), { bio: 'Test' })
      })
      await assertSucceeds(getDoc(doc(db, 'userProfiles', USER_B_ID)))
    })

    it('should allow owner to write their profile', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertSucceeds(setDoc(doc(db, 'userProfiles', USER_A_ID), { bio: 'My bio' }))
    })

    it('should deny writing to another user\'s profile', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertFails(setDoc(doc(db, 'userProfiles', USER_B_ID), { bio: 'Hacked' }))
    })
  })

  // ==========================================================================
  // VOICE NOTES (Owner only with userId field check)
  // ==========================================================================
  describe('voiceNotes', () => {
    it('should allow owner to read their recording', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'voiceNotes', 'recording1'), { userId: USER_A_ID })
      })
      await assertSucceeds(getDoc(doc(db, 'voiceNotes', 'recording1')))
    })

    it('should deny reading another user\'s recording', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'voiceNotes', 'recording2'), { userId: USER_B_ID })
      })
      await assertFails(getDoc(doc(db, 'voiceNotes', 'recording2')))
    })

    it('should allow creating recording with own userId', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertSucceeds(setDoc(doc(db, 'voiceNotes', 'newRecording'), { 
        userId: USER_A_ID, 
        title: 'Test' 
      }))
    })

    it('should deny creating recording with another userId', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertFails(setDoc(doc(db, 'voiceNotes', 'newRecording'), { 
        userId: USER_B_ID, 
        title: 'Spoofed' 
      }))
    })
  })

  // ==========================================================================
  // DAILY CHALLENGES (userId_date format)
  // ==========================================================================
  describe('dailyChallenges', () => {
    it('should allow reading own challenge', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      const docId = `${USER_A_ID}_2025-01-01`
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'dailyChallenges', docId), { completed: false })
      })
      await assertSucceeds(getDoc(doc(db, 'dailyChallenges', docId)))
    })

    it('should allow writing own challenge', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      const docId = `${USER_A_ID}_2025-01-01`
      await assertSucceeds(setDoc(doc(db, 'dailyChallenges', docId), { completed: true }))
    })

    it('should deny reading another user\'s challenge', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      const docId = `${USER_B_ID}_2025-01-01`
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'dailyChallenges', docId), { completed: false })
      })
      await assertFails(getDoc(doc(db, 'dailyChallenges', docId)))
    })
  })

  // ==========================================================================
  // STUDY ROOMS
  // ==========================================================================
  describe('studyRooms', () => {
    it('should allow any authenticated user to read rooms', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'studyRooms', 'room1'), { 
          creatorId: USER_B_ID, 
          name: 'Study Room' 
        })
      })
      await assertSucceeds(getDoc(doc(db, 'studyRooms', 'room1')))
    })

    it('should allow creating room with own creatorId', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertSucceeds(setDoc(doc(db, 'studyRooms', 'newRoom'), { 
        creatorId: USER_A_ID, 
        name: 'My Room',
        currentParticipants: 1
      }))
    })

    it('should deny creating room with another creatorId', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertFails(setDoc(doc(db, 'studyRooms', 'newRoom'), { 
        creatorId: USER_B_ID, 
        name: 'Fake Room' 
      }))
    })

    it('should allow creator to delete their room', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'studyRooms', 'myRoom'), { 
          creatorId: USER_A_ID, 
          name: 'My Room' 
        })
      })
      await assertSucceeds(deleteDoc(doc(db, 'studyRooms', 'myRoom')))
    })

    it('should deny non-creator from deleting room', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'studyRooms', 'otherRoom'), { 
          creatorId: USER_B_ID, 
          name: 'Other Room' 
        })
      })
      await assertFails(deleteDoc(doc(db, 'studyRooms', 'otherRoom')))
    })
  })

  // ==========================================================================
  // ROOM PARTICIPANTS (roomId_userId format)
  // ==========================================================================
  describe('roomParticipants', () => {
    it('should allow user to create their own participant doc', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      const docId = `room1_${USER_A_ID}`
      await assertSucceeds(setDoc(doc(db, 'roomParticipants', docId), { 
        joinedAt: new Date() 
      }))
    })

    it('should deny creating participant doc for another user', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      const docId = `room1_${USER_B_ID}`
      await assertFails(setDoc(doc(db, 'roomParticipants', docId), { 
        joinedAt: new Date() 
      }))
    })
  })

  // ==========================================================================
  // MESSAGES (sender/recipient check)
  // ==========================================================================
  describe('messages', () => {
    it('should allow sender to read their sent message', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'messages', 'msg1'), { 
          senderId: USER_A_ID, 
          recipientId: USER_B_ID,
          text: 'Hello' 
        })
      })
      await assertSucceeds(getDoc(doc(db, 'messages', 'msg1')))
    })

    it('should allow recipient to read message sent to them', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_B_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'messages', 'msg2'), { 
          senderId: USER_A_ID, 
          recipientId: USER_B_ID,
          text: 'Hello' 
        })
      })
      await assertSucceeds(getDoc(doc(db, 'messages', 'msg2')))
    })

    it('should deny third party from reading messages', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore('userC789')
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'messages', 'msg3'), { 
          senderId: USER_A_ID, 
          recipientId: USER_B_ID,
          text: 'Private' 
        })
      })
      await assertFails(getDoc(doc(db, 'messages', 'msg3')))
    })

    it('should allow creating message with own senderId', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertSucceeds(setDoc(doc(db, 'messages', 'newMsg'), { 
        senderId: USER_A_ID, 
        recipientId: USER_B_ID,
        text: 'Hi!' 
      }))
    })

    it('should deny creating message with spoofed senderId', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertFails(setDoc(doc(db, 'messages', 'fakeMsg'), { 
        senderId: USER_B_ID,  // Spoofing as USER_B
        recipientId: 'someone',
        text: 'Fake' 
      }))
    })
  })

  // ==========================================================================
  // NOTIFICATIONS
  // ==========================================================================
  describe('notifications', () => {
    it('should allow user to read their own notifications', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'notifications', 'notif1'), { 
          userId: USER_A_ID, 
          message: 'Test' 
        })
      })
      await assertSucceeds(getDoc(doc(db, 'notifications', 'notif1')))
    })

    it('should deny reading another user\'s notifications', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'notifications', 'notif2'), { 
          userId: USER_B_ID, 
          message: 'Private' 
        })
      })
      await assertFails(getDoc(doc(db, 'notifications', 'notif2')))
    })

    it('should allow any authenticated user to create notifications', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertSucceeds(setDoc(doc(db, 'notifications', 'newNotif'), { 
        userId: USER_B_ID, 
        message: 'You have a new follower' 
      }))
    })
  })

  // ==========================================================================
  // BACKEND-ONLY COLLECTIONS (should deny client writes)
  // ==========================================================================
  describe('Backend-only collections', () => {
    const backendOnlyCollections = [
      'verificationCodeLookup',
      'mathProblemsCache',
      'readingExercisesCache',
      'basicsLeaderboard',
      'cohortCreators',
      'cohortMentorAssignments',
      'learningModules',
      'meetingBots',
    ]

    backendOnlyCollections.forEach((collectionName) => {
      it(`should deny client write to ${collectionName}`, async () => {
        if (!isEmulatorAvailable) return
        const db = getAuthenticatedFirestore(USER_A_ID)
        await assertFails(setDoc(doc(db, collectionName, 'test'), { data: 'test' }))
      })
    })
  })

  // ==========================================================================
  // SUBSCRIPTIONS (owner read only, backend write)
  // ==========================================================================
  describe('userSubscriptions', () => {
    it('should allow owner to read their subscription', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'userSubscriptions', USER_A_ID), { 
          status: 'active',
          plan: 'pro'
        })
      })
      await assertSucceeds(getDoc(doc(db, 'userSubscriptions', USER_A_ID)))
    })

    it('should deny reading another user\'s subscription', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'userSubscriptions', USER_B_ID), { 
          status: 'active',
          plan: 'pro'
        })
      })
      await assertFails(getDoc(doc(db, 'userSubscriptions', USER_B_ID)))
    })

    it('should deny client write to subscriptions', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertFails(setDoc(doc(db, 'userSubscriptions', USER_A_ID), { 
        status: 'active',
        plan: 'enterprise' // Trying to upgrade themselves
      }))
    })
  })

  // ==========================================================================
  // API KEYS (owner only)
  // ==========================================================================
  describe('apiKeys', () => {
    it('should allow owner to read their API key', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'apiKeys', 'key1'), { 
          userId: USER_A_ID,
          key: 'xxx'
        })
      })
      await assertSucceeds(getDoc(doc(db, 'apiKeys', 'key1')))
    })

    it('should deny reading another user\'s API key', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'apiKeys', 'key2'), { 
          userId: USER_B_ID,
          key: 'secret'
        })
      })
      await assertFails(getDoc(doc(db, 'apiKeys', 'key2')))
    })

    it('should allow creating API key with own userId', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertSucceeds(setDoc(doc(db, 'apiKeys', 'newKey'), { 
        userId: USER_A_ID,
        key: 'mykey'
      }))
    })

    it('should deny creating API key with another userId', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertFails(setDoc(doc(db, 'apiKeys', 'fakeKey'), { 
        userId: USER_B_ID,
        key: 'stolen'
      }))
    })
  })

  // ==========================================================================
  // COHORTS
  // ==========================================================================
  describe('cohorts', () => {
    it('should allow any authenticated user to read cohorts', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'cohorts', 'cohort1'), { 
          creatorId: USER_B_ID,
          name: 'Study Group'
        })
      })
      await assertSucceeds(getDoc(doc(db, 'cohorts', 'cohort1')))
    })

    it('should allow creating cohort with own creatorId', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await assertSucceeds(setDoc(doc(db, 'cohorts', 'myCohort'), { 
        creatorId: USER_A_ID,
        name: 'My Cohort',
        currentSize: 1
      }))
    })

    it('should allow creator to update their cohort', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      await withSecurityRulesDisabled(async (adminDb) => {
        await setDoc(doc(adminDb, 'cohorts', 'myCohort'), { 
          creatorId: USER_A_ID,
          name: 'My Cohort'
        })
      })
      await assertSucceeds(updateDoc(doc(db, 'cohorts', 'myCohort'), { 
        name: 'Updated Name'
      }))
    })
  })

  // ==========================================================================
  // STUDENT PROGRESS (cohortId_userId format)
  // ==========================================================================
  describe('studentProgress', () => {
    it('should allow user to write their own progress', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      const docId = `cohort1_${USER_A_ID}`
      await assertSucceeds(setDoc(doc(db, 'studentProgress', docId), { 
        progress: 50 
      }))
    })

    it('should deny writing another user\'s progress', async () => {
      if (!isEmulatorAvailable) return
      const db = getAuthenticatedFirestore(USER_A_ID)
      const docId = `cohort1_${USER_B_ID}`
      await assertFails(setDoc(doc(db, 'studentProgress', docId), { 
        progress: 100 
      }))
    })
  })
})
