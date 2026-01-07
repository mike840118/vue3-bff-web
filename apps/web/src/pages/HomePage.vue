<template>
    <section class="page">
        <h1>Home</h1>

        <div class="cardGrid">
            <RouterLink class="card" to="/posts">
                <div class="cardTitle">Posts</div>
                <div class="muted">文章列表</div>
            </RouterLink>

            <RouterLink class="card" to="/about">
                <div class="cardTitle">About</div>
                <div class="muted">關於我</div>
            </RouterLink>
        </div>
    </section>
</template>
