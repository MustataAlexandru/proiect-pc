import { NextResponse } from 'next/server';

export async function GET() {
  const posts = [
    {
      id: 1,
      title: "Cozy Apartment in the City",
      description: "A modern and stylish apartment in the heart of the city.",
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
    },
    {
      id: 2,
      title: "Beachfront Villa",
      description: "Enjoy a serene beachfront stay with stunning ocean views.",
      image: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg"
    },
    {
      id: 3,
      title: "Mountain Cabin",
      description: "A peaceful retreat in the mountains, perfect for nature lovers.",
      image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
    },
  ];
  return NextResponse.json(posts);
}