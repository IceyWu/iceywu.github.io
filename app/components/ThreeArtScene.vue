<script setup lang="ts">
import * as THREE from "three";

const props = defineProps<{
	currentSection?: number;
}>();

const containerRef = ref<HTMLElement | null>(null);
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let animationId: number | null = null;

let gridFloor: THREE.Group | null = null;
const verticalLines: THREE.Line[] = [];
const floatingShapes: THREE.Group[] = [];
let particles: THREE.Points | null = null;

const mouse = reactive({ x: 0, y: 0 });
const smoothMouse = reactive({ x: 0, y: 0 });

const colors = computed(() => ({
	grid: isDark.value ? 0x2a2a4a : 0xc0c0d0,
	shape: isDark.value ? 0x6366f1 : 0x4f46e5,
	particle: isDark.value ? 0x818cf8 : 0x6366f1,
	accent: isDark.value ? 0x22d3ee : 0x06b6d4,
}));

function init() {
	if (!containerRef.value) return;
	const { width, height } = containerRef.value.getBoundingClientRect();

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(isDark.value ? 0x0f0f1a : 0xf8f8fc, 50, 400);

	camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
	camera.position.set(0, 20, 80);
	camera.lookAt(0, 0, -100);

	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setSize(width, height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.setClearColor(0x000000, 0);
	containerRef.value.appendChild(renderer.domElement);

	createGridFloor();
	createVerticalLines();
	createFloatingShapes();
	createParticles();

	animate();
	window.addEventListener("resize", handleResize);
}

function createGridFloor() {
	if (!scene) return;
	gridFloor = new THREE.Group();
	const gridSize = 400;
	const divisions = 40;
	const step = gridSize / divisions;

	for (let i = 0; i <= divisions; i++) {
		const z = -gridSize / 2 + i * step;
		const points = [
			new THREE.Vector3(-gridSize / 2, 0, z),
			new THREE.Vector3(gridSize / 2, 0, z),
		];
		const geo = new THREE.BufferGeometry().setFromPoints(points);
		const mat = new THREE.LineBasicMaterial({
			color: colors.value.grid,
			transparent: true,
			opacity: Math.max(0.05, 0.25 - Math.abs(i - divisions / 2) * 0.01),
		});
		gridFloor.add(new THREE.Line(geo, mat));
	}

	for (let i = 0; i <= divisions; i++) {
		const x = -gridSize / 2 + i * step;
		const points = [
			new THREE.Vector3(x, 0, gridSize / 2),
			new THREE.Vector3(x, 0, -gridSize / 2),
		];
		const geo = new THREE.BufferGeometry().setFromPoints(points);
		const mat = new THREE.LineBasicMaterial({
			color: colors.value.grid,
			transparent: true,
			opacity: Math.max(0.05, 0.25 - Math.abs(i - divisions / 2) * 0.01),
		});
		gridFloor.add(new THREE.Line(geo, mat));
	}

	gridFloor.position.y = -30;
	gridFloor.position.z = -100;
	scene.add(gridFloor);
}

function createVerticalLines() {
	if (!scene) return;
	const positions = [
		{ x: -60, z: -80 },
		{ x: 60, z: -80 },
		{ x: -40, z: -150 },
		{ x: 40, z: -150 },
		{ x: -80, z: -220 },
		{ x: 80, z: -220 },
	];

	positions.forEach((pos, i) => {
		const height = 100 + Math.random() * 50;
		const points = [
			new THREE.Vector3(pos.x, -30, pos.z),
			new THREE.Vector3(pos.x, height - 30, pos.z),
		];
		const geo = new THREE.BufferGeometry().setFromPoints(points);
		const mat = new THREE.LineBasicMaterial({
			color: colors.value.accent,
			transparent: true,
			opacity: 0.3 - i * 0.03,
		});
		const line = new THREE.Line(geo, mat);
		verticalLines.push(line);
		scene.add(line);
	});
}

function createFloatingShapes() {
	if (!scene) return;
	const configs = [
		{ x: -55, y: 20, z: -50, type: "oct", size: 15 },
		{ x: 60, y: 30, z: -80, type: "ico", size: 18 },
		{ x: -40, y: 45, z: -140, type: "tet", size: 20 },
		{ x: 75, y: 15, z: -180, type: "dod", size: 14 },
		{ x: -80, y: 35, z: -220, type: "oct", size: 22 },
	];

	configs.forEach((c, i) => {
		const group = new THREE.Group();
		let geo: THREE.BufferGeometry;
		if (c.type === "oct") geo = new THREE.OctahedronGeometry(c.size);
		else if (c.type === "ico") geo = new THREE.IcosahedronGeometry(c.size);
		else if (c.type === "tet") geo = new THREE.TetrahedronGeometry(c.size);
		else geo = new THREE.DodecahedronGeometry(c.size);

		const edges = new THREE.EdgesGeometry(geo);
		const lineMat = new THREE.LineBasicMaterial({
			color: colors.value.shape,
			transparent: true,
			opacity: 0.7,
		});
		group.add(new THREE.LineSegments(edges, lineMat));

		const faceMat = new THREE.MeshBasicMaterial({
			color: colors.value.shape,
			transparent: true,
			opacity: 0.1,
			side: THREE.DoubleSide,
		});
		group.add(new THREE.Mesh(geo, faceMat));

		group.position.set(c.x, c.y, c.z);
		group.userData = {
			baseY: c.y,
			rotSpeed: 0.005 + Math.random() * 0.005,
			floatSpeed: 0.4 + Math.random() * 0.3,
			phase: (i * Math.PI) / 2.5,
		};
		floatingShapes.push(group);
		scene.add(group);
	});
}

function createParticles() {
	if (!scene) return;
	const count = 80;
	const positions = new Float32Array(count * 3);
	for (let i = 0; i < count; i++) {
		positions[i * 3] = (Math.random() - 0.5) * 250;
		positions[i * 3 + 1] = Math.random() * 100 - 30;
		positions[i * 3 + 2] = -Math.random() * 350;
	}
	const geo = new THREE.BufferGeometry();
	geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	const mat = new THREE.PointsMaterial({
		color: colors.value.particle,
		size: 2.5,
		transparent: true,
		opacity: 0.4,
		sizeAttenuation: true,
	});
	particles = new THREE.Points(geo, mat);
	scene.add(particles);
}

function animate() {
	animationId = requestAnimationFrame(animate);
	if (!scene || !camera || !renderer) return;
	const time = performance.now() * 0.001;

	smoothMouse.x += (mouse.x - smoothMouse.x) * 0.05;
	smoothMouse.y += (mouse.y - smoothMouse.y) * 0.05;

	if (gridFloor) gridFloor.position.z = -100 + ((time * 10) % 10);

	floatingShapes.forEach((shape) => {
		const { baseY, rotSpeed, floatSpeed, phase, targetRotSpeed } =
			shape.userData;
		const currentRotSpeed = targetRotSpeed ?? rotSpeed;
		shape.rotation.x += currentRotSpeed;
		shape.rotation.y += currentRotSpeed * 1.3;
		shape.position.y = baseY + Math.sin(time * floatSpeed + phase) * 5;
	});

	if (particles) {
		const pos = particles.geometry.attributes.position.array as Float32Array;
		for (let i = 0; i < pos.length / 3; i++) {
			pos[i * 3 + 2] += 0.3;
			if (pos[i * 3 + 2] > 50) pos[i * 3 + 2] = -300;
		}
		particles.geometry.attributes.position.needsUpdate = true;
	}

	camera.position.x = smoothMouse.x * 30;
	camera.position.y = 20 + smoothMouse.y * 15;
	camera.lookAt(0, 0, -100);
	renderer.render(scene, camera);
}

function handleResize() {
	if (!containerRef.value || !camera || !renderer) return;
	const { width, height } = containerRef.value.getBoundingClientRect();
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
}

function handleMouseMove(e: MouseEvent) {
	const rect = containerRef.value?.getBoundingClientRect();
	if (!rect) return;
	mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
	mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
}

function dispose() {
	if (animationId) cancelAnimationFrame(animationId);
	window.removeEventListener("resize", handleResize);
	gridFloor?.children.forEach((c) => {
		if (c instanceof THREE.Line) {
			c.geometry.dispose();
			(c.material as THREE.Material).dispose();
		}
	});
	verticalLines.forEach((l) => {
		l.geometry.dispose();
		(l.material as THREE.Material).dispose();
	});
	floatingShapes.forEach((g) => {
		g.children.forEach((c) => {
			if (c instanceof THREE.LineSegments || c instanceof THREE.Mesh) {
				c.geometry.dispose();
				(c.material as THREE.Material).dispose();
			}
		});
	});
	particles?.geometry.dispose();
	(particles?.material as THREE.Material)?.dispose();
	renderer?.dispose();
	renderer?.domElement.remove();
}

watch(isDark, () => {
	if (scene)
		scene.fog = new THREE.Fog(isDark.value ? 0x0f0f1a : 0xf8f8fc, 50, 400);
	if (particles)
		(particles.material as THREE.PointsMaterial).color.setHex(
			colors.value.particle,
		);
});

// 板块切换时的空间过渡动画
watch(
	() => props.currentSection,
	(section) => {
		if (!camera || !scene || section === undefined) return;

		const configs = [
			{ z: 80, y: 20, rotX: 0, fogNear: 50, fogFar: 400 }, // 首页 - 正常视角
			{ z: 60, y: 35, rotX: -0.1, fogNear: 30, fogFar: 300 }, // 文章 - 俯视拉近
			{ z: 100, y: 15, rotX: 0.05, fogNear: 60, fogFar: 450 }, // 随笔 - 远景
			{ z: 50, y: 25, rotX: -0.05, fogNear: 20, fogFar: 250 }, // 项目 - 特写
			{ z: 120, y: 40, rotX: -0.15, fogNear: 80, fogFar: 500 }, // 足迹 - 鸟瞰
			{ z: 70, y: 10, rotX: 0.1, fogNear: 40, fogFar: 350 }, // 实验 - 仰视
		];

		const config = configs[section] ?? configs[0];
		const duration = 1200;
		const startTime = performance.now();

		const startZ = camera.position.z;
		const startY = camera.position.y - smoothMouse.y * 15;
		const startRotX = scene.rotation.x;
		const startFogNear = (scene.fog as THREE.Fog)?.near ?? 50;
		const startFogFar = (scene.fog as THREE.Fog)?.far ?? 400;

		// 几何体也做过渡动画
		floatingShapes.forEach((shape, i) => {
			const delay = i * 100;
			setTimeout(() => {
				shape.userData.targetRotSpeed = 0.02 + Math.random() * 0.02;
				setTimeout(() => {
					shape.userData.targetRotSpeed = shape.userData.rotSpeed;
				}, 500);
			}, delay);
		});

		function animateTransition() {
			const elapsed = performance.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - (1 - progress) ** 3; // easeOutCubic

			if (camera) {
				camera.position.z = startZ + (config.z - startZ) * eased;
				const baseY = startY + (config.y - startY) * eased;
				camera.position.y = baseY + smoothMouse.y * 15;
			}

			if (scene) {
				scene.rotation.x = startRotX + (config.rotX - startRotX) * eased;
				if (scene.fog instanceof THREE.Fog) {
					scene.fog.near =
						startFogNear + (config.fogNear - startFogNear) * eased;
					scene.fog.far = startFogFar + (config.fogFar - startFogFar) * eased;
				}
			}

			if (progress < 1) {
				requestAnimationFrame(animateTransition);
			}
		}

		animateTransition();
	},
);

onMounted(() => init());
onUnmounted(() => dispose());
</script>

<template>
  <div ref="containerRef" class="three-art-scene" @mousemove="handleMouseMove" />
</template>

<style scoped>
.three-art-scene {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.three-art-scene :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
