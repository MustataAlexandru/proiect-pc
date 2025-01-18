import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAuthUser } from "../utils/actions";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  // Dummy user data aligned with Prisma schema
  const user = {
    id: 1,
    username: "johndoe",
    email: "john@example.com",
    date: new Date("2024-01-01"),
    bookings: [],
    reviews: [
      {
        id: 1,
        title: "Great Experience!",
        rating: 5,
        content: "Amazing service",
        date: new Date("2024-03-15"),
      },
      {
        id: 2,
        title: "Wonderful Stay",
        rating: 4,
        content: "Very comfortable",
        date: new Date("2024-03-10"),
      },
    ],
    messages: [],
  };

  const authUser = getAuthUser();
  if (!authUser) redirect("/");
  return (
    <div className="max-w-4xl mx-auto p-6 mt-20 space-y-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            <Image 
              src={(await authUser).imageUrl} 
              fill 
              priority
              sizes="(max-width: 768px) 128px, 128px"
              alt='profile image' 
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold dark:text-white">
              {(await authUser).lastName} {(await authUser).firstName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {(await authUser).username}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Member since {new Date(user.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link
          href="/posts/new"
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 dark:bg-red-400 text-white px-6 py-2 rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          New Post
        </Link>
        <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg transition-colors">
          Edit Profile
        </button>
      </div>

      {/* Reviews Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold dark:text-white">Recent Reviews</h2>
          <Link
            href="/reviews"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
          >
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {user.reviews.map((review) => (
            <div key={review.id} className="border-b dark:border-gray-700 pb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold dark:text-white">
                  {review.title}
                </h3>
                <div className="flex items-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                {review.content}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bookings Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Recent Bookings</h2>
          <Link
            href="/bookings"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
          >
            View All
          </Link>
        </div>
        {user.bookings.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No bookings yet
          </p>
        ) : (
          <div className="space-y-4">{/* Booking items would go here */}</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
