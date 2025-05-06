<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <header class="sticky top-0 w-full bg-[var(--p-content-background)] shadow-md z-50">
        <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <RouterLink to="/" class="text-xl font-bold">
                <img class="w-16 h-10 md:w-24 md:h-12 object-cover" src="/images/xan-logo.jpg" />
            </RouterLink>
            <nav class="flex space-x-4">
                <RouterLink to="/" class="" exact> Home </RouterLink>
                <RouterLink to="/order" class=""> Order </RouterLink>
            </nav>
        </div>
    </header>
</template>
