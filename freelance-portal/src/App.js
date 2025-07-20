// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import PostProject from "./pages/PostProject";
import MyProjects from "./pages/MyProjects";

function App() {
  // Temporary role assignment for testing
  const userRole = "freelancer"; // Change to "client" or null to test different views

  return (
    <BrowserRouter>
      <Navbar userRole={userRole} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/my-projects" element={<MyProjects />} />
        {/* You can add a Logout route when the logic is ready */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
