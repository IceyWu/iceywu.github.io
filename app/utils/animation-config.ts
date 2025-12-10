/**
 * GSAP 动画配置常量
 * 定义入场、悬停、滚动、过渡动画的默认参数
 */

export const ANIMATION_CONFIG = {
  // 入场动画配置
  entrance: {
    duration: 0.8,
    stagger: 0.1,
    y: 30,
    ease: 'power2.out',
    opacity: {
      from: 0,
      to: 1,
    },
  },

  // 悬停动画配置
  hover: {
    scale: 1.1,
    duration: 0.3,
    durationOut: 0.2,
    ease: 'power1.out',
  },

  // 滚动动画配置
  scroll: {
    start: 'top 80%',
    end: 'bottom 20%',
    threshold: 0.2,
    parallaxRatio: 0.5,
  },

  // 页面过渡配置
  transition: {
    duration: 0.3,
    ease: 'power2.inOut',
  },

  // 文字动画配置
  text: {
    duration: 0.5,
    stagger: 0.08,
    ease: 'power2.out',
  },

  // 脉冲动画配置
  pulse: {
    scale: 1.05,
    duration: 1.5,
    ease: 'power1.inOut',
  },

  // 下划线动画配置
  underline: {
    duration: 0.3,
    ease: 'power2.out',
  },

  // 旋转动画配置
  rotate: {
    degrees: 360,
    duration: 0.5,
    ease: 'power2.inOut',
  },
} as const

// 颜色配置 - 保持黑白主色调
export const COLOR_CONFIG = {
  light: {
    primary: '#333333',
    secondary: '#666666',
    background: '#ffffff',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    primary: '#ffffff',
    secondary: '#cccccc',
    background: '#1a1a1a',
    glow: 'rgba(255, 255, 255, 0.1)',
  },
  // 保留的强调色
  accent: {
    teal: '#00a98e',
    purple: '#C084FC',
    blue: '#4facfe',
  },
} as const

export type AnimationConfig = typeof ANIMATION_CONFIG
export type ColorConfig = typeof COLOR_CONFIG
