<template>
    <div class="menu">
        <div class="menuTitle">Menu</div>

        <RouterLink to="/" class="menuItem" active-class="active">🏠 Home</RouterLink>
        <RouterLink to="/posts" class="menuItem" active-class="active">📝 Posts</RouterLink>
        <RouterLink to="/about" class="menuItem" active-class="active">👤 About</RouterLink>

        <div class="menuDivider"></div>

        <div class="menuTitle">Featured</div>
        <RouterLink to="/posts/hello-vue" class="menuItem" active-class="active">
            🔥 Hello Vue
        </RouterLink>
    </div>
</template>
