'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageCarouselProps {
  images: string[]
  title: string
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const previousImage = () => {
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1))
  }

  const nextImage = () => {
    setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1))
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
        <Image
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          fill
          priority
          className="object-cover"
        />
        
        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1"
          onClick={previousImage}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1"
          onClick={nextImage}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {/* <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden 
              ${currentIndex === index ? 'ring-2 ring-blue-500' : 'opacity-70'}`}
          >
            <Image
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div> */}
    </div>
  )
} 