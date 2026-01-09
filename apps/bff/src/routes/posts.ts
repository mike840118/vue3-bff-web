import { Router } from "express"
import { createPost, deletePost, getPost, listPosts, updatePost } from "../db/posts.repo"

export const postsRouter = Router()

postsRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await listPosts()
    res.json(rows)
  } catch (e) {
    next(e)
  }
})

postsRouter.get("/:slug", async (req, res, next) => {
  try {
    const slug = String(req.params.slug ?? "")
    const row = await getPost(slug)
    if (!row) return res.status(404).json({ message: "Post not found" })
    res.json(row)
  } catch (e) {
    next(e)
  }
})

postsRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body ?? {}
    if (!body.slug || !body.title) {
      return res.status(400).json({ message: "slug and title are required" })
    }
    const created = await createPost({
      slug: String(body.slug),
      title: String(body.title),
      summary: body.summary ? String(body.summary) : undefined,
      content: body.content ? String(body.content) : undefined,
    })
    res.status(201).json(created)
  } catch (e: any) {
    // slug unique constraint
    if (e?.code === "P2002") return res.status(409).json({ message: "slug already exists" })
    next(e)
  }
})

postsRouter.patch("/:slug", async (req, res, next) => {
  try {
    const slug = String(req.params.slug ?? "")
    const body = req.body ?? {}
    const updated = await updatePost(slug, {
      title: body.title !== undefined ? String(body.title) : undefined,
      summary: body.summary !== undefined ? String(body.summary) : undefined,
      content: body.content !== undefined ? String(body.content) : undefined,
    })
    if (!updated) return res.status(404).json({ message: "Post not found" })
    res.json(updated)
  } catch (e) {
    next(e)
  }
})

postsRouter.delete("/:slug", async (req, res, next) => {
  try {
    const slug = String(req.params.slug ?? "")
    const ok = await deletePost(slug)
    if (!ok) return res.status(404).json({ message: "Post not found" })
    res.status(204).send()
  } catch (e) {
    next(e)
  }
})
