<script setup lang="ts">
import type * as THREE from "three";
import { useThreeGeometry } from "~/composables/useThreeGeometry";
import { checkWebGLSupport, useThreeScene } from "~/composables/useThreeScene";

const props = defineProps<{
	currentSection?: number;
	enableInteraction?: boolean;
}>();

const emit = defineEmits<{
	ready: [];
	error: [error: Error];
}>();

const containerRef = ref<HTMLElement | null>(null);
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

// 检查减少动画偏好
const prefersReducedMotion = ref(false);
onMounted(() => {
	const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	prefersReducedMotion.value = mediaQuery.matches;
	mediaQuery.addEventListener("change", (e) => {
		prefersReducedMotion.value = e.matches;
	});
});

// 初始化Three.js场景
const {
	scene,
	camera,
	isReady,
	isSupported,
	qualitySettings,
	addObject,
	onAnimate,
} = useThreeScene({
	container: containerRef,
	quality: "auto",
});

// 几何体工厂
const geometry = useThreeGeometry({
	qualitySettings,
	isDark,
});

// 装饰组
let decorationGroup: THREE.Group | null = null;

// 鼠标位置
const mouse = reactive({ x: 0, y: 0 });
const targetRotation = reactive({ x: 0, y: 0 });

// 初始化装饰几何体
watch(isReady, (ready) => {
	if (ready && scene.value) {
		decorationGroup = geometry.createDefaultDecorations();
		addObject(decorationGroup);
		emit("ready");
	}
});

// WebGL不支持时发出错误
watch(isSupported, (supported) => {
	if (!supported) {
		emit("error", new Error("WebGL not supported"));
	}
});

// 鼠标交互
function handleMouseMove(e: MouseEvent) {
	if (!props.enableInteraction) return;
	const rect = containerRef.value?.getBoundingClientRect();
	if (!rect) return;

	mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
	mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

	targetRotation.x = mouse.y * 0.3;
	targetRotation.y = mouse.x * 0.3;
}

function handleMouseLeave() {
	targetRotation.x = 0;
	targetRotation.y = 0;
}

// 触摸交互
function handleTouchMove(e: TouchEvent) {
	if (!props.enableInteraction || !e.touches[0]) return;
	const rect = containerRef.value?.getBoundingClientRect();
	if (!rect) return;

	const touch = e.touches[0];
	mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
	mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

	targetRotation.x = mouse.y * 0.2;
	targetRotation.y = mouse.x * 0.2;
}

function handleTouchEnd() {
	targetRotation.x = 0;
	targetRotation.y = 0;
}

// 动画循环
onAnimate((time) => {
	if (!decorationGroup || prefersReducedMotion.value) return;

	const t = time * 0.001;

	// 主几何体旋转
	const mainMesh = decorationGroup.children[0];
	if (mainMesh) {
		mainMesh.rotation.x += 0.002;
		mainMesh.rotation.y += 0.003;
	}

	// 环旋转
	const ring = decorationGroup.children[1];
	if (ring) {
		ring.rotation.z += 0.001;
	}

	// 小几何体浮动
	decorationGroup.children.slice(2, 4).forEach((child, i) => {
		child.position.y += Math.sin(t + i) * 0.002;
		child.rotation.x += 0.005;
		child.rotation.y += 0.003;
	});

	// 粒子旋转
	const particles = decorationGroup.children[4];
	if (particles) {
		particles.rotation.y += 0.0005;
	}

	// 鼠标交互 - 平滑跟随
	if (props.enableInteraction) {
		decorationGroup.rotation.x +=
			(targetRotation.x - decorationGroup.rotation.x) * 0.05;
		decorationGroup.rotation.y +=
			(targetRotation.y - decorationGroup.rotation.y) * 0.05;
	}
});

// 响应section变化
watch(
	() => props.currentSection,
	(section) => {
		if (!decorationGroup || !camera.value) return;

		// 根据section调整相机位置
		const positions = [
			{ z: 5, y: 0 },
			{ z: 6, y: 0.5 },
			{ z: 5.5, y: -0.3 },
			{ z: 7, y: 0 },
			{ z: 5, y: 0.2 },
			{ z: 6, y: -0.2 },
		];

		const pos = positions[section ?? 0] ?? positions[0];
		camera.value.position.z = pos.z;
		camera.value.position.y = pos.y;
	},
);
</script>

<template>
  <div
    ref="containerRef"
    class="three-background"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @touchmove.passive="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- WebGL不支持时的降级显示 -->
    <div v-if="!isSupported" class="fallback-bg">
      <div class="fallback-pattern" />
    </div>
  </div>
</template>

<style scoped>
.three-background {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.three-background :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.fallback-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.fallback-pattern {
  position: absolute;
  inset: -50%;
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.05;
  animation: drift 60s linear infinite;
}

@keyframes drift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(30px, 30px); }
}
</style>
