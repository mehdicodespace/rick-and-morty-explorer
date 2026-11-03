<script setup lang="ts">
definePageMeta({
  validate: (route) => {
    if (typeof route.params.id !== 'string') return false
    return /^[1-9]\d*$/.test(route.params.id)
  },
})

const route = useRoute()
const id = computed(() => Number(route.params.id))
const { data, error, status, refresh } = await useCharacterDetails(id)
const imageFailed = ref(false)

if (error.value?.statusCode === 404) {
  throw createError({ statusCode: 404, statusMessage: 'Character not found' })
}

watch(id, () => {
  imageFailed.value = false
})
useSeoMeta({
  title: () =>
    data.value ? `${data.value.character.name} — Rick and Morty` : 'Character — Rick and Morty',
  description: () =>
    data.value
      ? `Explore ${data.value.character.name}, their episodes, origin, and current location.`
      : 'Explore character details from Rick and Morty.',
  ogImage: () => data.value?.character.image,
})
</script>

<template>
  <div>
    <a
      href="#details"
      class="sr-only fixed top-2 left-2 z-50 rounded bg-accent p-3 text-black focus:not-sr-only"
    >
      Skip to character details
    </a>
    <div class="character-hero">
      <SiteHeader />
      <div class="page-container pt-12 pb-8 md:pt-16 md:pb-16">
        <div
          v-if="data"
          class="relative isolate flex flex-col gap-4 md:flex-row md:items-center md:gap-12"
        >
          <div class="character-glow" aria-hidden="true" />
          <div class="size-45 shrink-0 overflow-hidden rounded-lg bg-field md:size-60">
            <img
              v-if="!imageFailed"
              :src="data.character.image"
              :alt="data.character.name"
              width="300"
              height="300"
              fetchpriority="high"
              class="size-full object-cover"
              @error="imageFailed = true"
            />
            <span v-else class="flex h-full items-center justify-center text-sm text-muted">
              Image unavailable
            </span>
          </div>
          <div>
            <h1 class="text-2xl leading-8 font-bold md:text-[32px] md:leading-10">
              {{ data.character.name }}
            </h1>
            <CharacterStatus
              class="mt-3"
              :status="data.character.status"
              :species="data.character.species"
            />
          </div>
        </div>
        <h1 v-else class="text-2xl font-bold">Character details</h1>
      </div>
    </div>
    <main id="details" class="page-container pt-8 pb-16 md:pt-16" :aria-busy="status === 'pending'">
      <RequestState
        v-if="status === 'pending'"
        title="Loading character…"
        message="Finding episodes and locations."
      />
      <RequestState
        v-else-if="error"
        :title="error.statusCode === 404 ? 'Character not found' : 'Could not load character'"
        message="Please try again or return to the character list."
        retry
        @retry="refresh()"
      />
      <template v-else-if="data">
        <section aria-labelledby="episodes-title">
          <h2
            id="episodes-title"
            class="mb-5 flex items-center gap-4 text-2xl leading-8 font-bold md:mb-6"
          >
            <AppIcon name="episodes" class="size-5 text-accent" />
            Episodes
          </h2>
          <div
            v-if="data.episodes.length"
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
          >
            <DetailCard
              v-for="episode in data.episodes"
              :key="episode.id"
              :title="episode.name"
              :subtitle="episode.episode.replace(/(S\d+)(E\d+)/, '$1 $2')"
              :description="episode.air_date"
            />
          </div>
          <p v-else class="text-muted">No episodes are available for this character.</p>
        </section>
        <section aria-labelledby="locations-title" class="mt-8 md:mt-16">
          <h2
            id="locations-title"
            class="mb-5 flex items-center gap-4 text-2xl leading-8 font-bold md:mb-6"
          >
            <AppIcon name="location" class="size-5 text-accent" />
            Locations
          </h2>
          <div
            v-if="data.locations.length"
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
          >
            <DetailCard
              v-for="location in data.locations"
              :key="location.id"
              :title="location.name"
              :subtitle="location.type || 'Unknown type'"
              :description="location.dimension"
            />
          </div>
          <p v-else class="text-muted">
            The origin and current location of this character are unknown.
          </p>
        </section>
      </template>
    </main>
  </div>
</template>

<style scoped>
.character-hero {
  overflow: hidden;
  background: linear-gradient(110deg, #2b2e2f, #0b0b0b 65%);
}

.character-glow {
  position: absolute;
  z-index: -1;
  pointer-events: none;
  left: -160px;
  top: 20px;
  width: 480px;
  height: 400px;
  background: radial-gradient(ellipse, #a3c91d99 0%, #a3c91d40 35%, transparent 70%);
}

@media (min-width: 48rem) {
  .character-glow {
    left: -40px;
    top: -150px;
    width: 560px;
    height: 480px;
  }
}
</style>
