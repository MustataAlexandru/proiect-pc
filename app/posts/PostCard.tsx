import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type PostCardProps = {
  postInfo: {
    id: number;
    title: string;
    description: string;
    address: string;
    date: Date;
    price: number;
    tags: string[];
    pictures: string[];
  };
};

function PostCard({ postInfo }: PostCardProps) {
  return (
    <article key={postInfo.id} className="group relative">
      <Link href={`/posts/${postInfo.id}`}>
        <Card className="transform group-hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          
            
          
          
          <CardContent className="p-6">
            <div className="relative h-72 md:h-56 w-full mb-4 overflow-hidden rounded-lg">
              
              <Image
                src={postInfo.pictures[0]}
                alt={postInfo.title}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px) 100vw, 100vw"
                className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h2 className="text-2xl font-bold text-center tracking-tight">{postInfo.title}</h2>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">{postInfo.description}</p>
              
              <div className="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-muted-foreground">{postInfo.address}</span>
              </div>

              {postInfo.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {postInfo.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
              <p className="text-lg font-semibold">
                {postInfo.price.toLocaleString()} lei
              </p>
              <Button 
                className="property-btn bg-red-500 dark:bg-400 hover:bg-red-600" 
                
              >
                Book
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </article>
  );
}

export default PostCard;
