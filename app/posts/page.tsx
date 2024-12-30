"use client";

import React, { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Page: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data: Post[] = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handler = (title: string) => {
    alert(`Triggered handler for ${title}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Explore Our Listings</h1>
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