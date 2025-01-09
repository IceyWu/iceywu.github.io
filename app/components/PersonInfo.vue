<script lang="ts" setup>
const { data } = await useFetch('/api/user')
const userInfo = computed(() => {
  return (
    data.value || {
      avatar_url: 'https://avatars.githubusercontent.com/u/66096254?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/IceyWu',
      html_url: 'https://github.com/IceyWu',
      name: 'Icey Wu',
      company: null,
      blog: 'https://iceywu.github.io/',
      location: 'Chengdu, China',
      email: null,
      hireable: null,
      bio: null,
      twitter_username: null,
      public_repos: 60,
      public_gists: 0,
      followers: 30,
      following: 19,
      created_at: '2020-05-28T23:35:36Z',
      updated_at: '2024-12-23T16:20:27Z',
    }
  )
})
</script>

<template>
  <div prose ma c-primary:75>
    <h1 fsc gap-5>
      <UserAvatar />
    </h1>
    <section>
      <p>
        I'm-{{ process?.env?.TEST_VAL || 'o' }}
        <strong>
          <a
            trans
            linear-text
            shape-bl
            class="c-context::#C084FC font-italic"
            :from="isDark ? '#4facfe' : '#e0c3fc'"
            :to="isDark ? '#00f2fe' : '#8ec5fc'"
            href="https://github.com/IceyWu"
            target="_blank"
          >{{ userInfo?.name }}</a></strong>, Front-end developer and Open source
        <strong class="text-class"> enthusiasts</strong>
      </p>
      <p>
        Want to travel the world and fill up my
        <strong>
          <a
            trans
            linear-text
            shape-bl
            class="c-context::#C084FC font-italic"
            :from="isDark ? '#4facfe' : '#e0c3fc'"
            :to="isDark ? '#00f2fe' : '#8ec5fc'"
            href="/map"
          >Map</a></strong>.
      </p>
      <p>
        Team member and Creator of
        <strong>
          <a
            trans
            linear-text
            shape-bl
            class="c-context::#C084FC"
            from="#ACC1EE"
            to="#C084FC"
            href="https://github.com/Life-Palette"
            target="_blank"
          >Life palette</a></strong>
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
        I also love photography. I want to record every beautiful moment,
        sharing these photos on my
        <a
          trans
          linear-text
          shape-bottom-right
          class="c-context::#bd34fe"
          from="#cc208e"
          to="#6713d2"
          href="http://lpalette.cn/"
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
          <i
            trans
            group-hover="ml-2"
            i-ri:arrow-right-up-line
            bg-gradient-to-r
          />
        </a>
      </p>
    </section>
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
  background-image: url("/public/images/line.svg");
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
