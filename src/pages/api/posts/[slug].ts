import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const { slug } = params;

  const post = await getEntry("blog", slug as string);
  if (!post) {
    return new Response(JSON.stringify({ message: "Post not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const POST: APIRoute = async ({ params, request, cookies }) => {
  return new Response(JSON.stringify({ method: "POST" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const DELETE: APIRoute = async ({ params, request, cookies }) => {
  const { slug } = params;

  return new Response(JSON.stringify({ method: "DELETE", slug: slug }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
