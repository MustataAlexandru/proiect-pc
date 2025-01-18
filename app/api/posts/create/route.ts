import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/app/utils/actions';

export async function POST(request: NextRequest) {
  try {
    const clerkUser = await getAuthUser();
    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get or create user in our database
    let dbUser = await prisma.user.findFirst({
      where: {
        email: clerkUser.emailAddresses[0]?.emailAddress
      }
    });

    if (!dbUser) {
      // Create new user if they don't exist in our database
      dbUser = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          username: clerkUser.username || '',
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          password: '', // You might want to handle this differently
        }
      });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const address = formData.get('address') as string;
    const price = parseFloat(formData.get('price') as string);
    const tags = (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(Boolean);
    const images = formData.getAll('images') as File[];

    const imageUrls: string[] = [];

    // Save images to public directory
    for (const image of images) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Generate unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const filename = `${uniqueSuffix}-${image.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
      const path = join(process.cwd(), 'public', 'images', filename);
      
      await writeFile(path, new Uint8Array(buffer));
      imageUrls.push(`/images/${filename}`);
    }

    // Create post in database using the user's database ID
    const post = await prisma.post.create({
      data: {
        userId: dbUser.id,
        title,
        description,
        address,
        price,
        tags,
        pictures: imageUrls,
      },
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