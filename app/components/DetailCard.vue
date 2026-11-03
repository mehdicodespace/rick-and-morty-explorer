<script setup lang="ts">
defineProps<{ title: string; subtitle: string; description: string }>()
</script>

<template>
  <article class="min-w-0 rounded-2xl bg-panel p-4">
    <h3 class="text-xl leading-6 font-bold">{{ title }}</h3>
    <p class="mt-4 text-base leading-5 font-bold text-cyan">{{ subtitle }}</p>
    <p class="mt-4 text-base leading-5 text-muted">{{ description }}</p>
  </article>
</template>
