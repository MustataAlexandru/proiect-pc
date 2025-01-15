"use server";
import { currentUser, getAuth , auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import db from './db';
import { Post } from "@prisma/client";


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

export const fetchAllPosts = async (
    // {search = ""}: {search: string}
) => {

    const posts = await db.post.findMany({
        // where: {
        //     OR: [
        //         { title: { contains: search , mode: 'insensitive'} },
        //     ]
        // }
    });
    return posts;
}
   
export const fetchSinglePost = async ( postId : number) => {
    const id = Number(postId)
    const post = await db.post.findUnique({
        where: {
            id
        }
    });
    if(!post) redirect('/')
    return post;
}
