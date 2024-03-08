<script setup lang="ts">
const { date, title } = defineProps({
  date: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
})
const module = await import(`../content/demos/${title}.gif`)
</script>

<template>
  <div>
    <a
      border="~ base rounded-lg"
      block
      of-hidden
      class="group"
      hover="scale-101 shadow-xl z-10"
      transition-all
      duration-500
      bg-base
      relative
      :href="link"
      target="_blank"
    >
      <img :src="module?.default">
      <div class="prose prose-sm p4 m0 pb3">
        <slot />
        <div op50 text-sm pt2>{{ formatDate(date, false) }}</div>
      </div>
    </a>
  </div>
</template>
