/**
 * 全屏滚动配置
 */
export interface FullPageScrollOptions {
  duration?: number
  ease?: string
  onSectionChange?: (index: number) => void
}

/**
 * useFullPageScroll Composable
 * 实现全屏滚动切换板块效果
 */
export function useFullPageScroll(options: FullPageScrollOptions = {}) {
  const { $gsap } = useNuxtApp()
  const { reducedMotion } = useReducedMotion()

  const {
    duration = 1,
    ease = 'power2.inOut',
    onSectionChange,
  } = options

  const currentSection = ref(0)
  const isAnimating = ref(false)
  const sections = ref<HTMLElement[]>([])
  const container = ref<HTMLElement | null>(null)

  let touchStartY = 0
  let lastScrollTime = 0
  const scrollCooldown = 1000 // 滚动冷却时间

  /**
   * 跳转到指定板块
   */
  const goToSection = (index: number) => {
    if (index < 0 || index >= sections.value.length || isAnimating.value)
      return
    if (index === currentSection.value)
      return

    isAnimating.value = true
    const direction = index > currentSection.value ? 1 : -1
    const currentEl = sections.value[currentSection.value]
    const nextEl = sections.value[index]

    // 创建时间线
    const tl = $gsap.timeline({
      onComplete: () => {
        isAnimating.value = false
        currentSection.value = index
        onSectionChange?.(index)
      },
    })

    // 设置下一个板块的初始位置
    nextEl.style.zIndex = '2'
    nextEl.style.opacity = '1'
    nextEl.style.transform = direction > 0 ? 'translateY(100%)' : 'translateY(-100%)'

    // 当前板块退出
    tl.to(currentEl, {
      y: direction > 0 ? '-30%' : '30%',
      opacity: 0,
      scale: 0.9,
      duration,
      ease,
    }, 0)

    // 下一个板块进入
    tl.to(nextEl, {
      y: 0,
      opacity: 1,
      duration,
      ease,
    }, 0)

    // 动画完成后重置 z-index
    tl.call(() => {
      currentEl.style.zIndex = '0'
      nextEl.style.zIndex = '1'
    })
  }

  /**
   * 处理滚轮事件
   */
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()

    const now = Date.now()
    if (now - lastScrollTime < scrollCooldown || isAnimating.value)
      return
    lastScrollTime = now

    if (e.deltaY > 0) {
      goToSection(currentSection.value + 1)
    }
    else if (e.deltaY < 0) {
      goToSection(currentSection.value - 1)
    }
  }

  /**
   * 处理触摸开始
   */
  const handleTouchStart = (e: TouchEvent) => {
    touchStartY = e.touches[0].clientY
  }

  /**
   * 处理触摸结束
   */
  const handleTouchEnd = (e: TouchEvent) => {
    if (isAnimating.value)
      return

    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY - touchEndY

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSection(currentSection.value + 1)
      }
      else {
        goToSection(currentSection.value - 1)
      }
    }
  }

  /**
   * 处理键盘事件
   */
  const handleKeydown = (e: KeyboardEvent) => {
    if (isAnimating.value)
      return

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault()
      goToSection(currentSection.value + 1)
    }
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault()
      goToSection(currentSection.value - 1)
    }
  }

  /**
   * 初始化全屏滚动
   */
  const init = (containerEl: HTMLElement, sectionEls: HTMLElement[]) => {
    container.value = containerEl
    sections.value = sectionEls.filter(el => el instanceof HTMLElement)

    if (sections.value.length === 0)
      return

    // 设置容器样式
    containerEl.style.position = 'relative'
    containerEl.style.overflow = 'hidden'
    containerEl.style.height = '100vh'
    containerEl.style.width = '100%'

    // 设置每个板块样式
    sections.value.forEach((section, index) => {
      section.style.position = 'absolute'
      section.style.top = '0'
      section.style.left = '0'
      section.style.width = '100%'
      section.style.height = '100vh'
      section.style.opacity = index === 0 ? '1' : '0'
      section.style.transform = index === 0 ? 'translateY(0)' : 'translateY(100%)'
      section.style.zIndex = index === 0 ? '1' : '0'
    })

    if (reducedMotion.value)
      return

    // 绑定滚轮事件
    containerEl.addEventListener('wheel', handleWheel, { passive: false })
    // 绑定触摸事件
    containerEl.addEventListener('touchstart', handleTouchStart, { passive: true })
    containerEl.addEventListener('touchend', handleTouchEnd, { passive: true })
    // 绑定键盘事件
    window.addEventListener('keydown', handleKeydown)
  }

  /**
   * 清理事件监听
   */
  const cleanup = () => {
    if (container.value) {
      container.value.removeEventListener('wheel', handleWheel)
      container.value.removeEventListener('touchstart', handleTouchStart)
      container.value.removeEventListener('touchend', handleTouchEnd)
    }
    window.removeEventListener('keydown', handleKeydown)
  }

  onUnmounted(() => {
    cleanup()
  })

  return {
    currentSection: readonly(currentSection),
    isAnimating: readonly(isAnimating),
    init,
    goToSection,
    cleanup,
  }
}
