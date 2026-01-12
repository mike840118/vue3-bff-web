<template>
    <div>
        <p v-for="(text, index) in about" :key="index" class="muted">
            {{ text }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

const about = ref<string[]>([])

onMounted(async () => {
    const res = await fetch("/api/profile/about")
    const data = await res.json()
    about.value = data.data
})
</script>
