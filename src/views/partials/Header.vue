<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
    <header class="top-0 w-full bg-[var(--p-content-background)] z-50">
        <div class="max-w-7xl mx-auto relative">
            <div class="rounded-3xl">
                <img
                    class="mx-auto w-full h-36 md:h-48 rounded-3xl object-cover bg-[var(--p-surface-50)]"
                    src="/images/xan-cover-large.png"
                />
            </div>
        </div>
    </header>
</template>
