import "dotenv/config"
import { prisma } from "../src/db/prisma"

async function main() {
  const posts = [
    {
      slug: "hello-vue",
      title: "Hello Vue",
      summary: "Vue3 + Router + Layout",
      content: "This is a seeded post.",
    },
    {
      slug: "first-post",
      title: "First Post",
      summary: "BFF demo API (seeded)",
      content: "Hello from Prisma seed.",
    },
  ]

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},          // 已存在就什麼都不做
      create: post,        // 不存在才建立
    })
  }

  const count = await prisma.post.count()
  console.log(`[seed] posts: ${count}`)
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
