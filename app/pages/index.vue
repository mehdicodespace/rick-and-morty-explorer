<script setup lang="ts">
import { parsePage } from '#shared/utils/pagination'
const route = useRoute()
const page = computed(() => parsePage(route.query.page))
const name = ref('')
const { data, status, error, refresh } = await useCharacters(page, name, 12)

</script>
<template>
  <div>
    <div class="hero-surface pb-6"><SiteHeader /><div class="page-container mt-6"><CharacterSearch :name="name"  /></div></div>
    <main class="page-container pt-16 pb-16" :aria-busy="status === 'pending'">
      <h1 class="sr-only">Rick and Morty characters</h1>
      <RequestState v-if="status === 'pending'" title="Loading characters…" message="Finding characters." />
      <RequestState v-else-if="error?.statusCode === 404" title="No characters found" message="Try another name or page." />
      <RequestState v-else-if="error" title="Could not load characters" message="Please try again." retry @retry="refresh()" />
      <template v-else-if="data"><div class="grid grid-cols-4 gap-6"><CharacterCard v-for="(character, index) in data.results" :key="character.id" :character="character" :priority="index === 0" /></div>
      <AppPagination class="mt-10" :page="page" :total="data.info.pages" :name="name" /></template>
    </main>
  </div>
</template>
