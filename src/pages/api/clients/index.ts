import type { APIRoute } from "astro";
import { db, Clients } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request, cookies }) => {
  try {
    const clients = await db.select().from(Clients);
    return new Response(JSON.stringify(clients), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return new Response(JSON.stringify({ message: "Error fetching clients" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const POST: APIRoute = async ({ params, request, cookies }) => {
  try {
    const { id, ...body } = await request.json();
    // Basic validation

    // Insert the new client into the database
    const { lastInsertRowid } = await db.insert(Clients).values(body);

    // Note: Astro DB insert doesn't return the inserted object directly by default.
    // You might need a subsequent select if you need the full object with ID.
    // For this example, we'll just return a success message.

    return new Response(
      JSON.stringify({ id: +lastInsertRowid!.toString(), ...body }),
      {
        status: 201, // 201 Created
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating client:", error);
    return new Response(JSON.stringify({ message: "Error creating client" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
