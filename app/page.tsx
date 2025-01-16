import AllPosts from '@/app/posts/page';

export default function Home({
  searchParams = {}
}: {
  searchParams: { search?: string }
}) {
  return (
    <>
      <AllPosts searchParams={searchParams} />
    </>
  );
}
