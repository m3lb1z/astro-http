import prisma from "@/db";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request, cookies }) => {
  const clients = await prisma.client.findMany();
  if (!clients) {
    return new Response(JSON.stringify({ error: "No clients found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return new Response(JSON.stringify(clients), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const POST: APIRoute = async ({ params, request, cookies }) => {
  const { id, ...body } = await request.json();

  try {
    const client = await prisma.client.create({
      data: {
        ...body,
      },
    });

    return new Response(JSON.stringify({ method: "POST", ...client }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating client:", error);
    return new Response(JSON.stringify({ error: "Failed to create client" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
