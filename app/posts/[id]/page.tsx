import { fetchSinglePost } from "@/app/utils/actions";
import BreadCrumbs from "@/app/single-post/BreadCrumbs";
import Image from "next/image";
import ShareButton from "@/app/single-post/ShareButton";

export default async function SinglePostPage({ params }: { params: { id: number }}) {
  const post = await fetchSinglePost(params.id);

  return (
    <section>
      <BreadCrumbs name={post.title} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <div className="relative h-full">
          <Image
            src={post.pictures[0]}
            alt={post.title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50%, 33vw"
            priority
            className="w-full rounded object-cover"
          />
        </div>
        <div className='flex gap-x-8 items-start flex-col'>
                <div className='flex gap-8'>
                <h1 className='capitalize text-3xl font-bold'>{post.title}</h1>
                <div className='flex items-center gap-x-2'>
                
                <ShareButton title={post.title} postId={params.id}/>
                </div>
                
                </div>
      </div>
    </section>
  );
}
