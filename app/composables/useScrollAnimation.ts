import type { Ref } from 'vue'
import { ANIMATION_CONFIG } from '~/utils/animation-config'

/**
 * 滚动动画配置选项
 */
export interface ScrollAnimationOptions {
  trigger?: string | HTMLElement
  start?: string
  end?: string
  scrub?: boolean | number
  parallaxRatio?: number
  markers?: boolean
}

/**
 * useScrollAnimation Composable
 * 实现滚动驱动的动画效果
 */
export function useScrollAnimation(
  element: Ref<HTMLElement | null>,
  options: ScrollAnimationOptions = {},
) {
  const { $gsap, $ScrollTrigger } = useNuxtApp()
  const { reducedMotion } = useReducedMotion()

  const {
    start = ANIMATION_CONFIG.scroll.start,
    end = ANIMATION_CONFIG.scroll.end,
    scrub = false,
    parallaxRatio = ANIMATION_CONFIG.scroll.parallaxRatio,
    markers = false,
  } = options

  let scrollTrigger: ScrollTrigger | null = null
  const triggers: ScrollTrigger[] = []

  /**
   * 初始化滚动触发动画
   */
  const init = () => {
    const el = element.value
    if (!el || reducedMotion.value)
      return null

    // 设置初始状态
    $gsap.set(el, {
      opacity: 0,
      y: 30,
    })

    // 创建滚动触发器
    scrollTrigger = $ScrollTrigger.create({
      trigger: el,
      start,
      end,
      markers,
      onEnter: () => {
        $gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        })
      },
      onLeaveBack: () => {
        $gsap.to(el, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease: 'power2.in',
        })
      },
    })

    triggers.push(scrollTrigger)
    return scrollTrigger
  }

  /**
   * 初始化视差效果
   */
  const initParallax = () => {
    const el = element.value
    if (!el || reducedMotion.value)
      return null

    const parallaxTrigger = $ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const yOffset = self.progress * 100 * parallaxRatio
        $gsap.set(el, {
          y: -yOffset,
        })
      },
    })

    triggers.push(parallaxTrigger)
    return parallaxTrigger
  }

  /**
   * 初始化淡入淡出效果
   */
  const initFadeInOut = () => {
    const el = element.value
    if (!el || reducedMotion.value)
      return null

    $gsap.set(el, { opacity: 0 })

    const fadeInTrigger = $ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      end: 'top 20%',
      scrub: scrub ? 1 : false,
      onEnter: () => {
        if (!scrub) {
          $gsap.to(el, {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          })
        }
      },
      onLeave: () => {
        if (!scrub) {
          $gsap.to(el, {
            opacity: 0.3,
            duration: 0.4,
            ease: 'power2.in',
          })
        }
      },
      onEnterBack: () => {
        if (!scrub) {
          $gsap.to(el, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      },
      onLeaveBack: () => {
        if (!scrub) {
          $gsap.to(el, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
          })
        }
      },
    })

    triggers.push(fadeInTrigger)
    return fadeInTrigger
  }

  /**
   * 刷新 ScrollTrigger
   */
  const refresh = () => {
    $ScrollTrigger.refresh()
  }

  /**
   * 清理所有触发器
   */
  const kill = () => {
    triggers.forEach((trigger) => {
      try {
        trigger.kill()
      }
      catch {
        // 触发器可能已被清理
      }
    })
    triggers.length = 0
    scrollTrigger = null
  }

  onUnmounted(() => {
    kill()
  })

  return {
    init,
    initParallax,
    initFadeInOut,
    refresh,
    kill,
  }
}
