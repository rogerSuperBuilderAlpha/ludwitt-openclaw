/**
 * CustomerFooter Component
 * Footer for customer landing pages
 */

'use client'

interface CustomerFooterProps {
  companyName?: string
  website?: string
}

export function CustomerFooter({
  companyName = 'Ludwitt',
  website,
}: CustomerFooterProps) {
  return (
    <footer className="px-6 py-8 border-t bg-gray-50">
      <div className="max-w-6xl mx-auto text-center text-gray-600">
        <p suppressHydrationWarning>
          &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
        </p>
        {website && (
          <p className="mt-2">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Visit our website
            </a>
          </p>
        )}
      </div>
    </footer>
  )
}
