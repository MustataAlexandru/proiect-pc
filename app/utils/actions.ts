"use server";
import { currentUser, getAuth , auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import db from './db'

const renderError = (error: unknown): { message: string } => {
  
    return {
      message: error instanceof Error ? error.message : "An error occured",
    };
  };


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
    const post = await db.post.findUnique({
        where: {
            id: postId
        }
    });
    if(!post) redirect('/posts');
    return post;
}
