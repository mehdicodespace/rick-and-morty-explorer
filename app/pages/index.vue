<script setup lang="ts">
import { parsePage } from '#shared/utils/pagination'

const route = useRoute()
const pageSize = 12
const page = computed(() => parsePage(route.query.page))
const name = computed(() => (typeof route.query.name === 'string' ? route.query.name.trim() : ''))
const { data, status, error, refresh, clear } = await useCharacters(page, name, pageSize)
const isTyping = ref(false)
const loading = computed(() => isTyping.value || status.value === 'pending')
const notFound = computed(() => error.value?.statusCode === 404)
const empty = computed(() => notFound.value || (data.value && !data.value.results.length))

function startTyping() {
  isTyping.value = true
  if (status.value === 'pending') clear()
}

async function search(value: string) {
  if (value !== name.value || page.value !== 1) {
    await navigateTo({ path: '/', query: { name: value || undefined } }, { replace: true })
  } else if (!data.value && status.value !== 'pending') {
    await refresh()
  }
  isTyping.value = false
}

watch(
  () => route.fullPath,
  () => {
    isTyping.value = false
  },
)

watch(
  [page, name],
  () => {
    if (import.meta.server) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })
  },
  { flush: 'post' },
)

useSeoMeta({
  title: () =>
    name.value ? `${name.value} — Rick and Morty characters` : 'Rick and Morty characters',
  description: 'Search the Rick and Morty universe. Browse characters, episodes, and locations.',
})
</script>

<template>
  <div>
    <a
      href="#characters"
      class="sr-only fixed top-2 left-2 z-50 rounded bg-accent p-3 text-black focus:not-sr-only"
    >
      Skip to characters
    </a>
    <div class="hero-surface pb-6">
      <SiteHeader class="max-md:h-16" />
      <div class="page-container mt-2 md:mt-6">
        <CharacterSearch :name="name" @typing="startTyping" @search="search" />
      </div>
    </div>
    <main
      id="characters"
      class="page-container scroll-mt-4 pt-8 pb-12 md:pt-16 md:pb-16"
      :aria-busy="loading"
    >
      <h1 class="sr-only">Rick and Morty characters</h1>
      <div v-if="loading" role="status">
        <p class="sr-only">Loading characters…</p>
        <div
          class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          aria-hidden="true"
        >
          <div v-for="item in pageSize" :key="item" class="p-4 motion-safe:animate-pulse">
            <div class="aspect-square rounded-lg bg-field" />
            <div class="mt-4 h-6 w-2/3 rounded bg-field" />
            <div class="mt-3 h-5 w-1/2 rounded bg-field" />
          </div>
        </div>
      </div>
      <RequestState
        v-else-if="empty"
        title="No characters found"
        :message="
          page > 1
            ? 'This page has no results. Try the first page or another search.'
            : `No characters match “${name}”. Try another name.`
        "
      />
      <RequestState
        v-else-if="error"
        title="Could not load characters"
        message="The character service is unavailable. Please try again."
        retry
        @retry="refresh()"
      />
      <template v-else-if="data">
        <div
          class="character-results grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <CharacterCard
            v-for="(character, index) in data.results"
            :key="character.id"
            :character="character"
            :priority="index === 0"
          />
        </div>
        <AppPagination class="mt-10" :page="page" :total="data.info.pages" :name="name" />
      </template>
      <NuxtLink
        v-if="empty && page > 1"
        :to="{ path: '/', query: { name: name || undefined } }"
        class="mt-6 inline-block text-accent underline"
      >
        Return to first page
      </NuxtLink>
    </main>
  </div>
</template>

<style scoped>
.character-results {
  animation: results-in 180ms ease-out;
}

@keyframes results-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .character-results {
    animation: none;
  }
}
</style>
