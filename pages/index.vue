<script lang="ts" setup>
// import { to } from "@iceywu/utils";
useHead({
  title: 'IceyWu',
})
const userInfo = ref({
  avatar_url: 'https://avatars.githubusercontent.com/u/66096254?v=4',
  name: 'Icey Wu',
  company: null,
  blog: 'https://iceywu.github.io/',
  location: 'Chengdu, China',
  email: null,
})
onMounted(async () => {
  // const [_, resData] = await to(useFetch("/api/user"));
  // console.log("🐠-----resData-----", resData?.data?.value);
  // userInfo.value = resData?.data?.value as any;
})
</script>

<template>
  <div prose ma c-primary:75>
    <!-- <PersonInfo /> -->
    <h1 fsc gap-5>
      <ImgBlurHash
        mode="bg"
        class="transLogo"
        :src="userInfo?.avatar_url"
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
      ><strong>{{ userInfo?.name }}</strong></a>, Front-end developer and Open source
      <strong class="text-class"> enthusiasts</strong>
    </p>
    <p>
      Want to travel the world and fill up my
      <a
        trans
        linear-text
        shape-bl
        class="c-context::#C084FC font-italic"
        :from="isDark ? '#4facfe' : '#e0c3fc'"
        :to="isDark ? '#00f2fe' : '#8ec5fc'"
        href="/map"
      ><strong>Map</strong></a>.
    </p>
    <p>
      Team member of
      <a
        linkInProse
        o="#c18139"
        href="https://github.com/Life-Palette"
        target="_blank"
      ><strong>Life</strong> <sub bottom-0>Palette</sub></a>, Creator of
      <a
        trans
        linear-text
        shape-bl
        class="c-context::#C084FC"
        from="#ACC1EE"
        to="#C084FC"
        href="https://github.com/Life-Palette"
        target="_blank"
      ><strong>Life palette</strong></a>
      <!-- <a
        trans
        linear-text
        shape-bl
        class="c-context::#C084FC"
        from="#ACC1EE"
        to="#C084FC"
        href="http://47.108.192.147:10086/#/index"
        target="_blank"
        ><strong>Go de</strong></a
      > -->
      <!-- <i i-fluent-emoji-sparkles ml-1 /> -->
      <br>
    </p>
    <p>
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
      >element-plus</a>、
      <i i-logos-vueuse w-1.1em h-1.1em mr-1 />
      <a
        linkInProse
        o="#64b687"
        href="https://github.com/vueuse/vueuse"
        target="_blank"
      >VueUse</a>& etc.
    </p>
    <p>
      I also love photography. I want to record every beautiful moment, sharing
      these photos on my
      <a
        trans
        linear-text
        shape-bottom-right
        class="c-context::#bd34fe"
        from="#cc208e"
        to="#6713d2"
        href="http://47.108.192.147:10086/#/index"
        target="_blank"
      ><strong>website</strong></a>
      , welcome to join
      <!-- <i i-fluent-emoji-partying-face /> -->
    </p>

    <p>
      <a
        trans
        text-p-r
        class="group"
        hover-op-75
        :href="`mailto:${userInfo?.email ?? '3128006406@qq.com'}`"
      >
        Contact Me
        <i trans group-hover="ml-2" i-ri:arrow-right-up-line bg-gradient-to-r />
      </a>
    </p>
  </div>
</template>

<style scoped>
p {
  font-size: 1.5em;
  font-weight: 300;
  line-height: 1.4;
  max-width: 28em;
}
.text-class {
  position: relative;
}
.text-class::after {
  background-image: url("~/public/images/line.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  content: "";
  display: block;
  height: 0.3em;
  position: absolute;
  left: 0;
  bottom: -0.3em;
  width: 100%;
}
</style>
