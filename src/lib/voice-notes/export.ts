// Export utilities for Voice Notes

import { Recording } from '@/lib/types/voice-notes'

// Export recording as formatted text
export function exportAsText(recording: Recording): string {
  const lines: string[] = []
  
  lines.push(`# ${recording.title}`)
  lines.push('')
  lines.push(`Date: ${recording.date.toLocaleDateString()} ${recording.date.toLocaleTimeString()}`)
  lines.push(`Duration: ${Math.floor(recording.duration / 60)}:${(recording.duration % 60).toString().padStart(2, '0')}`)
  if (recording.template) {
    lines.push(`Type: ${recording.template}`)
  }
  lines.push('')
  
  // Summary
  if (recording.summary) {
    lines.push('## Summary')
    lines.push(recording.summary)
    lines.push('')
  }
  
  // Questions
  if (recording.questions && recording.questions.length > 0) {
    lines.push('## Questions Asked')
    recording.questions.forEach((q, i) => {
      lines.push(`${i + 1}. ${q}`)
    })
    lines.push('')
  }
  
  // Decisions
  if (recording.decisions && recording.decisions.length > 0) {
    lines.push('## Decisions Made')
    recording.decisions.forEach((d, i) => {
      lines.push(`${i + 1}. ${d}`)
    })
    lines.push('')
  }
  
  // Action Items
  if (recording.actionItems && recording.actionItems.length > 0) {
    lines.push('## Action Items')
    recording.actionItems.forEach((item, i) => {
      lines.push(`- [ ] ${item}`)
    })
    lines.push('')
  }
  
  // Next Steps
  if (recording.nextSteps && recording.nextSteps.length > 0) {
    lines.push('## Next Steps')
    recording.nextSteps.forEach((step, i) => {
      lines.push(`${i + 1}. ${step}`)
    })
    lines.push('')
  }
  
  // Commitments
  if (recording.commitments && recording.commitments.length > 0) {
    lines.push('## Commitments')
    recording.commitments.forEach((c, i) => {
      lines.push(`${i + 1}. ${c}`)
    })
    lines.push('')
  }
  
  // Key Moments
  if (recording.keyMoments && recording.keyMoments.length > 0) {
    lines.push('## Key Moments')
    recording.keyMoments.forEach((moment) => {
      const time = `${Math.floor(moment.time / 60)}:${(moment.time % 60).toString().padStart(2, '0')}`
      lines.push(`[${time}] ${moment.text}`)
    })
    lines.push('')
  }
  
  // Speakers
  if (recording.speakers && recording.speakers.length > 0) {
    lines.push('## Speakers')
    recording.speakers.forEach((speaker) => {
      const name = speaker.customName || speaker.name
      lines.push(`- ${name} (${speaker.segments} segments)`)
    })
    lines.push('')
  }
  
  // Transcript
  if (recording.transcript) {
    lines.push('## Full Transcript')
    lines.push('')
    
    if (recording.transcriptWithTimestamps && recording.transcriptWithTimestamps.length > 0) {
      recording.transcriptWithTimestamps.forEach((segment) => {
        const time = `${Math.floor(segment.timestamp / 60)}:${(segment.timestamp % 60).toString().padStart(2, '0')}`
        const speaker = segment.speaker ? `${segment.speaker}: ` : ''
        lines.push(`[${time}] ${speaker}${segment.text}`)
      })
    } else {
      lines.push(recording.transcript)
    }
  }
  
  return lines.join('\n')
}

