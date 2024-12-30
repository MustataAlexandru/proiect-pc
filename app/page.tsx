import AllPosts from '@/app/posts/page';
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
