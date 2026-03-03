import Link from 'next/link'
import { Eye } from 'lucide-react'
import { PriceFilter, SizeFilter, SortBy } from '@/lib/utils/cohortUtils'
import { Cohort } from '@/lib/hooks/cohorts/useCohortsPage'

interface JoinTabProps {
  searchQuery: string
  setSearchQuery: (v: string) => void
  filterPrice: PriceFilter
  setFilterPrice: (v: PriceFilter) => void
  filterSize: SizeFilter
  setFilterSize: (v: SizeFilter) => void
  sortBy: SortBy
  setSortBy: (v: SortBy) => void
  clearFilters: () => void
  loading: boolean
  cohorts: Cohort[]
  selectedCohortForPurchase: string | null
  setSelectedCohortForPurchase: (id: string | null) => void
  customSeatCount: string
  setCustomSeatCount: (v: string) => void
  handleJoinCohort: (cohortId: string, quantity?: number) => void
}

export function JoinTab(props: JoinTabProps) {
  const {
    searchQuery,
    setSearchQuery,
    filterPrice,
    setFilterPrice,
    filterSize,
    setFilterSize,
    sortBy,
    setSortBy,
    clearFilters,
    loading,
    cohorts,
    selectedCohortForPurchase,
    setSelectedCohortForPurchase,
    customSeatCount,
    setCustomSeatCount,
    handleJoinCohort,
  } = props

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mx-auto"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, description, or creator..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value as PriceFilter)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Prices</option>
            <option value="low">≤ $500</option>
            <option value="medium">$501 - $2,000</option>
            <option value="high">&gt; $2,000</option>
          </select>
          <select
            value={filterSize}
            onChange={(e) => setFilterSize(e.target.value as SizeFilter)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Sizes</option>
            <option value="small">Small (≤ 5)</option>
            <option value="medium">Medium (6-15)</option>
            <option value="large">Large (16+)</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="newest">Newest First</option>
            <option value="starting-soon">Starting Soon</option>
            <option value="spots-left">Most Spots Left</option>
          </select>
        </div>
        {(searchQuery ||
          filterPrice !== 'all' ||
          filterSize !== 'all' ||
          sortBy !== 'newest') && (
          <button
            onClick={clearFilters}
            className="text-sm text-purple-600 hover:text-purple-700 underline"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {cohorts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No Cohorts Found
          </h3>
          <button
            onClick={clearFilters}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg mt-4"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cohorts.map((cohort: any) => {
            const spotsAvailable = cohort.targetSize - cohort.currentSize
            const showingSeatSelection = selectedCohortForPurchase === cohort.id
            return (
              <div
                key={cohort.id}
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
              >
                <h3 className="text-xl font-bold mb-2">{cohort.name}</h3>
                <p className="text-gray-700 text-sm mb-4">
                  {cohort.description}
                </p>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span>Members:</span>
                    <span>
                      {cohort.currentSize}/{cohort.targetSize}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per seat:</span>
                    <span className="font-bold text-purple-600">
                      ${cohort.pricePerPerson}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Starts:</span>
                    <span>
                      {new Date(cohort.startDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-900 h-2 rounded-full"
                      style={{
                        width: `${(cohort.currentSize / cohort.targetSize) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {!showingSeatSelection ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCohortForPurchase(cohort.id)}
                      className="w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Buy Seats
                    </button>
                    <Link
                      href={`/cohorts/${cohort.id}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      More Info
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-700">
                      Select number of seats:
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() =>
                          handleJoinCohort(cohort.id, spotsAvailable)
                        }
                        className="w-full bg-purple-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Buy All {spotsAvailable} Seats ($
                        {cohort.pricePerPerson * spotsAvailable})
                      </button>
                      {spotsAvailable >= 2 && (
                        <button
                          onClick={() =>
                            handleJoinCohort(
                              cohort.id,
                              Math.ceil(spotsAvailable / 2)
                            )
                          }
                          className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Buy Half ({Math.ceil(spotsAvailable / 2)} Seats - $
                          {cohort.pricePerPerson *
                            Math.ceil(spotsAvailable / 2)}
                          )
                        </button>
                      )}
                      <button
                        onClick={() => handleJoinCohort(cohort.id, 1)}
                        className="w-full bg-gray-700 text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Buy 1 Seat (${cohort.pricePerPerson})
                      </button>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="1"
                          max={spotsAvailable}
                          value={customSeatCount}
                          onChange={(e) => setCustomSeatCount(e.target.value)}
                          placeholder="Custom #"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <button
                          onClick={() => {
                            const count = parseInt(customSeatCount)
                            if (count >= 1 && count <= spotsAvailable) {
                              handleJoinCohort(cohort.id, count)
                            } else {
                              alert(
                                `Please enter a number between 1 and ${spotsAvailable}`
                              )
                            }
                          }}
                          disabled={!customSeatCount}
                          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCohortForPurchase(null)
                        setCustomSeatCount('')
                      }}
                      className="w-full text-gray-600 text-sm py-2 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
