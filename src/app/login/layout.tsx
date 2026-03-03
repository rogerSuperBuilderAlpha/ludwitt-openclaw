import { getLoginMetadata } from '@/lib/seo/metadata'

export const metadata = getLoginMetadata()

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
