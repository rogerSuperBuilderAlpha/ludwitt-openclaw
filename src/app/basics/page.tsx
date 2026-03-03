import { redirect } from 'next/navigation'

/**
 * Basics Redirect
 *
 * The basics learning dashboard is rendered on the home page (/) when authenticated.
 * This redirect ensures users who visit /basics are sent to the right place.
 */
export default function BasicsPage() {
  redirect('/')
}
