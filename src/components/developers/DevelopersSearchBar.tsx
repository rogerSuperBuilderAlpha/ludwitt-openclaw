'use client'

import { Search } from 'lucide-react'

type TabType = 'docs' | 'projects' | 'all'

interface DevelopersSearchBarProps {
  activeTab: TabType
  searchQuery: string
  setSearchQuery: (v: string) => void
  customerFilter: string
  setCustomerFilter: (v: string) => void
  assignedFilter: string
  setAssignedFilter: (v: string) => void
  uniqueCustomers: Array<{ id: string; name: string; email: string }>
  uniqueDevelopers: Array<{ id: string; name: string }>
  onAddDocumentClick: () => void
  showDeveloperFilter: boolean
  showClear?: boolean
  onClear?: () => void
}

export function DevelopersSearchBar({
  activeTab,
  searchQuery,
  setSearchQuery,
  customerFilter,
  setCustomerFilter,
  assignedFilter,
  setAssignedFilter,
  uniqueCustomers,
  uniqueDevelopers,
  onAddDocumentClick,
  showDeveloperFilter,
  showClear,
  onClear,
}: DevelopersSearchBarProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={
              activeTab === 'projects'
                ? 'Search projects...'
                : 'Search documents...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {activeTab !== 'projects' && (
          <select
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
            className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Customers</option>
            {uniqueCustomers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        )}

        {showDeveloperFilter && (
          <select
            value={assignedFilter}
            onChange={(e) => setAssignedFilter(e.target.value)}
            className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Devs</option>
            <option value="unassigned">Unassigned</option>
            {uniqueDevelopers.map((dev) => (
              <option key={dev.id} value={dev.id}>
                {dev.name}
              </option>
            ))}
          </select>
        )}

        {activeTab !== 'projects' && (
          <button
            onClick={onAddDocumentClick}
            className="flex items-center gap-2 px-4 py-1.5 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
          >
            Add for Customer
          </button>
        )}

        {showClear && (
          <button
            onClick={onClear}
            className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 underline whitespace-nowrap"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}
