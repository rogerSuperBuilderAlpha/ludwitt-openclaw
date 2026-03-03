jest.mock('@/lib/firebase/admin', () => ({ db: {} }))
jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}))

import {
  formatDisplayName,
  formatUserDisplayInfo,
  calculateAccuracy,
  generateBadge,
  sortByPointsThenAccuracy,
  sortByPointsThenCorrect,
} from '../user-helpers'

describe('user-helpers (pure functions)', () => {
  // =========================================================================
  // formatDisplayName
  // =========================================================================
  describe('formatDisplayName', () => {
    it('returns displayName when available', () => {
      const profile = { displayName: 'Alice Smith', email: 'alice@example.com' }
      expect(formatDisplayName(profile, 'user-abc-123')).toBe('Alice Smith')
    })

    it('falls back to email prefix when displayName is missing', () => {
      const profile = { email: 'bob@example.com' }
      expect(formatDisplayName(profile, 'user-abc-123')).toBe('bob')
    })

    it('falls back to truncated userId when both are missing', () => {
      const profile = {}
      expect(formatDisplayName(profile, 'abcdefghijklmnop')).toBe(
        'User abcdefgh'
      )
    })

    it('falls back to truncated userId for null profile', () => {
      expect(formatDisplayName(null, 'abcdefghijklmnop')).toBe('User abcdefgh')
    })

    it('falls back to truncated userId for undefined profile', () => {
      expect(formatDisplayName(undefined, 'abcdefghijklmnop')).toBe(
        'User abcdefgh'
      )
    })

    it('uses displayName even if empty string (falsy)', () => {
      // empty string is falsy, so should fall through
      const profile = { displayName: '', email: 'test@example.com' }
      expect(formatDisplayName(profile, 'user123')).toBe('test')
    })

    it('handles short userId', () => {
      expect(formatDisplayName(null, 'ab')).toBe('User ab')
    })
  })

  // =========================================================================
  // calculateAccuracy
  // =========================================================================
  describe('calculateAccuracy', () => {
    it('returns 0 when attempted is 0', () => {
      expect(calculateAccuracy(0, 0)).toBe(0)
    })

    it('returns 100 for perfect score', () => {
      expect(calculateAccuracy(10, 10)).toBe(100)
    })

    it('returns 50 for half correct', () => {
      expect(calculateAccuracy(5, 10)).toBe(50)
    })

    it('rounds to nearest integer', () => {
      expect(calculateAccuracy(1, 3)).toBe(33) // 33.33... -> 33
    })

    it('handles large numbers', () => {
      expect(calculateAccuracy(999, 1000)).toBe(100) // 99.9 -> 100
    })

    it('returns 0 when correct is 0 but attempted is positive', () => {
      expect(calculateAccuracy(0, 10)).toBe(0)
    })
  })

  // =========================================================================
  // generateBadge
  // =========================================================================
  describe('generateBadge', () => {
    it('returns fire emoji for streak >= 30', () => {
      expect(generateBadge(30, 50, 0)).toBe('\uD83D\uDD25') // fire
    })

    it('returns star emoji for streak >= 14', () => {
      expect(generateBadge(14, 50, 0)).toBe('\u2B50') // star
    })

    it('returns target emoji for accuracy >= 90', () => {
      expect(generateBadge(5, 90, 0)).toBe('\uD83C\uDFAF') // target
    })

    it('returns trophy emoji for points >= 10000', () => {
      expect(generateBadge(5, 80, 10000)).toBe('\uD83C\uDFC6') // trophy
    })

    it('returns flexed bicep for streak >= 7', () => {
      expect(generateBadge(7, 50, 0)).toBe('\uD83D\uDCAA') // flexed bicep
    })

    it('returns default star for no special conditions', () => {
      expect(generateBadge(0, 0, 0)).toBe('\uD83C\uDF1F') // glowing star
    })

    it('prioritizes streak >= 30 over all other conditions', () => {
      // Even with high accuracy and points
      expect(generateBadge(30, 95, 20000)).toBe('\uD83D\uDD25')
    })

    it('prioritizes streak >= 14 over accuracy and points', () => {
      expect(generateBadge(14, 95, 20000)).toBe('\u2B50')
    })

    it('prioritizes accuracy >= 90 over points >= 10000', () => {
      expect(generateBadge(5, 95, 20000)).toBe('\uD83C\uDFAF')
    })
  })

  // =========================================================================
  // formatUserDisplayInfo
  // =========================================================================
  describe('formatUserDisplayInfo', () => {
    const userId = 'user-abc-12345678'

    it('uses formatDisplayName fallback when no avatar', () => {
      const result = formatUserDisplayInfo({ displayName: 'Alice' }, userId)
      expect(result.displayName).toBe('Alice')
      expect(result.photoURL).toBeUndefined()
      expect(result.characterId).toBeUndefined()
    })

    it('uses formatDisplayName when avatar is not completed', () => {
      const userData = {
        displayName: 'Bob',
        avatar: { isCompleted: false, type: 'photo' },
      }
      const result = formatUserDisplayInfo(userData, userId)
      expect(result.displayName).toBe('Bob')
    })

    it('returns photo avatar info when avatar type is photo', () => {
      const userData = {
        displayName: 'Charlie',
        avatar: {
          isCompleted: true,
          type: 'photo',
          photoURL: 'https://example.com/photo.jpg',
          displayName: 'CharlieAvatar',
        },
      }
      const result = formatUserDisplayInfo(userData, userId)
      expect(result.displayName).toBe('CharlieAvatar')
      expect(result.photoURL).toBe('https://example.com/photo.jpg')
      expect(result.characterId).toBeUndefined()
    })

    it('falls back through display name chain for photo avatar', () => {
      const userData = {
        displayName: 'FallbackName',
        email: 'fallback@example.com',
        avatar: {
          isCompleted: true,
          type: 'photo',
          photoURL: 'https://example.com/photo.jpg',
          // No avatar.displayName
        },
      }
      const result = formatUserDisplayInfo(userData, userId)
      expect(result.displayName).toBe('FallbackName')
    })

    it('returns character avatar info when avatar type is character', () => {
      const userData = {
        avatar: {
          isCompleted: true,
          type: 'character',
          characterId: 'char-001',
          nickname: 'StarStudent',
        },
      }
      const result = formatUserDisplayInfo(userData, userId)
      expect(result.displayName).toBe('StarStudent')
      expect(result.photoURL).toBeUndefined()
      expect(result.characterId).toBe('char-001')
    })

    it('falls back to truncated userId for character without nickname', () => {
      const userData = {
        avatar: {
          isCompleted: true,
          type: 'character',
          characterId: 'char-002',
        },
      }
      const result = formatUserDisplayInfo(userData, userId)
      expect(result.displayName).toContain('Student')
      expect(result.characterId).toBe('char-002')
    })

    it('returns fallback for null userData', () => {
      const result = formatUserDisplayInfo(null, userId)
      expect(result.displayName).toBe(`User ${userId.slice(0, 8)}`)
    })

    it('returns fallback for undefined userData', () => {
      const result = formatUserDisplayInfo(undefined, userId)
      expect(result.displayName).toBe(`User ${userId.slice(0, 8)}`)
    })

    it('uses photoURL from userData when no avatar', () => {
      const userData = {
        displayName: 'Eve',
        photoURL: 'https://example.com/eve.jpg',
      }
      const result = formatUserDisplayInfo(userData, userId)
      expect(result.photoURL).toBe('https://example.com/eve.jpg')
    })

    it('falls back when photo avatar has no photoURL', () => {
      const userData = {
        displayName: 'Fallback',
        photoURL: 'https://example.com/fallback.jpg',
        avatar: {
          isCompleted: true,
          type: 'photo',
          // No photoURL on avatar
        },
      }
      const result = formatUserDisplayInfo(userData, userId)
      // Should fall through to the fallback block
      expect(result.displayName).toBe('Fallback')
      expect(result.photoURL).toBe('https://example.com/fallback.jpg')
    })
  })

  // =========================================================================
  // sortByPointsThenAccuracy
  // =========================================================================
  describe('sortByPointsThenAccuracy', () => {
    it('sorts by points descending', () => {
      const entries = [
        { points: 100, accuracy: 80 },
        { points: 300, accuracy: 70 },
        { points: 200, accuracy: 90 },
      ]
      const sorted = sortByPointsThenAccuracy(entries)
      expect(sorted[0].points).toBe(300)
      expect(sorted[1].points).toBe(200)
      expect(sorted[2].points).toBe(100)
    })

    it('uses accuracy as tiebreaker when points are equal', () => {
      const entries = [
        { points: 100, accuracy: 70 },
        { points: 100, accuracy: 90 },
        { points: 100, accuracy: 80 },
      ]
      const sorted = sortByPointsThenAccuracy(entries)
      expect(sorted[0].accuracy).toBe(90)
      expect(sorted[1].accuracy).toBe(80)
      expect(sorted[2].accuracy).toBe(70)
    })

    it('treats undefined accuracy as 0', () => {
      const entries = [{ points: 100 }, { points: 100, accuracy: 50 }]
      const sorted = sortByPointsThenAccuracy(entries)
      expect(sorted[0].accuracy).toBe(50)
      expect(sorted[1].accuracy).toBeUndefined()
    })

    it('does not mutate the original array', () => {
      const entries = [
        { points: 50, accuracy: 80 },
        { points: 100, accuracy: 90 },
      ]
      const original = [...entries]
      sortByPointsThenAccuracy(entries)
      expect(entries[0]).toEqual(original[0])
      expect(entries[1]).toEqual(original[1])
    })

    it('handles an empty array', () => {
      expect(sortByPointsThenAccuracy([])).toEqual([])
    })

    it('handles a single entry', () => {
      const entries = [{ points: 100, accuracy: 80 }]
      const sorted = sortByPointsThenAccuracy(entries)
      expect(sorted).toHaveLength(1)
      expect(sorted[0].points).toBe(100)
    })
  })

  // =========================================================================
  // sortByPointsThenCorrect
  // =========================================================================
  describe('sortByPointsThenCorrect', () => {
    it('sorts by points descending', () => {
      const entries = [
        { points: 50, correctAnswers: 10 },
        { points: 150, correctAnswers: 5 },
        { points: 100, correctAnswers: 8 },
      ]
      const sorted = sortByPointsThenCorrect(entries)
      expect(sorted[0].points).toBe(150)
      expect(sorted[1].points).toBe(100)
      expect(sorted[2].points).toBe(50)
    })

    it('uses correctAnswers as tiebreaker', () => {
      const entries = [
        { points: 100, correctAnswers: 5 },
        { points: 100, correctAnswers: 15 },
        { points: 100, correctAnswers: 10 },
      ]
      const sorted = sortByPointsThenCorrect(entries)
      expect(sorted[0].correctAnswers).toBe(15)
      expect(sorted[1].correctAnswers).toBe(10)
      expect(sorted[2].correctAnswers).toBe(5)
    })

    it('falls back to problemsCorrect when correctAnswers is undefined', () => {
      const entries = [
        { points: 100, problemsCorrect: 5 },
        { points: 100, problemsCorrect: 15 },
      ]
      const sorted = sortByPointsThenCorrect(entries)
      expect(sorted[0].problemsCorrect).toBe(15)
      expect(sorted[1].problemsCorrect).toBe(5)
    })

    it('treats undefined correctAnswers and problemsCorrect as 0', () => {
      const entries = [{ points: 100 }, { points: 100, correctAnswers: 10 }]
      const sorted = sortByPointsThenCorrect(entries)
      expect(sorted[0].correctAnswers).toBe(10)
      expect(sorted[1].correctAnswers).toBeUndefined()
    })

    it('does not mutate the original array', () => {
      const entries = [
        { points: 50, correctAnswers: 10 },
        { points: 100, correctAnswers: 5 },
      ]
      const original = [...entries]
      sortByPointsThenCorrect(entries)
      expect(entries[0]).toEqual(original[0])
      expect(entries[1]).toEqual(original[1])
    })

    it('handles an empty array', () => {
      expect(sortByPointsThenCorrect([])).toEqual([])
    })

    it('prefers correctAnswers over problemsCorrect when both exist', () => {
      const entries = [
        { points: 100, correctAnswers: 20, problemsCorrect: 5 },
        { points: 100, correctAnswers: 10, problemsCorrect: 50 },
      ]
      const sorted = sortByPointsThenCorrect(entries)
      // correctAnswers takes precedence due to ?? chain
      expect(sorted[0].correctAnswers).toBe(20)
      expect(sorted[1].correctAnswers).toBe(10)
    })
  })
})
