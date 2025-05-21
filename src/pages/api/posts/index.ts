import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  const posts = await getCollection("blog");
  if (slug) {
    const filteredPosts = posts.filter((post) => post.id === slug);
    if (filteredPosts.length > 0) {
      return new Response(JSON.stringify(filteredPosts), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify([]), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
