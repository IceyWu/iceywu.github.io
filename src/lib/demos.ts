import type { Locale } from "../i18n/locales";

interface DemoItem {
  cover: string;
  date: string;
  description: Record<Locale, string>;
  link: string;
  title: string;
  video?: string;
}

export const demos: DemoItem[] = [
  {
    cover: "/demos/LifePalette.png",
    date: "2025-12-06",
    description: {
      en: "Record meaningful memories and shape your own portrait of a life.",
      "zh-CN": "记录珍贵记忆，创作属于自己的生命画卷。",
    },
    link: "https://lpalette.cn",
    title: "LifePalette",
  },
  {
    cover: "/demos/eos.png",
    date: "2025-12-20",
    description: {
      en: "A cross-framework component library built with Web Components.",
      "zh-CN": "基于 Web Components 构建的跨框架组件库。",
    },
    link: "https://github.com/IceyWu/eos",
    title: "eos",
  },
  {
    cover: "/demos/live-photo.poster.webp",
    date: "2024-12-25",
    description: {
      en: "A Live Photo viewer for web applications.",
      "zh-CN": "面向 Web 应用的实况照片查看器。",
    },
    link: "https://github.com/IceyWu/live-photo",
    title: "live-photo",
    video: "/demos/live-photo.webm",
  },
  {
    cover: "/demos/svg-animate-web.gif",
    date: "2024-11-01",
    description: {
      en: "An SVG path animation library for the web.",
      "zh-CN": "用于 Web 的 SVG 路径动画库。",
    },
    link: "https://github.com/AntmJS/svg-animate-web",
    title: "svg-animate-web",
  },
  {
    cover: "/demos/ViewerPro.poster.webp",
    date: "2024-10-01",
    description: {
      en: "A capable image and video viewer component.",
      "zh-CN": "功能完整的图片与视频预览组件。",
    },
    link: "https://github.com/IceyWu/viewer-pro",
    title: "ViewerPro",
    video: "/demos/ViewerPro.webm",
  },
  {
    cover: "/demos/WordsEssence.gif",
    date: "2024-09-01",
    description: {
      en: "An app for daily quotations and inspiration from words.",
      "zh-CN": "收集每日摘录与文字灵感的应用。",
    },
    link: "https://github.com/IceyWu/WordsEssence",
    title: "WordsEssence",
  },
  {
    cover: "/demos/QuickMemo.poster.webp",
    date: "2024-07-24",
    description: {
      en: "A lightweight and efficient note-taking tool.",
      "zh-CN": "轻便、高效的随手记工具。",
    },
    link: "https://github.com/IceyWu/quick-memo",
    title: "QuickMemo",
    video: "/demos/QuickMemo.webm",
  },
  {
    cover: "/demos/LeanSnippet.poster.webp",
    date: "2024-06-01",
    description: {
      en: "A lean code snippet manager.",
      "zh-CN": "精简的代码片段管理工具。",
    },
    link: "https://github.com/IceyWu/LeanSnippet",
    title: "LeanSnippet",
    video: "/demos/LeanSnippet.webm",
  },
  {
    cover: "/demos/utils.poster.webp",
    date: "2023-08-01",
    description: {
      en: "A collection of practical JavaScript and TypeScript utilities.",
      "zh-CN": "常用 JavaScript 与 TypeScript 工具函数合集。",
    },
    link: "https://github.com/IceyWu/utils",
    title: "utils",
    video: "/demos/utils.webm",
  },
  {
    cover: "/demos/cloud-template.poster.webp",
    date: "2023-12-20",
    description: {
      en: "A modern starter for Vite, Vue 3, and TypeScript.",
      "zh-CN": "开箱即用的 Vite、Vue 3 与 TypeScript 现代项目模板。",
    },
    link: "https://github.com/IceyWu/cloud-template",
    title: "cloud-template",
    video: "/demos/cloud-template.webm",
  },
  {
    cover: "/demos/uni-ui-plus.png",
    date: "2024-03-01",
    description: {
      en: "A UI component library for UniApp.",
      "zh-CN": "面向 UniApp 的 UI 组件库。",
    },
    link: "https://github.com/IceyWu/uni-ui-plus",
    title: "uni-ui-plus",
  },
  {
    cover: "/demos/vue-hooks-pure.png",
    date: "2024-01-15",
    description: {
      en: "A focused collection of composable utilities for Vue 3.",
      "zh-CN": "一组纯粹、实用的 Vue 3 组合式函数。",
    },
    link: "https://github.com/IceyWu/vue-hooks-pure",
    title: "vue-hooks-pure",
  },
  {
    cover: "/demos/icey-cli.gif",
    date: "2023-10-01",
    description: {
      en: "A command-line tool for scaffolding projects.",
      "zh-CN": "用于快速搭建项目的命令行工具。",
    },
    link: "https://github.com/IceyWu/icey-cli",
    title: "icey-cli",
  },
  {
    cover: "/demos/l-preview.png",
    date: "2023-06-01",
    description: {
      en: "A compact image preview component.",
      "zh-CN": "简洁的图片预览组件。",
    },
    link: "https://github.com/IceyWu/l-preview",
    title: "l-preview",
  },
  {
    cover: "/demos/RedBookSpider.png",
    date: "2024-05-01",
    description: {
      en: "A tool for collecting and organizing public RedNote content.",
      "zh-CN": "用于整理小红书公开内容的采集工具。",
    },
    link: "https://github.com/IceyWu/RedBookSpider",
    title: "RedBookSpider",
  },
  {
    cover: "/demos/nestjs-starter.png",
    date: "2024-02-01",
    description: {
      en: "A practical starter template for NestJS projects.",
      "zh-CN": "用于快速开始 NestJS 项目的基础模板。",
    },
    link: "https://github.com/IceyWu/nestjs-starter",
    title: "nestjs-starter",
  },
  {
    cover: "/demos/elysia-starter.png",
    date: "2024-04-01",
    description: {
      en: "A practical starter template for Elysia.js projects.",
      "zh-CN": "用于快速开始 Elysia.js 项目的基础模板。",
    },
    link: "https://github.com/IceyWu/elysia-starter",
    title: "elysia-starter",
  },
].sort((a, b) => b.date.localeCompare(a.date));
