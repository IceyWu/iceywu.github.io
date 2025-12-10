import { ANIMATION_CONFIG } from '~/utils/animation-config'

/**
 * 页面过渡配置选项
 */
export interface PageTransitionOptions {
  duration?: number
  ease?: string
}

/**
 * usePageTransition Composable
 * 实现页面切换时的过渡动画
 */
export function usePageTransition(options: PageTransitionOptions = {}) {
  const { $gsap } = useNuxtApp()
  const { reducedMotion, getDuration } = useReducedMotion()

  const {
    duration = ANIMATION_CONFIG.transition.duration,
    ease = ANIMATION_CONFIG.transition.ease,
  } = options

  /**
   * 页面离开前的动画
   */
  const beforeLeave = (el: HTMLElement) => {
    if (reducedMotion.value) {
      return $gsap.set(el, { opacity: 0 })
    }

    return $gsap.to(el, {
      opacity: 0,
      y: -20,
      duration: getDuration(duration),
      ease,
    })
  }

  /**
   * 页面进入动画
   */
  const enter = (el: HTMLElement, done?: () => void) => {
    if (reducedMotion.value) {
      $gsap.set(el, { opacity: 1, y: 0 })
      done?.()
      return null
    }

    // 设置初始状态
    $gsap.set(el, {
      opacity: 0,
      y: 30,
    })

    return $gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: getDuration(duration * 1.2),
      ease: 'power2.out',
      onComplete: done,
    })
  }

  /**
   * 页面离开动画
   */
  const leave = (el: HTMLElement, done?: () => void) => {
    if (reducedMotion.value) {
      $gsap.set(el, { opacity: 0 })
      done?.()
      return null
    }

    return $gsap.to(el, {
      opacity: 0,
      y: -20,
      duration: getDuration(duration),
      ease,
      onComplete: done,
    })
  }

  /**
   * 获取 Vue transition 钩子
   */
  const getTransitionHooks = () => ({
    onBeforeEnter: (el: Element) => {
      $gsap.set(el, { opacity: 0, y: 30 })
    },
    onEnter: (el: Element, done: () => void) => {
      enter(el as HTMLElement, done)
    },
    onLeave: (el: Element, done: () => void) => {
      leave(el as HTMLElement, done)
    },
  })

  return {
    beforeLeave,
    enter,
    leave,
    getTransitionHooks,
  }
}
