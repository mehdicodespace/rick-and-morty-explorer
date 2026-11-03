<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
</script>

<template>
  <div class="min-h-screen">
    <div class="hero-surface"><SiteHeader /></div>
    <main class="page-container py-16 text-center">
      <p class="text-accent">{{ error.statusCode }}</p>
      <h1 class="mt-4 text-3xl font-bold">
        {{ error.statusCode === 404 ? 'Character or page not found' : 'Something went wrong' }}
      </h1>
      <p class="mt-4 text-muted">
        {{
          error.statusCode === 404
            ? 'This address does not lead to a character or page.'
            : 'Please return to the character list and try again.'
        }}
      </p>
      <button
        class="mt-8 rounded bg-accent px-5 py-3 font-bold text-black"
        @click="clearError({ redirect: '/' })"
      >
        Back to characters
      </button>
    </main>
  </div>
</template>
