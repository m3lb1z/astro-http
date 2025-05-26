import { actions, defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, Posts, eq } from "astro:db";
import { getPostIdLikes } from "../helpers";

export const updatePostLikes = defineAction({
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

      await db.insert(Posts).values(newPost);
      return true;
    }

    await db
      .update(Posts)
      .set({
        likes: likes + increment,
      })
      .where(eq(Posts.id, postId));

    return true;
  },
});
