<script setup lang="ts">
import type { Character } from '#shared/types/rick-morty'
defineProps<{ character: Character; priority?: boolean }>()
const imageFailed = ref(false)
</script>

<template>
  <NuxtLink
    :to="`/characters/${character.id}`"
    :prefetch="false"
    class="group block rounded-2xl border border-transparent p-[15px] transition-colors hover:border-white/15 focus-visible:border-accent"
  >
    <article>
      <div class="aspect-square overflow-hidden rounded-lg bg-field">
        <img
          v-if="!imageFailed"
          :src="character.image"
          :alt="character.name"
          width="300"
          height="300"
          :loading="priority ? 'eager' : 'lazy'"
          :fetchpriority="priority ? 'high' : 'auto'"
          class="size-full object-cover transition-transform duration-200 motion-safe:group-hover:scale-[1.025]"
          @error="imageFailed = true"
        />
        <span v-else class="flex h-full items-center justify-center text-muted">
          Image unavailable
        </span>
      </div>
      <h2 class="mt-4 text-xl leading-6 font-bold">{{ character.name }}</h2>
      <CharacterStatus class="mt-3" :status="character.status" :species="character.species" />
    </article>
  </NuxtLink>
</template>
