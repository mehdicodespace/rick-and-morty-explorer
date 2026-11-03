<script setup lang="ts">
const props = defineProps<{ name: string }>()
const emit = defineEmits<{ search: [name: string]; typing: [] }>()
const draft = ref(props.name)
let timer: number | undefined
let lastSubmitted = props.name

function cancelTimer() {
  clearTimeout(timer)
}

function submit() {
  cancelTimer()
  lastSubmitted = draft.value.trim()
  emit('search', lastSubmitted)
}

function scheduleSearch(event: Event) {
  cancelTimer()
  if ((event as InputEvent).isComposing) return
  emit('typing')
  if (!draft.value.trim()) return submit()
  timer = setTimeout(submit, 300)
}

function startComposition() {
  cancelTimer()
  emit('typing')
}

watch(
  () => props.name,
  (value) => {
    if (value === lastSubmitted) return
    cancelTimer()
    draft.value = value
    lastSubmitted = value
  },
)
onBeforeUnmount(cancelTimer)
</script>

<template>
  <form role="search" class="flex gap-4 rounded-lg bg-canvas p-4" @submit.prevent="submit">
    <label for="character-search" class="sr-only">Search characters by name</label>
    <input
      id="character-search"
      v-model="draft"
      name="name"
      type="search"
      placeholder="Search for characters..."
      maxlength="100"
      class="h-12 min-w-0 flex-1 rounded-sm bg-field px-4 text-sm text-white placeholder:text-white focus-visible:-outline-offset-2"
      @input="scheduleSearch"
      @compositionstart="startComposition"
    />
    <button
      type="submit"
      aria-label="Search characters"
      class="flex h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-accent px-4 text-sm font-bold text-black transition-colors hover:bg-accent/85"
    >
      <AppIcon name="search" class="size-4" />
      <span class="hidden sm:inline">Search</span>
    </button>
  </form>
</template>
