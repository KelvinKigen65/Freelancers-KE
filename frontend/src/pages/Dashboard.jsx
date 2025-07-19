export default function Dashboard() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-bold text-blue-700 mr-4">
          <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" /><path d="M4.22 19.78C5.47 18.53 7.61 18 12 18s6.53.53 7.78 1.78" /></svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-blue-700">Welcome, User!</h2>
          <p className="text-gray-500">Here’s your productivity hub.</p>
        </div>
      </div>
      <div className="flex space-x-4 mb-8">
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition">
          <svg className="mr-2" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
          Post Project
        </button>
        <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow transition">
          <svg className="mr-2" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
          View Bids
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <svg className="mb-2 text-blue-500" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
          <h3 className="font-semibold text-lg mb-2">Your Projects</h3>
          <p className="text-gray-500 text-center">Project list will appear here.</p>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <svg className="mb-2 text-purple-500" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
          <h3 className="font-semibold text-lg mb-2">Your Bids</h3>
          <p className="text-gray-500 text-center">Bid status and history will appear here.</p>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <svg className="mb-2 text-green-500" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 17v-2a4 4 0 0 1 4-4h4" /><circle cx="9" cy="7" r="4" /><path d="M17 17v.01" /></svg>
          <h3 className="font-semibold text-lg mb-2">Assistant</h3>
          <p className="text-gray-500 text-center">Smart assistant suggestions will appear here.</p>
        </div>
      </div>
    </div>
  )
} 