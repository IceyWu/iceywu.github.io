<script setup lang="ts">
defineProps<{
	userInfo: {
		avatar_url: string;
		name: string;
		html_url: string;
	};
}>();

const skills = [
	"Vue",
	"React",
	"TypeScript",
	"Python",
	"Swift",
	"Node.js",
	"Nuxt",
	"Nest",
];
const currentTime = ref("");

onMounted(() => {
	const updateTime = () => {
		currentTime.value = new Date().toLocaleTimeString("zh-CN", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};
	updateTime();
	setInterval(updateTime, 1000);
});
</script>

<template>
  <div class="home-content">
    <!-- 手绘装饰 -->
    <svg class="deco-sketch top-left" viewBox="0 0 100 100">
      <path d="M10,50 Q30,20 50,50 T90,50" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" />
      <circle cx="20" cy="30" r="3" fill="currentColor" opacity="0.3" />
    </svg>

    <div class="signature-card">
      <div class="avatar-area">
        <UserAvatar />
        <!-- 手绘圆圈 -->
        <svg class="avatar-doodle" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="8 4 2 4" class="doodle-circle" />
          <path d="M20,60 Q40,20 60,60 T100,60" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.3" class="doodle-wave" />
        </svg>
      </div>
      <h1
        class="fcc h-auto "
      >
        <Logo :size="140" />
      </h1>
      <!-- <h1 class="name">
        {{ userInfo?.name }}
      </h1> -->

      <p class="bio">
        — Front-end Developer & Creative Coder —
      </p>

      <!-- 手绘分隔线 -->
      <div class="signature-line">
        <svg viewBox="0 0 200 30" class="squiggle">
          <path d="M10,15 Q35,5 60,15 T110,15 T160,15 T190,15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <circle cx="100" cy="15" r="2" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      <!-- 技能标签 -->
      <div class="skills">
        <span v-for="skill in skills" :key="skill" class="skill-tag">
          {{ skill }}
        </span>
      </div>

      <!-- 链接 -->
      <div class="quick-links">
        <a :href="userInfo?.html_url" target="_blank" class="link-item">
          <svg viewBox="0 0 24 24" class="link-icon">
            <path d="M12,2 A10,10 0 1,0 12,22 A10,10 0 1,0 12,2 M12,6 Q8,12 12,18 M12,6 Q16,12 12,18 M4,12 L20,12" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <span>GitHub</span>
        </a>
        <a href="mailto:3128006406@qq.com" class="link-item">
          <svg viewBox="0 0 24 24" class="link-icon">
            <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path d="M3,5 L12,13 L21,5" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <span>Email</span>
        </a>
      </div>

      <!-- 当前时间 -->
      <div class="current-time">
        <span class="time-label">现在是</span>
        <span class="time-value">{{ currentTime }}</span>
      </div>
    </div>

    <!-- 右下角装饰 -->
    <svg class="deco-sketch bottom-right" viewBox="0 0 100 100">
      <path d="M90,50 Q70,80 50,50 T10,50" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" />
      <rect x="70" y="60" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(15 74 64)" />
    </svg>
  </div>
</template>

<style scoped>
.home-content {
  text-align: center;
  position: relative;
  width: 100%;
  max-width: 500px;
  font-family: 'Ma Shan Zheng', 'ZCOOL XiaoWei', Caveat, cursive;
}

/* 手绘装饰 */
.deco-sketch {
  position: absolute;
  width: 100px;
  height: 100px;
  opacity: 0.15;
  pointer-events: none;
}
.top-left { top: -50px; left: -50px; }
.bottom-right { bottom: -50px; right: -50px; }

.signature-card { position: relative; }

.avatar-area {
  position: relative;
  width: 130px;
  height: 130px;
  margin: 0 auto 1.5rem;
}
.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 1;
}
.avatar-doodle {
  position: absolute;
  inset: -10px;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  z-index: 0;
}
.doodle-circle {
  animation: spin 40s linear infinite;
  opacity: 0.4;
}
.doodle-wave {
  animation: wave 3s ease-in-out infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

.name {
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin: 0;
  font-family: Caveat, 'Ma Shan Zheng', cursive;
}

.bio {
  font-size: 1rem;
  opacity: 0.5;
  margin: 0.75rem 0 1.5rem;
  letter-spacing: 0.05em;
}

.signature-line {
  width: 200px;
  margin: 0 auto;
  opacity: 0.25;
}
.squiggle { width: 100%; height: 30px; }

/* 技能标签 */
.skills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
}
.skill-tag {
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  border: 1px dashed currentColor;
  opacity: 0.5;
  border-radius: 2px;
  letter-spacing: 0.05em;
  transition: all 0.3s;
  font-family: Caveat, cursive;
}
.skill-tag:hover {
  opacity: 0.8;
  border-style: solid;
}

/* 链接 */
.quick-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
}
.link-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: inherit;
  text-decoration: none;
  font-size: 0.85rem;
  opacity: 0.5;
  transition: all 0.3s;
}
.link-item:hover {
  opacity: 1;
}
.link-icon {
  width: 20px;
  height: 20px;
}

/* 当前时间 */
.current-time {
  margin-top: 2rem;
  font-size: 0.75rem;
  opacity: 0.3;
}
.time-label { margin-right: 0.5rem; }
.time-value {
  font-family: monospace;
  letter-spacing: 0.1em;
}
</style>
