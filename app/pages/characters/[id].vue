<script setup lang="ts">
import type { Character } from '#shared/types/rick-morty'
const characters = [
  { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth (C-137)', url: '' }, location: { name: 'Citadel of Ricks', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg', episode: [], url: '', created: '' },
  { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'unknown', url: '' }, location: { name: 'Citadel of Ricks', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg', episode: [], url: '', created: '' },
  { id: 3, name: 'Summer Smith', status: 'Alive', species: 'Human', type: '', gender: 'Female', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg', episode: [], url: '', created: '' },
  { id: 4, name: 'Beth Smith', status: 'Alive', species: 'Human', type: '', gender: 'Female', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg', episode: [], url: '', created: '' },
] satisfies Character[]
const route = useRoute()
const character = characters.find(character => character.id === Number(route.params.id)) || characters[0]!
</script>
<template>
  <div>
    <div class="hero-surface"><SiteHeader /><div class="page-container flex items-center gap-12 py-16"><img :src="character.image" :alt="character.name" width="240" height="240" class="rounded-lg" /><div><h1 class="text-3xl font-bold">{{ character.name }}</h1><CharacterStatus class="mt-3" :status="character.status" :species="character.species" /></div></div></div>
    <main class="page-container py-16">
      <section><h2 class="mb-6 text-2xl font-bold">Episodes</h2><div class="grid grid-cols-4 gap-6"><DetailCard title="Pilot" subtitle="S01 E01" description="December 2, 2013" /></div></section>
      <section class="mt-16"><h2 class="mb-6 text-2xl font-bold">Locations</h2><div class="grid grid-cols-4 gap-6"><DetailCard :title="character.location.name" subtitle="Planet" description="Unknown dimension" /></div></section>
    </main>
  </div>
</template>
