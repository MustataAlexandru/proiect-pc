import { NextResponse } from 'next/server';
import { fetchSinglePost } from '@/app/utils/actions';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await fetchSinglePost(Number(params.id));
    
    // If post doesn't have tags, add some dummy ones
    if (!post.tags || post.tags.length === 0) {
      post.tags = ['Beachfront', 'Pool', 'Pet friendly', 'Wifi'];
    }
    
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
} 