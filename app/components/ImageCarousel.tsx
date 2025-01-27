'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageCarouselProps {
  images: string[]
  title: string
}

const ImageCarousel = ({ images = [], title }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // If no images, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No images available</span>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
      <Image
        src={images[currentIndex]}
        alt={`${title} - Image ${currentIndex + 1}`}
        fill
        loading="lazy"
        className="object-cover"
      />
      
      {images.length > 1 && (
        <>
          <button
            onClick={previousImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            ←
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            →
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageCarousel 