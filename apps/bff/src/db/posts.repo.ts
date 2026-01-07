import { promises as fs } from 'node:fs'
import path from 'node:path'

export type Post = {
  slug: string
  title: string
  summary: string
  content: string
}

const FILE = path.join(process.cwd(), 'src', 'data', 'posts.json')

export async function readPosts(): Promise<Post[]> {
  const raw = await fs.readFile(FILE, 'utf-8')
  return JSON.parse(raw) as Post[]
}

export async function writePosts(posts: Post[]): Promise<void> {
  await fs.writeFile(FILE, JSON.stringify(posts, null, 2), 'utf-8')
}
