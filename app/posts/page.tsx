"use client";
import React, { useEffect, useState } from "react";
import customAxios from "../utils/customAxios"
import Spinner from "../global/Spinner";

interface Post {
  id: number;
  title: string;
  description: string;
  pictures: Array<string>;
}

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await customAxios.get("/api/posts");
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const onClick = async () => {
    try {
      await customAxios.post("/api/posts");
      window.location.reload();
    } catch (err) {
      alert("Failed to create dummy data. Please try again.");
    }
  };

  const handler = (post: Post) => {
    alert(JSON.stringify(post, null, 2));
  };

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col items-center mt-20">
      {error && <div className="text-red-500">{error}</div>}

      {!loading && posts.length === 0 && (
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClick}
        >
          Create Dummy Data
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg shadow-md overflow-hidden">
            <img
              src={post.pictures[0]}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-gray-500 mb-4">{post.description}</p>
              <div className="container flex justify-between items-center">
                <button
                  onClick={() => handler(post)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ml-auto"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;