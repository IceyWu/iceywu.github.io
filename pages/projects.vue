<script lang="ts" setup>
import { to } from "@iceywu/utils";

// import { useTitle } from '@vueuse/core'

const [err, { data: repoGroup }] = await to(useFetch('/api/repos'))
console.log('🎉-----err-----', err);
console.log("🐳-----repoGroup-----", repoGroup.value);

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
