import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request, cookies }) => {
  const { clientId } = params;

  if (!clientId) {
    return new Response(
      JSON.stringify({ error: "Missing clientId parameter" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(JSON.stringify({ method: "GET", clientId }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  const { clientId } = params;

  if (!clientId) {
    return new Response(
      JSON.stringify({ error: "Missing clientId parameter" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(JSON.stringify({ method: "PATCH", clientId }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const DELETE: APIRoute = async ({ params, request, cookies }) => {
  const { clientId } = params;

  if (!clientId) {
    return new Response(
      JSON.stringify({ error: "Missing clientId parameter" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(JSON.stringify({ method: "DELETE", clientId }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
