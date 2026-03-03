/**
 * Default/mock data for Learning Trends components.
 * In production, this would be fetched from the API.
 */

import type { SkillTrend, HistoricalDataPoint } from './types'

export const DEFAULT_TRENDS: SkillTrend[] = [
  {
    skillId: 'algebra-equations',
    skillName: 'Algebraic Equations',
    subject: 'math',
    dataPoints: [
      { date: '2026-01-03', accuracy: 0.65, problemCount: 5 },
      { date: '2026-01-04', accuracy: 0.72, problemCount: 8 },
      { date: '2026-01-05', accuracy: 0.75, problemCount: 6 },
      { date: '2026-01-06', accuracy: 0.80, problemCount: 10 },
    ],
    currentAccuracy: 0.80,
    previousAccuracy: 0.65,
    trend: 'improving',
    totalAttempts: 29,
    masteryLevel: 'proficient'
  },
  {
    skillId: 'reading-inference',
    skillName: 'Making Inferences',
    subject: 'reading',
    dataPoints: [
      { date: '2026-01-03', accuracy: 0.55, problemCount: 4 },
      { date: '2026-01-04', accuracy: 0.60, problemCount: 5 },
      { date: '2026-01-05', accuracy: 0.62, problemCount: 4 },
      { date: '2026-01-06', accuracy: 0.65, problemCount: 6 },
    ],
    currentAccuracy: 0.65,
    previousAccuracy: 0.55,
    trend: 'improving',
    totalAttempts: 19,
    masteryLevel: 'learning'
  },
  {
    skillId: 'latin-conjugation',
    skillName: 'Verb Conjugation',
    subject: 'latin',
    dataPoints: [
      { date: '2026-01-03', accuracy: 0.40, problemCount: 3 },
      { date: '2026-01-04', accuracy: 0.45, problemCount: 4 },
      { date: '2026-01-05', accuracy: 0.50, problemCount: 5 },
      { date: '2026-01-06', accuracy: 0.55, problemCount: 4 },
    ],
    currentAccuracy: 0.55,
    previousAccuracy: 0.40,
    trend: 'improving',
    totalAttempts: 16,
    masteryLevel: 'learning'
  }
]

export const DEFAULT_HISTORICAL_DATA: HistoricalDataPoint[] = [
  { date: '2025-12-15', accuracy: 0.55, problemCount: 12, xpEarned: 120 },
  { date: '2025-12-18', accuracy: 0.58, problemCount: 15, xpEarned: 150 },
  { date: '2025-12-21', accuracy: 0.60, problemCount: 18, xpEarned: 180 },
  { date: '2025-12-24', accuracy: 0.62, problemCount: 14, xpEarned: 140 },
  { date: '2025-12-27', accuracy: 0.65, problemCount: 20, xpEarned: 200 },
  { date: '2025-12-30', accuracy: 0.63, problemCount: 10, xpEarned: 100 },
  { date: '2026-01-02', accuracy: 0.68, problemCount: 22, xpEarned: 220 },
  { date: '2026-01-04', accuracy: 0.70, problemCount: 18, xpEarned: 180 },
  { date: '2026-01-06', accuracy: 0.72, problemCount: 25, xpEarned: 250 },
  { date: '2026-01-08', accuracy: 0.71, problemCount: 15, xpEarned: 150 },
  { date: '2026-01-10', accuracy: 0.74, problemCount: 20, xpEarned: 200 },
  { date: '2026-01-11', accuracy: 0.76, problemCount: 28, xpEarned: 280 },
]
