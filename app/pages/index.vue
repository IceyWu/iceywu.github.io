<script lang="ts" setup>
useHead({ title: 'IceyWu' })

const { data: userData } = await useFetch('/api/user')
const userInfo = computed(() => ({
  avatar_url: userData.value?.avatar_url || 'https://avatars.githubusercontent.com/u/66096254?v=4',
  name: userData.value?.name || userData.value?.login || 'Icey Wu',
  html_url: userData.value?.html_url || 'https://github.com/IceyWu',
}))

const { $gsap } = useNuxtApp()

// 状态
const currentIndex = ref(0)
const isAnimating = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const sections = ['home', 'posts', 'essays', 'projects', 'map', 'demos']
const sectionNames = ['首页', '文章', '随笔', '项目', '足迹', '实验']

// 随机动画效果
const transitionEffects = [
  // 墨水晕染效果
  {
    out: { opacity: 0, scale: 0.8, filter: 'blur(20px)', rotation: -5 },
    in: { opacity: 0, scale: 1.2, filter: 'blur(30px)', rotation: 5 },
  },
  // 纸张翻页效果
  {
    out: { opacity: 0, x: -100, rotationY: -15, filter: 'blur(5px)' },
    in: { opacity: 0, x: 100, rotationY: 15, filter: 'blur(5px)' },
  },
  // 涟漪扩散效果
  {
    out: { opacity: 0, scale: 0.5, filter: 'blur(15px)' },
    in: { opacity: 0, scale: 1.5, filter: 'blur(25px)' },
  },
]

// 切换动画
function goToSection(index: number) {
  if (index < 0 || index >= sections.length || isAnimating.value || index === currentIndex.value)
    return
  isAnimating.value = true

  const currentEl = document.querySelector(`.section-${sections[currentIndex.value]}`)
  const nextEl = document.querySelector(`.section-${sections[index]}`)
  const effect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)]!

  // 绘制手绘线条动画
  drawTransitionLine()

  $gsap.to(currentEl, {
    ...effect.out,
    duration: 0.5,
    ease: 'power3.in',
  })

  setTimeout(() => {
    currentIndex.value = index
    $gsap.fromTo(
      nextEl,
      { ...effect.in },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        rotation: 0,
        rotationY: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power3.out',
        onComplete: () => {
          isAnimating.value = false
        },
      },
    )
  }, 400)
}

// 手绘线条过渡动画
function drawTransitionLine() {
  const svg = document.querySelector('.transition-line') as SVGElement
  if (!svg)
    return

  const path = svg.querySelector('path') as SVGPathElement
  if (!path)
    return

  // 随机生成手绘风格路径
  const points = []
  const segments = 8
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * 100
    const y = 50 + (Math.random() - 0.5) * 40
    points.push(`${i === 0 ? 'M' : 'L'}${x},${y}`)
  }
  path.setAttribute('d', points.join(' '))

  const length = path.getTotalLength()
  path.style.strokeDasharray = `${length}`
  path.style.strokeDashoffset = `${length}`

  $gsap.to(path, {
    strokeDashoffset: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      $gsap.to(path, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          path.style.opacity = '1'
          path.style.strokeDashoffset = `${length}`
        },
      })
    },
  })
}

// 事件处理
let lastScrollTime = 0
function handleWheel(e: WheelEvent) {
  e.preventDefault()
  if (Date.now() - lastScrollTime < 1200 || isAnimating.value)
    return
  lastScrollTime = Date.now()
  goToSection(currentIndex.value + (e.deltaY > 0 ? 1 : -1))
}

let touchStartY = 0
function handleTouchStart(e: TouchEvent) {
  touchStartY = e.touches[0]?.clientY ?? 0
}
function handleTouchEnd(e: TouchEvent) {
  if (isAnimating.value)
    return
  const diff = touchStartY - (e.changedTouches[0]?.clientY ?? 0)
  if (Math.abs(diff) > 50)
    goToSection(currentIndex.value + (diff > 0 ? 1 : -1))
}

function handleKeydown(e: KeyboardEvent) {
  if (isAnimating.value)
    return
  if (['ArrowDown', 'ArrowRight', ' '].includes(e.key)) {
    e.preventDefault()
    goToSection(currentIndex.value + 1)
  }
  else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
    e.preventDefault()
    goToSection(currentIndex.value - 1)
  }
}

