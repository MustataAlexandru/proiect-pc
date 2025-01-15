import { NextResponse } from 'next/server';
import prisma from '../../utils/db';
import dummyData from './dummy.json';

export async function POST() {
  try {
    await Promise.all(
      dummyData.map(async (postData) => {
        await prisma.post.create({
          data: postData,
        });
      })
    );

    return NextResponse.json({
      message: "Posts added successfully",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: "Failed to add posts", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: "Failed to fetch posts", details: errorMessage },
      { status: 500 }
    );
  }
}