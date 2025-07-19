import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectAPI, bidAPI } from '../services/api'
import BidModal from '../components/BidModal'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchTerm) params.search = searchTerm
      if (category) params.category = category
      
      const response = await projectAPI.getProjects(params)
      setProjects(response.data.docs || response.data.projects || [])
      setError(null)
    } catch (err) {
      setError('Failed to load projects')
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleBidClick = (project) => {
    setSelectedProject(project)
    setIsBidModalOpen(true)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchProjects()
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    // Auto-fetch when category changes
    setTimeout(() => fetchProjects(), 100)
  }

  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-blue-700">Projects</h2>
        <Link 
          to="/post-project"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow flex items-center"
        >
          <svg className="mr-2" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4" />
          </svg>
          Post Project
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" 
          placeholder="Search projects..." 
        />
        <select 
          value={category}
          onChange={handleCategoryChange}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Categories</option>
          <option value="web-development">Web Development</option>
          <option value="mobile-development">Mobile Development</option>
          <option value="design">Design</option>
          <option value="writing">Writing</option>
          <option value="marketing">Marketing</option>
          <option value="other">Other</option>
        </select>
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No projects found</p>
          <p className="text-gray-400">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project._id} className="bg-white rounded-xl shadow p-6 flex flex-col hover:shadow-lg transition-shadow duration-200">
              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 flex-1">
                {project.description.length > 150 
                  ? `${project.description.substring(0, 150)}...` 
                  : project.description
                }
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm text-gray-500">
                  Budget: ${project.budget?.min || 0} - ${project.budget?.max || 0}
                </span>
                <button 
                  onClick={() => handleBidClick(project)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                >
                  Bid
                </button>
              </div>
              {project.bids > 0 && (
                <div className="mt-2 text-xs text-gray-400">
                  {project.bids} bid{project.bids !== 1 ? 's' : ''} received
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <BidModal 
        isOpen={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
        project={selectedProject}
      />
    </div>
  )
} 