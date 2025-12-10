<script setup lang="ts">
const { data: postsData } = await useAsyncData('homePosts', () => {
  return queryCollection('posts')
    .select('title', 'path', 'date', 'description')
    .order('date', 'DESC')
    .limit(5)
    .all()
})
const posts = computed(() => postsData.value || [])
</script>

<template>
  <div class="posts-content">
    <div class="section-header">
      <svg class="header-deco" viewBox="0 0 50 20"><path d="M5,10 Q15,5 25,10 T45,10" fill="none" stroke="currentColor" stroke-width="1" /></svg>
      <span class="section-label">POSTS</span>
      <svg class="header-deco" viewBox="0 0 50 20"><path d="M5,10 Q15,15 25,10 T45,10" fill="none" stroke="currentColor" stroke-width="1" /></svg>
    </div>
    <p class="section-desc">
      记录技术探索与思考
    </p>
    <div class="posts-list">
      <NuxtLink v-for="(post, index) in posts" :key="post.path" :to="post.path" class="post-item" :style="{ animationDelay: `${index * 0.1}s` }">
        <div class="post-index">
          {{ String(index + 1).padStart(2, '0') }}
        </div>
        <div class="post-main">
          <span class="post-date">{{ useDateFormat(post.date, 'YYYY.MM.DD').value }}</span>
          <h3 class="post-title">
            {{ post.title }}
          </h3>
          <p v-if="post.description" class="post-desc">
            {{ post.description }}
          </p>
        </div>
        <svg class="post-arrow" viewBox="0 0 24 24"><path d="M5,12 L19,12 M14,7 L19,12 L14,17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
      </NuxtLink>
    </div>
    <svg class="divider-line" viewBox="0 0 200 20"><path d="M0,10 Q50,5 100,10 T200,10" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 2" /></svg>
    <NuxtLink to="/posts" class="view-all">
      <span>查看全部文章</span><svg viewBox="0 0 24 24" class="view-arrow"><path d="M5,12 L19,12 M14,7 L19,12 L14,17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
    </NuxtLink>
  </div>
</template>

<style scoped>
.posts-content { width: 100%; max-width: 600px; max-height: 80vh; overflow: hidden; font-family: 'Ma Shan Zheng', 'ZCOOL XiaoWei', Caveat, cursive; }
.section-header { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 0.5rem; }
.header-deco { width: 50px; height: 20px; opacity: 0.2; }
.section-label { font-size: 1rem; letter-spacing: 0.3em; opacity: 0.5; font-family: Caveat, cursive; }
.section-desc { text-align: center; font-size: 1.1rem; opacity: 0.4; margin-bottom: 1.5rem; }
.posts-list { display: flex; flex-direction: column; gap: 0.5rem; }
.post-item { display: flex; align-items: flex-start; gap: 1rem; padding: 0.75rem 1rem; border: 1px solid transparent; border-left: 2px dashed rgba(128,128,128,0.2); text-decoration: none; color: inherit; transition: all 0.3s; }
.post-item:hover { background: rgba(128,128,128,0.03); border-color: rgba(128,128,128,0.1); border-left-style: solid; border-left-color: rgba(128,128,128,0.4); }
.post-index { font-size: 0.9rem; font-family: Caveat, cursive; opacity: 0.3; min-width: 24px; padding-top: 0.2rem; }
.post-main { flex: 1; }
.post-date { font-size: 0.85rem; opacity: 0.4; font-family: Caveat, cursive; }
.post-title { font-size: 1.1rem; font-weight: 400; margin: 0.2rem 0; line-height: 1.5; }
.post-desc { font-size: 0.9rem; opacity: 0.5; margin: 0.2rem 0 0; display: -webkit-box; -webkit-line-clamp: 1; line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.post-arrow { width: 18px; height: 18px; opacity: 0.2; transition: all 0.3s; flex-shrink: 0; margin-top: 0.4rem; }
.post-item:hover .post-arrow { opacity: 0.6; transform: translateX(5px); }
.divider-line { width: 100%; height: 20px; margin: 1rem 0; opacity: 0.15; }
.view-all { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1rem; opacity: 0.5; text-decoration: none; color: inherit; transition: all 0.3s; padding: 0.5rem 1rem; border: 1px dashed currentColor; border-radius: 2px; }
.view-all:hover { opacity: 0.8; border-style: solid; }
.view-arrow { width: 16px; height: 16px; }
</style>
