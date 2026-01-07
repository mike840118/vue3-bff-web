import { Router } from 'express'
import { PostCreateSchema, PostUpdateSchema } from '../schemas/posts'
import { listPosts, getPost, createPost, updatePost, deletePost } from '../services/posts'

export const postsRouter = Router()

postsRouter.get('/', async (_req, res) => {
  res.json(await listPosts())
})

postsRouter.get('/:slug', async (req, res) => {
  const post = await getPost(String(req.params.slug))
  if (!post) return res.status(404).json({ message: 'NOT_FOUND' })
  res.json(post)
})

postsRouter.post('/', async (req, res) => {
  const parsed = PostCreateSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())

  try {
    const created = await createPost(parsed.data)
    res.status(201).json(created)
  } catch (e) {
    if (e instanceof Error && e.message === 'SLUG_EXISTS') {
      return res.status(409).json({ message: 'SLUG_EXISTS' })
    }
    return res.status(500).json({ message: 'SERVER_ERROR' })
  }
})

postsRouter.put('/:slug', async (req, res) => {
  const slug = String(req.params.slug)
  const parsed = PostUpdateSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())

  const updated = await updatePost(slug, parsed.data)
  if (!updated) return res.status(404).json({ message: 'NOT_FOUND' })
  res.json(updated)
})

postsRouter.delete('/:slug', async (req, res) => {
  const ok = await deletePost(String(req.params.slug))
  if (!ok) return res.status(404).json({ message: 'NOT_FOUND' })
  res.status(204).send()
})
