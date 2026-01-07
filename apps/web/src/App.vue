<template>
  <div class="app">
    <AppHeader />

    <div class="container">
      <aside class="sidebar">
        <AppMenu />
      </aside>

      <main class="main">
        <RouterView />
      </main>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppMenu from './components/layout/AppMenu.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>
