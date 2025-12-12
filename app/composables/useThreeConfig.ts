import type { QualityLevel } from "./useThreeScene";

export interface GeometryConfig {
	type: "icosahedron" | "torus" | "octahedron" | "ring" | "particles";
	size?: number;
	detail?: number;
	wireframe?: boolean;
	color?: string;
	position?: { x: number; y: number; z: number };
}

export interface ThreeConfig {
	quality: QualityLevel;
	geometries: GeometryConfig[];
	animationSpeed: number;
	mouseSensitivity: number;
	enableParticles: boolean;
	lightColor: string;
	darkColor: string;
}

const DEFAULT_CONFIG: ThreeConfig = {
	quality: "auto",
	geometries: [
		{ type: "icosahedron", size: 1, detail: 1, wireframe: true },
		{
			type: "torus",
			size: 0.6,
			wireframe: true,
			position: { x: 2, y: 1, z: -1 },
		},
		{
			type: "octahedron",
			size: 0.5,
			wireframe: true,
			position: { x: -2, y: -1, z: 0 },
		},
	],
	animationSpeed: 1,
	mouseSensitivity: 0.5,
	enableParticles: true,
	lightColor: "#333333",
	darkColor: "#cccccc",
};

/**
 * 验证配置对象是否有效
 */
export function validateConfig(config: unknown): config is ThreeConfig {
	if (!config || typeof config !== "object") return false;
	const c = config as Record<string, unknown>;

	if (typeof c.quality !== "string") return false;
	if (!["low", "medium", "high", "auto"].includes(c.quality)) return false;

	if (!Array.isArray(c.geometries)) return false;
	for (const geo of c.geometries) {
		if (!geo || typeof geo !== "object") return false;
		const g = geo as Record<string, unknown>;
		if (typeof g.type !== "string") return false;
		if (
			!["icosahedron", "torus", "octahedron", "ring", "particles"].includes(
				g.type,
			)
		)
			return false;
	}

	if (typeof c.animationSpeed !== "number" || c.animationSpeed < 0)
		return false;
	if (typeof c.mouseSensitivity !== "number") return false;
	if (typeof c.enableParticles !== "boolean") return false;
	if (typeof c.lightColor !== "string") return false;
	if (typeof c.darkColor !== "string") return false;

	return true;
}

/**
 * 序列化配置为JSON字符串
 */
export function serializeConfig(config: ThreeConfig): string {
	return JSON.stringify(config);
}

/**
 * 从JSON字符串解析配置
 */
export function parseConfig(json: string): ThreeConfig | null {
	try {
		const parsed = JSON.parse(json);
		if (validateConfig(parsed)) return parsed;
		return null;
	} catch {
		return null;
	}
}

/**
 * Three.js 配置管理 Composable
 */
export function useThreeConfig(initialConfig?: Partial<ThreeConfig>) {
	const config = ref<ThreeConfig>({
		...DEFAULT_CONFIG,
		...initialConfig,
	});

	function serialize(): string {
		return serializeConfig(config.value);
	}

	function parse(json: string): ThreeConfig | null {
		const parsed = parseConfig(json);
		if (parsed) config.value = parsed;
		return parsed;
	}

	function validate(c: unknown): c is ThreeConfig {
		return validateConfig(c);
	}

	function reset() {
		config.value = { ...DEFAULT_CONFIG };
	}

	function updateConfig(updates: Partial<ThreeConfig>) {
		config.value = { ...config.value, ...updates };
	}

	return {
		config,
		serialize,
		parse,
		validate,
		reset,
		updateConfig,
		DEFAULT_CONFIG,
	};
}
