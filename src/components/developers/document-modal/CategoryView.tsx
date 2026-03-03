'use client'

interface CategoryViewProps {
  completionCategory: string
  setCompletionCategory: (s: string) => void
  completionCostCents: number
  setCompletionCostCents: (n: number) => void
  onSubmitCategory: () => void
  onBackToDetails: () => void
}

export function CategoryView({
  completionCategory,
  setCompletionCategory,
  completionCostCents,
  setCompletionCostCents,
  onSubmitCategory,
  onBackToDetails,
}: CategoryViewProps) {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="docfull-category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category
        </label>
        <input
          id="docfull-category"
          type="text"
          value={completionCategory}
          onChange={(e) => setCompletionCategory(e.target.value)}
          placeholder="e.g., Website, App, Design"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          maxLength={100}
        />
      </div>

      {/* Compute Cost Input */}
      <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <label
          htmlFor="docfull-compute-cost"
          className="block text-sm font-medium text-emerald-800 mb-2"
        >
          Compute Cost (Raw AI Cost in Cents)
        </label>
        <p className="text-xs text-emerald-700 mb-3">
          Enter the actual compute cost for this work. Customer will be charged
          3x this amount.
        </p>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              &cent;
            </span>
            <input
              id="docfull-compute-cost"
              type="number"
              min="0"
              step="1"
              value={completionCostCents || ''}
              onChange={(e) =>
                setCompletionCostCents(parseInt(e.target.value) || 0)
              }
              placeholder="0"
              className="w-full pl-8 pr-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="text-sm text-emerald-700">
            <span className="font-medium">Customer pays:</span>{' '}
            <span className="font-bold">
              ${((completionCostCents * 3) / 100).toFixed(2)}
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Leave at 0 if this work should not be billed.
        </p>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={onBackToDetails}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSubmitCategory}
          disabled={!completionCategory.trim()}
          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {completionCostCents > 0
            ? `Complete & Bill $${((completionCostCents * 3) / 100).toFixed(2)}`
            : 'Mark Complete'}
        </button>
      </div>
    </>
  )
}
