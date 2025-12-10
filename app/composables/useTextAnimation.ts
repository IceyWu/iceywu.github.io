import type { Ref } from 'vue'
import { ANIMATION_CONFIG } from '~/utils/animation-config'

/**
 * 文字动画类型
 */
export type TextAnimationType = 'fadeIn' | 'slideUp' | 'stagger'

/**
 * 文字动画配置选项
 */
export interface TextAnimationOptions {
  type?: TextAnimationType
  duration?: number
  stagger?: number
  ease?: string
}

/**
 * useTextAnimation Composable
 * 实现文字的各种动画效果
 */
export function useTextAnimation(
  textElements: Ref<HTMLElement[] | null>,
  options: TextAnimationOptions = {},
) {
  const { $gsap } = useNuxtApp()
  const { reducedMotion, getDuration } = useReducedMotion()

  const {
    type = 'stagger',
    duration = ANIMATION_CONFIG.text.duration,
    stagger = ANIMATION_CONFIG.text.stagger,
    ease = ANIMATION_CONFIG.text.ease,
  } = options

  let timeline: gsap.core.Timeline | null = null

  /**
   * 执行文字动画
   */
  const animate = () => {
    const elements = textElements.value
    if (!elements || elements.length === 0)
      return null

    if (reducedMotion.value) {
      $gsap.set(elements, { opacity: 1, y: 0 })
      return null
    }

    timeline = $gsap.timeline()

    // 设置初始状态
    $gsap.set(elements, {
      opacity: 0,
      y: type === 'slideUp' ? 20 : 0,
    })

    // 根据类型执行不同动画
    switch (type) {
      case 'fadeIn':
        timeline.to(elements, {
          opacity: 1,
          duration: getDuration(duration),
          stagger,
          ease,
        })
        break

      case 'slideUp':
        timeline.to(elements, {
          opacity: 1,
          y: 0,
          duration: getDuration(duration),
          stagger,
          ease,
        })
        break

      case 'stagger':
      default:
        timeline.to(elements, {
          opacity: 1,
          y: 0,
          duration: getDuration(duration),
          stagger: {
            each: stagger,
            from: 'start',
          },
          ease,
        })
        break
    }

    return timeline
  }

  /**
   * 设置链接悬停效果 - 使用透明度而非颜色变化
   */
  const setupLinkHover = (links: HTMLElement[]) => {
    if (reducedMotion.value)
      return

    links.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        $gsap.to(link, {
          opacity: 0.7,
          scale: 1.02,
          duration: getDuration(0.2),
          ease: 'power1.out',
        })
      })

      link.addEventListener('mouseleave', () => {
        $gsap.to(link, {
          opacity: 1,
          scale: 1,
          duration: getDuration(0.2),
          ease: 'power1.out',
        })
      })
    })
  }

  /**
   * 设置脉冲动画 - 用于 Contact Me 按钮
   */
  const setupPulse = (element: HTMLElement) => {
    if (reducedMotion.value)
      return null

    return $gsap.to(element, {
      scale: ANIMATION_CONFIG.pulse.scale,
      duration: getDuration(ANIMATION_CONFIG.pulse.duration),
      ease: ANIMATION_CONFIG.pulse.ease,
      repeat: -1,
      yoyo: true,
    })
  }

  /**
   * 重置动画状态
   */
  const reset = () => {
    const elements = textElements.value
    if (elements) {
      $gsap.set(elements, {
        opacity: 0,
        y: type === 'slideUp' ? 20 : 0,
      })
    }
  }

  /**
   * 清理动画
   */
  const kill = () => {
    if (timeline) {
      timeline.kill()
      timeline = null
    }
  }

  onUnmounted(() => {
    kill()
  })

  return {
    animate,
    setupLinkHover,
    setupPulse,
    reset,
    kill,
  }
}
