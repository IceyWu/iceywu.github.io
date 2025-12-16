<script setup lang="ts">
import { to } from "@iceywu/utils";
import { breakpointsTailwind } from "@vueuse/core";

const [_, { data }] = await to(
	useAsyncData(() => {
		return queryCollection("demos").all();
	}),
);

const demoItems = data.value
	?.map((item, idx) => {
		const { date = "2024-02-03", link } = item;
		return {
			comp: item,
			date,
			idx,
			link,
		};
	})
	.sort((a, b) => b.date.localeCompare(a.date));

const breakpoints = useBreakpoints(breakpointsTailwind);

const cols = computed(() => {
	if (breakpoints.xl.value) return 4;
	if (breakpoints.lg.value) return 3;
	if (breakpoints.md.value) return 2;
	return 1;
});

const parts = computed(() => {
	const result = Array.from(
		{ length: cols.value },
		() => [] as typeof demoItems,
	);

	demoItems?.forEach((item, i) => {
		result[i % cols.value].push(item);
	});
	return result;
});

const totalCount = computed(() => demoItems?.length || 0);
</script>

<template>
  <div min-h-screen py-6>
    <!-- 页面头部 -->
    <div text-center mb-12 px-4>
      <!-- 标题 -->
      <h1 flex items-center justify-center gap-3 text-4xl font-700 mb-4 tracking-tight>
        <span>Demos</span>
        <span 
          text-base font-500 font-mono 
          px-3 py-1 rounded-md
          bg-gray-900 dark:bg-gray-100
          text-white dark:text-gray-900
        >{{ totalCount }}</span>
      </h1>

      <!-- 副标题 -->
      <p text-base op-50 tracking-wide>
        Creative Experiments & Open Source Projects
      </p>
    </div>

    <!-- 卡片网格 -->
    <div grid="~ cols-1 md:cols-2 lg:cols-3 xl:cols-4 gap-4" relative>
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
  </div>
</template>
