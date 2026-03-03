import { getBasicsMetadata } from '@/lib/seo/metadata'

export const metadata = getBasicsMetadata('study-rooms')

export default function StudyRoomsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
