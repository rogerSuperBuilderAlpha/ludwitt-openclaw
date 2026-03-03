/**
 * Constants for the Avatar Onboarding flow
 */

export const REGIONS = [
  { id: 'Trinidad and Tobago', name: 'Trinidad & Tobago', flag: '\u{1F1F9}\u{1F1F9}' },
  { id: 'United States', name: 'United States', flag: '\u{1F1FA}\u{1F1F8}' },
  { id: 'United Kingdom', name: 'United Kingdom', flag: '\u{1F1EC}\u{1F1E7}' },
  { id: 'Canada', name: 'Canada', flag: '\u{1F1E8}\u{1F1E6}' },
  { id: 'India', name: 'India', flag: '\u{1F1EE}\u{1F1F3}' },
  { id: 'Nigeria', name: 'Nigeria', flag: '\u{1F1F3}\u{1F1EC}' },
  { id: 'Jamaica', name: 'Jamaica', flag: '\u{1F1EF}\u{1F1F2}' },
  { id: 'Barbados', name: 'Barbados', flag: '\u{1F1E7}\u{1F1E7}' },
  { id: 'Australia', name: 'Australia', flag: '\u{1F1E6}\u{1F1FA}' },
  { id: 'South Africa', name: 'South Africa', flag: '\u{1F1FF}\u{1F1E6}' },
  { id: 'Brazil', name: 'Brazil', flag: '\u{1F1E7}\u{1F1F7}' },
  { id: 'Mexico', name: 'Mexico', flag: '\u{1F1F2}\u{1F1FD}' },
  { id: 'Other', name: 'Other', flag: '\u{1F3F4}' },
] as const

export type Step = 'birthdate' | 'region' | 'avatar-type' | 'avatar-pick' | 'nickname' | 'review'

export const MAX_AUTO_RETRIES = 3
export const RETRY_DELAY_MS = 1000
export const MAX_NICKNAME_LENGTH = 20
