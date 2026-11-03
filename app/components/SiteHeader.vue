<template>
  <header class="page-container flex h-12 items-center md:h-16">
    <NuxtLink to="/" aria-label="Rick and Morty home" class="inline-flex">
      <img
        src="/rick-and-morty.svg"
        alt="Rick and Morty"
        width="116"
        height="36"
        class="h-9 w-29"
        fetchpriority="high"
      />
    </NuxtLink>
  </header>
</template>
