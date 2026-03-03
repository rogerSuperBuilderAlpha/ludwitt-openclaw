'use client'

import { type LucideIcon } from 'lucide-react'

interface SettingsCardProps {
  icon: LucideIcon
  title: string
  description?: string
  iconClassName?: string
  titleClassName?: string
  cardClassName?: string
  cardStyle?: React.CSSProperties
  children: React.ReactNode
}

export function SettingsCard({
  icon: Icon,
  title,
  description,
  iconClassName = 'b-text-primary',
  titleClassName = 'b-text-primary',
  cardClassName = 'b-card b-p-xl b-mb-lg',
  cardStyle,
  children,
}: SettingsCardProps) {
  return (
    <div className={cardClassName} style={cardStyle}>
      <div className={`flex items-center gap-3 ${description ? 'b-mb-md' : 'b-mb-lg'}`}>
        <Icon className={`w-5 h-5 ${iconClassName}`} />
        <h2 className={`b-text-xl b-font-semibold ${titleClassName}`}>{title}</h2>
      </div>
      {description && (
        <p className="b-text-sm b-text-secondary b-mb-md">{description}</p>
      )}
      {children}
    </div>
  )
}
