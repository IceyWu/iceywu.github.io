<script lang="ts" setup>
import SetSvgAnimation from 'svg-animate-web'

const routes = reactive<{ icon?: string, path: string, text?: string }[]>([
  { path: '/posts', text: 'Posts' },
  { path: '/projects', text: 'Projects' },
  { path: '/demos', text: 'Demos' },
  { path: '/map', text: 'Map' },
])

const route = useRoute()
const router = useRouter()
const inHome = computed(() => route.path === '/')

const { data: user } = await useFetch('/api/user')
function goHome() {
  router.replace('/')
}
function svgRef(data: any) {
  if (data) {
    const color = isDark.value ? '#fff' : '#333'
    SetSvgAnimation(data, {
      duration: 2,
      fill: 'transparent',
      // fillBase: color,
      stroke: color,
      strokeWidth: 0.7,
      count: 1,
    })
  }
}
</script>

<template>
  <header
    fixed
    z-9999
    top-0
    inset-x-0
    trans
    backdrop-blur
    fcc
    px-8
    pl-4
    border="0 b-1 #dcdfe6 dark:#4c4d4f op-70 hover:op-100 relative"
  >
    <div class="blog-header-bg w-full h-[50%] absolute top-0 left-0" />
    <nav w-full :class="inHome ? 'fcc' : 'fbc'">
      <div v-if="!inHome" class="transLogo">
        <div ml-4 w-20 h-auto>
          <Logo />
        </div>
        <!-- <NuxtLink to="/" title="Home">
          <UserAvatar />
        </NuxtLink> -->
      </div>

      <div
        class="transNavMenu"
        grid="~ gap-5"
        auto-flow-col
        items-center
        h-16
        md:h-18
      >
        <div
          v-if="!inHome"
          title="Home"
          class="z-999 cursor-pointer"
          @click="goHome"
        >
          <span icon-text>Home</span>
        </div>
        <NuxtLink
          v-for="_route in routes"
          :key="_route.path"
          :to="_route.path"
          :title="
            _route.path.slice(1, 2).toUpperCase()
              + _route.path.slice(2).toLowerCase()
          "
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
          <div v-else icon-btn :class="_route.icon" />
        </NuxtLink>

        <!-- <a
          title="Twitter"
          hidden
          lg:block
          href="https://twitter.com/IceyWu"
          target="_blank"
          icon-link
          i-ri:twitter-line
        /> -->
        <a
          title="Github"
          :href="user?.html_url"
          target="_blank"
          icon-link
          i-ri-github-line
        />
        <div fcc>
          <DrakToggle />
        </div>
      </div>
    </nav>
  </header>
  <!-- For header fixed -->
  <div h-16 md:h-18 />
</template>

<style>
.blog-header-bg {
  background-image: linear-gradient(-45deg, #00a98e 30%, #009ff7);
  filter: blur(100px);
  transition: opacity 1s ease;
}
.app-header__nav-svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
</style>
