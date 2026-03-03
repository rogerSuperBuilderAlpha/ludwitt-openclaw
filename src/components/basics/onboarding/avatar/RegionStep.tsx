'use client'

import { MapPin } from 'lucide-react'
import { REGIONS } from './constants'

interface RegionStepProps {
  selectedRegion: string
  onSelectRegion: (regionId: string) => void
}

export function RegionStep({ selectedRegion, onSelectRegion }: RegionStepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 mb-2">
        <MapPin className="w-10 h-10 text-amber-600" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Where are you from?</h3>
        <p className="text-gray-500 text-sm">Your region will appear on the leaderboard</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-1">
        {REGIONS.map(region => (
          <button
            key={region.id}
            onClick={() => onSelectRegion(region.id)}
            className={`p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 ${
              selectedRegion === region.id
                ? 'border-amber-500 bg-amber-50 shadow-lg shadow-amber-500/10'
                : 'border-gray-100 bg-white hover:border-amber-200 hover:bg-amber-50/50'
            }`}
          >
            <div className="text-4xl mb-2">{region.flag}</div>
            <p className="text-xs font-medium text-gray-700 leading-tight">{region.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
