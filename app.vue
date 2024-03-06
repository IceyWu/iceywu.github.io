<script setup>
useHead({
  title: 'IceyWu',
  link: [
    { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
  ],
  meta: [
    { name: 'author', content: 'IceyWu' },
    { hid: 'description', name: 'description', content: 'IceyWu\' Portfolio' },
    { hid: 'keywords', name: 'keywords', content: 'IceyWu, Blog, Portfolio' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:site', content: '@iceywu' },
    { property: 'og:title', content: 'IceyWu' },
    { property: 'og:image', content: 'https://avatars.githubusercontent.com/u/66096254?v=4' },

    { 'http-equiv': 'pragma', 'content': 'no-cache' },
    { 'http-equiv': 'cache-control', 'content': 'no-cache' },
    { 'http-equiv': 'expires', 'content': '0' },
  ],
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0',
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator
      :height="1"
      color="repeating-linear-gradient(to right,rgba(192,132,252,1) 0%,rgba(248,113,113,1) 50%,rgba(45,212,191,1) 100%)"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
