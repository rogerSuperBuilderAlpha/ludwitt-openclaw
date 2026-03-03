import { getBasicsMetadata } from '@/lib/seo/metadata'

export const metadata = getBasicsMetadata('achievements')

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
