export interface DemoItem {
  title: string;
  description: string;
  link: string;
  date: string;
  cover: string; // path relative to /public/demos/
}

export const demos: DemoItem[] = [
  {
    title: "LifePalette",
    description: "Record your memories and craft your own masterpiece of life",
    link: "https://lpalette.cn",
    date: "2025-12-06",
    cover: "/demos/LifePalette.png",
  },
  {
    title: "eos",
    description: "基于 Web Components 技术栈的跨框架组件库🙌",
    link: "https://github.com/IceyWu/eos",
    date: "2025-12-20",
    cover: "/demos/eos.png",
  },
  {
    title: "live-photo",
    description: "A LivePhoto viewer for web applications🖼️",
    link: "https://github.com/IceyWu/live-photo",
    date: "2024-12-25",
    cover: "/demos/live-photo.gif",
  },
  {
    title: "svg-animate-web",
    description: "SVG path animation library for web",
    link: "https://github.com/AntmJS/svg-animate-web",
    date: "2024-11-01",
    cover: "/demos/svg-animate-web.gif",
  },
  {
    title: "ViewerPro",
    description: "A powerful image/video viewer component",
    link: "https://github.com/IceyWu/viewer-pro",
    date: "2024-10-01",
    cover: "/demos/ViewerPro.gif",
  },
  {
    title: "WordsEssence",
    description: "Daily quotes & words inspiration app",
    link: "https://github.com/IceyWu/WordsEssence",
    date: "2024-09-01",
    cover: "/demos/WordsEssence.gif",
  },
  {
    title: "QuickMemo",
    description: "Your efficient and convenient note-taking tool🎉",
    link: "https://github.com/IceyWu/quick-memo",
    date: "2024-07-24",
    cover: "/demos/QuickMemo.gif",
  },
  {
    title: "LeanSnippet",
    description: "A lean code snippet manager",
    link: "https://github.com/IceyWu/LeanSnippet",
    date: "2024-06-01",
    cover: "/demos/LeanSnippet.gif",
  },
  {
    title: "utils",
    description: "Collection of common and useful JavaScript / TypeScript utilities",
    link: "https://github.com/IceyWu/utils",
    date: "2023-08-01",
    cover: "/demos/utils.gif",
  },
  {
    title: "cloud-template",
    description: "vite + vue3 + ts 开箱即用现代开发模板",
    link: "https://github.com/IceyWu/cloud-template",
    date: "2023-12-20",
    cover: "/demos/cloud-template.gif",
  },
  {
    title: "uni-ui-plus",
    description: "UniApp UI component library",
    link: "https://github.com/IceyWu/uni-ui-plus",
    date: "2024-03-01",
    cover: "/demos/uni-ui-plus.png",
  },
  {
    title: "vue-hooks-pure",
    description: "Pure Vue 3 composable hooks",
    link: "https://github.com/IceyWu/vue-hooks-pure",
    date: "2024-01-15",
    cover: "/demos/vue-hooks-pure.png",
  },
  {
    title: "icey-cli",
    description: "A CLI tool for scaffolding projects",
    link: "https://github.com/IceyWu/icey-cli",
    date: "2023-10-01",
    cover: "/demos/icey-cli.gif",
  },
  {
    title: "l-preview",
    description: "Image preview component",
    link: "https://github.com/IceyWu/l-preview",
    date: "2023-06-01",
    cover: "/demos/l-preview.png",
  },
  {
    title: "RedBookSpider",
    description: "Red Book content spider tool",
    link: "https://github.com/IceyWu/RedBookSpider",
    date: "2024-05-01",
    cover: "/demos/RedBookSpider.png",
  },
  {
    title: "nestjs-starter",
    description: "NestJS starter template",
    link: "https://github.com/IceyWu/nestjs-starter",
    date: "2024-02-01",
    cover: "/demos/nestjs-starter.png",
  },
  {
    title: "elysia-starter",
    description: "Elysia.js starter template",
    link: "https://github.com/IceyWu/elysia-starter",
    date: "2024-04-01",
    cover: "/demos/elysia-starter.png",
  },
].sort((a, b) => b.date.localeCompare(a.date));
