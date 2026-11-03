<script setup lang="ts">
const props = defineProps<{
  name: 'search' | 'chevron-left' | 'chevron-right' | 'first' | 'last' | 'episodes' | 'location'
}>()

const paths: Record<string, string> = {
  search: 'M21 21l-4.4-4.4M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z',
  'chevron-left': 'm14 6-6 6 6 6',
  'chevron-right': 'm10 6 6 6-6 6',
  first: 'm12 6-6 6 6 6m6-12-6 6 6 6',
  last: 'm6 6 6 6-6 6m6-12 6 6-6 6',
  episodes:
    'M4 9H13V7H4V9ZM4 6H13V4H4V6ZM2 16C1.45 16 .979167 15.8042 .5875 15.4125C.195833 15.0208 0 14.55 0 14V2C0 1.45 .195833 .979167 .5875 .5875C.979167 .195833 1.45 0 2 0H18C18.55 0 19.0208 .195833 19.4125 .5875C19.8042 .979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2Z',
  location:
    'M8 10C8.55 10 9.02083 9.80417 9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10ZM8 20C5.31667 17.7167 3.3125 15.5958 1.9875 13.6375C.6625 11.6792 0 9.86667 0 8.2C0 5.7 .804167 3.70833 2.4125 2.225C4.02083 .741667 5.88333 0 8 0C10.1167 0 11.9792 .741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 9.86667 15.3375 11.6792 14.0125 13.6375C12.6875 15.5958 10.6833 17.7167 8 20Z',
}

const isFilled = computed(() => props.name === 'episodes' || props.name === 'location')

const viewBox = computed(() => {
  if (props.name === 'episodes') return '0 0 20 16'
  if (props.name === 'location') return '0 0 16 20'
  return '0 0 24 24'
})
</script>

<template>
  <svg
    :viewBox="viewBox"
    class="size-5 shrink-0"
    aria-hidden="true"
    focusable="false"
    :fill="isFilled ? 'currentColor' : 'none'"
    :stroke="isFilled ? 'none' : 'currentColor'"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path :d="paths[name]" />
  </svg>
</template>
