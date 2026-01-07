<template>
    <section class="page">
        <h1>Posts</h1>
        <p class="muted">點一篇文章進去看</p>

        <div class="list">
            <RouterLink class="listItem" to="/posts/hello-vue">
                <div class="listTitle">Hello Vue</div>
                <div class="muted">Vue3 + Router 基礎骨架</div>
            </RouterLink>

            <RouterLink class="listItem" to="/posts/first-post">
                <div class="listTitle">First Post</div>
                <div class="muted">第二篇示例文章</div>
            </RouterLink>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BffApi, type PostListItem } from '../services/api'

const items = ref<PostListItem[]>([])

onMounted(async () => {
    items.value = await BffApi.posts()
})
</script>
