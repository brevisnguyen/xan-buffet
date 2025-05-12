<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
    <header class="top-0 w-full bg-[var(--p-content-background)] z-50">
        <div class="max-w-7xl mx-auto relative">
            <div class="rounded-3xl px-2 md:px-0">
                <img
                    class="mx-auto w-full h-36 md:h-48 rounded-3xl object-cover bg-[var(--p-surface-50)]"
                    src="/images/xan-cover-large.png"
                />
            </div>
            <div class="absolute inset-x-0 -bottom-4 md:-bottom-7 flex items-center justify-center">
                <Button asChild v-slot="slotProps">
                    <RouterLink to="/" :class="slotProps.class">
                        <div class="flex flex-col gap-2 items-center justify-center">
                            <i class="pi pi-home"></i>
                            <p class="hidden md:block">Trang chủ</p>
                        </div>
                    </RouterLink>
                </Button>
            </div>
        </div>
    </header>
</template>
