// src/pages/Projects.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err.response?.data?.message || err.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Browse Projects</h1>
      <div className="grid gap-6">
        {projects.length === 0 ? (
          <p className="text-gray-600">No projects available right now.</p>
        ) : (
          projects.map((proj, idx) => (
            <div key={idx} className="bg-white shadow rounded-lg p-5 hover:shadow-md transition">
              <h2 className="text-xl font-semibold text-gray-700">{proj.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{proj.description}</p>
              <p className="text-sm text-gray-500">
                Budget: ${proj.budget} | Deadline: {new Date(proj.deadline).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">Category: {proj.category}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Submit Proposal
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
