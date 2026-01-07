<template>
    <section class="page">
        <div class="breadcrumb">
            <RouterLink to="/posts">← Back to Posts</RouterLink>
        </div>

        <h1>{{ title }}</h1>
        <p class="muted">slug：{{ safeSlug }}</p>
        <article class="article">
            <p>這裡是文章內容示例。下一步可以改成讀 JSON 或 Markdown。</p>
        </article>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ slug?: string }>()

const safeSlug = computed(() => props.slug ?? '')

const title = computed(() => {
    if (!safeSlug.value) return 'Post'
    return safeSlug.value
        .split('-')
        .map((s) => s[0]?.toUpperCase() + s.slice(1))
        .join(' ')
})
</script>