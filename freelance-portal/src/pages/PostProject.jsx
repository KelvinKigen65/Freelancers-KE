// src/pages/PostProject.jsx
import React from "react";

const PostProject = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="max-w-xl w-full bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Post a New Project</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Project Title</label>
            <input
              type="text"
              placeholder="Build a responsive portfolio website"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              rows="4"
              placeholder="Describe your project and deliverables..."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md">
              <option value="">Select Category</option>
              <option value="web">Web Development</option>
              <option value="design">Graphic Design</option>
              <option value="writing">Writing & Translation</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700">Budget (USD)</label>
              <input
                type="number"
                placeholder="500"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Deadline</label>
              <input
                type="date"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Post Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostProject;
