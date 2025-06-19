import prisma from "@/db";
import type { APIRoute } from "astro";
import { validate as uuidValidate, version as uuidVersion } from "uuid";

export const prerender = false;

function isUUIDv4(uuid: string): boolean {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

async function getClientById(clientId: string) {
  return await prisma.client.findUnique({
    where: {
      id: clientId,
    },
  });
}

export const GET: APIRoute = async ({ params, request, cookies }) => {
  const clientId = params.clientId as string;

  if (!isUUIDv4(clientId)) {
    return new Response(
      JSON.stringify({ error: `Invalid UUID format: ${clientId}` }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const client = await getClientById(clientId);

  if (!client) {
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

  return new Response(JSON.stringify(client), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  const clientId = params.clientId as string;

  if (!isUUIDv4(clientId)) {
    return new Response(
      JSON.stringify({ error: `Invalid UUID format: ${clientId}` }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const client = await getClientById(clientId);

  if (!client) {
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

  try {
    const { id, ...body } = await request.json();

    const updatedClient = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: body,
    });

    return new Response(JSON.stringify(updatedClient), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: "Failed to update client" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const DELETE: APIRoute = async ({ params, request, cookies }) => {
  const clientId = params.clientId as string;

  if (!isUUIDv4(clientId)) {
    return new Response(
      JSON.stringify({ error: `Invalid UUID format: ${clientId}` }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const client = await getClientById(clientId);

  if (!client) {
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

  try {
    await prisma.client.delete({
      where: {
        id: clientId,
      },
    });

    return new Response(
      JSON.stringify({
        message: `Client with id ${clientId} deleted successfully`,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: "Failed to delete client" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
