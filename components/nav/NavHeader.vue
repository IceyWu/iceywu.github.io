<script lang="ts" setup>
const routes = reactive<{ icon?: string, path: string, text?: string }[]>([
  // { path: '/posts', text: 'Blog' },
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
            :class="route.path === _route.path ? 'color-teal-500' : ''"
            icon-text
          >{{ _route.text }}</span>
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
</style>
