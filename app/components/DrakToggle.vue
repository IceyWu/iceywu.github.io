<script lang="ts" setup>
import DarkModeIcon from './nav/DarkModeIcon.vue'
import LightModeIcon from './nav/LightModeIcon.vue'

const buttonRef = ref<HTMLElement | null>(null)

// 简单切换主题
function handleClick() {
  isDark.value = !isDark.value
}
</script>

<template>
  <ClientOnly>
    <button
      ref="buttonRef"
      :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      icon-btn
      class="!outline-none w-auto h-auto dark-toggle"
      @click="handleClick"
    >
      <template v-if="isDark">
        <DarkModeIcon />
      </template>
      <template v-else>
        <LightModeIcon />
      </template>
    </button>
  </ClientOnly>
</template>

<style scoped>
.dark-toggle {
  will-change: transform;
}
</style>
