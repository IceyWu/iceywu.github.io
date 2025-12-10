import type { Ref } from "vue";
import { ANIMATION_CONFIG } from "~/utils/animation-config";

/**
 * 入场动画配置选项
 */
export interface EntranceAnimationOptions {
	duration?: number;
	stagger?: number;
	y?: number;
	ease?: string;
	delay?: number;
}

/**
 * useEntranceAnimation Composable
 * 实现页面元素的淡入滑动入场动画
 * 支持交错动画效果
 */
export function useEntranceAnimation(
	elements: Ref<HTMLElement | HTMLElement[] | null>,
	options: EntranceAnimationOptions = {},
) {
	const { $gsap } = useNuxtApp();
	const { reducedMotion, getDuration } = useReducedMotion();

	const {
		duration = ANIMATION_CONFIG.entrance.duration,
		stagger = ANIMATION_CONFIG.entrance.stagger,
		y = ANIMATION_CONFIG.entrance.y,
		ease = ANIMATION_CONFIG.entrance.ease,
		delay = 0,
	} = options;

	let timeline: gsap.core.Timeline | null = null;

	/**
	 * 播放入场动画
	 */
	const play = () => {
		const targets = elements.value;
		if (!targets || (Array.isArray(targets) && targets.length === 0)) {
			return null;
		}

		// 如果用户偏好减少动画，直接设置最终状态
		if (reducedMotion.value) {
			$gsap.set(targets, { opacity: 1, y: 0 });
			return null;
		}

		// 创建时间线
		timeline = $gsap.timeline();

		// 设置初始状态
		$gsap.set(targets, {
			opacity: 0,
			y,
		});

		// 添加入场动画
		timeline.to(targets, {
			opacity: 1,
			y: 0,
			duration: getDuration(duration),
			stagger,
			ease,
			delay,
		});

		return timeline;
	};

	/**
	 * 反向播放动画
	 */
	const reverse = () => {
		if (timeline) {
			timeline.reverse();
		}
	};

	/**
	 * 重置到初始状态
	 */
	const reset = () => {
		const targets = elements.value;
		if (targets) {
			$gsap.set(targets, {
				opacity: 0,
				y,
			});
		}
	};

	/**
	 * 清理动画
	 */
	const kill = () => {
		if (timeline) {
			timeline.kill();
			timeline = null;
		}
	};

	// 组件卸载时清理
	onUnmounted(() => {
		kill();
	});

	return {
		play,
		reverse,
		reset,
		kill,
		timeline: readonly(ref(timeline)),
	};
}
