import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-500 mb-2">
            404
          </div>
          <div className="text-6xl mb-4">🔍</div>
        </div>
        
        {/* Message */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back to learning!
          </p>
          
          {/* Return Home Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white py-3 px-8 rounded-xl hover:bg-gray-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>🏠</span>
            <span>Back to Dashboard</span>
          </Link>
        </div>
        
        {/* Helpful Links */}
        <p className="text-sm text-gray-500">
          Need help?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 underline">
            Sign in
          </Link>
          {' '}or{' '}
          <Link href="/" className="text-blue-600 hover:text-blue-700 underline">
            explore Ludwitt
          </Link>
        </p>
      </div>
    </div>
  )
}




