<script lang="ts" setup>
import GithubIcon from "~/components/nav/GithubIcon.vue";

useHead({
	title: "IceyWu - You only live once | 一期一会",
	link: [
		{
			rel: "stylesheet",
			href: "https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/style.css",
		},
		{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap",
		},
	],
});

const githubUser = ref<any>(null);
const languageStats = ref<Record<string, number>>({});
const totalStars = ref(0);

onMounted(async () => {
	try {
		const [userRes, reposRes] = await Promise.all([
			fetch("https://api.github.com/users/iceywu"),
			fetch(
				"https://api.github.com/users/iceywu/repos?per_page=100&sort=updated",
			),
		]);

		githubUser.value = await userRes.json();
		const repos = await reposRes.json();

		const langCount: Record<string, number> = {};
		let stars = 0;

		for (const repo of repos) {
			if (repo.language) {
				langCount[repo.language] = (langCount[repo.language] || 0) + 1;
			}
			stars += repo.stargazers_count || 0;
		}

		totalStars.value = stars;
		languageStats.value = Object.fromEntries(
			Object.entries(langCount)
				.sort((a, b) => b[1] - a[1])
				.slice(0, 6),
		);
	} catch (error) {
		console.error("Failed to fetch GitHub data:", error);
	}
});

const userInfo = computed(() => ({
	avatar: githubUser.value?.avatar_url || "",
	repos: githubUser.value?.public_repos || 0,
	createdAt: githubUser.value?.created_at
		? new Date(githubUser.value.created_at).getFullYear()
		: 2020,
}));

const codingYears = computed(
	() => new Date().getFullYear() - userInfo.value.createdAt,
);

const navLinks = [
	{ to: "/posts", label: "Posts", title: "技术博客" },
	{ to: "/essays", label: "Essays", title: "随笔" },
	{ to: "/projects", label: "Projects", title: "开源项目" },
	{ to: "/demos", label: "Demos", title: "产品展示" },
	{ to: "/map", label: "Map", title: "旅行地图" },
];

const techPositions = [
	{ left: 10, top: 10, rotate: -8 },
	{ left: 60, top: 20, rotate: 5 },
	{ left: 5, top: 50, rotate: -3 },
	{ left: 70, top: 60, rotate: 7 },
	{ left: 20, top: 80, rotate: -5 },
	{ left: 50, top: 90, rotate: 3 },
];

