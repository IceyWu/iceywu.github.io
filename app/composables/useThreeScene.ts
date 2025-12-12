import * as THREE from "three";
import type { ComputedRef, Ref, ShallowRef } from "vue";

export type QualityLevel = "low" | "medium" | "high" | "auto";

export interface QualitySettings {
	pixelRatio: number;
	antialias: boolean;
	geometryDetail: number;
	particleCount: number;
	shadows: boolean;
}

export interface UseThreeSceneOptions {
	container: Ref<HTMLElement | null>;
	quality?: QualityLevel;
	antialias?: boolean;
}

export interface UseThreeSceneReturn {
	scene: ShallowRef<THREE.Scene | null>;
	camera: ShallowRef<THREE.PerspectiveCamera | null>;
	renderer: ShallowRef<THREE.WebGLRenderer | null>;
	isReady: Ref<boolean>;
	isSupported: Ref<boolean>;
	qualitySettings: ComputedRef<QualitySettings>;
	addObject: (object: THREE.Object3D) => void;
	removeObject: (object: THREE.Object3D) => void;
	dispose: () => void;
	onAnimate: (callback: (time: number) => void) => () => void;
}

const QUALITY_PRESETS: Record<
	Exclude<QualityLevel, "auto">,
	QualitySettings
> = {
	low: {
		pixelRatio: 1,
		antialias: false,
		geometryDetail: 0,
		particleCount: 50,
		shadows: false,
	},
	medium: {
		pixelRatio: 1.5,
		antialias: true,
		geometryDetail: 1,
		particleCount: 150,
		shadows: false,
	},
	high: {
		pixelRatio: 2,
		antialias: true,
		geometryDetail: 2,
		particleCount: 300,
		shadows: true,
	},
};

/**
 * 检测WebGL支持
 */
export function checkWebGLSupport(): boolean {
	try {
		const canvas = document.createElement("canvas");
		return !!(
			window.WebGLRenderingContext &&
			(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
		);
	} catch {
		return false;
	}
}

/**
 * 检测设备是否为移动端
 */
function isMobileDevice(): boolean {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent,
	);
}

/**
 * 自动检测质量等级
 */
function detectQuality(): Exclude<QualityLevel, "auto"> {
	if (isMobileDevice()) return "low";
	const pixelRatio = window.devicePixelRatio || 1;
	if (pixelRatio >= 2) return "high";
	if (pixelRatio >= 1.5) return "medium";
	return "low";
}

/**
 * Three.js 场景管理 Composable
 */
export function useThreeScene(
	options: UseThreeSceneOptions,
): UseThreeSceneReturn {
	const { container, quality = "auto" } = options;

	const scene = shallowRef<THREE.Scene | null>(null);
	const camera = shallowRef<THREE.PerspectiveCamera | null>(null);
	const renderer = shallowRef<THREE.WebGLRenderer | null>(null);
	const isReady = ref(false);
	const isSupported = ref(true);

	const resolvedQuality = computed<Exclude<QualityLevel, "auto">>(() =>
		quality === "auto" ? detectQuality() : quality,
	);
	const qualitySettings = computed(
		() => QUALITY_PRESETS[resolvedQuality.value],
	);

	let animationId: number | null = null;
	let resizeObserver: ResizeObserver | null = null;
	const animationCallbacks: Array<(time: number) => void> = [];

	/**
	 * 初始化场景
	 */
	function init() {
		if (!container.value) return;
		if (!checkWebGLSupport()) {
			isSupported.value = false;
			return;
		}

		const settings = qualitySettings.value;
		const { width, height } = container.value.getBoundingClientRect();

		// 创建场景
		scene.value = new THREE.Scene();

		// 创建相机
		camera.value = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		camera.value.position.z = 5;

		// 创建渲染器
		renderer.value = new THREE.WebGLRenderer({
			antialias: settings.antialias,
			alpha: true,
			powerPreference: "high-performance",
		});
		renderer.value.setSize(width, height);
		renderer.value.setPixelRatio(
			Math.min(settings.pixelRatio, window.devicePixelRatio),
		);
		renderer.value.setClearColor(0x000000, 0);

		container.value.appendChild(renderer.value.domElement);

		// 监听容器大小变化
		resizeObserver = new ResizeObserver(handleResize);
		resizeObserver.observe(container.value);

		// 启动动画循环
		startAnimationLoop();
		isReady.value = true;
	}

	/**
	 * 处理窗口大小变化
	 */
	function handleResize(entries: ResizeObserverEntry[]) {
		const entry = entries[0];
		if (!entry || !camera.value || !renderer.value) return;

		const { width, height } = entry.contentRect;
		if (width === 0 || height === 0) return;

		camera.value.aspect = width / height;
		camera.value.updateProjectionMatrix();
		renderer.value.setSize(width, height);
	}

	/**
	 * 动画循环
	 */
	function startAnimationLoop() {
		function animate(time: number) {
			animationId = requestAnimationFrame(animate);
			animationCallbacks.forEach((cb) => {
				cb(time);
			});
			if (scene.value && camera.value && renderer.value) {
				renderer.value.render(scene.value, camera.value);
			}
		}
		animationId = requestAnimationFrame(animate);
	}

	/**
	 * 添加动画回调
	 */
	function onAnimate(callback: (time: number) => void) {
		animationCallbacks.push(callback);
		return () => {
			const index = animationCallbacks.indexOf(callback);
			if (index > -1) animationCallbacks.splice(index, 1);
		};
	}

	/**
	 * 添加物体到场景
	 */
	function addObject(object: THREE.Object3D) {
		scene.value?.add(object);
	}

	/**
	 * 从场景移除物体
	 */
	function removeObject(object: THREE.Object3D) {
		scene.value?.remove(object);
	}

	/**
	 * 销毁场景，释放资源
	 */
	function dispose() {
		if (animationId !== null) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}

		resizeObserver?.disconnect();
		resizeObserver = null;

		if (scene.value) {
			scene.value.traverse((object) => {
				if (object instanceof THREE.Mesh) {
					object.geometry?.dispose();
					if (Array.isArray(object.material)) {
						object.material.forEach((m) => {
							m.dispose();
						});
					} else {
						object.material?.dispose();
					}
				}
			});
			scene.value.clear();
		}

		if (renderer.value) {
			renderer.value.dispose();
			renderer.value.domElement.remove();
		}

		scene.value = null;
		camera.value = null;
		renderer.value = null;
		isReady.value = false;
		animationCallbacks.length = 0;
	}

	// 生命周期
	onMounted(() => init());
	onUnmounted(() => dispose());

	// 监听容器变化
	watch(container, (newContainer, oldContainer) => {
		if (oldContainer && !newContainer) dispose();
		else if (newContainer && !oldContainer) init();
	});

	return {
		scene,
		camera,
		renderer,
		isReady,
		isSupported,
		qualitySettings,
		addObject,
		removeObject,
		dispose,
		onAnimate,
	};
}
