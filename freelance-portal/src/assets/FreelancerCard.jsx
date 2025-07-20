// src/components/FreelancerCard.jsx
import React from "react";

const FreelancerCard = ({ name, title, rate, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">{title}</p>
        <div className="mt-2 text-blue-600 font-semibold">${rate}/hr</div>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default FreelancerCard;
