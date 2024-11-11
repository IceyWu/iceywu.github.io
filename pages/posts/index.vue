<script lang='ts' setup>
import { useTitle } from '@vueuse/core'
// import type { Article } from '~/types'

useTitle('Posts | IceyWu')
useHead({
  title: 'Posts | IceyWu',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Some articles.',
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: 'posts, articles, blog',
    },
  ],
})
</script>

<template>
  <!-- origin in markdown.css -->
  <div prose ma>
    post
  </div>
</template>
