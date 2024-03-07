<script setup lang="ts">
// import { breakpointsTailwind } from "@vueuse/nuxt";

const demoItems = Array.from({ length: 10 }, (_, idx) => ({
  comp: "DemoCard",
  date: new Date().toISOString(),
  video: `https://www.youtube.com/watch?v=6v2L2UGZJAM&t=${idx}`,
}));

// const breakpoints = useBreakpoints(breakpointsTailwind);

// const cols = computed(() => {
//   if (breakpoints.xl.value) return 3;
//   if (breakpoints.lg.value) return 2;
//   return 1;
// });

const parts = computed(() => {
  return demoItems;
});
</script>

<template>
  <div grid="~ cols-1 lg:cols-2 xl:cols-3 gap-4">
    <div v-for="(items, idx) of parts" :key="idx" flex="~ col gap-4">
      <!-- {{ items }} -->
      <WrapperDemo />
      <!-- <component
        :is="comp"
        v-for="{ comp, date, video } of items"
        :key="date"
        :date="date"
        :video="video"
        class="slide-enter"
        :style="{
          '--enter-stage': idx + 1,
        }"
      /> -->
    </div>
  </div>
</template>
