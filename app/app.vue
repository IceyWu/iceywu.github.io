<script setup>
const ogUrl = 'https://iceywu.github.io/'
const ogImage = `${ogUrl}og.png#1`
const title = 'IceyWu.me'
const description = 'Regardless of the past, do not ask the future.'

useHead({
  title: 'IceyWu',
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/avatar.png' },
  ],
  meta: [
    { name: 'author', content: 'IceyWu' },
    { hid: 'description', name: 'description', content: 'IceyWu\' Portfolio' },
    { hid: 'keywords', name: 'keywords', content: 'IceyWu, Blog, Portfolio' },

    { property: 'og:type', content: 'website' },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { property: 'og:image', content: ogImage },
    { name: 'twitter:title', content: title },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:site', content: '@IceyWu_zyyv' },
    { name: 'twitter:url', content: ogUrl },

    { 'http-equiv': 'pragma', 'content': 'no-cache' },
    { 'http-equiv': 'cache-control', 'content': 'no-cache' },
    { 'http-equiv': 'expires', 'content': '0' },
  ],
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0',
})

// 页面过渡动画
const { getTransitionHooks } = usePageTransition()
const transitionHooks = getTransitionHooks()
</script>

<template>
  <NuxtLoadingIndicator
    :height="1"
    color="repeating-linear-gradient(to right,rgba(192,132,252,1) 0%,rgba(248,113,113,1) 50%,rgba(45,212,191,1) 100%)"
  />
  <NuxtLayout>
    <NuxtPage
      :transition="{
        name: 'page',
        mode: 'out-in',
        ...transitionHooks,
      }"
    />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
