import type { Ref } from 'vue'
import { ANIMATION_CONFIG } from '~/utils/animation-config'

/**
 * 导航动画配置选项
 */
export interface NavAnimationOptions {
  hoverScale?: number
  hoverDuration?: number
  staggerDelay?: number
}

/**
 * useNavAnimation Composable
 * 实现导航栏的入场动画和悬停交互效果
 */
export function useNavAnimation(
  navItems: Ref<HTMLElement[] | null>,
  options: NavAnimationOptions = {},
) {
  const { $gsap } = useNuxtApp()
  const { reducedMotion, getDuration } = useReducedMotion()

  const {
    hoverScale = ANIMATION_CONFIG.hover.scale,
    hoverDuration = ANIMATION_CONFIG.hover.duration,
    staggerDelay = ANIMATION_CONFIG.entrance.stagger,
  } = options

  let entranceTimeline: gsap.core.Timeline | null = null
  const hoverTweens: Map<HTMLElement, gsap.core.Tween> = new Map()

  /**
   * 初始化导航项入场动画
   */
  const initEntrance = () => {
    const items = navItems.value
    if (!items || items.length === 0)
      return null

    // 过滤有效的 HTMLElement
    const validItems = items.filter(item => item instanceof HTMLElement)
    if (validItems.length === 0)
      return null

    if (reducedMotion.value) {
      $gsap.set(validItems, { opacity: 1, y: 0 })
      return null
    }

    // 设置初始状态
    $gsap.set(validItems, {
      opacity: 0,
      y: -20,
    })

    // 创建入场时间线
    entranceTimeline = $gsap.timeline()
    entranceTimeline.to(validItems, {
      opacity: 1,
      y: 0,
      duration: getDuration(0.6),
      stagger: staggerDelay,
      ease: 'power2.out',
    })

    return entranceTimeline
  }

  /**
   * 设置悬停效果
   */
  const setupHoverEffects = () => {
    const items = navItems.value
    if (!items || items.length === 0 || reducedMotion.value)
      return

    items.forEach((item) => {
      // 确保 item 是有效的 HTMLElement
      if (!item || !(item instanceof HTMLElement))
        return

      // 鼠标进入
      item.addEventListener('mouseenter', () => {
        const tween = $gsap.to(item, {
          scale: hoverScale,
          duration: getDuration(hoverDuration),
          ease: ANIMATION_CONFIG.hover.ease,
        })
        hoverTweens.set(item, tween)
      })

      // 鼠标离开
      item.addEventListener('mouseleave', () => {
        $gsap.to(item, {
          scale: 1,
          duration: getDuration(ANIMATION_CONFIG.hover.durationOut),
          ease: ANIMATION_CONFIG.hover.ease,
        })
      })
    })
  }

  /**
   * 设置下划线动画
   */
  const setupUnderlineAnimation = (underlineElements: HTMLElement[]) => {
    if (reducedMotion.value)
      return

    underlineElements.forEach((el) => {
      // 初始状态：宽度为0，从中心开始
      $gsap.set(el, {
        scaleX: 0,
        transformOrigin: 'center',
      })

      const parent = el.parentElement
      if (!parent)
        return

      parent.addEventListener('mouseenter', () => {
        $gsap.to(el, {
          scaleX: 1,
          duration: getDuration(ANIMATION_CONFIG.underline.duration),
          ease: ANIMATION_CONFIG.underline.ease,
        })
      })

      parent.addEventListener('mouseleave', () => {
        $gsap.to(el, {
          scaleX: 0,
          duration: getDuration(ANIMATION_CONFIG.underline.duration),
          ease: ANIMATION_CONFIG.underline.ease,
        })
      })
    })
  }

  /**
   * 清理所有动画和事件监听
   */
  const cleanup = () => {
    if (entranceTimeline) {
      entranceTimeline.kill()
      entranceTimeline = null
    }

    hoverTweens.forEach((tween) => {
      tween.kill()
    })
    hoverTweens.clear()
  }

  // 组件卸载时清理
  onUnmounted(() => {
    cleanup()
  })

  return {
    initEntrance,
    setupHoverEffects,
    setupUnderlineAnimation,
    cleanup,
  }
}
