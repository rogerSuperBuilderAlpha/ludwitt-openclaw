'use client'

import { useState } from 'react'
import { Copy, DownloadSimple, Check } from '@phosphor-icons/react'
import type { ExplorationSession } from '@/lib/types/university'

interface ExportStepProps {
  session: ExplorationSession
}

function buildMarkdown(session: ExplorationSession): string {
  let md = `# Topic Exploration: ${session.topic}\n\n`

  if (session.scope) {
    md += `## Scope\n${session.scope}\n\n`
  }

  md += `## Research Questions\n\n`
  for (let i = 0; i < session.researchQuestions.length; i++) {
    const q = session.researchQuestions[i]
    md += `### ${i + 1}. ${q.question}\n\n`
    if (q.keyFindings && q.keyFindings.length > 0) {
      md += `**Key Findings:**\n`
      for (const f of q.keyFindings) {
        md += `- ${f}\n`
      }
      md += '\n'
    }
    if (q.deepDive) {
      md += `**Deep Dive:**\n${q.deepDive}\n\n`
    }
  }

  if (session.synthesis) {
    md += `## Synthesis\n${session.synthesis}\n\n`
  }

  if (session.recommendedNextSteps && session.recommendedNextSteps.length > 0) {
    md += `## Recommended Next Steps\n`
    for (const step of session.recommendedNextSteps) {
      md += `- ${step}\n`
    }
    md += '\n'
  }

  if (session.references && session.references.length > 0) {
    md += `## References\n`
    for (const ref of session.references) {
      md += `- ${ref}\n`
    }
    md += '\n'
  }

  return md
}

export function ExportStep({ session }: ExportStepProps) {
  const [copied, setCopied] = useState(false)
  const markdown = buildMarkdown(session)

  async function handleCopy() {
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `exploration-${session.topic.toLowerCase().replace(/\s+/g, '-').slice(0, 50)}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Export Report</h3>
        <p className="text-xs text-gray-500">
          Copy or download this structured report. Paste it into Cursor, ChatGPT, or any LLM tool to start building your deliverables.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <DownloadSimple size={14} />
          Download .md
        </button>
      </div>

      {/* Preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
        <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
          {markdown}
        </pre>
      </div>
    </div>
  )
}
