import prisma from "@/db";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { v4 as UUID } from "uuid";

export const prerender = false;

const clients = [
  { id: UUID(), name: "John Doe", age: 29, is_active: true },
  { id: UUID(), name: "Jane Smith", age: 34, is_active: false },
  { id: UUID(), name: "Michael Johnson", age: 45, is_active: true },
  { id: UUID(), name: "Emily Davis", age: 22, is_active: false },
  { id: UUID(), name: "William Brown", age: 31, is_active: true },
  { id: UUID(), name: "Sophia Wilson", age: 27, is_active: false },
  { id: UUID(), name: "James Garcia", age: 38, is_active: true },
  { id: UUID(), name: "Olivia Miller", age: 41, is_active: false },
  { id: UUID(), name: "Daniel Martinez", age: 36, is_active: true },
  { id: UUID(), name: "Ava Anderson", age: 25, is_active: false },
];

export const GET: APIRoute = async ({ params, request }) => {
  // borrar los usuarios
  await prisma.client.deleteMany();

  // Limpiar los posts
  await prisma.post.deleteMany();

  // Insertar usuarios
  await prisma.client.createMany({
    data: clients,
  });

  // Insertar posts
  // Collection Blog
  // id = post.id
  // title: post.title
  // likes: Math.round(Math.random() * 100)
  const blogPosts = await getCollection("blog");
  const postsData = blogPosts.map((post) => ({
    id: post.id,
    title: post.data.title,
    likes: Math.round(Math.random() * 100),
  }));

  await prisma.post.createMany({
    data: postsData,
  });

  return new Response(JSON.stringify({ message: "Hello World" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
