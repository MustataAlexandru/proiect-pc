import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <Link href={`/property/${postInfo.id}`}>
        <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
        <h2 className="text-xl font-semibold text-center mt-8">{postInfo.title}</h2>
          <CardContent className="p-8">
            <div className="relative h-64 md:h-48 md:w-full">
            
              <Image
                src={postInfo.pictures[0]}
                alt={postInfo.title}
                fill
                sizes="(max-width:768px) 100vw , (max-width:1200px) 100vw , 100vw"
                className="rounded object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              
              
              <p className="border-b-2">{postInfo.description}</p>
              <p>{postInfo.address}</p>
            </div>
            
            
          </CardContent>
          <div className="flex flex-col items-center">
          <Button className="property-btn" disabled>
              Book
            </Button>
            <p className="text-center">Price: {postInfo.price} lei.</p>
            </div>
        </Card>
      </Link>
    </article>
  );
}

export default PostCard;
