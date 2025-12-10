<script setup lang="ts">
import type { Repo } from '~/types'

const projects = ref<Repo[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await $fetch<Repo[]>('https://api.github.com/users/iceywu/repos?per_page=100&type=owner&sort=updated')
    const publicRepos = data
      .filter(repo => !repo.private && !repo.archived && !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
    projects.value = publicRepos
  }
  catch {
    // Failed to fetch
  }
  finally {
    loading.value = false
  }
})

function formatStars(count: number) {
  if (count >= 1000)
    return `${(count / 1000).toFixed(1)}k`
  return String(count)
}
</script>

<template>
  <div class="projects-content">
    <div class="section-header">
      <svg class="header-deco" viewBox="0 0 60 30">
        <rect x="5" y="5" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(10 15 15)" />
        <circle cx="45" cy="15" r="10" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2" />
      </svg>
      <span class="section-label">PROJECTS</span>
    </div>
    <p class="section-desc">
      开源项目与技术探索
    </p>

    <div v-if="loading" class="project-grid">
      <div v-for="n in 6" :key="n" class="project-card skeleton">
        <div class="skeleton-line short" />
        <div class="skeleton-line" />
        <div class="skeleton-line short" />
      </div>
    </div>

    <div v-else class="project-grid">
      <a v-for="(repo, index) in projects" :key="repo.id" :href="repo.html_url" target="_blank" class="project-card" :style="{ animationDelay: `${index * 0.1}s` }">
        <div class="card-corner" />
        <div class="project-header">
          <span class="project-stars">★ {{ formatStars(repo.stargazers_count) }}</span>
          <span class="project-lang">{{ repo.language || 'Code' }}</span>
        </div>
        <h3 class="project-name">{{ repo.name }}</h3>
        <p class="project-desc">{{ repo.description || 'No description' }}</p>
        <svg class="card-deco" viewBox="0 0 50 50">
          <path d="M5,45 Q25,35 45,45" fill="none" stroke="currentColor" stroke-width="1" />
        </svg>
      </a>
    </div>

    <NuxtLink to="/projects" class="view-all">
      <span>查看全部项目</span>
      <svg viewBox="0 0 24 24" class="view-arrow">
        <path d="M5,12 L19,12 M14,7 L19,12 L14,17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </NuxtLink>
  </div>
</template>

<style scoped>
.projects-content { text-align: center; max-width: 700px; font-family: 'Ma Shan Zheng', 'ZCOOL XiaoWei', Caveat, cursive; }
.section-header { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 0.5rem; }
.header-deco { width: 60px; height: 30px; opacity: 0.15; }
.section-label { font-size: 1rem; letter-spacing: 0.3em; opacity: 0.5; font-family: Caveat, cursive; }
.section-desc { font-size: 1.1rem; opacity: 0.4; margin-bottom: 2rem; }

.project-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
.project-card {
  position: relative;
  padding: 1.25rem;
  border: 1px dashed rgba(128,128,128,0.2);
  text-align: left;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
  animation: fadeIn 0.5s ease-out both;
  overflow: hidden;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.project-card:hover { border-style: solid; border-color: rgba(128,128,128,0.3); background: rgba(128,128,128,0.02); }
.card-corner { position: absolute; top: 0; right: 0; width: 20px; height: 20px; border-left: 1px dashed rgba(128,128,128,0.2); border-bottom: 1px dashed rgba(128,128,128,0.2); }
.project-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.project-stars { font-size: 0.85rem; opacity: 0.5; font-family: Caveat, cursive; }
.project-lang { font-size: 0.75rem; opacity: 0.4; padding: 0.15rem 0.4rem; border: 1px solid currentColor; border-radius: 2px; font-family: Caveat, cursive; }
.project-name { font-size: 1.1rem; font-weight: 400; margin: 0.5rem 0 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.project-desc { font-size: 0.9rem; opacity: 0.5; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5; margin: 0; }
.card-deco { position: absolute; bottom: 0; right: 0; width: 50px; height: 50px; opacity: 0.1; }

.project-card.skeleton { pointer-events: none; }
.skeleton-line { height: 12px; background: rgba(128,128,128,0.15); border-radius: 4px; margin-bottom: 0.5rem; animation: pulse 1.5s ease-in-out infinite; }
.skeleton-line.short { width: 50%; }
@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }

.view-all { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1rem; opacity: 0.5; text-decoration: none; color: inherit; transition: all 0.3s; padding: 0.5rem 1rem; border: 1px dashed currentColor; border-radius: 2px; }
.view-all:hover { opacity: 0.8; border-style: solid; }
.view-arrow { width: 16px; height: 16px; }

@media (max-width: 768px) { .project-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .project-grid { grid-template-columns: 1fr; } }
</style>
