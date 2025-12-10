<script setup lang="ts">
// 获取 demos 数据
const { data: demosData } = await useAsyncData("homeDemos", () => {
	return queryCollection("demos")
		.select("title", "description", "path", "date", "link")
		.order("date", "DESC")
		.limit(4)
		.all();
});

const displayDemos = computed(() => demosData.value || []);

// 随机浮动形状
const shapes = ref<
	Array<{
		id: number;
		x: number;
		y: number;
		size: number;
		rotation: number;
		type: string;
	}>
>([]);

onMounted(() => {
	const types = ["circle", "square", "triangle", "line"];
	for (let i = 0; i < 12; i++) {
		shapes.value.push({
			id: i,
			x: Math.random() * 80 + 10,
			y: Math.random() * 80 + 10,
			size: Math.random() * 30 + 15,
			rotation: Math.random() * 360,
			type: types[Math.floor(Math.random() * types.length)]!,
		});
	}
});
</script>

<template>
  <div class="demos-content">
    <div class="section-header">
      <svg class="header-deco" viewBox="0 0 80 40">
        <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 2" />
        <rect x="45" y="8" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(15 57 20)" />
      </svg>
      <span class="section-label">DEMOS</span>
    </div>
    <p class="section-desc">
      创意实验 · 代码艺术
    </p>

    <div class="demo-visual">
      <svg class="shapes-canvas" viewBox="0 0 100 100">
        <template v-for="shape in shapes" :key="shape.id">
          <circle v-if="shape.type === 'circle'" :cx="shape.x" :cy="shape.y" :r="shape.size / 4" fill="none" stroke="currentColor" stroke-width="0.5" :style="{ animationDelay: `${shape.id * 0.2}s` }" class="floating-shape" />
          <rect v-else-if="shape.type === 'square'" :x="shape.x - shape.size / 4" :y="shape.y - shape.size / 4" :width="shape.size / 2" :height="shape.size / 2" fill="none" stroke="currentColor" stroke-width="0.5" :transform="`rotate(${shape.rotation} ${shape.x} ${shape.y})`" :style="{ animationDelay: `${shape.id * 0.2}s` }" class="floating-shape" />
          <polygon v-else-if="shape.type === 'triangle'" :points="`${shape.x},${shape.y - shape.size / 3} ${shape.x - shape.size / 3},${shape.y + shape.size / 4} ${shape.x + shape.size / 3},${shape.y + shape.size / 4}`" fill="none" stroke="currentColor" stroke-width="0.5" :style="{ animationDelay: `${shape.id * 0.2}s` }" class="floating-shape" />
          <line v-else :x1="shape.x - shape.size / 3" :y1="shape.y" :x2="shape.x + shape.size / 3" :y2="shape.y" stroke="currentColor" stroke-width="0.5" :transform="`rotate(${shape.rotation} ${shape.x} ${shape.y})`" :style="{ animationDelay: `${shape.id * 0.2}s` }" class="floating-shape" />
        </template>
      </svg>
      <div class="center-text">
        <span class="code-symbol">&lt;/&gt;</span>
      </div>
    </div>

    <div v-if="displayDemos.length > 0" class="demos-list">
      <a v-for="(demo, index) in displayDemos" :key="demo.path || index" :href="demo.link || '#'" target="_blank" class="demo-item" :style="{ animationDelay: `${index * 0.1}s` }">
        <span class="demo-index">{{ String(index + 1).padStart(2, '0') }}</span>
        <div class="demo-info">
          <span class="demo-name">{{ demo.title || 'Demo' }}</span>
          <span v-if="demo.description" class="demo-desc">{{ demo.description }}</span>
        </div>
      </a>
    </div>
    <div v-else class="demos-empty">
      探索更多创意实验
    </div>

    <NuxtLink to="/demos" class="view-all">
      <span>探索全部实验</span>
      <svg viewBox="0 0 24 24" class="view-arrow"><path d="M5,12 L19,12 M14,7 L19,12 L14,17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
    </NuxtLink>
  </div>
</template>

<style scoped>
.demos-content { text-align: center; max-width: 500px; font-family: 'Ma Shan Zheng', 'ZCOOL XiaoWei', Caveat, cursive; }
.section-header { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 0.5rem; }
.header-deco { width: 80px; height: 40px; opacity: 0.15; }
.section-label { font-size: 1rem; letter-spacing: 0.3em; opacity: 0.5; font-family: Caveat, cursive; }
.section-desc { font-size: 1.1rem; opacity: 0.4; margin-bottom: 2rem; }
.demo-visual { position: relative; width: 200px; height: 200px; margin: 0 auto 2rem; }
.shapes-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.floating-shape { opacity: 0.15; animation: float 8s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0); opacity: 0.1; } 50% { transform: translateY(-10px); opacity: 0.25; } }
.center-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.code-symbol { font-size: 2.5rem; font-family: monospace; opacity: 0.15; font-weight: 200; }
.demos-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; text-align: left; }
.demo-item { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem; border: 1px dashed rgba(128,128,128,0.15); transition: all 0.3s; animation: fadeIn 0.5s ease-out both; text-decoration: none; color: inherit; }
.demo-item:hover { border-style: solid; border-color: rgba(128,128,128,0.25); background: rgba(128,128,128,0.02); }
@keyframes fadeIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
.demo-index { font-size: 0.9rem; font-family: Caveat, cursive; opacity: 0.4; padding-top: 0.15rem; }
.demo-info { flex: 1; }
.demo-name { display: block; font-size: 1.1rem; font-weight: 400; margin-bottom: 0.25rem; }
.demo-desc { font-size: 0.95rem; opacity: 0.5; display: -webkit-box; -webkit-line-clamp: 1; line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.demos-empty { font-size: 1rem; opacity: 0.4; margin-bottom: 2rem; }
.view-all { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1rem; opacity: 0.5; text-decoration: none; color: inherit; transition: all 0.3s; padding: 0.5rem 1rem; border: 1px dashed currentColor; border-radius: 2px; }
.view-all:hover { opacity: 0.8; border-style: solid; }
.view-arrow { width: 16px; height: 16px; }
</style>
