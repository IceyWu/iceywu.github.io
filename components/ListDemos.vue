<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

// 获取../data/demo文件夹下的所有md文件
const { data } = await useAsyncData('content', () =>
  queryContent('/demos').find(),
)

const demoItems = data.value?.map((item, idx) => {
  const { date = '2024-02-03' } = item
  return {
    comp: item,
    date: date.slice(2, -3) as string,
    idx,
    video:
      idx === 1
        ? 'http://nest-js.oss-accelerate.aliyuncs.com/nestTest/noId/dy1.mp4'
        : 'http://nest-js.oss-accelerate.aliyuncs.com/nestTest/noId/2023-03-07%2021.05.02_%E5%93%AA%E6%9D%A5%E7%9A%84%E5%B0%8F%E7%AC%A8%E8%9B%8B%23%E5%BE%A1%E5%A7%90%E9%9F%B3_%23%E9%85%8D%E9%9F%B3_%23%E5%BD%95%E9%9F%B3_%23%E5%A3%B0%E6%8E%A7%E5%A5%B3%E5%8F%8B_video.mp4',
  }
})

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
  demoItems.forEach((item, i) => {
    result[i % cols.value].push(item)
  })
  return result
})
</script>

<template>
  <div grid="~ cols-1 lg:cols-2 xl:cols-3 gap-4">
    <div v-for="(items, idx) of parts" :key="idx" flex="~ col gap-4">
      <WrapperDemo
        v-for="{ date, video, comp } of items"
        :key="date"
        :date="date"
        :video="video"
        class="slide-enter"
        :style="{
          '--enter-stage': idx + 1,
        }"
      >
        <ContentRenderer :value="comp">
          <h1>{{ comp?.title }}</h1>
          <ContentRendererMarkdown :value="comp" />
        </ContentRenderer>
      </WrapperDemo>
    </div>
  </div>
</template>
