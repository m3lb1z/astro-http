import type { APIRoute } from "astro";
import { db, eq, Clients } from "astro:db";

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

  // Convert clientId to a number, as the database ID is a number
  const id = parseInt(clientId, 10);

  if (isNaN(id)) {
    return new Response(
      JSON.stringify({ error: "Invalid clientId parameter" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    // Query the database for the client with the matching ID
    const clients = await db.select().from(Clients).where(eq(Clients.id, id));

    // Check if a client was found
    if (clients.length === 0) {
      return new Response(
        JSON.stringify({ error: `Client with id ${clientId} not found` }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Return the first client found (should be only one due to primary key)
    const client = clients[0];

    return new Response(JSON.stringify(client), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Database query error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  const clientId = parseInt(params.clientId ?? "", 10);
  if (clientId) {
    const { id, ...body } = await request.json();
    const [client] = await db
      .update(Clients)
      .set(body)
      .where(eq(Clients.id, clientId))
      .returning();
    if (client) {
      return new Response(JSON.stringify(client), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
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
    const { rowsAffected } = await db
      .delete(Clients)
      .where(eq(Clients.id, clientId));

    if (rowsAffected > 0) {
      return new Response(JSON.stringify({ msg: "Deleted", id: clientId }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    // const [client] = await db
    //   .delete(Clients)
    //   .where(eq(Clients.id, clientId))
    //   .returning();
    // if (client) {
    //   return new Response(JSON.stringify({ msg: "Deleted", id: client.id }), {
    //     status: 200,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    // }
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
