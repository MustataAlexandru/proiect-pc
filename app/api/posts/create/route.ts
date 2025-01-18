import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, getOrCreateDbUser, createPost } from '@/app/utils/actions';

export async function POST(request: NextRequest) {
  try {
    const clerkUser = await getAuthUser();
    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await getOrCreateDbUser(clerkUser);

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const address = formData.get('address') as string;
    const price = parseFloat(formData.get('price') as string);
    const tags = (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(Boolean);
    const images = formData.getAll('images') as File[];

    const post = await createPost(dbUser.id, {
      title,
      description,
      address,
      price,
      tags,
      images,
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 