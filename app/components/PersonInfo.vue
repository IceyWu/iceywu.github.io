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

// 段落引用
const paragraphRefs = ref<HTMLElement[]>([])
const linkRefs = ref<HTMLElement[]>([])
const contactRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

// 使用动画 composables
const { animate: animateParagraphs } = useTextAnimation(paragraphRefs, {
  type: 'stagger',
  stagger: 0.12,
})

// 收集段落引用
function setParagraphRef(el: any, index: number) {
  if (el) {
    paragraphRefs.value[index] = el
  }
}

// 收集链接引用
function setLinkRef(el: any, index: number) {
  if (el?.$el || el) {
    linkRefs.value[index] = el.$el || el
  }
}

// Contact Me 引用
function setContactRef(el: any) {
  if (el) {
    contactRef.value = el
  }
}

// 初始化动画
onMounted(() => {
  const { $gsap } = useNuxtApp()
  const { reducedMotion } = useReducedMotion()

  nextTick(() => {
    // 段落入场动画
    animateParagraphs()

    // 链接悬停效果
    if (!reducedMotion.value && linkRefs.value.length > 0) {
      linkRefs.value.forEach((link) => {
        if (!link)
          return

        link.addEventListener('mouseenter', () => {
          $gsap.to(link, {
            scale: 1.02,
            duration: 0.2,
            ease: 'power1.out',
          })
        })

        link.addEventListener('mouseleave', () => {
          $gsap.to(link, {
            scale: 1,
            duration: 0.2,
            ease: 'power1.out',
          })
        })
      })
    }

    // Contact Me 脉冲动画
    if (!reducedMotion.value && contactRef.value) {
      $gsap.to(contactRef.value, {
        scale: 1.03,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      })
    }
  })
})
</script>

<template>
  <div ref="containerRef" prose ma c-primary:75 class="person-info">
    <h1 fsc gap-5>
      <UserAvatar />
    </h1>
    <section>
      <p :ref="(el) => setParagraphRef(el, 0)" class="animate-paragraph">
        I'm
        <strong>
          <a
            :ref="(el) => setLinkRef(el, 0)"
            trans
            linear-text
            shape-bl
            class="c-context::#C084FC font-italic info-link"
            :from="isDark ? '#4facfe' : '#e0c3fc'"
            :to="isDark ? '#00f2fe' : '#8ec5fc'"
            href="https://github.com/IceyWu"
            target="_blank"
          >{{ userInfo?.name }}</a></strong>, a Front-end developer and Open source
        <strong class="text-class"> enthusiast</strong>
      </p>
      <p :ref="(el) => setParagraphRef(el, 1)" class="animate-paragraph">
        I dream of traveling the world and filling up my
        <strong>
          <a
            :ref="(el) => setLinkRef(el, 1)"
            trans
            linear-text
            shape-bl
            class="c-context::#C084FC font-italic info-link"
            :from="isDark ? '#4facfe' : '#e0c3fc'"
            :to="isDark ? '#00f2fe' : '#8ec5fc'"
            href="/map"
          >Map</a></strong>.
      </p>
      <p :ref="(el) => setParagraphRef(el, 2)" class="animate-paragraph">
        Team member and Creator of
        <strong>
          <a
            :ref="(el) => setLinkRef(el, 2)"
            trans
            linear-text
            shape-bl
            class="c-context::#C084FC info-link"
            from="#ACC1EE"
            to="#C084FC"
            href="https://github.com/Life-Palette"
            target="_blank"
          >Life Palette</a></strong>
        <br>
      </p>
      <p :ref="(el) => setParagraphRef(el, 3)" class="animate-paragraph">
        In the community, I am an active ecological contributor to
        <i i-logos-element w-1.1em h-1.1em mr-1 />
        <a
          :ref="(el) => setLinkRef(el, 3)"
          trans
          linear-text
          shape-bottom-right
          class="c-context::#bd34fe info-link"
          from="#41d1ff"
          to="#bd34fe"
          href="https://github.com/element-plus/element-plus"
          target="_blank"
        >Element Plus</a>,
        <i i-logos-vueuse w-1.1em h-1.1em mr-1 />
        <a
          :ref="(el) => setLinkRef(el, 4)"
          linkInProse
          o="#64b687"
          href="https://github.com/vueuse/vueuse"
          target="_blank"
          class="info-link"
        >VueUse</a>,
        <i i-logos-expo-icon w-1.1em h-1.1em mr-1 />
        <a
          :ref="(el) => setLinkRef(el, 5)"
          trans
          linear-text
          shape-bottom-right
          class="c-context::#bd34fe info-link"
          from="#cc208e"
          to="#6713d2"
          href="https://github.com/expo/expo"
          target="_blank"
        >Expo</a>,
        & more.
      </p>
      <p :ref="(el) => setParagraphRef(el, 4)" class="animate-paragraph">
        I also love photography and capturing beautiful moments.
        I share these photos on my
        <a
          :ref="(el) => setLinkRef(el, 6)"
          trans
          linear-text
          shape-bottom-right
          class="c-context::#bd34fe info-link"
          from="#cc208e"
          to="#6713d2"
          href="http://lpalette.cn/"
          target="_blank"
        ><strong>website</strong></a>
        — welcome to join me!
      </p>

      <p :ref="(el) => setParagraphRef(el, 5)" class="animate-paragraph">
        <a
          :ref="setContactRef"
          trans
          text-p-r
          class="group contact-btn"
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
  background-image: url("/images/line.svg");
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

.animate-paragraph {
  will-change: transform, opacity;
}

.info-link {
  will-change: transform;
  display: inline-block;
}

.contact-btn {
  will-change: transform;
  display: inline-block;
}
</style>
