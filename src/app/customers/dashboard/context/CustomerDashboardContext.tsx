'use client'

import React, { createContext, useContext } from 'react'
import { DashboardContextValue } from '../types'
import { useCustomerDashboard } from '../hooks/useCustomerDashboard'

const CustomerDashboardContext = createContext<DashboardContextValue | undefined>(undefined)

export function CustomerDashboardProvider({ children }: { children: React.ReactNode }) {
  const value = useCustomerDashboard()

  return (
    <CustomerDashboardContext.Provider value={value}>
      {children}
    </CustomerDashboardContext.Provider>
  )
}

export function useCustomerDashboardContext() {
  const context = useContext(CustomerDashboardContext)
  if (context === undefined) {
    throw new Error('useCustomerDashboardContext must be used within CustomerDashboardProvider')
  }
  return context
}
