interface InfoCardProps {
  title: string
  description: string
}

export function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
