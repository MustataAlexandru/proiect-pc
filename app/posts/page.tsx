"use client";
import React from 'react';

const Page = () => {
  const handler = (title: String) => {
    alert(`Triggered handler for ${title}`);
  };

  const posts = [
    { id: 1, title: "Cozy Apartment in the City", description: "A modern and stylish apartment in the heart of the city.", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Beachfront Villa", description: "Enjoy a serene beachfront stay with stunning ocean views.", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Mountain Cabin", description: "A peaceful retreat in the mountains, perfect for nature lovers.", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg shadow-md overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <button
                onClick={() => handler(post.title)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;