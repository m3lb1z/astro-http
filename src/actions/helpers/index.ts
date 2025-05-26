import { db, Posts, eq } from "astro:db";

export async function getPostById(postId: string) {
  const [post] = await db.select().from(Posts).where(eq(Posts.id, postId));
  return post;
}

export async function getPostIdLikes(postId: string) {
  const post = await getPostById(postId);

  if (!post) {
    return { likes: 0, exists: false };
  }

  return {
    likes: post.likes,
    exists: true,
  };
}
