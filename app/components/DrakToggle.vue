<script lang="ts" setup>
import DarkModeIcon from './nav/DarkModeIcon.vue'
import LightModeIcon from './nav/LightModeIcon.vue'
</script>

<template>
  <ClientOnly>
    <button
      :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      icon-btn
      class="!outline-none w-auto h-auto"
      @click="toggleDark"
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
