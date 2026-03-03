'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import { useDashboardProgress } from '@/lib/hooks/useDashboardProgress'
import { logout } from '@/lib/firebase/auth'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { InfoTab } from '@/components/cohorts/InfoTab'
import { CohortFormModal } from '@/components/cohorts/CohortFormModal'
import { JoinTab } from '@/components/cohorts/JoinTab'
import { CreateTab } from '@/components/cohorts/CreateTab'
import { useCohortsPage } from '@/lib/hooks/cohorts/useCohortsPage'
import { logger } from '@/lib/logger'

function SearchParamsHandler({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void
  onCancel: () => void
}) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const success = searchParams.get('success')
    const canceled = searchParams.get('canceled')
    if (success) onSuccess()
    if (canceled) onCancel()
  }, [searchParams, onSuccess, onCancel])

  return null
}

function TabHandler({
  onTabChange,
}: {
  onTabChange: (tab: 'info' | 'join' | 'create') => void
}) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'create' || tab === 'join' || tab === 'info') {
      onTabChange(tab)
    }
  }, [searchParams, onTabChange])

  return null
}

function CohortsPageContent() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { progress } = useDashboardProgress(user?.uid)
  const state = useCohortsPage(user?.uid, progress.vercelDeploymentComplete)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/basics/cohorts')
    }
  }, [user, loading, router])

  // moved data loading into hook

  const {
    canCreate,
    loadingAccess,
    cohorts,
    userCohort,
    loadingCohorts,
    refreshCohorts,
    userCreatedCohorts,
    loadingUserCohorts,
    searchQuery,
    setSearchQuery,
    filterPrice,
    setFilterPrice,
    filterSize,
    setFilterSize,
    sortBy,
    setSortBy,
    clearFilters,
    filteredCohorts,
    activeTab,
    setActiveTab,
    isModalOpen,
    setIsModalOpen,
    editingCohort,
    setEditingCohort,
    successMessage,
    setSuccessMessage,
    copiedCohortId,
    selectedCohortForPurchase,
    setSelectedCohortForPurchase,
    customSeatCount,
    setCustomSeatCount,
    handleModalSuccess,
    handleEditCohort,
    handleDeleteCohort,
    handleJoinCohort,
    handleCopyShareLink,
  } = state

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      logger.error('CohortsPage', 'Error logging out', { error })
    }
  }

  // copy link handled in hook

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </main>
    )
  }

  if (!user) return null

  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={null}>
        <SearchParamsHandler
          onSuccess={() => {
            setSuccessMessage(
              "Payment successful! You've joined the cohort. Welcome!"
            )
            setTimeout(() => (window.location.href = '/cohorts'), 3000)
          }}
          onCancel={() => alert('Payment canceled. You can try again anytime!')}
        />
        <TabHandler onTabChange={setActiveTab} />
      </Suspense>

      <DashboardHeader user={user} onLogout={handleLogout} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {userCohort && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-green-900 mb-2">
              You&apos;re in a Cohort!
            </h2>
            <p className="text-green-800">
              <strong>{userCohort.name}</strong> - {userCohort.currentSize}/
              {userCohort.targetSize} members
            </p>
            <p className="text-green-700 text-sm mt-2">
              Starts: {new Date(userCohort.startDate).toLocaleDateString()}
            </p>
          </div>
        )}

        <div className="flex gap-4 mb-8 border-b border-gray-300">
          {['info', 'join'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'info' | 'join' | 'create')}
              className={`pb-3 px-4 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'info' ? 'About Cohorts' : 'Join a Cohort'}
            </button>
          ))}
          {canCreate && (
            <button
              onClick={() => setActiveTab('create')}
              className={`pb-3 px-4 font-semibold transition-colors ${
                activeTab === 'create'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Create a Cohort
            </button>
          )}
        </div>

        {activeTab === 'info' && (
          <InfoTab
            onJoinClick={() => setActiveTab('join')}
            onCreateClick={canCreate ? () => setActiveTab('create') : undefined}
          />
        )}

        {activeTab === 'join' && (
          <JoinTab
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterPrice={filterPrice}
            setFilterPrice={setFilterPrice}
            filterSize={filterSize}
            setFilterSize={setFilterSize}
            sortBy={sortBy}
            setSortBy={setSortBy}
            clearFilters={clearFilters}
            loading={loadingCohorts}
            cohorts={filteredCohorts}
            selectedCohortForPurchase={selectedCohortForPurchase}
            setSelectedCohortForPurchase={setSelectedCohortForPurchase}
            customSeatCount={customSeatCount}
            setCustomSeatCount={setCustomSeatCount}
            handleJoinCohort={handleJoinCohort}
          />
        )}

        {activeTab === 'create' && (
          <CreateTab
            canCreate={canCreate}
            loadingUserCohorts={loadingUserCohorts}
            userCreatedCohorts={userCreatedCohorts}
            successMessage={successMessage}
            copiedCohortId={copiedCohortId}
            handleCopyShareLink={handleCopyShareLink}
            handleEditCohort={handleEditCohort}
            handleDeleteCohort={handleDeleteCohort}
            onOpenCreate={() => {
              setEditingCohort(null)
              setIsModalOpen(true)
            }}
          />
        )}

        {/* Cohort Form Modal */}
        <CohortFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingCohort(null)
          }}
          onSuccess={handleModalSuccess}
          editingCohort={editingCohort}
        />
      </div>
    </main>
  )
}

export default function CohortsPage() {
  return <CohortsPageContent />
}
