<script setup lang="ts">
import { paginationItems } from '#shared/utils/pagination'

const props = defineProps<{ page: number; total: number; name: string }>()
const items = computed(() => paginationItems(props.page, props.total))

const toPage = (page: number) => ({
  path: '/',
  query: { name: props.name || undefined, page: page > 1 ? page : undefined },
})
</script>

<template>
  <nav
    v-if="total > 1"
    aria-label="Character pages"
    class="flex items-center justify-center gap-1 sm:gap-2"
  >
    <template v-if="page <= 1">
      <span
        aria-label="First page"
        aria-disabled="true"
        class="flex size-7 items-center justify-center text-muted/40"
      >
        <AppIcon name="first" />
      </span>
      <span
        aria-label="Previous page"
        aria-disabled="true"
        class="flex size-7 items-center justify-center text-muted/40"
      >
        <AppIcon name="chevron-left" />
      </span>
    </template>
    <template v-else>
      <NuxtLink
        :to="toPage(1)"
        aria-label="First page"
        :prefetch="false"
        class="flex size-7 items-center justify-center text-muted hover:text-white"
      >
        <AppIcon name="first" />
      </NuxtLink>
      <NuxtLink
        :to="toPage(page - 1)"
        aria-label="Previous page"
        :prefetch="false"
        class="flex size-7 items-center justify-center text-muted hover:text-white"
      >
        <AppIcon name="chevron-left" />
      </NuxtLink>
    </template>

    <template v-for="(item, index) in items" :key="`${item}-${index}`">
      <span
        v-if="item === 'ellipsis'"
        class="flex size-6 items-center justify-center text-muted"
        aria-hidden="true"
      >
        …
      </span>
      <NuxtLink
        v-else
        :to="toPage(item)"
        :aria-label="`Page ${item}`"
        :aria-current="item === page ? 'page' : undefined"
        :prefetch="false"
        class="flex size-6 items-center justify-center rounded-full text-base font-bold"
        :class="item === page ? 'bg-accent text-canvas' : 'text-muted hover:text-white'"
      >
        {{ item }}
      </NuxtLink>
    </template>
    <template v-if="page >= total">
      <span
        aria-label="Next page"
        aria-disabled="true"
        class="flex size-7 items-center justify-center text-muted/40"
      >
        <AppIcon name="chevron-right" />
      </span>
      <span
        aria-label="Last page"
        aria-disabled="true"
        class="flex size-7 items-center justify-center text-muted/40"
      >
        <AppIcon name="last" />
      </span>
    </template>
    <template v-else>
      <NuxtLink
        :to="toPage(page + 1)"
        aria-label="Next page"
        :prefetch="false"
        class="flex size-7 items-center justify-center text-muted hover:text-white"
      >
        <AppIcon name="chevron-right" />
      </NuxtLink>
      <NuxtLink
        :to="toPage(total)"
        aria-label="Last page"
        :prefetch="false"
        class="flex size-7 items-center justify-center text-muted hover:text-white"
      >
        <AppIcon name="last" />
      </NuxtLink>
    </template>
  </nav>
</template>
