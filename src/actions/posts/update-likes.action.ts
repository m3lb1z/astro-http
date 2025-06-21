import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { getPostIdLikes } from "../helpers";
import prisma from "@/db";

export const updateLikeCount = defineAction({
  input: z.object({
    postId: z.string(),
    increment: z.number(),
  }),
  handler: async ({ postId, increment }) => {
    const { likes, exists } = await getPostIdLikes(postId);

    if (!exists) {
      const newPost = {
        id: postId,
        title: "Post not title",
        likes: increment,
      };

      await prisma.post.create({
        data: newPost,
      });
      return true;
    }

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: likes + increment,
      },
    });

    return true;
  },
});
