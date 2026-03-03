import { getBasicsMetadata } from '@/lib/seo/metadata'

export const metadata = getBasicsMetadata('leaderboard')

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
