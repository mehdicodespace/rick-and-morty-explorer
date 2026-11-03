<script setup lang="ts">
import type { Character } from '#shared/types/rick-morty'
const characters = [
  { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth (C-137)', url: '' }, location: { name: 'Citadel of Ricks', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg', episode: [], url: '', created: '' },
  { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'unknown', url: '' }, location: { name: 'Citadel of Ricks', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg', episode: [], url: '', created: '' },
  { id: 3, name: 'Summer Smith', status: 'Alive', species: 'Human', type: '', gender: 'Female', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg', episode: [], url: '', created: '' },
  { id: 4, name: 'Beth Smith', status: 'Alive', species: 'Human', type: '', gender: 'Female', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg', episode: [], url: '', created: '' },
] satisfies Character[]
</script>
<template>
  <div>
    <div class="hero-surface pb-6"><SiteHeader /></div>
    <main class="page-container pt-16 pb-16">
      <h1 class="sr-only">Rick and Morty characters</h1>
      <div class="grid grid-cols-4 gap-6"><CharacterCard v-for="(character, index) in characters" :key="character.id" :character="character" :priority="index === 0" /></div>
      
    </main>
  </div>
</template>
