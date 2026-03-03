import { render, screen, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '../ClientProvider'

// Track the onAuthStateChanged callback so we can trigger it manually
let authCallback: ((user: unknown) => void) | null = null
let authErrorCallback: ((error: unknown) => void) | null = null

jest.mock('@/lib/firebase/config', () => ({
  auth: { currentUser: null },
  db: {},
}))

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn((_auth: unknown, callback: (user: unknown) => void, errorCb: (error: unknown) => void) => {
    authCallback = callback
    authErrorCallback = errorCb
    return jest.fn() // unsubscribe
  }),
  signOut: jest.fn(),
}))

jest.mock('@/lib/firebase/userUtils', () => ({
  initializeUserData: jest.fn().mockResolvedValue(undefined),
}))

jest.mock('../EmailVerificationBanner', () => ({
  EmailVerificationBanner: () => null,
}))

// A test consumer component that reads from auth context
function AuthConsumer() {
  const { user, loading } = useAuth()
  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="user">{user ? 'authenticated' : 'null'}</span>
      {user && <span data-testid="user-uid">{(user as { uid: string }).uid}</span>}
    </div>
  )
}

describe('ClientProvider / AuthProvider', () => {
  beforeEach(() => {
    authCallback = null
    authErrorCallback = null
    jest.clearAllMocks()
    // Mock global fetch for session cookie calls
    global.fetch = jest.fn().mockResolvedValue({ ok: true })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('provides auth context to children', () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    )
    // The context should be available
    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.getByTestId('user')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <AuthProvider>
        <div>App content</div>
      </AuthProvider>
    )
    expect(screen.getByText('App content')).toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    )
    // Before onAuthStateChanged fires, loading should be true
    expect(screen.getByTestId('loading')).toHaveTextContent('true')
  })

  it('provides user object when authenticated', async () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    )

    // Simulate Firebase calling back with an authenticated user
    const mockUser = {
      uid: 'test-uid-123',
      email: 'user@example.com',
      emailVerified: true,
      getIdToken: jest.fn().mockResolvedValue('mock-id-token'),
      providerData: [],
    }

    await act(async () => {
      authCallback?.(mockUser)
    })

    expect(screen.getByTestId('loading')).toHaveTextContent('false')
    expect(screen.getByTestId('user')).toHaveTextContent('authenticated')
  })

  it('sets user to null when not authenticated', async () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    )

    await act(async () => {
      authCallback?.(null)
    })

    expect(screen.getByTestId('loading')).toHaveTextContent('false')
    expect(screen.getByTestId('user')).toHaveTextContent('null')
  })
})
