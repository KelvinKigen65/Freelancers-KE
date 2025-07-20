// src/pages/HomePage.jsx
import React from "react";
import FreelancerCard from "../components/FreelancerCard";

const freelancers = [
  {
    name: "Amina Mwangi",
    title: "UI/UX Designer",
    rate: 30,
    image: "https://via.placeholder.com/400x300?text=Amina",
  },
  {
    name: "Daniel Otieno",
    title: "Full-Stack Developer",
    rate: 45,
    image: "https://via.placeholder.com/400x300?text=Daniel",
  },
  {
    name: "Faith Kimani",
    title: "Content Writer",
    rate: 25,
    image: "https://via.placeholder.com/400x300?text=Faith",
  },
];

const HomePage = () => {
  return (
    <div className="px-6 py-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Top Freelancers in Kenya</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {freelancers.map((freelancer, index) => (
          <FreelancerCard key={index} {...freelancer} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
