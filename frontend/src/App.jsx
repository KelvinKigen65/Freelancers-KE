import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Messages from './pages/Messages'
import Assistant from './pages/Assistant'
import PostProject from './pages/PostProject'
import UserProfile from './pages/UserProfile'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Freelancers Bot</h1>
        <p className="text-gray-600 mb-6">A smart assistant that connects freelancers with clients, streamlining project management and enhancing productivity for all users.</p>
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition">Get Started</Link>
      </div>
      <p className="mt-8 text-gray-400 text-sm">Built with React & TailwindCSS</p>
    </div>
  )
}

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <nav className="bg-white shadow flex items-center justify-between px-6 py-3 sticky top-0 z-10">
      <Link to="/" className="text-xl font-bold text-blue-700">Freelancers Bot</Link>
      <div className="flex gap-6 items-center">
        <Link to="/projects" className="text-gray-700 hover:text-blue-600">Projects</Link>
        <Link to="/messages" className="text-gray-700 hover:text-blue-600">Messages</Link>
        <Link to="/assistant" className="text-gray-700 hover:text-blue-600">Assistant</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <button 
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Login</Link>
        )}
      </div>
    </nav>
  )
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/projects" element={<Projects />} />
          <Route path="/post-project" element={
            <ProtectedRoute>
              <PostProject />
            </ProtectedRoute>
          } />
          <Route path="/messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
