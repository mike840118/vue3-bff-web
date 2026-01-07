import { readPosts, writePosts, type Post } from '../db/posts.repo'

export async function listPosts(): Promise<Post[]> {
  return readPosts()
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await readPosts()
  return posts.find(p => p.slug === slug) ?? null
}

export async function createPost(post: Post): Promise<Post> {
  const posts = await readPosts()
  if (posts.some(p => p.slug === post.slug)) throw new Error('SLUG_EXISTS')
  posts.unshift(post)
  await writePosts(posts)
  return post
}

export async function updatePost(slug: string, patch: Partial<Post>): Promise<Post | null> {
  const posts = await readPosts()
  const idx = posts.findIndex(p => p.slug === slug)
  if (idx === -1) return null

  const next = { ...posts[idx], ...patch, slug }
  posts[idx] = next
  await writePosts(posts)
  return next
}

export async function deletePost(slug: string): Promise<boolean> {
  const posts = await readPosts()
  const next = posts.filter(p => p.slug !== slug)
  if (next.length === posts.length) return false
  await writePosts(next)
  return true
}
