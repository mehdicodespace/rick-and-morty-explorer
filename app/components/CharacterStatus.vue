<script setup lang="ts">
import type { Character } from '#shared/types/rick-morty'
defineProps<{ status: Character['status']; species: string }>()
</script>

<template>
  <p class="flex items-center gap-2 text-base leading-6">
    <span
      class="size-3 shrink-0 rounded-full"
      :class="status === 'Alive' ? 'bg-alive' : status === 'Dead' ? 'bg-dead' : 'bg-muted'"
      aria-hidden="true"
    />
    {{ status }}-{{ species }}
  </p>
</template>
