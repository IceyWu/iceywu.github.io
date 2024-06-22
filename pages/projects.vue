<script lang="ts" setup>
import { to } from '@iceywu/utils'

// import { useTitle } from '@vueuse/core'

const [_, { data: repoGroup }] = await to(useFetch('/api/repos'))

const [errTest, { data: dataTest }] = await to(useFetch(new URL(`/api/test`, import.meta.url).href, {
  onRequestError({ request, options, error }) {
    console.log('🍧-----onRequestError request, options, error-----', request, options, error)
    // Handle the request errors
  },
  onResponseError({ request, response, options }) {
    console.log('🌳-----onResponseError-----', request, response, options)
    // Handle the response errors
  },
}))
console.log('🌳-----dataTest-----', dataTest.value, errTest)

// useTitle('Projects | IceyWu')
// useHead({
//   title: 'Projects | IceyWu',
//   meta: [
//     {
//       hid: 'description',
//       name: 'description',
//       content: 'List of projects that I am proud of.',
//     },
//     {
//       hid: 'keywords',
//       name: 'keywords',
//       content: 'projects, github, open source, vue, nuxt, node, javascript, typescript',
//     },
//   ],
// })
</script>

<template>
  <div prose ma>
    <PageHeader
      title="Projects"
      description="List of projects that I am proud of."
    />
    <RepoPanel
      v-for="(repos, key) in repoGroup"
      :key="key"
      :label="key"
      :data="repos"
    />
  </div>
</template>
