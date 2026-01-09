import { prisma } from "./prisma"

export type PostCreate = {
  slug: string
  title: string
  summary?: string
  content?: string
}

export type PostUpdate = {
  title?: string
  summary?: string
  content?: string
}

function cleanUndefined<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>
}

export async function listPosts() {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: { slug: true, title: true, summary: true, createdAt: true },
  })
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    select: { slug: true, title: true, summary: true, content: true, createdAt: true, updatedAt: true },
  })
}

export async function createPost(data: PostCreate) {
  return prisma.post.create({
    data: {
      slug: data.slug,
      title: data.title,
      summary: data.summary ?? "",
      content: data.content ?? "",
    },
    select: { slug: true, title: true, summary: true, content: true, createdAt: true, updatedAt: true },
  })
}

export async function updatePost(slug: string, patch: PostUpdate) {
  const exists = await prisma.post.findUnique({ where: { slug }, select: { slug: true } })
  if (!exists) return null

  const data = cleanUndefined({
    title: patch.title,
    summary: patch.summary,
    content: patch.content,
  })

  return prisma.post.update({
    where: { slug },
    data,
    select: { slug: true, title: true, summary: true, content: true, createdAt: true, updatedAt: true },
  })
}

export async function deletePost(slug: string) {
  const exists = await prisma.post.findUnique({ where: { slug }, select: { slug: true } })
  if (!exists) return false
  await prisma.post.delete({ where: { slug } })
  return true
}
