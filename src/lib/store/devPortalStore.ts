/**
 * Developer Portal State Store (Zustand)
 * 
 * Centralized state management for the developer portal.
 * Provides a clean, typed API for all portal state.
 */

import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'

// ============================================================================
// Types
// ============================================================================

export type DevTheme = 'dark' | 'light'

export type DevView = 'documents' | 'projects' | 'workload' | 'analytics'

export type DocumentStatus = 'pending' | 'available' | 'in_progress' | 'review' | 'complete'

export type Priority = 'urgent' | 'high' | 'medium' | 'low'

export interface DocumentFilters {
  status: DocumentStatus | 'all'
  priority: Priority | 'all'
  assignee: string | 'all' | 'unassigned'
  customer: string | 'all'
  search: string
  dateRange: 'today' | 'week' | 'month' | 'all'
}

export interface DevPortalState {
  // Theme
  theme: DevTheme
  
  // View
  currentView: DevView
  
  // Sidebar
  sidebarCollapsed: boolean
  
  // Command Palette
  commandPaletteOpen: boolean
  
  // Admin Mode
  isAdminView: boolean
  
  // Filters
  filters: DocumentFilters
  
  // Selection
  selectedDocumentId: string | null
  selectedProjectId: string | null
  
  // Modals
  activeModal: string | null
  modalData: Record<string, unknown>
  
  // Loading States
  isLoading: boolean
  loadingMessage: string | null
  
  // Notifications
  unreadNotifications: number
}

export interface DevPortalActions {
  // Theme
  setTheme: (theme: DevTheme) => void
  toggleTheme: () => void
  
  // View
  setView: (view: DevView) => void
  
  // Sidebar
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  
  // Command Palette
  openCommandPalette: () => void
  closeCommandPalette: () => void
  toggleCommandPalette: () => void
  
  // Admin Mode
  setAdminView: (isAdmin: boolean) => void
  toggleAdminView: () => void
  
  // Filters
  setFilter: <K extends keyof DocumentFilters>(key: K, value: DocumentFilters[K]) => void
  setFilters: (filters: Partial<DocumentFilters>) => void
  resetFilters: () => void
  
  // Selection
  selectDocument: (id: string | null) => void
  selectProject: (id: string | null) => void
  
  // Modals
  openModal: (modalId: string, data?: Record<string, unknown>) => void
  closeModal: () => void
  
  // Loading
  setLoading: (loading: boolean, message?: string | null) => void
  
  // Notifications
  setUnreadNotifications: (count: number) => void
  incrementNotifications: () => void
  clearNotifications: () => void
  
  // Reset
  reset: () => void
}

// ============================================================================
// Initial State
// ============================================================================

const initialFilters: DocumentFilters = {
  status: 'all',
  priority: 'all',
  assignee: 'all',
  customer: 'all',
  search: '',
  dateRange: 'all',
}

const initialState: DevPortalState = {
  theme: 'dark',
  currentView: 'documents',
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  isAdminView: false,
  filters: initialFilters,
  selectedDocumentId: null,
  selectedProjectId: null,
  activeModal: null,
  modalData: {},
  isLoading: false,
  loadingMessage: null,
  unreadNotifications: 0,
}

// ============================================================================
// Store
// ============================================================================

export const useDevPortalStore = create<DevPortalState & DevPortalActions>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          ...initialState,
          
          // Theme
          setTheme: (theme) => set({ theme }, false, 'setTheme'),
          toggleTheme: () => set(
            (state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }),
            false,
            'toggleTheme'
          ),
          
          // View
          setView: (currentView) => set({ currentView }, false, 'setView'),
          
          // Sidebar
          toggleSidebar: () => set(
            (state) => ({ sidebarCollapsed: !state.sidebarCollapsed }),
            false,
            'toggleSidebar'
          ),
          setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }, false, 'setSidebarCollapsed'),
          
          // Command Palette
          openCommandPalette: () => set({ commandPaletteOpen: true }, false, 'openCommandPalette'),
          closeCommandPalette: () => set({ commandPaletteOpen: false }, false, 'closeCommandPalette'),
          toggleCommandPalette: () => set(
            (state) => ({ commandPaletteOpen: !state.commandPaletteOpen }),
            false,
            'toggleCommandPalette'
          ),
          
          // Admin Mode
          setAdminView: (isAdminView) => set({ isAdminView }, false, 'setAdminView'),
          toggleAdminView: () => set(
            (state) => ({ isAdminView: !state.isAdminView }),
            false,
            'toggleAdminView'
          ),
          
          // Filters
          setFilter: (key, value) => set(
            (state) => ({ filters: { ...state.filters, [key]: value } }),
            false,
            'setFilter'
          ),
          setFilters: (filters) => set(
            (state) => ({ filters: { ...state.filters, ...filters } }),
            false,
            'setFilters'
          ),
          resetFilters: () => set({ filters: initialFilters }, false, 'resetFilters'),
          
          // Selection
          selectDocument: (selectedDocumentId) => set({ selectedDocumentId }, false, 'selectDocument'),
          selectProject: (selectedProjectId) => set({ selectedProjectId }, false, 'selectProject'),
          
          // Modals
          openModal: (modalId, data = {}) => set(
            { activeModal: modalId, modalData: data },
            false,
            'openModal'
          ),
          closeModal: () => set(
            { activeModal: null, modalData: {} },
            false,
            'closeModal'
          ),
          
          // Loading
          setLoading: (isLoading, loadingMessage = null) => set(
            { isLoading, loadingMessage },
            false,
            'setLoading'
          ),
          
          // Notifications
          setUnreadNotifications: (unreadNotifications) => set({ unreadNotifications }, false, 'setUnreadNotifications'),
          incrementNotifications: () => set(
            (state) => ({ unreadNotifications: state.unreadNotifications + 1 }),
            false,
            'incrementNotifications'
          ),
          clearNotifications: () => set({ unreadNotifications: 0 }, false, 'clearNotifications'),
          
          // Reset
          reset: () => set(initialState, false, 'reset'),
        }),
        {
          name: 'dev-portal-storage',
          partialize: (state) => ({
            theme: state.theme,
            sidebarCollapsed: state.sidebarCollapsed,
          }),
        }
      )
    ),
    { name: 'DevPortalStore' }
  )
)

// ============================================================================
// Selectors
// ============================================================================

export const selectTheme = (state: DevPortalState) => state.theme
export const selectCurrentView = (state: DevPortalState) => state.currentView
export const selectSidebarCollapsed = (state: DevPortalState) => state.sidebarCollapsed
export const selectCommandPaletteOpen = (state: DevPortalState) => state.commandPaletteOpen
export const selectIsAdminView = (state: DevPortalState) => state.isAdminView
export const selectFilters = (state: DevPortalState) => state.filters
export const selectSelectedDocumentId = (state: DevPortalState) => state.selectedDocumentId
export const selectActiveModal = (state: DevPortalState) => state.activeModal
export const selectIsLoading = (state: DevPortalState) => state.isLoading
