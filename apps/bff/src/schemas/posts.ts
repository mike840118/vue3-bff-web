import { z } from 'zod'

export const PostCreateSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().default(''),
  content: z.string().default('')
})

export const PostUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  summary: z.string().optional(),
  content: z.string().optional()
})
