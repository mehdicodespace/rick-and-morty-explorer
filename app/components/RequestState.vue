<script setup lang="ts">
defineProps<{ title: string; message: string; retry?: boolean }>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <div role="status" class="rounded-2xl bg-panel px-6 py-12 text-center">
    <h2 class="text-xl font-bold">{{ title }}</h2>
    <p class="mt-3 text-muted">{{ message }}</p>
    <button
      v-if="retry"
      class="mt-6 rounded-sm bg-accent px-5 py-3 font-bold text-black"
      @click="$emit('retry')"
    >
      Try again
    </button>
  </div>
</template>
