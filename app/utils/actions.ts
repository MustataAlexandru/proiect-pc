"use server";
import { currentUser, getAuth, auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import db from './db';
import { Post, User } from "@prisma/client";
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';
import { ValidationError } from './errors';

const renderError = (error: unknown): { message: string } => {
    return {
      message: error instanceof Error ? error.message : "An error occured",
    };
};

export const getAuthUser = async () => {
    const user = await currentUser();
    if(!user) redirect('/');
    return user;
}

export const getOrCreateDbUser = async (clerkUser: any) => {
    let dbUser = await db.user.findFirst({
        where: {
            email: clerkUser.emailAddresses[0]?.emailAddress
        }
    });

    if (!dbUser) {
        dbUser = await db.user.create({
            data: {
                clerkId: clerkUser.id,
                username: clerkUser.username || '',
                email: clerkUser.emailAddresses[0]?.emailAddress || '',
                password: '',
            }
        });
    }

    return dbUser;
}

export const createPost = async (
    userId: number,
    postData: {
        title: string;
        description: string;
        address: string;
        price: any;
        tags: string[];
        images: File[];
    }
) => {
    // Validate price before proceeding
    const priceNumber = Math.floor(Number(postData.price));
    if (isNaN(priceNumber)) {
        throw new ValidationError('Price must be a valid number');
    }
    if (priceNumber <= 0) {
        throw new ValidationError('Price must be greater than 0 lei');
    }
    if (priceNumber !== Number(postData.price)) {
        throw new ValidationError('Price must be a whole number (no decimals)');
    }

    const imageUrls: string[] = [];

    // Ensure images directory exists
    const imagesDir = join(process.cwd(), 'public', 'images');
    try {
        await mkdir(imagesDir, { recursive: true });
    } catch (error: any) {
        if (error.code !== 'EEXIST') {
            throw error;
        }
    }

    // Save images to public directory
    for (const image of postData.images) {
        // Convert File to ArrayBuffer
        const arrayBuffer = await image.arrayBuffer();
        
        // Create a hash of the file content using the ArrayBuffer directly
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 8);

        // Get file extension
        const ext = image.name.split('.').pop()?.toLowerCase() || '';
        
        // Generate unique filename using hash
        const filename = `${hash}-${Date.now()}.${ext}`;
        const path = join(imagesDir, filename);
        
        // Check if file already exists
        try {
            await writeFile(path, new Uint8Array(arrayBuffer), { flag: 'wx' });
            imageUrls.push(`/images/${filename}`);
        } catch (error: any) {
            // If file exists, just use the existing path
            if (error.code === 'EEXIST') {
                imageUrls.push(`/images/${filename}`);
                continue;
            }
            throw error;
        }
    }

    // Create post in database
    try {
        const post = await db.post.create({
            data: {
                userId,
                title: postData.title,
                description: postData.description,
                address: postData.address,
                price: priceNumber,
                tags: postData.tags,
                pictures: imageUrls,
            },
        });
        return post;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to create post. Please check all fields and try again.');
    }
}

export const fetchAllPosts = async ({search = ""}: {search: string}) => {
    const posts = await db.post.findMany({
        where: {
            OR:[
                {title: {contains: search , mode:'insensitive'}},
                {address: {contains: search , mode:'insensitive'}}
            ]
        },
        orderBy: {
            id: 'asc',
        }
    });
    return posts;
}
   
export const fetchSinglePost = async (postId: number) => {
    const id = Number(postId)
    const post = await db.post.findUnique({
        where: {
            id
        }
    });
    if(!post) redirect('/')
    return post;
}
