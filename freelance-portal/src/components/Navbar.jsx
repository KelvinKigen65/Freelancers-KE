import React from "react";

const Navbar = ({ userRole }) => {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <a href="/" className="text-xl font-bold text-green-600">FreelancersKE</a>

      <ul className="flex gap-6 text-gray-700 font-medium">
        <li>
          <a href="/" className="hover:text-green-600 transition">Home</a>
        </li>

        {/* Freelancer-specific links */}
        {userRole === "freelancer" && (
          <>
            <li>
              <a href="/projects" className="hover:text-green-600 transition">Browse Projects</a>
            </li>
            <li>
              <a href="/my-projects" className="hover:text-green-600 transition">My Projects</a>
            </li>
          </>
        )}

        {/* Client-specific links */}
        {userRole === "client" && (
          <>
            <li>
              <a href="/post-project" className="hover:text-green-600 transition">Post Project</a>
            </li>
            <li>
              <a href="/my-projects" className="hover:text-green-600 transition">My Projects</a>
            </li>
          </>
        )}

        <li>
          <a href="/login" className="hover:text-green-600 transition">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
