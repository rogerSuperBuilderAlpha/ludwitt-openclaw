import { redirect } from 'next/navigation'

/**
 * Dashboard Redirect
 *
 * The dashboard is rendered on the home page (/) when authenticated.
 * This redirect ensures users who bookmark /dashboard are sent to the right place.
 */
export default function DashboardPage() {
  redirect('/')
}
