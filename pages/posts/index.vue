<script lang='ts' setup>
import type { Article } from '~/types'
import { useTitle } from '@vueuse/core'

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

function sortArticles(list: Article[]) {
  return list.filter(item => item._dir === 'posts').sort((a, b) => {
    return new Date(b.ctime).getTime() - new Date(a.ctime).getTime()
  })
}
</script>

<template>
  <!-- origin in markdown.css -->
  <div prose ma>
    <PageHeader title="Posts" description="Some boring but useful articles." />
    <ContentList>
      <template #default="{ list }">
        <template v-for="article in sortArticles(list)" :key="article._id">
          <nuxt-link
            v-if="!article.draft"
            :to="article._path"
            important-no-underline
            block
            op-70
            hover:op-100
          >
            <h3 text-lg md-text-xl>
              {{ article.title }}
            </h3>
            <div
              italic
              fic
              text-sm
              text-gray4
              fw-normal
            >
              {{ new Date(article.ctime).toDateString() }}
            </div>
          </nuxt-link>
        </template>
      </template>
      <template #not-found>
        No Posts Found
      </template>
    </ContentList>
  </div>
</template>
