import * as THREE from "three";
import type { GeometryConfig } from "./useThreeConfig";
import type { QualitySettings } from "./useThreeScene";

export interface UseThreeGeometryOptions {
	qualitySettings: Ref<QualitySettings>;
	isDark?: Ref<boolean>;
}

/**
 * 创建线框材质（手绘风格）
 */
function createSketchMaterial(
	color: string,
	wireframe = true,
): THREE.MeshBasicMaterial {
	return new THREE.MeshBasicMaterial({
		color: new THREE.Color(color),
		wireframe,
		transparent: true,
		opacity: 0.25,
	});
}

/**
 * 创建几何体
 */
function createGeometry(
	type: GeometryConfig["type"],
	size: number,
	detail: number,
): THREE.BufferGeometry {
	switch (type) {
		case "icosahedron":
			return new THREE.IcosahedronGeometry(size, detail);
		case "torus":
			return new THREE.TorusGeometry(
				size,
				size * 0.3,
				8 + detail * 4,
				16 + detail * 8,
			);
		case "octahedron":
			return new THREE.OctahedronGeometry(size, detail);
		case "ring":
			return new THREE.TorusGeometry(size, size * 0.1, 3, 32 + detail * 16);
		case "particles":
			return createParticleGeometry(size, 50 + detail * 50);
		default:
			return new THREE.IcosahedronGeometry(size, detail);
	}
}

/**
 * 创建粒子几何体
 */
function createParticleGeometry(
	radius: number,
	count: number,
): THREE.BufferGeometry {
	const geometry = new THREE.BufferGeometry();
	const positions = new Float32Array(count * 3);

	for (let i = 0; i < count; i++) {
		const theta = Math.random() * Math.PI * 2;
		const phi = Math.acos(2 * Math.random() - 1);
		const r = radius * (0.5 + Math.random() * 0.5);

		positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
		positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
		positions[i * 3 + 2] = r * Math.cos(phi);
	}

	geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	return geometry;
}

/**
 * Three.js 几何体工厂 Composable
 */
export function useThreeGeometry(options: UseThreeGeometryOptions) {
	const { qualitySettings, isDark = ref(false) } = options;
	const meshes: THREE.Mesh[] = [];
	const particles: THREE.Points[] = [];

	const lightColor = "#888888";
	const darkColor = "#777777";

	const currentColor = computed(() => (isDark.value ? darkColor : lightColor));

	/**
	 * 创建单个网格
	 */
	function createMesh(config: GeometryConfig): THREE.Mesh | THREE.Points {
		const size = config.size ?? 1;
		const detail = config.detail ?? qualitySettings.value.geometryDetail;
		const wireframe = config.wireframe ?? true;
		const color = config.color ?? currentColor.value;

		if (config.type === "particles") {
			const geometry = createParticleGeometry(
				size,
				qualitySettings.value.particleCount,
			);
			const material = new THREE.PointsMaterial({
				color: new THREE.Color(color),
				size: 0.02,
				transparent: true,
				opacity: 0.5,
			});
			const points = new THREE.Points(geometry, material);
			if (config.position) {
				points.position.set(
					config.position.x,
					config.position.y,
					config.position.z,
				);
			}
			particles.push(points);
			return points;
		}

		const geometry = createGeometry(config.type, size, detail);
		const material = createSketchMaterial(color, wireframe);
		const mesh = new THREE.Mesh(geometry, material);

		if (config.position) {
			mesh.position.set(
				config.position.x,
				config.position.y,
				config.position.z,
			);
		}

		meshes.push(mesh);
		return mesh;
	}

	/**
	 * 创建一组装饰几何体
	 */
	function createDecorations(configs: GeometryConfig[]): THREE.Group {
		const group = new THREE.Group();
		for (const config of configs) {
			const mesh = createMesh(config);
			group.add(mesh);
		}
		return group;
	}

	/**
	 * 创建默认装饰几何体
	 */
	function createDefaultDecorations(): THREE.Group {
		const group = new THREE.Group();
		const color = currentColor.value;

		// 主几何体 - 二十面体
		const mainGeo = new THREE.IcosahedronGeometry(
			1.8,
			qualitySettings.value.geometryDetail,
		);
		const mainMat = createSketchMaterial(color, true);
		mainMat.opacity = 0.5;
		const mainMesh = new THREE.Mesh(mainGeo, mainMat);
		meshes.push(mainMesh);
		group.add(mainMesh);

		// 装饰几何体 - 环
		const ring1Geo = new THREE.TorusGeometry(1.8, 0.02, 3, 64);
		const ring1Mat = createSketchMaterial(color, false);
		ring1Mat.opacity = 0.3;
		const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
		ring1.rotation.x = Math.PI / 3;
		meshes.push(ring1);
		group.add(ring1);

		// 装饰几何体 - 小八面体
		const oct1Geo = new THREE.OctahedronGeometry(0.3, 0);
		const oct1Mat = createSketchMaterial(color, true);
		const oct1 = new THREE.Mesh(oct1Geo, oct1Mat);
		oct1.position.set(2.5, 1, -1);
		meshes.push(oct1);
		group.add(oct1);

		const oct2Geo = new THREE.OctahedronGeometry(0.25, 0);
		const oct2Mat = createSketchMaterial(color, true);
		const oct2 = new THREE.Mesh(oct2Geo, oct2Mat);
		oct2.position.set(-2.2, -0.8, 0.5);
		meshes.push(oct2);
		group.add(oct2);

		// 粒子
		if (qualitySettings.value.particleCount > 0) {
			const particleGeo = createParticleGeometry(
				3,
				qualitySettings.value.particleCount,
			);
			const particleMat = new THREE.PointsMaterial({
				color: new THREE.Color(color),
				size: 0.015,
				transparent: true,
				opacity: 0.4,
			});
			const points = new THREE.Points(particleGeo, particleMat);
			particles.push(points);
			group.add(points);
		}

		return group;
	}

	/**
	 * 更新所有材质颜色（主题切换）
	 */
	function updateColors(dark: boolean) {
		const color = dark ? darkColor : lightColor;
		const threeColor = new THREE.Color(color);

		for (const mesh of meshes) {
			if (mesh.material instanceof THREE.MeshBasicMaterial) {
				mesh.material.color = threeColor;
			}
		}

		for (const point of particles) {
			if (point.material instanceof THREE.PointsMaterial) {
				point.material.color = threeColor;
			}
		}
	}

	/**
	 * 释放资源
	 */
	function dispose() {
		for (const mesh of meshes) {
			mesh.geometry?.dispose();
			if (mesh.material instanceof THREE.Material) {
				mesh.material.dispose();
			}
		}
		for (const point of particles) {
			point.geometry?.dispose();
			if (point.material instanceof THREE.Material) {
				point.material.dispose();
			}
		}
		meshes.length = 0;
		particles.length = 0;
	}

	// 监听主题变化
	watch(isDark, (dark) => updateColors(dark));

	return {
		createMesh,
		createDecorations,
		createDefaultDecorations,
		updateColors,
		dispose,
		meshes,
		particles,
	};
}
