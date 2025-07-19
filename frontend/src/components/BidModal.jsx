import { useState } from 'react'
import { bidAPI } from '../services/api'

export default function BidModal({ isOpen, onClose, project }) {
  const [formData, setFormData] = useState({
    amount: '',
    proposal: '',
    timeline: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  if (!isOpen || !project) return null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const bidData = {
        projectId: project._id,
        amount: parseFloat(formData.amount),
        proposal: formData.proposal,
        timeline: parseInt(formData.timeline),
        message: formData.message
      }

      await bidAPI.createBid(bidData)
      setSuccess(true)
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setFormData({ amount: '', proposal: '', timeline: '', message: '' })
      }, 2000)

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit bid')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      setFormData({ amount: '', proposal: '', timeline: '', message: '' })
      setError(null)
      setSuccess(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-blue-700">Place Your Bid</h3>
            <button 
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded">
            <h4 className="font-semibold text-gray-800">{project.title}</h4>
            <p className="text-sm text-gray-600 mt-1">
              Budget: ${project.budget?.min || 0} - ${project.budget?.max || 0}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              Bid submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Bid Amount ($)</label>
              <input 
                type="number" 
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min={project.budget?.min || 0}
                max={project.budget?.max || 999999}
                step="0.01"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" 
                required 
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be between ${project.budget?.min || 0} and ${project.budget?.max || 0}
              </p>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Proposal</label>
              <textarea 
                name="proposal"
                value={formData.proposal}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" 
                placeholder="Describe your approach to this project..."
                required 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Timeline (days)</label>
              <input 
                type="number" 
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                min="1"
                max="365"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Message (optional)</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" 
                placeholder="Additional message to the client..."
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <button 
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded transition flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Bid'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 