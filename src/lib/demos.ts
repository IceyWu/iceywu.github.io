export interface DemoItem {
  cover: string; // path relative to /public/demos/
  date: string;
  description: string;
  link: string;
  title: string;
}

export const demos: DemoItem[] = [
  {
    cover: "/demos/LifePalette.png",
    date: "2025-12-06",
    description: "Record your memories and craft your own masterpiece of life",
    link: "https://lpalette.cn",
    title: "LifePalette",
  },
  {
    cover: "/demos/eos.png",
    date: "2025-12-20",
    description: "基于 Web Components 技术栈的跨框架组件库🙌",
    link: "https://github.com/IceyWu/eos",
    title: "eos",
  },
  {
    cover: "/demos/live-photo.gif",
    date: "2024-12-25",
    description: "A LivePhoto viewer for web applications🖼️",
    link: "https://github.com/IceyWu/live-photo",
    title: "live-photo",
  },
  {
    cover: "/demos/svg-animate-web.gif",
    date: "2024-11-01",
    description: "SVG path animation library for web",
    link: "https://github.com/AntmJS/svg-animate-web",
    title: "svg-animate-web",
  },
  {
    cover: "/demos/ViewerPro.gif",
    date: "2024-10-01",
    description: "A powerful image/video viewer component",
    link: "https://github.com/IceyWu/viewer-pro",
    title: "ViewerPro",
  },
  {
    cover: "/demos/WordsEssence.gif",
    date: "2024-09-01",
    description: "Daily quotes & words inspiration app",
    link: "https://github.com/IceyWu/WordsEssence",
    title: "WordsEssence",
  },
  {
    cover: "/demos/QuickMemo.gif",
    date: "2024-07-24",
    description: "Your efficient and convenient note-taking tool🎉",
    link: "https://github.com/IceyWu/quick-memo",
    title: "QuickMemo",
  },
  {
    cover: "/demos/LeanSnippet.gif",
    date: "2024-06-01",
    description: "A lean code snippet manager",
    link: "https://github.com/IceyWu/LeanSnippet",
    title: "LeanSnippet",
  },
  {
    cover: "/demos/utils.gif",
    date: "2023-08-01",
    description:
      "Collection of common and useful JavaScript / TypeScript utilities",
    link: "https://github.com/IceyWu/utils",
    title: "utils",
  },
  {
    cover: "/demos/cloud-template.gif",
    date: "2023-12-20",
    description: "vite + vue3 + ts 开箱即用现代开发模板",
    link: "https://github.com/IceyWu/cloud-template",
    title: "cloud-template",
  },
  {
    cover: "/demos/uni-ui-plus.png",
    date: "2024-03-01",
    description: "UniApp UI component library",
    link: "https://github.com/IceyWu/uni-ui-plus",
    title: "uni-ui-plus",
  },
  {
    cover: "/demos/vue-hooks-pure.png",
    date: "2024-01-15",
    description: "Pure Vue 3 composable hooks",
    link: "https://github.com/IceyWu/vue-hooks-pure",
    title: "vue-hooks-pure",
  },
  {
    cover: "/demos/icey-cli.gif",
    date: "2023-10-01",
    description: "A CLI tool for scaffolding projects",
    link: "https://github.com/IceyWu/icey-cli",
    title: "icey-cli",
  },
  {
    cover: "/demos/l-preview.png",
    date: "2023-06-01",
    description: "Image preview component",
    link: "https://github.com/IceyWu/l-preview",
    title: "l-preview",
  },
  {
    cover: "/demos/RedBookSpider.png",
    date: "2024-05-01",
    description: "Red Book content spider tool",
    link: "https://github.com/IceyWu/RedBookSpider",
    title: "RedBookSpider",
  },
  {
    cover: "/demos/nestjs-starter.png",
    date: "2024-02-01",
    description: "NestJS starter template",
    link: "https://github.com/IceyWu/nestjs-starter",
    title: "nestjs-starter",
  },
  {
    cover: "/demos/elysia-starter.png",
    date: "2024-04-01",
    description: "Elysia.js starter template",
    link: "https://github.com/IceyWu/elysia-starter",
    title: "elysia-starter",
  },
].sort((a, b) => b.date.localeCompare(a.date));
