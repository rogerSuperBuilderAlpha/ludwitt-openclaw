'use client'

import { useSkillGraph } from '@/lib/hooks/useSkills'
import { ArrowLeft, Lightning, Lock, CheckCircle, Circle } from '@phosphor-icons/react'
import type { SkillNode } from '@/lib/types/university'

const STATUS_STYLES: Record<string, { border: string; bg: string; text: string }> = {
  'mastered': { border: 'border-green-300', bg: 'bg-green-50', text: 'text-green-700' },
  'in-progress': { border: 'border-amber-300', bg: 'bg-amber-50', text: 'text-amber-700' },
  'recommended': { border: 'border-gray-300 border-dashed', bg: 'bg-white', text: 'text-gray-600' },
  'locked': { border: 'border-gray-200', bg: 'bg-gray-50', text: 'text-gray-400' },
}

function SkillNodeCard({ skill }: { skill: SkillNode }) {
  const styles = STATUS_STYLES[skill.status] || STATUS_STYLES['locked']
  const isLocked = skill.status === 'locked'

  return (
    <div className={`border rounded-lg p-3 ${styles.border} ${styles.bg} ${isLocked ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-medium ${styles.text}`}>{skill.name}</span>
        {skill.status === 'mastered' && <CheckCircle size={14} weight="fill" className="text-green-500" />}
        {skill.status === 'locked' && <Lock size={14} className="text-gray-400" />}
      </div>
      <div className="flex items-center gap-0.5 mb-1">
        {[1, 2, 3, 4, 5].map(l => (
          <div key={l} className={`w-2 h-2 rounded-full ${l <= skill.level ? 'bg-gray-900' : 'bg-gray-200'}`} />
        ))}
      </div>
      <p className="text-[10px] text-gray-400">
        {skill.status === 'mastered' ? 'Mastered' : skill.status === 'in-progress' ? `${skill.deliverableIds.length} completed` : skill.status === 'recommended' ? 'Start here' : 'Prerequisites needed'}
      </p>
    </div>
  )
}

interface SkillGraphProps {
  onBack: () => void
}

export function SkillGraph({ onBack }: SkillGraphProps) {
  const { categories, loading, error } = useSkillGraph()

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    )
  }

  const totalSkills = categories.reduce((a, c) => a + c.skills.length, 0)
  const masteredSkills = categories.reduce((a, c) => a + c.skills.filter(s => s.status === 'mastered').length, 0)
  const inProgressSkills = categories.reduce((a, c) => a + c.skills.filter(s => s.status === 'in-progress').length, 0)

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="flex items-center gap-2 mb-1">
        <Lightning size={20} weight="fill" className="text-gray-600" />
        <h2 className="text-lg font-bold text-gray-900">Skill Competency Graph</h2>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        {masteredSkills} mastered &middot; {inProgressSkills} in progress &middot; {totalSkills} total skills
      </p>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-6 text-[10px] text-gray-500">
        <span className="flex items-center gap-1"><CheckCircle size={10} weight="fill" className="text-green-500" /> Mastered</span>
        <span className="flex items-center gap-1"><Circle size={10} weight="fill" className="text-amber-500" /> In Progress</span>
        <span className="flex items-center gap-1"><Circle size={10} className="text-gray-400" /> Recommended</span>
        <span className="flex items-center gap-1"><Lock size={10} className="text-gray-300" /> Locked</span>
      </div>

      <div className="space-y-6">
        {categories.map(cat => (
          <div key={cat.id}>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{cat.name}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cat.skills.map(skill => (
                <SkillNodeCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
