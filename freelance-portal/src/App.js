import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import PostProject from "./pages/PostProject";
import MyProjects from "./pages/MyProjects";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import FreelancerLayout from "./layouts/FreelancerLayout";
import ClientLayout from "./layouts/ClientLayout";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuth();
  const userRole = user?.role || null;

  return (
    <BrowserRouter>
      <Navbar userRole={userRole} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 Role-specific dashboards with layout wrappers */}
        <Route
          path="/dashboard/freelancer"
          element={
            <FreelancerLayout>
              <FreelancerDashboard />
            </FreelancerLayout>
          }
        />
        <Route
          path="/dashboard/client"
          element={
            <ClientLayout>
              <ClientDashboard />
            </ClientLayout>
          }
        />

        {/* 🔄 Project-related routes */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/my-projects" element={<MyProjects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
