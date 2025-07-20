// src/pages/MyProjects.jsx
import React from "react";

const projects = [
  {
    title: "E-commerce Website",
    status: "Open",
    budget: 800,
    deadline: "2025-07-30",
  },
  {
    title: "Logo Design",
    status: "In Progress",
    budget: 120,
    deadline: "2025-07-24",
  },
  {
    title: "Blog Articles",
    status: "Completed",
    budget: 300,
    deadline: "2025-07-15",
  },
];

const MyProjects = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Projects</h1>
      <div className="grid gap-6">
        {projects.map((proj, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700">{proj.title}</h2>
            <p className="text-sm text-gray-500">Deadline: {proj.deadline}</p>
            <p className="text-sm text-gray-600">Budget: ${proj.budget}</p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                proj.status === "Open"
                  ? "bg-green-100 text-green-700"
                  : proj.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {proj.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
