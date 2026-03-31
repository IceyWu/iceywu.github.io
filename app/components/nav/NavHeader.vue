<script lang="ts" setup>
import SetSvgAnimation from "svg-animate-web";
import GithubIcon from "./GithubIcon.vue";

interface Menu {
	icon?: string;
	path: string;
	text?: string;
}

const routes = reactive<Menu[]>([
	{ path: "/posts", icon: "i-custom-post", text: "Posts" },
	{ path: "/essays", icon: "i-carbon-pen", text: "Essays" },
	{ path: "/projects", icon: "i-custom-package", text: "Projects" },
	// { path: '/talks', icon: 'i-custom-ppt' },
	// { path: '/images', icon: 'i-ri-image-line' },
	{ path: "/map", icon: "i-carbon-map", text: "Map" },
	{ path: "/demos", icon: "i-carbon-demo", text: "Demos" },
	{ path: "/friends", icon: "i-carbon-friendship", text: "Friends" },
]);

const route = useRoute();
const router = useRouter();
const inHome = computed(() => route.path === "/");
const primaryRoutes = computed(() => routes.slice(0, 3));
const secondaryRoutes = computed(() => routes.slice(3));
const { y } = useWindowScroll();

const headerProgress = computed(() => Math.min(y.value / 80, 1));
const headerStyle = computed(() => {
	const progress = headerProgress.value;
	const lightOpacity = 0.18 + progress * 0.64;
	const darkOpacity = 0.12 + progress * 0.56;
	const borderOpacity = 0.02 + progress * 0.06;
	const blur = 2 + progress * 10;

	return {
		backgroundColor: isDark.value
			? `rgba(0, 0, 0, ${darkOpacity})`
			: `rgba(255, 255, 255, ${lightOpacity})`,
		backdropFilter: `blur(${blur}px)`,
		WebkitBackdropFilter: `blur(${blur}px)`,
		borderBottomColor: isDark.value
			? `rgba(255, 255, 255, ${borderOpacity + 0.02})`
			: `rgba(0, 0, 0, ${borderOpacity})`,
	};
});

function goHome() {
	router.replace("/");
}
function svgRef(data: any) {
	if (data) {
		const color = isDark.value ? "#fff" : "#333";
		SetSvgAnimation(data, {
			duration: 2,
			fill: "transparent",
			// fillBase: color,
			stroke: color,
			strokeWidth: 0.7,
			count: 1,
		});
	}
}
</script>

<template>
  <header sticky z-999 top-0 trans fcc px-3 sm:px-6 border-b class="transition-[background-color,border-color,backdrop-filter] duration-300" :style="headerStyle">
    <nav w-full>
      <div class="flex items-center justify-between gap-3 h-13 sm:h-16 md:h-18">
        <button type="button" class="flex items-center" @click="goHome">
          <div w-18 sm:w-20 h-auto>
            <Logo />
          </div>
        </button>

        <div class="hidden md:grid" view-transition-nav-menu grid="~ gap-5" auto-flow-col items-center>
          <div
            v-if="!inHome"
            title="Home"
            class="z-999 cursor-pointer"
            @click="goHome"
          >
            <span icon-text>Home</span>
          </div>
          <NuxtLink
            v-for="_route in routes" :key="_route.path" :to="_route.path"
            :title="_route.path.slice(1, 2).toUpperCase() + _route.path.slice(2).toLowerCase()"
          >
            <span
              v-if="_route.text"
              class="relative"
              :class="route.path === _route.path ? 'color-teal-500' : ''"
              icon-text
            >{{ _route.text }}
              <template v-if="route.path === _route.path">
                <svg
                  :ref="svgRef"
                  class="app-header__nav-svg"
                  width="62"
                  height="36"
                  viewBox="0 0 62 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style="opacity: 1"
                >
                  <path
                    d="M51.0232 4.78137C43.8399 4.78137 36.6567 4.78137 29.4735 4.78137C23.1773 4.78137 16.2376 4.08517 10.3663 6.8296C7.6938 8.0788 4.38645 10.1306 2.84649 12.782C1.48574 15.1248 0.988718 18.628 1.00019 21.3018C1.00994 23.5719 1.97437 25.3351 3.35614 27.0811C5.46795 29.7497 7.95463 32.4336 11.2606 33.5431C15.1621 34.8525 19.7135 34.9982 23.7711 35.0913C29.954 35.2332 36.1171 34.7828 42.2533 34.0528C46.1165 33.5932 50.5598 33.2245 54.2349 31.7065C57.4622 30.3735 62.0997 26.3314 61.6586 22.3981C61.0983 17.4025 57.2737 13.0321 53.8695 9.62789C50.8422 6.6005 47.4077 4.06244 43.2245 2.887C38.343 1.51534 33.0525 1.14648 28.0022 1.14648"
                    :stroke="isDark ? 'white' : 'black'"
                    stroke-width="0.5"
                    stroke-linecap="round"
                    style="stroke-dashoffset: 0px; stroke-dasharray: 175.589"
                  />
                </svg>
              </template>
            </span>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-3 sm:gap-4">
          <a title="Github" href="https://github.com/iceywu" target="_blank" class="text-sm op-65 hover:op-100 transition-opacity">
            <GithubIcon />
          </a>
          <DrakToggle />
        </div>
      </div>

      <div class="md:hidden pb-2">
        <div class="border-t border-black/8 pt-2 dark:border-white/10">
          <div class="grid grid-cols-3 gap-x-4 gap-y-1">
          <NuxtLink
            v-for="_route in primaryRoutes"
            :key="_route.path"
            :to="_route.path"
            class="py-2 text-center text-sm transition-opacity"
            :class="route.path === _route.path
              ? 'font-medium op-100'
              : 'op-45 hover:op-100'"
          >
            {{ _route.text }}
          </NuxtLink>
          </div>
          <div class="mt-1 flex items-center justify-center gap-4 text-[11px] op-35">
          <NuxtLink
            v-for="_route in secondaryRoutes"
            :key="_route.path"
            :to="_route.path"
            class="transition-opacity hover:op-100"
            :class="route.path === _route.path ? 'op-100 font-medium' : ''"
          >
            {{ _route.text }}
          </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style>
.app-header__nav-svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
</style>