const statsData = computed(() => [
	{ value: codingYears.value, label: "YEARS" },
	{ value: userInfo.value.repos, label: "REPOS" },
	{ value: totalStars.value, label: "STARS" },
]);
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-black text-black dark:text-white relative flex items-center justify-center py-8 md:py-0">
    
    <!-- 主容器 -->
    <div class="max-w-6xl w-full px-6 md:px-16">
      
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        
        <!-- 左侧：名字 + You only live once + 介绍 -->
        <div class="md:col-span-5 order-2 md:order-1">
          <div class="mb-3 md:mb-4 relative group">
            <Logo size="12rem" :stroke-width="8" class="md:w-80 w-60" />
            <!-- 手绘下划线 - 双层 -->
            <svg class="absolute -bottom-2 left-0 w-full h-4 opacity-15" viewBox="0 0 200 12" preserveAspectRatio="none">
              <path class="draw-path" d="M0 5 Q50 2, 100 6 T200 5" stroke="currentColor" stroke-width="1" fill="none"/>
              <path class="draw-path" d="M5 9 Q55 7, 105 10 T205 9" stroke="currentColor" stroke-width="0.5" fill="none" stroke-dasharray="3 2"/>
            </svg>
          </div>
          
          <div class="mb-2 md:mb-3">
            <p class="font-sketch text-2xl md:text-4xl leading-tight opacity-80 dark:opacity-95">
              You<br>
              <span class="inline-block ml-4 md:ml-6">only</span><br>
              <span class="inline-block ml-8 md:ml-12">live</span><br>
              <span class="inline-block ml-12 md:ml-18">once</span>
            </p>
            <p class="font-sketch-cn text-xs md:text-sm opacity-30 dark:opacity-60 mt-1.5 md:mt-2 ml-12 md:ml-18">一期一会</p>
          </div>
          
          <!-- 个人介绍 -->
          <div class="mb-3 md:mb-4 max-w-md relative">
            <!-- 手绘引号 -->
            <svg class="absolute -left-6 top-0 w-5 h-5 opacity-15 dark:opacity-30" viewBox="0 0 20 20">
              <path d="M3 8 Q2 5, 5 4 Q8 5, 7 8 L3 15" stroke="currentColor" stroke-width="1" fill="none"/>
              <path d="M12 8 Q11 5, 14 4 Q17 5, 16 8 L12 15" stroke="currentColor" stroke-width="1" fill="none"/>
            </svg>
            <p class="font-sketch text-sm md:text-base leading-relaxed opacity-60 dark:opacity-85 mb-2 md:mb-2.5">
              Full-Stack Developer & Digital Artisan
            </p>
            <div class="font-sketch-cn text-sm md:text-base leading-loose opacity-50 dark:opacity-75 space-y-2.5">
              <p>
                你好，我是 
                <a href="https://github.com/iceywu" target="_blank" title="访问我的 GitHub 主页" class="relative inline-flex items-center group">
                  <span class="border-b border-dashed border-current opacity-80 group-hover:opacity-100 transition-opacity">IceyWu</span>
                  <svg class="w-3 h-3 ml-0.5 opacity-50 group-hover:opacity-90 transition-opacity" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3 L9 3 L9 9 M9 3 L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </a>
                ，前端开发 / 全栈工程师，开源爱好者，徒步 & 摄影爱好者，自然系生活践行者。
              </p>
              <p>
                业余 coding 开发
                <a href="https://lpalette.cn" target="_blank" title="访问 Life Palatte 官网" class="relative inline-flex items-center group">
                  <span class="border-b border-dashed border-current opacity-80 group-hover:opacity-100 transition-opacity">「Life Palatte」</span>
                  <svg class="w-3 h-3 ml-0.5 opacity-50 group-hover:opacity-90 transition-opacity" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3 L9 3 L9 9 M9 3 L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </a>
                ，帮你留存每一段旅途足迹！微信小程序搜「拾色 life」即可体验，期待和你一起记录走过的风景～
              </p>
            </div>
          </div>
          
          <!-- 数据 -->
          <div class="flex gap-6 md:gap-8 relative">
            <!-- 手绘连接线 -->
            <svg class="absolute -top-4 left-0 w-full h-2 opacity-10 dark:opacity-25" viewBox="0 0 300 8" preserveAspectRatio="none">
              <path class="draw-path" d="M0 4 L100 4 M120 4 L200 4 M220 4 L300 4" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 3"/>
            </svg>
            <div v-for="stat in statsData" :key="stat.label" class="relative group">
              <div class="font-sketch text-4xl md:text-5xl leading-none opacity-90 group-hover:opacity-100 transition-opacity">{{ stat.value }}</div>
              <div class="font-sketch-cn text-xs opacity-30 dark:opacity-60 mt-1">{{ stat.label }}</div>
              <svg class="absolute -top-2 -right-2 w-2 h-2 opacity-0 group-hover:opacity-50 dark:group-hover:opacity-50 transition-opacity" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="2" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- 中间：头像 + 技术栈 -->
        <div class="md:col-span-4 flex flex-col items-center gap-4 md:gap-6 order-1 md:order-2 relative">
          <!-- 装饰性手绘星星 - 增强动画 -->
          <svg class="absolute -top-4 -left-4 w-6 h-6 opacity-15 animate-pulse" viewBox="0 0 24 24" style="animation-duration: 3s;">
            <path class="draw-path" d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" stroke="currentColor" stroke-width="1" fill="none"/>
          </svg>
          <svg class="absolute -bottom-4 -right-4 w-5 h-5 opacity-15 animate-pulse" viewBox="0 0 20 20" style="animation-duration: 4s;">
            <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1" fill="none"/>
            <circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="1" fill="none"/>
          </svg>
          <!-- 额外装饰 -->
          <svg class="absolute top-1/2 -left-8 w-4 h-4 opacity-10 hidden md:block" viewBox="0 0 16 16">
            <path d="M2 8 L8 2 L14 8 L8 14 Z" stroke="currentColor" stroke-width="0.5" fill="none"/>
          </svg>
          <svg class="absolute top-1/3 -right-8 w-3 h-3 opacity-10 hidden md:block" viewBox="0 0 12 12">
            <rect x="2" y="2" width="8" height="8" stroke="currentColor" stroke-width="0.5" fill="none" transform="rotate(45 6 6)"/>
          </svg>
          
          <!-- 头像 -->
          <div class="relative w-40 h-40 md:w-48 md:h-48 group">
            <svg class="absolute inset-0 w-full h-full opacity-8 group-hover:opacity-12 transition-opacity" viewBox="0 0 100 100" fill="none">
              <circle class="draw-path" cx="50" cy="50" r="48" stroke="currentColor" stroke-width="0.5"/>
              <circle class="draw-path" cx="50" cy="50" r="45" stroke="currentColor" stroke-width="0.3"/>
              <circle class="draw-path" cx="50" cy="50" r="42" stroke="currentColor" stroke-width="0.2"/>
            </svg>
            <UserAvatar size="w-40 h-40 md:w-48 md:h-48" class="transition-transform group-hover:scale-105" />
          </div>
          
          <!-- 技术栈 - 环绕 -->
          <div class="relative w-full h-16 md:h-32">
            <span 
              v-for="(lang, index) in Object.keys(languageStats)" 
              :key="lang"
              class="absolute font-sketch text-xs md:text-base opacity-50 hover:opacity-80 transition-all cursor-default hover:scale-110"
              :style="{
                left: techPositions[index]?.left + '%',
                top: techPositions[index]?.top + '%',
                transform: `rotate(${techPositions[index]?.rotate}deg)`
              }"
            >
              {{ lang }}
            </span>
          </div>
        </div>
        
        <!-- 右侧：导航 + 语录 -->
        <div class="md:col-span-3 relative order-3">
          <!-- 装饰性箭头 -->
          <svg class="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-20 opacity-10 hidden md:block" viewBox="0 0 20 100">
            <path class="draw-path" d="M10 10 L10 90 M10 90 L5 85 M10 90 L15 85" stroke="currentColor" stroke-width="1" fill="none"/>
          </svg>
          
          <!-- 导航 -->
          <nav class="flex flex-wrap gap-4 md:gap-0 md:flex-col md:space-y-4 mb-8 md:mb-10">
            <NuxtLink 
              v-for="link in navLinks" 
              :key="link.to"
              :to="link.to"
              :title="link.title"
              class="font-sketch text-xl md:text-2xl opacity-30 dark:opacity-70 hover:opacity-100 md:hover:ml-2 transition-all relative group"
            >
              {{ link.label }}
              <svg class="absolute -left-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 opacity-0 group-hover:opacity-30 dark:group-hover:opacity-60 transition-opacity hidden md:block" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" stroke="currentColor" stroke-width="1" fill="none"/>
              </svg>
            </NuxtLink>
          </nav>
          
          <!-- 语录 -->
          <div class="relative pt-4 md:pt-5">
            <!-- 手绘分割线 -->
            <svg class="absolute top-0 left-0 w-full h-1 opacity-10 dark:opacity-25" viewBox="0 0 200 4" preserveAspectRatio="none">
              <path class="draw-path" d="M0 2 Q10 1, 20 2 T40 2 Q50 3, 60 2 T80 2 Q90 1, 100 2 T120 2 Q130 3, 140 2 T160 2 Q170 1, 180 2 T200 2" stroke="currentColor" stroke-width="0.5" fill="none"/>
            </svg>
            <!-- 小装饰 -->
            <svg class="absolute -top-1 left-0 w-3 h-3 opacity-10 dark:opacity-25" viewBox="0 0 12 12">
              <circle cx="6" cy="6" r="4" stroke="currentColor" stroke-width="0.5" fill="none"/>
            </svg>
            <p class="font-sketch text-sm md:text-base opacity-50 dark:opacity-50 leading-relaxed hover:opacity-40 dark:hover:opacity-70 transition-opacity" title="生命流经你，而非流向你">
              La vie coule<br>à travers toi,<br>pas vers toi
            </p>
            <p class="font-sketch-cn text-xs md:text-sm opacity-15 dark:opacity-40 mt-2" title="You Only Live Once - 人生只有一次">YOLO</p>
          </div>
        </div>
        
      </div>
    </div>

    <!-- 工具栏 -->
    <div class="fixed top-4 right-4 md:top-6 md:right-6 flex flex-col gap-3 md:gap-4 z-50">
      <a href="https://github.com/iceywu" target="_blank" title="访问我的 GitHub" class="opacity-90 hover:opacity-100 transition-opacity">
        <GithubIcon />
      </a>
      <div title="切换深色/浅色模式" class="opacity-90 hover:opacity-100 transition-opacity">
        <DrakToggle />
      </div>
    </div>

    <!-- 背景装饰 - 增强层次感 -->
    <svg class="fixed inset-0 w-full h-full pointer-events-none opacity-2 z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
      <!-- 主圆环 -->
      <circle class="draw-path" cx="50" cy="50" r="45" stroke="currentColor" stroke-width="0.05" fill="none"/>
      <circle class="draw-path" cx="50" cy="50" r="35" stroke="currentColor" stroke-width="0.03" fill="none"/>
      <!-- 手绘十字 -->
      <path class="draw-path" d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" stroke-width="0.02" stroke-dasharray="2 4" opacity="0.5"/>
      <!-- 角落装饰 - 增强 -->
      <path class="draw-path" d="M5 5 Q10 5, 10 10 M5 5 L8 8" stroke="currentColor" stroke-width="0.05" fill="none"/>
      <path class="draw-path" d="M95 5 Q90 5, 90 10 M95 5 L92 8" stroke="currentColor" stroke-width="0.05" fill="none"/>
      <path class="draw-path" d="M5 95 Q10 95, 10 90 M5 95 L8 92" stroke="currentColor" stroke-width="0.05" fill="none"/>
      <path class="draw-path" d="M95 95 Q90 95, 90 90 M95 95 L92 92" stroke="currentColor" stroke-width="0.05" fill="none"/>
      <!-- 额外细节 -->
      <circle cx="20" cy="20" r="2" stroke="currentColor" stroke-width="0.03" fill="none" opacity="0.3"/>
      <circle cx="80" cy="20" r="2" stroke="currentColor" stroke-width="0.03" fill="none" opacity="0.3"/>
      <circle cx="20" cy="80" r="2" stroke="currentColor" stroke-width="0.03" fill="none" opacity="0.3"/>
      <circle cx="80" cy="80" r="2" stroke="currentColor" stroke-width="0.03" fill="none" opacity="0.3"/>
    </svg>

  </div>
</template>

<style scoped>
.draw-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 3s ease-out forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
