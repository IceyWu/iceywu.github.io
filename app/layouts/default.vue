<script setup>
const route = useRoute();
const isHome = computed(() => route.path === "/");
</script>

<template>
  <NavHeader v-if="!isHome" />
  <main :class="isHome ? '' : 'px-10 box-border'" flex="~ col 1">
    <slot />
  </main>
  <Bg v-if="!isHome" />
</template>
