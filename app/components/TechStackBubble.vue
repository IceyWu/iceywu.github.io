<script lang="ts" setup>
type GithubStats = {
	avatar: string;
	createdAt: string;
	languageStats: Record<string, number>;
	repos: number;
	totalStars: number;
};

const { data: githubStats } = await useFetch<GithubStats>("/api/lang-stats", {
	default: () => ({
		avatar: "",
		createdAt: "2020-01-01T00:00:00.000Z",
		languageStats: {},
		repos: 0,
		totalStars: 0,
	}),
});

const stats = computed(() => githubStats.value?.languageStats || {});

const langIcons: Record<string, string> = {
	TypeScript: "i-logos-typescript-icon",
	JavaScript: "i-logos-javascript",
	Vue: "i-logos-vue",
	Python: "i-logos-python",
	Go: "i-logos-go",
	Rust: "i-logos-rust",
	Java: "i-logos-java",
	Kotlin: "i-logos-kotlin-icon",
	Swift: "i-logos-swift",
	Dart: "i-logos-dart",
	Ruby: "i-logos-ruby",
	PHP: "i-logos-php",
	"C++": "i-logos-c-plusplus",
	C: "i-logos-c",
	"C#": "i-logos-c-sharp",
	Shell: "i-logos-bash-icon",
	Lua: "i-logos-lua",
	Dockerfile: "i-logos-docker-icon",
	Svelte: "i-logos-svelte-icon",
	Astro: "i-logos-astro-icon",
};

const languages = computed(() => {
	const total = Object.values(stats.value).reduce((s, v) => s + v, 0);
	if (total === 0) return [];
	return Object.entries(stats.value)
		.sort((a, b) => b[1] - a[1])
		.map(([name, bytes]) => ({
			name,
			pct: Math.round((bytes / total) * 100),
			icon: langIcons[name] || "",
		}));
});

// --- 3D Sphere ---
interface Point3D {
	x: number;
	y: number;
	z: number;
}
interface RenderedItem {
	name: string;
	pct: number;
	icon: string;
	x: number;
	y: number;
	z: number;
	scale: number;
	opacity: number;
	size: number;
}

const containerRef = ref<HTMLElement>();
const isHovering = ref(false);
let mouseOffX = 0;
let mouseOffY = 0;
let points: Point3D[] = [];
const rendered = shallowRef<RenderedItem[]>([]);
let rafId = 0;

function fibonacci(n: number): Point3D[] {
	const pts: Point3D[] = [];
	const golden = (1 + Math.sqrt(5)) / 2;
	for (let i = 0; i < n; i++) {
		const theta = Math.acos(1 - (2 * (i + 0.5)) / n);
		const phi = (2 * Math.PI * i) / golden;
		pts.push({
			x: Math.sin(theta) * Math.cos(phi),
			y: Math.sin(theta) * Math.sin(phi),
			z: Math.cos(theta),
		});
	}
	return pts;
}

function rotX(p: Point3D, a: number): Point3D {
	const c = Math.cos(a);
	const s = Math.sin(a);
	return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}
function rotY(p: Point3D, a: number): Point3D {
	const c = Math.cos(a);
	const s = Math.sin(a);
	return { x: p.x * c - p.z * s, y: p.y, z: p.x * s + p.z * c };
}

function project(items: typeof languages.value) {
	if (!points.length || !items.length) return;
	const maxPct = items[0]!.pct;

	const sx = isHovering.value ? mouseOffX * 0.00004 : 0.003;
	const sy = isHovering.value ? mouseOffY * 0.00004 : 0.001;

	for (let i = 0; i < points.length; i++) {
		points[i] = rotX(rotY(points[i]!, sx), sy);
	}

	const out: RenderedItem[] = [];
	for (let i = 0; i < points.length; i++) {
		const p = points[i]!;
		const item = items[i];
		if (!item) continue;
		const depth = (p.z + 1.5) / 2.5;
		const pctR = item.pct / Math.max(maxPct, 1);
		const base = 48 + pctR * 28;
		out.push({
			name: item.name,
			pct: item.pct,
			icon: item.icon,
			x: p.x * 40 + 50,
			y: p.y * 38 + 48,
			z: p.z,
			scale: Math.max(0.55, depth),
			opacity: Math.max(0.25, (p.z + 1.2) / 2.2),
			size: Math.round(base * Math.max(0.65, depth)),
		});
	}
	out.sort((a, b) => a.z - b.z);
	rendered.value = out;
}

