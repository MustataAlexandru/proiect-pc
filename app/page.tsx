import Image from "next/image";
import AllPosts from '@/app/posts/posts';
import { Suspense } from "react";
import LoadingContainer from "./global/LoadingContainer";

export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingContainer />}>
        <AllPosts />
      </Suspense>
    </>
  );
}
