// src/pages/Dashboard.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Please log in to view your dashboard.</p>
      </div>
    );
  }

  const renderFreelancerDashboard = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, Freelancer!</h2>
      <ul className="grid gap-4">
        <li className="bg-white shadow p-4 rounded">
          🗂️ <strong>Browse Projects</strong> to find new gigs.
        </li>
        <li className="bg-white shadow p-4 rounded">
          💼 <strong>Update your profile</strong> to attract clients.
        </li>
        <li className="bg-white shadow p-4 rounded">
          ✍️ <strong>View submitted proposals</strong> and follow up.
        </li>
      </ul>
    </>
  );

  const renderClientDashboard = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, Client!</h2>
      <ul className="grid gap-4">
        <li className="bg-white shadow p-4 rounded">
          📢 <strong>Post a new project</strong> and hire top talent.
        </li>
        <li className="bg-white shadow p-4 rounded">
          📊 <strong>Manage posted projects</strong> and track proposals.
        </li>
        <li className="bg-white shadow p-4 rounded">
          🧑‍💻 <strong>Chat with freelancers</strong> you’ve hired.
        </li>
      </ul>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {user.role === "freelancer" && renderFreelancerDashboard()}
      {user.role === "client" && renderClientDashboard()}
    </div>
  );
};

export default Dashboard;
