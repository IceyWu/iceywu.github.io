<script setup lang="ts">
interface TravelStats {
  totalCities: number
  totalPhotos: number
  totalCountries: number
  topCities: Array<{ city: string, country: string, photoCount: number }>
}

const stats = ref<TravelStats | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await $fetch<{ result: TravelStats }>('https://test.wktest.cn:3001/api/user/1/travel-stats')
    stats.value = res.result
  }
  catch {
    // Failed
  }
  finally {
    loading.value = false
  }
})

const displayCities = computed(() => stats.value?.topCities?.slice(0, 10) || [])
</script>

<template>
  <div class="map-content">
    <div class="section-header">
      <svg class="header-deco" viewBox="0 0 100 40">
        <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3" />
        <path d="M25,20 Q40,10 55,20 T85,20" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 2" />
        <circle cx="85" cy="20" r="3" fill="currentColor" opacity="0.3" />
      </svg>
      <span class="section-label">FOOTPRINTS</span>
    </div>
    <p class="section-desc">
      探索世界，记录足迹
    </p>

    <div class="map-visual">
      <svg class="map-bg" viewBox="0 0 400 200">
        <path d="M50,100 Q100,50 150,100 T250,100 T350,100" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="4 4" opacity="0.1" />
        <path d="M30,150 Q80,120 130,150 T230,150 T330,150" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="4 4" opacity="0.08" />
        <circle v-for="i in 8" :key="i" :cx="50 + i * 40" :cy="80 + Math.sin(i) * 30" r="2" fill="currentColor" opacity="0.1" />
      </svg>

      <div v-if="loading" class="cities-cloud">
        <span v-for="n in 8" :key="n" class="city-tag skeleton" />
      </div>
      <div v-else class="cities-cloud">
        <span v-for="(city, i) in displayCities" :key="city.city" class="city-tag" :class="{ highlight: i < 3 }" :style="{ animationDelay: `${i * 0.1}s` }">
          <span class="city-dot">●</span>
          {{ city.city }}
          <span class="city-count">{{ city.photoCount }}</span>
        </span>
      </div>
    </div>

    <div v-if="stats" class="stats-row">
      <div class="stat-item">
        <svg class="stat-icon" viewBox="0 0 24 24">
          <rect x="3" y="8" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.5" />
          <path d="M7,8 L7,5 A5,5 0 0,1 17,5 L17,8" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <span class="stat-num">{{ stats.totalCities }}</span>
        <span class="stat-label">城市</span>
      </div>
      <div class="stat-divider">
        <svg viewBox="0 0 20 40"><path d="M10,5 L10,35" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3" /></svg>
      </div>
      <div class="stat-item">
        <svg class="stat-icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5" />
          <path d="M12,3 L12,12 L18,12" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <span class="stat-num">{{ stats.totalCountries }}</span>
        <span class="stat-label">国家</span>
      </div>
      <div class="stat-divider">
        <svg viewBox="0 0 20 40"><path d="M10,5 L10,35" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3" /></svg>
      </div>
      <div class="stat-item">
        <svg class="stat-icon" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.5" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
          <path d="M3,15 L8,12 L13,16 L21,10" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <span class="stat-num">{{ stats.totalPhotos }}</span>
        <span class="stat-label">照片</span>
      </div>
    </div>

    <NuxtLink to="/map" class="view-all">
      <span>查看完整地图</span>
      <svg viewBox="0 0 24 24" class="view-arrow">
        <path d="M5,12 L19,12 M14,7 L19,12 L14,17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </NuxtLink>
  </div>
</template>

<style scoped>
.map-content { text-align: center; max-width: 600px; font-family: 'Ma Shan Zheng', 'ZCOOL XiaoWei', Caveat, cursive; }
.section-header { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 0.5rem; }
.header-deco { width: 100px; height: 40px; opacity: 0.2; }
.section-label { font-size: 1rem; letter-spacing: 0.3em; opacity: 0.5; font-family: Caveat, cursive; }
.section-desc { font-size: 1.1rem; opacity: 0.4; margin-bottom: 2rem; }

.map-visual { position: relative; min-height: 150px; margin-bottom: 2rem; }
.map-bg { position: absolute; inset: 0; width: 100%; height: 100%; }

.cities-cloud { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; position: relative; z-index: 1; }
.city-tag { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 1rem; padding: 0.4rem 0.8rem; border: 1px dashed rgba(128,128,128,0.2); opacity: 0.5; transition: all 0.3s; animation: fadeIn 0.5s ease-out both; border-radius: 2px; }
.city-tag:hover { opacity: 1; border-style: solid; }
.city-tag.highlight { opacity: 0.7; border-color: rgba(128,128,128,0.3); }
.city-tag.skeleton { width: 60px; height: 28px; background: rgba(128,128,128,0.1); border: none; animation: pulse 1.5s ease-in-out infinite; }
.city-dot { font-size: 0.5rem; opacity: 0.4; }
.city-count { font-size: 0.8rem; opacity: 0.5; font-family: Caveat, cursive; }
@keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 0.5; transform: scale(1); } }
@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.5; } }

.stats-row { display: flex; justify-content: center; align-items: center; gap: 1.5rem; margin-bottom: 2rem; padding: 1.5rem; border: 1px dashed rgba(128,128,128,0.15); border-radius: 4px; }
.stat-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
.stat-icon { width: 24px; height: 24px; opacity: 0.3; margin-bottom: 0.25rem; }
.stat-num { font-size: 2rem; font-weight: 400; font-family: Caveat, cursive; }
.stat-label { font-size: 0.9rem; opacity: 0.5; letter-spacing: 0.1em; }
.stat-divider { opacity: 0.15; }
.stat-divider svg { width: 20px; height: 40px; }

.view-all { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1rem; opacity: 0.5; text-decoration: none; color: inherit; transition: all 0.3s; padding: 0.5rem 1rem; border: 1px dashed currentColor; border-radius: 2px; }
.view-all:hover { opacity: 0.8; border-style: solid; }
.view-arrow { width: 16px; height: 16px; }
</style>
