'use client';

import Image from "next/image";
import ShareButton from "@/app/single-post/ShareButton";
import { Button } from "@/components/ui/button";
import { User, MapPin } from "lucide-react";
import ImageCarousel from "@/app/components/ImageCarousel";
import { useState, useEffect } from 'react';

export default function SinglePostPage({ params }: { params: { id: number } }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [nights, setNights] = useState(1);
  const [post, setPost] = useState<any>(null);

  // Update nights when dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    }
  }, [checkIn, checkOut]);

  const isValidBooking = () => {
    if (!checkIn || !checkOut) return true;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return end > start;
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert('Please select both check-in and check-out dates');
      return;
    }
    if (!isValidBooking()) {
      alert('Check-out date must be after check-in date');
      return;
    }
    console.log('Booking details:', {
      checkIn,
      checkOut,
      nights
    });
  };

  useEffect(() => {
    const loadPost = async () => {
      const postData = await fetch(`/api/posts/${params.id}`).then(res => res.json());
      setPost(postData);
    };
    loadPost();
  }, [params.id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold dark:text-white mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.userId ? 'User ' + post.userId : 'Anonymous'}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{post.address}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 
                 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Image Carousel and Description */}
        <div className="lg:w-2/3">
          <div className="max-w-2xl mx-auto">
            <ImageCarousel images={post.pictures} title={post.title} />
          </div>

          <div className="mt-8 bg-white dark:bg-gray-800/50 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {post.description}
            </p>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 sticky top-24">
            {/* Price */}
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-bold dark:text-white">{post.price} lei</span>
              <span className="text-gray-500 dark:text-gray-400">/night</span>
            </div>

            {/* Booking Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="border dark:border-gray-700 rounded-lg p-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Check-in</div>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-transparent dark:text-white focus:outline-none"
                  />
                </div>
                <div className="border dark:border-gray-700 rounded-lg p-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Check-out</div>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full bg-transparent dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Nights display */}
              {checkIn && checkOut && (
                <div className="border dark:border-gray-700 rounded-lg p-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Nights</div>
                  <div className="dark:text-white">
                    {nights} night{nights !== 1 ? 's' : ''}
                  </div>
                </div>
              )}

              <Button
                className="property-btn bg-red-500 dark:bg-400 hover:bg-red-600"

              >
                Book
              </Button>

              {/* Price calculation section */}
              {checkIn && checkOut && (
                <div className="border-t dark:border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="dark:text-gray-300">
                      {`$${post.price} × ${nights} night${nights !== 1 ? 's' : ''}`}
                    </span>
                    <span className="dark:text-white">
                      ${post.price * nights}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold mt-4">
                    <span className="dark:text-gray-300">Total</span>
                    <span className="dark:text-white">
                      ${post.price * nights}
                    </span>
                  </div>
                </div>
              )}

            </div>

            {/* Details */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <dl className="space-y-4">
                <div>
                  <dt className="text-gray-500 dark:text-gray-400 text-sm">Location</dt>
                  <dd className="mt-1 dark:text-white">{post.address}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 dark:text-gray-400 text-sm">Check-in</dt>
                  <dd className="mt-1 dark:text-white">3:00 PM - 8:00 PM</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
