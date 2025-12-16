<script setup lang="ts">
interface CompType {
	link: string;
	title: string;
	description: string;
	date: string;
	type: string;
}
interface DataType {
	comp: CompType;
	link: string;
	date: string;
}
interface Props {
	data: DataType | undefined;
}
const props = defineProps<Props>();

const { comp, date, link } = props.data as DataType;
const { title, type } = comp || {};

function getImageUrl() {
	if (type.includes("gif")) return import(`../../content/demos/${title}.gif`);
	else return import(`../../content/demos/${title}.png`);
}
const coverModule = ref();
const loading = ref(true);
async function getImgData() {
	loading.value = true;
	coverModule.value = await getImageUrl();
	loading.value = false;
}
onMounted(() => {
	getImgData();
});
</script>

<template>
  <div relative class="card-wrapper">
    <a
      :href="link"
      target="_blank"
      block relative of-hidden rounded-2xl
      bg-white dark:bg-dark-800
      transition-all duration-400 ease-out
      decoration-none color-inherit
      class="group card-link"
      hover="translate-y--1"
    >
      <!-- 图片容器 -->
      <div relative of-hidden rounded-2xl m-2 style="aspect-ratio: 16/10">
        <!-- 加载骨架屏 -->
        <div v-if="loading" absolute inset-0 rounded-xl bg-gray-100 dark:bg-dark-700>
          <div absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 dark:via-dark-600 to-transparent animate-pulse />
        </div>
        <!-- 实际图片 -->
        <img
          v-else
          :src="coverModule?.default"
          :alt="title"
          w-full h-full object-cover rounded-xl
          transition-all duration-500
          group-hover:scale-105
        >
        <!-- 悬停遮罩 -->
        <div
          absolute inset-0 rounded-xl
          bg-gradient-to-t from-black via-transparent to-transparent
          op-0 group-hover:op-100
          transition-all duration-400
        />
        <!-- 查看按钮 -->
        <div
          absolute bottom-3 left-3 right-3
          flex items-center justify-between
          op-0 group-hover:op-100
          translate-y-2 group-hover:translate-y-0
          transition-all duration-400
        >
          <span
            flex items-center gap-1.5
            text-white text-xs font-500 tracking-wide
            px-3 py-1.5 rounded-full
            bg-white bg-op-20 backdrop-blur-md
          >
            <svg w-3.5 h-3.5 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View
          </span>
        </div>
      </div>

      <!-- 内容区域 -->
      <div px-4 pb-4 pt-2 class="content-area">
        <slot />
        <div flex items-center gap-1.5 mt-3 op-40>
          <svg w-3 h-3 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span text-xs font-mono>{{ formatDate(date, false) }}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>
.card-wrapper {
  perspective: 1000px;
}

.card-link {
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 8px 16px rgba(0, 0, 0, 0.04);
}

.card-link:hover {
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.08),
    0 8px 16px rgba(0, 0, 0, 0.08),
    0 16px 32px rgba(0, 0, 0, 0.08);
}

.dark .card-link {
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.2),
    0 4px 8px rgba(0, 0, 0, 0.15);
}

.dark .card-link:hover {
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.3),
    0 8px 16px rgba(0, 0, 0, 0.25),
    0 16px 32px rgba(0, 0, 0, 0.2);
}

.content-area :deep(h2),
.content-area :deep(h3),
.content-area :deep(h4) {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 0.35rem;
  line-height: 1.4;
  color: inherit;
}

.content-area :deep(p) {
  font-size: 0.8rem;
  opacity: 0.5;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.content-area :deep(a) {
  color: inherit;
  opacity: 0.5;
  text-decoration: none;
  font-size: 0.75rem;
}

.content-area :deep(a:hover) {
  opacity: 1;
}
</style>
