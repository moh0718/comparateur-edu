import { Header } from "@/components/Header";
import { BlogClient } from "@/components/blog/BlogClient";
import { fetchAllPosts } from "@/lib/blog";

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await fetchAllPosts();
  return (
    <>
      <Header />
      <BlogClient posts={posts} />
    </>
  );
}
