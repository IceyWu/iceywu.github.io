<script lang="ts" setup>
import { useTitle } from "@vueuse/core";
const { data: user = ref({}) } = await useFetch("/api/user");
useTitle(user.value?.name);
</script>

<template>
  <div prose ma c-primary:75>
    <!-- <PersonInfo /> -->
    <h1 fsc gap-5>
      <ImgBlurHash
        mode="bg"
        class="transLogo"
        :src="user!.avatar_url"
        blurhash="LYN0}600~q%LIT9Ft7IoIV-;-pxu"
        alt="Avatar"
        w-30
        h-30
        rd="[62%_47%_82%_35%/45%_45%_80%_66%]"
        will-change="border-radius,transform,opacity"
        animate-shape
      />
    </h1>
    <p>
      I'm
      <a
        trans
        linear-text
        shape-bl
        class="c-context::#C084FC font-italic"
        :from="isDark ? '#4facfe' : '#e0c3fc'"
        :to="isDark ? '#00f2fe' : '#8ec5fc'"
        href="https://github.com/IceyWu"
        target="_blank"
        ><strong>{{ user?.name }}</strong></a
      >, front-end engineer 🌈 & open source enthusiast.
    </p>
    <p>
      Team member of
      <a
        linkInProse
        o="#c18139"
        href="https://github.com/Life-Palette"
        target="_blank"
        ><strong>Life</strong> <sub bottom-0>Palette</sub></a
      >, Creator of
      <a
        trans
        linear-text
        shape-bl
        class="c-context::#C084FC"
        from="#ACC1EE"
        to="#C084FC"
        href="https://github.com/Life-Palette"
        target="_blank"
        ><strong>Life palette</strong></a
      >
      <a
        trans
        linear-text
        shape-bl
        class="c-context::#C084FC"
        from="#ACC1EE"
        to="#C084FC"
        href="http://47.108.192.147:10086/#/index"
        target="_blank"
        ><strong>Go de</strong></a
      >
      <i i-fluent-emoji-sparkles ml-1 />
      <br />
      In the community, I am also a ecological contributors of the
      <i i-logos-element w-1.1em h-1.1em mr-1 />
      <a
        trans
        linear-text
        shape-bottom-right
        class="c-context::#bd34fe"
        from="#41d1ff"
        to="#bd34fe"
        href="https://github.com/element-plus/element-plus"
        target="_blank"
        >element-plus</a
      >、
      <i i-logos-vueuse w-1.1em h-1.1em mr-1 />
      <a
        linkInProse
        o="#64b687"
        href="https://github.com/vueuse/vueuse"
        target="_blank"
        >VueUse</a
      >& etc.

      <i i-fluent-emoji-partying-face />
    </p>

    <p>
      <a
        trans
        text-p-r
        class="group"
        hover-op-75
        :href="`mailto:${user?.email ?? '3128006406@qq.com'}`"
      >
        Contact Me
        <i trans group-hover="ml-2" i-ri:arrow-right-up-line bg-gradient-to-r />
      </a>
    </p>
  </div>
</template>

<style scoped>
p {
  font-size: 1.6em;
  font-weight: 300;
  line-height: 1.4;
  max-width: 28em;
}
</style>
