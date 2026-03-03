export function NoDocumentsYet() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl shadow-sm border border-blue-200/60 p-10 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
        <span className="text-4xl">👋</span>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Hey! Ready to build something awesome?
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
        Share what you want to build and we&apos;ll make it happen, one step at a time.
      </p>
      
      <div className="bg-white/80 backdrop-blur rounded-xl p-6 mb-8 border border-gray-200/60 max-w-lg mx-auto text-left">
        <h4 className="font-semibold text-gray-900 mb-4 text-center">Here&apos;s how it works:</h4>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-sm">1</div>
            <div>
              <div className="font-medium text-gray-900">You share what you want</div>
              <div className="text-sm text-gray-600">Google Docs work great – just paste the link</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-600 font-bold text-sm">2</div>
            <div>
              <div className="font-medium text-gray-900">Your developer breaks it into pieces</div>
              <div className="text-sm text-gray-600">Manageable chunks that can be reviewed quickly</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 text-green-600 font-bold text-sm">3</div>
            <div>
              <div className="font-medium text-gray-900">You review each piece as it&apos;s built</div>
              <div className="text-sm text-gray-600">Give feedback, ask questions, iterate until perfect</div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 max-w-md mx-auto">
        💡 <strong>Pro tip:</strong> Don&apos;t worry about getting your requirements perfect. 
        Start with what you know and we&apos;ll refine together.
      </p>
    </div>
  )
}

export function NoDocumentsFound() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200 p-10 text-center">
      <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">🔍</span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents match your filters</h3>
      <p className="text-gray-600 mb-6">Your documents are still here – they&apos;re just hidden by the current filters.</p>
      
      <div className="bg-white rounded-lg p-4 border border-gray-200 max-w-sm mx-auto text-left">
        <p className="text-sm font-medium text-gray-700 mb-2">Quick fixes:</p>
        <ul className="text-sm text-gray-600 space-y-1.5">
          <li className="flex items-center gap-2">
            <span className="text-blue-500">→</span>
            Clear search or reset filters
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500">→</span>
            Try &quot;All&quot; for status filter
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500">→</span>
            Check if you&apos;re in the right project
          </li>
        </ul>
      </div>
    </div>
  )
}
