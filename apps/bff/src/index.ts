import express from "express"
import "dotenv/config"
import { postsRouter } from "./routes/posts"
import { profileRouter } from "./routes/profile"

const app = express()
app.use("/api/posts", postsRouter)

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "bff", time: new Date().toISOString() })
})

app.use("/api/profile", profileRouter)
app.use("/api/posts", postsRouter)

// 簡單 error handler（不然 async error 會直接噴 stack）
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("[BFF] error:", err)
  res.status(500).json({ message: "Internal Server Error" })
})

const PORT = Number(process.env.PORT ?? 8787)
app.listen(PORT, () => {
  console.log(`[BFF] http://localhost:${PORT}`)
})
