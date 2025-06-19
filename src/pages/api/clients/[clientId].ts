import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request, cookies }) => {
  const clientId = parseInt(params.clientId ?? "", 10);
  if (clientId) {
    return new Response(JSON.stringify({ method: "GET", clientId: clientId }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(
    JSON.stringify({ error: `Client with id ${clientId} not found` }),
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  const clientId = parseInt(params.clientId ?? "", 10);
  if (clientId) {
    return new Response(
      JSON.stringify({ method: "PATCH", clientId: clientId }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(
    JSON.stringify({ error: `Client with id ${clientId} not found` }),
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const DELETE: APIRoute = async ({ params, request, cookies }) => {
  const clientId = parseInt(params.clientId ?? "", 10);

  if (clientId) {
    return new Response(
      JSON.stringify({ method: "DELETE", clientId: clientId }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  return new Response(
    JSON.stringify({ error: `Missing id: ${clientId} parameter` }),
    {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
