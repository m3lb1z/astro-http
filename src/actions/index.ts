import { getGreeting } from "./greetings/get-greeting.action";
import { getPostLikes } from "./posts/get-post-likes.action";
import { updateLikeCount } from "./posts/update-likes.action";

export const server = {
  getGreeting,
  getPostLikes,
  updateLikeCount,
};
