<script setup lang="ts">
const { data: essaysData } = await useAsyncData('homeEssays', () => {
  return queryCollection('essays')
    .select('title', 'path', 'date')
    .order('date', 'DESC')
    .limit(3)
    .all()
})
const allEssays = computed(() => essaysData.value || [])

const quotes = [
  { text: '不问过往，不惧将来' },
  { text: '生活不止眼前的代码' },
  { text: '保持好奇，持续创造' },
]
const currentQuote = ref(0)
onMounted(() => {
  setInterval(() => {
    currentQuote.value = (currentQuote.value + 1) % quotes.length
  }, 5000)
})
</script>

<template>
  <div class="essays-content">
    <svg class="deco-top" viewBox="0 0 200 50">
      <path d="M20,25 Q50,10 80,25 T140,25 T180,25" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="6 3" />
      <circle cx="100" cy="25" r="3" fill="currentColor" opacity="0.3" />
    </svg>
    <div class="quote-card">
      <span class="quote-mark open">"</span>
      <p class="quote-text">
        {{ quotes[currentQuote]?.text }}
      </p>
      <span class="quote-mark close">"</span>
      <div class="quote-dots">
        <span v-for="(_, i) in quotes" :key="i" class="quote-dot" :class="{ active: i === currentQuote }" />
      </div>
    </div>
    <div class="essays-section">
      <div class="section-label">
        <svg class="label-icon" viewBox="0 0 24 24"><path d="M4,4 L20,4 M4,12 L16,12 M4,20 L12,20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
        <span>随笔</span>
      </div>
      <div v-if="allEssays.length > 0" class="essays-list">
        <NuxtLink v-for="(essay, index) in allEssays" :key="essay.path ?? index" :to="essay.path ?? '/essays'" class="essay-item">
          <span class="essay-bullet">○</span>
          <span class="essay-title">{{ essay.title }}</span>
        </NuxtLink>
      </div>
      <div v-else class="essays-empty">
        暂无随笔
      </div>
    </div>
    <NuxtLink to="/essays" class="view-all">
      <span>阅读更多随笔</span><svg viewBox="0 0 24 24" class="view-arrow"><path d="M5,12 L19,12 M14,7 L19,12 L14,17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
    </NuxtLink>
  </div>
</template>

<style scoped>
.essays-content { text-align: center; max-width: 500px; font-family: 'Ma Shan Zheng', 'ZCOOL XiaoWei', Caveat, cursive; }
.deco-top { width: 200px; height: 50px; margin: 0 auto 1rem; opacity: 0.15; }
.quote-card { position: relative; padding: 2rem 3rem; margin-bottom: 2rem; }
.quote-mark { font-size: 5rem; font-family: Caveat, cursive; opacity: 0.1; line-height: 1; position: absolute; }
.quote-mark.open { top: 0; left: 0; }
.quote-mark.close { bottom: 0; right: 0; }
.quote-text { font-size: 1.8rem; font-weight: 400; line-height: 2; letter-spacing: 0.2em; margin: 0; }
.quote-dots { display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.5rem; }
.quote-dot { width: 6px; height: 6px; border-radius: 50%; border: 1px solid currentColor; opacity: 0.2; transition: all 0.3s; }
.quote-dot.active { opacity: 0.6; background: currentColor; }
.essays-section { text-align: left; padding: 1.5rem; border: 1px dashed rgba(128,128,128,0.15); border-radius: 4px; margin-bottom: 1.5rem; }
.section-label { display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; opacity: 0.5; margin-bottom: 1rem; letter-spacing: 0.1em; }
.label-icon { width: 16px; height: 16px; }
.essays-list { display: flex; flex-direction: column; gap: 0.75rem; }
.essay-item { display: flex; align-items: center; gap: 0.75rem; color: inherit; text-decoration: none; font-size: 1.1rem; opacity: 0.6; transition: all 0.3s; padding: 0.5rem 0; }
.essay-item:hover { opacity: 1; transform: translateX(5px); }
.essay-bullet { font-size: 0.6rem; opacity: 0.4; }
.essays-empty { font-size: 1rem; opacity: 0.4; }
.view-all { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1rem; opacity: 0.5; text-decoration: none; color: inherit; transition: all 0.3s; padding: 0.5rem 1rem; border: 1px dashed currentColor; border-radius: 2px; }
.view-all:hover { opacity: 0.8; border-style: solid; }
.view-arrow { width: 16px; height: 16px; }
</style>
