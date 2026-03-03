import { Cohort } from '@/lib/hooks/useCohortsData'

export type PriceFilter = 'all' | 'low' | 'medium' | 'high'
export type SizeFilter = 'all' | 'small' | 'medium' | 'large'
export type SortBy = 'newest' | 'starting-soon' | 'spots-left'

export function filterAndSortCohorts(
  cohorts: Cohort[],
  searchQuery: string,
  filterPrice: PriceFilter,
  filterSize: SizeFilter,
  sortBy: SortBy
): Cohort[] {
  let filtered = [...cohorts]

  // Search filter
  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase()
    filtered = filtered.filter(
      (cohort) =>
        cohort.name.toLowerCase().includes(lowerQuery) ||
        cohort.description.toLowerCase().includes(lowerQuery) ||
        cohort.creatorName.toLowerCase().includes(lowerQuery)
    )
  }

  // Price filter
  if (filterPrice !== 'all') {
    filtered = filtered.filter((cohort) => {
      if (filterPrice === 'low') return cohort.pricePerPerson <= 500
      if (filterPrice === 'medium') return cohort.pricePerPerson > 500 && cohort.pricePerPerson <= 2000
      if (filterPrice === 'high') return cohort.pricePerPerson > 2000
      return true
    })
  }

  // Size filter
  if (filterSize !== 'all') {
    filtered = filtered.filter((cohort) => {
      if (filterSize === 'small') return cohort.targetSize <= 5
      if (filterSize === 'medium') return cohort.targetSize > 5 && cohort.targetSize <= 15
      if (filterSize === 'large') return cohort.targetSize > 15
      return true
    })
  }

  // Sort
  if (sortBy === 'newest') {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } else if (sortBy === 'starting-soon') {
    filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  } else if (sortBy === 'spots-left') {
    filtered.sort((a, b) => {
      const aSpotsLeft = a.targetSize - a.currentSize
      const bSpotsLeft = b.targetSize - b.currentSize
      return bSpotsLeft - aSpotsLeft
    })
  }

  return filtered
}
