<script setup lang="ts">
definePageMeta({
  layout: 'map',
})

const iframeRef = ref<HTMLIFrameElement | null>(null)
const baseUrl = 'https://lpalette.cn/map/iLlQQhGlOPh3gsUPFKkoVhFX2Al7fA3IEjczQohgA7c'

// 客户端挂载后获取正确的主题
const iframeSrc = ref('')
onMounted(() => {
  const theme = isDark.value ? 'dark' : 'light'
  iframeSrc.value = `${baseUrl}?theme=${theme}`
})

// 监听主题变化，通知 iframe
watch(isDark, (dark) => {
  iframeRef.value?.contentWindow?.postMessage(
    { type: 'theme-change', theme: dark ? 'dark' : 'light' },
    '*',
  )
})
</script>

<template>
  <iframe
    ref="iframeRef"
    :src="iframeSrc"
    class="w-full h-full border-none"
    style="min-height: calc(100vh - 60px);"
  />
</template>
