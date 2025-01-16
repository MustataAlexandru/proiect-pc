import { fetchAllPosts } from "../utils/actions";
import PostCard from "./PostCard";


export default async function AllPosts({searchParams = {}} : {searchParams: {search?: string}}) {
  const search = searchParams?.search || '';
  const posts = await fetchAllPosts({search});
  if(posts.length === 0) return <p> No properties yet. </p>
  return <section className="pt-36 pb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
    {posts.map((post) => {return <PostCard key={post.id} postInfo={post} />})}
  </section>
}