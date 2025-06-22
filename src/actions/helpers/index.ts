import prisma from "@/db";

export async function getPostIdLikes(postId: string) {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return { likes: 0, exists: false };
  }

  return {
    likes: post.likes || 0,
    exists: true,
  };
}
