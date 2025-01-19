import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAuthUser, getOrCreateDbUser, fetchUserLatestPosts } from "../utils/actions";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const authUser = await getAuthUser();
  if (!authUser) redirect("/");
  
  const dbUser = await getOrCreateDbUser(authUser);
  const latestPosts = await fetchUserLatestPosts(dbUser.id);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20 space-y-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              <Image 
                src={authUser.imageUrl} 
                fill 
                priority
                sizes="(max-width: 768px) 128px, 128px"
                alt='profile image' 
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold dark:text-white">
                {authUser.lastName} {authUser.firstName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {authUser.username}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Member since {new Date(dbUser.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Link
            href="/posts/new"
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors h-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New listing
          </Link>
        </div>
      </div>

      {/* Listings Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">{authUser.firstName}'s listings</h2>
          <Link
            href="/posts"
            className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            Show all
          </Link>
        </div>

        {latestPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">No listings yet</p>
            <p className="text-gray-400 text-sm mb-6">Start by creating your first property listing</p>
            <Link
              href="/posts/new"
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Listing
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link href={`/posts/${post.id}`} key={post.id} className="group space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={post.pictures[0]}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-gray-600 text-sm">{post.address}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {post.averageRating ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">{post.averageRating}</span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">No ratings yet</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600">{post.price} lei per night</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
