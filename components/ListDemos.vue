<script setup lang="ts">
import { to } from '@iceywu/utils'
import { breakpointsTailwind } from '@vueuse/core'

const [err, { data }] = await to(useAsyncData('/content', () =>
  queryContent('/demos').find()))

console.log('🍭-----data-----', data.value, err)
const demoItems = data.value
  ?.map((item, idx) => {
    const { date = '2024-02-03', link } = item
    return {
      comp: item,
      date,
      idx,
      link,
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

const breakpoints = useBreakpoints(breakpointsTailwind)

const cols = computed(() => {
  if (breakpoints.xl.value)
    return 3
  if (breakpoints.lg.value)
    return 2
  return 1
})

const parts = computed(() => {
  const result = Array.from(
    { length: cols.value },
    () => [] as typeof demoItems,
  )

  demoItems?.forEach((item, i) => {
    result[i % cols.value].push(item)
  })
  return result
})
</script>

<template>
  <div grid="~ cols-1 lg:cols-2 xl:cols-3 gap-4">
    <div v-for="(items, idx) of parts" :key="idx" flex="~ col gap-4">
      <WrapperDemo
        v-for="dataObj of items"
        :key="dataObj.date"
        :data="dataObj"
        class="slide-enter"
        :style="{
          '--enter-stage': idx + 1,
        }"
      >
        <ContentRenderer :value="dataObj.comp">
          <ContentRendererMarkdown :value="dataObj.comp" />
        </ContentRenderer>
      </WrapperDemo>
    </div>
  </div>
</template>
