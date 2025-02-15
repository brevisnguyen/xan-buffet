<script setup>
import { ref, computed } from "vue";
import Home from "./views/Home.vue";
</script>

<template>
    <div class="container mx-auto max-w-5xl font-roboto">
        <Home></Home>
        <Toast />
    </div>
</template>
