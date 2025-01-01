<script lang='ts' setup>
const route = useRoute()
const inHome = computed(() => route.path === '/')
const { data: user } = await useFetch('/api/user')
</script>

<template>
  <div view-transition-logo>
    <ImgBlurHash
      mode="bg" :src="user!.avatar_url" blurhash="LYN0}600~q%LIT9Ft7IoIV-;-pxu" alt="Avatar"
      :class="inHome ? 'w-30' : 'w-10'" aspect-square rd="[62%_47%_82%_35%/45%_45%_80%_66%]"
      will-change="border-radius,transform,opacity" animate-shape
    />
  </div>
</template>