// Export as Markdown
export function exportAsMarkdown(recording: Recording): void {
  const content = exportAsText(recording)
  const blob = new Blob([content], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `${recording.title}.md`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Export as JSON
export function exportAsJSON(recording: Recording): void {
  const data = {
    id: recording.id,
    title: recording.title,
    date: recording.date.toISOString(),
    duration: recording.duration,
    template: recording.template,
    transcript: recording.transcript,
    transcriptWithTimestamps: recording.transcriptWithTimestamps,
    summary: recording.summary,
    actionItems: recording.actionItems,
    nextSteps: recording.nextSteps,
    questions: recording.questions,
    decisions: recording.decisions,
    commitments: recording.commitments,
    keyMoments: recording.keyMoments,
    speakers: recording.speakers,
    sentiment: recording.sentiment,
    tags: recording.tags
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `${recording.title}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Generate HTML for PDF (can be used with html2pdf or similar)
export function generateHTML(recording: Recording): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${recording.title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; }
    h1 { color: #DC2626; border-bottom: 3px solid #DC2626; padding-bottom: 10px; }
    h2 { color: #374151; margin-top: 30px; border-bottom: 1px solid #E5E7EB; padding-bottom: 5px; }
    .meta { color: #6B7280; font-size: 14px; margin-bottom: 20px; }
    .summary { background: #EFF6FF; padding: 15px; border-left: 4px solid #3B82F6; margin: 20px 0; }
    .question { background: #F3E8FF; padding: 10px; margin: 8px 0; border-left: 3px solid #A855F7; }
    .decision { background: #DCFCE7; padding: 10px; margin: 8px 0; border-left: 3px solid #22C55E; }
    .action-item { padding: 5px 0; }
    .action-item input { margin-right: 8px; }
    .speaker { background: #F3F4F6; padding: 10px; margin: 5px 0; border-radius: 5px; }
    .timestamp { color: #3B82F6; font-family: monospace; font-size: 12px; }
    .transcript-line { margin: 12px 0; }
  </style>
</head>
<body>
  <h1>${recording.title}</h1>
  <div class="meta">
    <div>📅 ${recording.date.toLocaleDateString()} ${recording.date.toLocaleTimeString()}</div>
    <div>⏱️ Duration: ${Math.floor(recording.duration / 60)}:${(recording.duration % 60).toString().padStart(2, '0')}</div>
    ${recording.template ? `<div>📋 Type: ${recording.template}</div>` : ''}
    ${recording.sentiment ? `<div>💬 Sentiment: ${recording.sentiment}</div>` : ''}
  </div>

  ${recording.summary ? `
  <div class="summary">
    <h2>📋 Summary</h2>
    <p>${recording.summary}</p>
  </div>
  ` : ''}

  ${recording.questions && recording.questions.length > 0 ? `
  <h2>❓ Questions Asked (${recording.questions.length})</h2>
  ${recording.questions.map((q, i) => `<div class="question"><strong>Q${i+1}:</strong> ${q}</div>`).join('')}
  ` : ''}

  ${recording.decisions && recording.decisions.length > 0 ? `
  <h2>✅ Decisions Made (${recording.decisions.length})</h2>
  ${recording.decisions.map((d, i) => `<div class="decision">${i+1}. ${d}</div>`).join('')}
  ` : ''}

  ${recording.actionItems && recording.actionItems.length > 0 ? `
  <h2>✅ Action Items</h2>
  ${recording.actionItems.map(item => `<div class="action-item"><input type="checkbox"> ${item}</div>`).join('')}
  ` : ''}

  ${recording.nextSteps && recording.nextSteps.length > 0 ? `
  <h2>🔜 Next Steps</h2>
  <ol>
    ${recording.nextSteps.map(step => `<li>${step}</li>`).join('')}
  </ol>
  ` : ''}

  ${recording.commitments && recording.commitments.length > 0 ? `
  <h2>🎯 Commitments</h2>
  <ol>
    ${recording.commitments.map(c => `<li>${c}</li>`).join('')}
  </ol>
  ` : ''}

  ${recording.speakers && recording.speakers.length > 0 ? `
  <h2>👥 Speakers</h2>
  ${recording.speakers.map(s => `<div class="speaker">${s.customName || s.name} (${s.segments} segments)</div>`).join('')}
  ` : ''}

  ${recording.transcript ? `
  <h2>📝 Full Transcript</h2>
  ${recording.transcriptWithTimestamps && recording.transcriptWithTimestamps.length > 0 ? 
    recording.transcriptWithTimestamps.map(seg => {
      const time = `${Math.floor(seg.timestamp / 60)}:${(seg.timestamp % 60).toString().padStart(2, '0')}`
      return `<div class="transcript-line"><span class="timestamp">[${time}]</span> ${seg.speaker ? `<strong>${seg.speaker}:</strong>` : ''} ${seg.text}</div>`
    }).join('') 
    : `<p>${recording.transcript.replace(/\n/g, '<br>')}</p>`
  }
  ` : ''}
</body>
</html>
  `.trim()
}

// Export as HTML file
export function exportAsHTML(recording: Recording): void {
  const html = generateHTML(recording)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `${recording.title}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Print recording (opens print dialog)
export function printRecording(recording: Recording): void {
  const html = generateHTML(recording)
  const printWindow = window.open('', '_blank')
  
  if (printWindow) {
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.onload = () => {
      printWindow.print()
    }
  }
}

