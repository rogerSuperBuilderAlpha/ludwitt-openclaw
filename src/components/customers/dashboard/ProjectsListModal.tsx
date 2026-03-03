import { Plus, Search, CreditCard, X, FolderOpen } from 'lucide-react'
import { Project } from '@/lib/types/project'

type ProjectsListModalProps = {
  isOpen: boolean
  onClose: () => void
  onNewProject: () => void
  projects: Project[]
  projectsLoading: boolean
  projectSearch: string
  projectSort: 'date-desc' | 'date-asc' | 'budget-desc' | 'budget-asc'
  projectStatusFilter: string
  setProjectSearch: (v: string) => void
  setProjectSort: (
    v: 'date-desc' | 'date-asc' | 'budget-desc' | 'budget-asc'
  ) => void
  setProjectStatusFilter: (v: string) => void
  filteredProjects: Project[]
  getPaymentStatusColor: (status: string) => string
  handlePayNow: (project: Project) => void
  setSelectedProject: (p: Project | null) => void
}

export function ProjectsListModal(props: ProjectsListModalProps) {
  const {
    isOpen,
    onClose,
    onNewProject,
    projects,
    projectsLoading,
    projectSearch,
    projectSort,
    projectStatusFilter,
    setProjectSearch,
    setProjectSort,
    setProjectStatusFilter,
    filteredProjects,
    getPaymentStatusColor,
    handlePayNow,
    setSelectedProject,
  } = props

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[85vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Projects list"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            My Projects ({projects.length})
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose()
                onNewProject()
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              New Project
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {projects.length > 0 && (
          <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <div>
                <select
                  value={projectSort}
                  onChange={(e) =>
                    setProjectSort(
                      e.target.value as
                        | 'date-desc'
                        | 'date-asc'
                        | 'budget-desc'
                        | 'budget-asc'
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="budget-desc">Highest Budget</option>
                  <option value="budget-asc">Lowest Budget</option>
                </select>
              </div>
              <div>
                <select
                  value={projectStatusFilter}
                  onChange={(e) => setProjectStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="intake">Intake</option>
                  <option value="discovery">Discovery</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </div>
        )}

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-100px)]">
          {projectsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No projects yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start your first project to begin working with our development
                team
              </p>
              <button
                onClick={() => {
                  onClose()
                  onNewProject()
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors rounded-lg"
              >
                <Plus className="w-5 h-5" />
                Start Your First Project
              </button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-5"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-1">
                        {project.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {project.description}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-full ${
                        project.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : project.status === 'review'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                    <div>
                      <span className="text-gray-600">Budget:</span>
                      <p className="font-medium text-gray-900">
                        ${project.totalCost.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <p className="font-medium text-gray-900 capitalize">
                        {project.type}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment:</span>
                      <p
                        className={`font-medium ${getPaymentStatusColor(project.paymentStatus)}`}
                      >
                        {project.paymentStatus === 'paid'
                          ? 'Paid'
                          : project.paymentStatus === 'partial'
                            ? 'Partial'
                            : 'Pending'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Balance:</span>
                      <p className="font-medium text-red-600">
                        $
                        {(
                          project.totalCost - (project.paidAmount || 0)
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {project.paymentStatus !== 'paid' && (
                      <button
                        onClick={() => {
                          onClose()
                          handlePayNow(project)
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        Pay
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedProject(project)
                        onClose()
                      }}
                      className="text-sm text-gray-700 font-medium hover:text-gray-900"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
