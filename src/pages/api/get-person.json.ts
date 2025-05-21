import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const person = {
    name: "John Doe",
    age: 30,
    city: "New York",
  };

  return new Response(JSON.stringify(person), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