onMounted(() => {
  containerRef.value?.addEventListener('wheel', handleWheel, { passive: false })
  containerRef.value?.addEventListener('touchstart', handleTouchStart, { passive: true })
  containerRef.value?.addEventListener('touchend', handleTouchEnd, { passive: true })
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  containerRef.value?.removeEventListener('wheel', handleWheel)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div ref="containerRef" class="fullpage">
    <!-- 手绘背景装饰 -->
    <div class="sketch-bg">
      <svg class="sketch-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,20 Q30,25 50,20 T100,22" class="sketch-line line-1" />
        <path d="M0,50 Q25,45 50,52 T100,48" class="sketch-line line-2" />
        <path d="M0,80 Q35,78 60,82 T100,79" class="sketch-line line-3" />
      </svg>
    </div>

    <!-- 过渡线条动画 -->
    <svg class="transition-line" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M0,50 L100,50" fill="none" stroke="currentColor" stroke-width="2" />
    </svg>

    <!-- 暗色切换 -->
    <div class="dark-toggle">
      <DrakToggle />
    </div>

    <!-- 导航指示器 - 手绘风格 -->
    <div class="nav-indicator">
      <button
        v-for="(s, i) in sections"
        :key="s"
        :class="{ active: currentIndex === i }"
        :title="sectionNames[i]"
        @click="goToSection(i)"
      >
        <svg class="indicator-sketch" viewBox="0 0 30 30">
          <circle
            cx="15"
            cy="15"
            r="8"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            :stroke-dasharray="currentIndex === i ? '0' : '3 2'"
          />
          <circle
            v-if="currentIndex === i"
            cx="15"
            cy="15"
            r="4"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>

    <!-- 各板块 -->
    <section v-show="currentIndex === 0" class="section section-home">
      <HomeSectionHome :user-info="userInfo" />
    </section>

    <section v-show="currentIndex === 1" class="section section-posts">
      <ClientOnly>
        <HomeSectionPosts />
      </ClientOnly>
    </section>

    <section v-show="currentIndex === 2" class="section section-essays">
      <ClientOnly>
        <HomeSectionEssays />
      </ClientOnly>
    </section>

    <section v-show="currentIndex === 3" class="section section-projects">
      <ClientOnly>
        <HomeSectionProjects />
      </ClientOnly>
    </section>

    <section v-show="currentIndex === 4" class="section section-map">
      <ClientOnly>
        <HomeSectionMap />
      </ClientOnly>
    </section>

    <section v-show="currentIndex === 5" class="section section-demos">
      <ClientOnly>
        <HomeSectionDemos />
      </ClientOnly>
    </section>

    <!-- 页码 - 手绘风格 -->
    <div class="page-info">
      <span class="page-num">{{ String(currentIndex + 1).padStart(2, '0') }}</span>
      <svg class="page-divider" viewBox="0 0 30 20">
        <path d="M5,10 Q15,5 25,10" fill="none" stroke="currentColor" stroke-width="1" />
      </svg>
      <span class="page-total">{{ String(sections.length).padStart(2, '0') }}</span>
      <span class="page-name">{{ sectionNames[currentIndex] }}</span>
    </div>

    <!-- 滚动提示 -->
    <div v-if="currentIndex < sections.length - 1" class="scroll-hint">
      <svg viewBox="0 0 24 24" class="scroll-icon">
        <path d="M12,4 L12,16 M8,12 L12,16 L16,12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.fullpage {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 手绘背景 */
.sketch-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.sketch-lines {
  width: 100%;
  height: 100%;
}
.sketch-line {
  fill: none;
  stroke: currentColor;
  stroke-width: 0.1;
  opacity: 0.05;
}
.line-1 { animation: sketch-float 20s ease-in-out infinite; }
.line-2 { animation: sketch-float 25s ease-in-out infinite reverse; }
.line-3 { animation: sketch-float 30s ease-in-out infinite; }
@keyframes sketch-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

/* 过渡线条 */
.transition-line {
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  height: 100px;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 200;
  opacity: 0.3;
}

.dark-toggle {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
}

/* 导航指示器 - 手绘风格 */
.nav-indicator {
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 100;
}

.nav-indicator button {
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  opacity: 0.3;
  transition: all 0.3s;
}
.nav-indicator button:hover,
.nav-indicator button.active {
  opacity: 0.8;
  transform: scale(1.1);
}
.indicator-sketch {
  width: 100%;
  height: 100%;
}

/* 页码信息 */
.page-info {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: Caveat, 'Ma Shan Zheng', cursive;
  z-index: 100;
}
.page-num {
  font-size: 1.5rem;
  font-weight: 400;
  opacity: 0.5;
}
.page-divider {
  width: 30px;
  height: 20px;
  opacity: 0.3;
}
.page-total {
  font-size: 1rem;
  opacity: 0.4;
}
.page-name {
  font-size: 1rem;
  opacity: 0.4;
  margin-left: 0.5rem;
  letter-spacing: 0.1em;
}

/* 滚动提示 */
.scroll-hint {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s ease-in-out infinite;
  opacity: 0.3;
}
.scroll-icon {
  width: 24px;
  height: 24px;
}
@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}

/* 通用 section */
.section {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 1;
  overflow: hidden;
}

/* 响应式 */
@media (max-width: 640px) {
  .nav-indicator { left: 1rem; }
  .dark-toggle { top: 1rem; right: 1rem; }
  .page-info { bottom: 1rem; right: 1rem; }
  .scroll-hint { bottom: 4rem; }
}
</style>
