import express from 'express'
import dotenv from 'dotenv'
import { postsRouter } from './routes/posts'


dotenv.config()

const app = express()
app.use(express.json())
app.use('/api/posts', postsRouter)
const PORT = Number(process.env.PORT ?? 8787)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'bff', time: new Date().toISOString() })
})

// demo：文章列表
app.get('/api/posts', (_req, res) => {
  res.json([
    { slug: 'hello-vue', title: 'Hello Vue', summary: 'Vue3 + Router + Layout' },
    { slug: 'first-post', title: 'First Post', summary: 'BFF demo API' }
  ])
})

// demo：文章內頁
app.get('/api/posts/:slug', (req, res) => {
  const slug = String(req.params.slug ?? '')
  res.json({
    slug,
    title: slug.split('-').map(s => s[0]?.toUpperCase() + s.slice(1)).join(' '),
    content: `This is content for ${slug}.`
  })
})

app.listen(PORT, () => {
  console.log(`[BFF] http://localhost:${PORT}`)
})
