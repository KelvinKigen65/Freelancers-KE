import { Link } from "react-router-dom";

const Navbar = ({ userRole }) => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">FreelancersKE</div>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-blue-400">Home</Link></li>

        {/* Role-based links */}
        {!userRole && (
          <>
            <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
            <li><Link to="/signup" className="hover:text-blue-400">Sign Up</Link></li>
          </>
        )}

        {userRole === "freelancer" && (
          <>
            <li><Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link></li>
            <li><Link to="/projects" className="hover:text-blue-400">Browse Projects</Link></li>
          </>
        )}

        {userRole === "client" && (
          <>
            <li><Link to="/post-project" className="hover:text-blue-400">Post a Project</Link></li>
            <li><Link to="/my-projects" className="hover:text-blue-400">My Projects</Link></li>
          </>
        )}

        {userRole && (
          <li><Link to="/logout" className="hover:text-red-400">Logout</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
