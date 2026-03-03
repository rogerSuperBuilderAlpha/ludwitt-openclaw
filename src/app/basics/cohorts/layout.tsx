import { getBasicsMetadata } from '@/lib/seo/metadata'

export const metadata = getBasicsMetadata('cohorts')

export default function CohortsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
