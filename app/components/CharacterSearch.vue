<script setup lang="ts">
const props = defineProps<{ name: string }>()
const emit = defineEmits<{ search: [name: string] }>()
const draft = ref(props.name)
watch(() => props.name, (name) => { draft.value = name })
</script>
<template>
  <form role="search" class="flex gap-4 rounded-lg bg-canvas p-4" @submit.prevent="emit('search', draft.trim())">
    <label for="character-search" class="sr-only">Search characters by name</label>
    <input id="character-search" v-model="draft" name="name" type="search" placeholder="Search for characters..." maxlength="100" class="h-12 min-w-0 flex-1 rounded-sm bg-field px-4 text-sm text-white placeholder:text-white focus-visible:-outline-offset-2" />
    <button type="submit" aria-label="Search characters" class="flex h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-accent px-4 text-sm font-bold text-black hover:bg-accent/85"><AppIcon name="search" class="size-4" /><span>Search</span></button>
  </form>
</template>
