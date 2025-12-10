/**
 * useReducedMotion Composable
 * 检测用户的 prefers-reduced-motion 偏好设置
 * 用于在动画中尊重用户的可访问性需求
 */
export function useReducedMotion() {
  const reducedMotion = ref(false)

  // 仅在客户端执行
  if (import.meta.client) {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.value = mediaQuery.matches

    // 监听偏好变化
    const handleChange = (e: MediaQueryListEvent) => {
      reducedMotion.value = e.matches
    }

    mediaQuery.addEventListener('change', handleChange)

    // 组件卸载时清理监听器
    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handleChange)
    })
  }

  return {
    reducedMotion: readonly(reducedMotion),
    // 辅助函数：根据 reducedMotion 返回动画时长
    getDuration: (normalDuration: number) => reducedMotion.value ? 0 : normalDuration,
    // 辅助函数：判断是否应该跳过动画
    shouldSkipAnimation: () => reducedMotion.value,
  }
}
