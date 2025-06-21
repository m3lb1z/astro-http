import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { getPostIdLikes } from "../helpers";

export const getPostLikes = defineAction({
  input: z.string(),
  handler: async (postId) => {
    return await getPostIdLikes(postId);
  },
});
