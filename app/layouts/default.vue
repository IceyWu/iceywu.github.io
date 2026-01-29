<script setup>
const route = useRoute();
const isHome = computed(() => route.path === "/");
</script>

<template>
  <NavHeader v-if="!isHome" />
  <main>
    <slot />
  </main>
  <Bg v-if="!isHome" />
</template>
