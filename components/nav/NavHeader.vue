<script lang="ts" setup>
const routes = reactive<{ icon?: string; path: string; text?: string }[]>([
  { path: '/', text: 'Home' },
  { path: '/projects', text: 'Projects' },
])

const route = useRoute()
const inHome = computed(() => route.path === '/')

const { data: user } = await useFetch('/api/user')
</script>

<template>
  <header fixed z-9999 top-0 inset-x-0 trans backdrop-blur fcc px-8 pl-4>
    <nav w-full :class="inHome ? 'fcc' : 'fbc'">
      <div v-if="!inHome" class="transLogo">
        <NuxtLink to="/" title="Home">
          <ImgBlurHash
            :src="user!.avatar_url"
            blurhash="LYN0}600~q%LIT9Ft7IoIV-;-pxu"
            alt="Avatar"
            w-10
            h-10
            rounded-full
          />
        </NuxtLink>
      </div>

      <div
        class="transNavMenu"
        grid="~ gap-5"
        auto-flow-col
        items-center
        h-16
        md:h-18
      >
        <NuxtLink
          v-for="_route in routes"
          :key="_route.path"
          :to="_route.path"
          :title="
            _route.path.slice(1, 2).toUpperCase()
              + _route.path.slice(2).toLowerCase()
          "
        >
          <span v-if="_route.text" icon-text>{{ _route.text }}</span>
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