function tick() {
	project(languages.value);
	rafId = requestAnimationFrame(tick);
}

function onPointerMove(e: MouseEvent | TouchEvent) {
	if (!containerRef.value) return;
	const rect = containerRef.value.getBoundingClientRect();
	const cx = rect.left + rect.width / 2;
	const cy = rect.top + rect.height / 2;
	const pt = "touches" in e ? e.touches[0] : e;
	if (!pt) return;
	mouseOffX = pt.clientX - cx;
	mouseOffY = pt.clientY - cy;
}

watch(
	languages,
	(items) => {
		if (items.length && points.length !== items.length) {
			points = fibonacci(items.length);
			project(items);
		}
	},
	{ immediate: true },
);

onMounted(() => {
	rafId = requestAnimationFrame(tick);
});
onUnmounted(() => {
	cancelAnimationFrame(rafId);
});
</script>

<template>
  <div
    ref="containerRef"
    class="tech-constellation relative w-full aspect-square max-w-72 md:max-w-88 mx-auto select-none"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false; mouseOffX = 0; mouseOffY = 0"
    @mousemove="onPointerMove"
    @touchstart.passive="isHovering = true"
    @touchmove.passive="onPointerMove"
    @touchend="isHovering = false"
  >
    <div
      v-for="item in rendered"
      :key="item.name"
      class="absolute flex flex-col items-center group cursor-default"
      :style="{
        left: item.x + '%',
        top: item.y + '%',
        transform: `translate(-50%,-50%) scale(${item.scale.toFixed(3)})`,
        zIndex: Math.round((item.z + 1) * 50),
      }"
    >
      <div
        class="flex items-center justify-center rounded-full border border-black/6 dark:border-white/10 bg-black/2 dark:bg-white/5 transition-colors duration-300 group-hover:border-black/20 dark:group-hover:border-white/25"
        :style="{
          width: item.size + 'px',
          height: item.size + 'px',
          opacity: item.opacity,
        }"
      >
        <span
          v-if="item.icon"
          :class="item.icon"
          class="tech-icon"
          :style="{
            fontSize: Math.round(item.size * 0.45) + 'px',
            width: Math.round(item.size * 0.45) + 'px',
            height: Math.round(item.size * 0.45) + 'px',
          }"
        />
        <span
          v-else
          class="font-sketch"
          :style="{ fontSize: Math.round(item.size * 0.36) + 'px', opacity: item.opacity }"
        >
          {{ item.name.slice(0, 2) }}
        </span>
      </div>
      <span
        class="mt-0.5 font-sketch text-[9px] md:text-[10px] leading-tight whitespace-nowrap"
        		:style="{ opacity: Math.max(0.1, item.opacity - 0.15) * 0.9 }"
      >
        {{ item.name }}
      </span>
      <span
        class="font-sketch text-[7px] md:text-[8px] leading-tight"
        		:style="{ opacity: Math.max(0.05, item.opacity - 0.25) * 0.7 }"
      >
        {{ item.pct }}%
      </span>
    </div>
  </div>
</template>

<style scoped>
.tech-icon {
  filter: grayscale(1) brightness(0.8);
  transition: filter 0.3s ease;
}
.group:hover .tech-icon {
  filter: grayscale(0.1);
}
</style>

<style>
.dark .tech-constellation .tech-icon {
  filter: grayscale(1) brightness(2);
}
.dark .tech-constellation .group:hover .tech-icon {
  filter: grayscale(0.1) brightness(1.2);
}
</style>
