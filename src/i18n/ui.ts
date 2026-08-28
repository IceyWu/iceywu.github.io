import type { Locale } from "./locales";

export type HomeNavKey =
  | "posts"
  | "essays"
  | "projects"
  | "demos"
  | "map"
  | "friends";

interface HomeNavItem {
  label: string;
  description: string;
}

export interface Dict {
  layout: {
    skipToContent: string;
  };
  home: {
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
    homeAriaLabel: string;
    githubAriaLabel: string;
    themeToggleLabel: string;
    avatarAlt: string;
    subtitle: string;
    greeting: string;
    catalog: {
      start: string;
      posts: string;
      afterPosts: string;
      essays: string;
      afterEssays: string;
      projects: string;
      afterProjects: string;
      demos: string;
      afterDemos: string;
      map: string;
      afterMap: string;
      friends: string;
      end: string;
    };
    product: {
      start: string;
      end: string;
    };
    mottoNote: string;
    notesTitle: string;
    githubSummary: string;
    techSummary: string;
    browseTitle: string;
    mainNavLabel: string;
    nav: Record<HomeNavKey, HomeNavItem>;
    contactTitle: string;
    contact: {
      start: string;
      email: string;
      end: string;
    };
    languageToggleLabel: string;
    languageToggleShort: string;
  };
  posts: {
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
    title: string;
    intro: string;
    archiveLabel: string;
    homeLabel: string;
    rssLabel: string;
    emptyTitle: string;
    emptyDescription: string;
    browseOtherLocale: string;
    readingTime: string;
    backToPosts: string;
    tocLabel: string;
    newerPost: string;
    olderPost: string;
  };
  essays: {
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
    title: string;
    intro: string;
    archiveLabel: string;
    homeLabel: string;
    rssLabel: string;
    emptyTitle: string;
    emptyDescription: string;
    browseOtherLocale: string;
    readingTime: string;
    backToEssays: string;
    newerEssay: string;
    olderEssay: string;
  };
  projects: {
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
    title: string;
    intro: string;
    archiveLabel: string;
    homeLabel: string;
    ownTitle: string;
    ownDescription: string;
    contributionsTitle: string;
    contributionsDescription: string;
    countLabel: string;
    openRepositoryLabel: string;
    visitLabel: string;
    starsLabel: string;
    forksLabel: string;
    templateLabel: string;
    updatedLabel: string;
    fallbackNotice: string;
    emptyTitle: string;
    emptyDescription: string;
  };
}

const zhCN: Dict = {
  layout: {
    skipToContent: "跳到主要内容",
  },
  home: {
    seo: {
      title: "Lev Wu — 开发者、徒步与摄影爱好者",
      description:
        "Lev Wu 的个人网站。记录技术实践、开源项目、徒步旅行、摄影与日常生活。",
      keywords: "Lev Wu, 全栈开发, Vue, TypeScript, Nuxt, 开源, 前端, 博客",
    },
    homeAriaLabel: "Lev Wu 首页",
    githubAriaLabel: "访问我的 GitHub",
    themeToggleLabel: "切换深色/浅色模式",
    avatarAlt: "Lev Wu 头像",
    subtitle: "全栈开发者、开源爱好者，也喜欢徒步和摄影。",
    greeting:
      "你好，我是 Lev Wu（Icey Wu）。我做前端开发，也写一点后端，是一个开源爱好者。离开屏幕后，我通常在徒步、拍照，或者计划下一次出发。",
    catalog: {
      start: "这里放着我写下的",
      posts: "技术文章",
      afterPosts: "、",
      essays: "生活随笔",
      afterEssays: "、",
      projects: "开源项目",
      afterProjects: "和一些可以直接玩的",
      demos: "产品",
      afterDemos: "。走过的地方留在",
      map: "足迹",
      afterMap: "，也给互联网上认识的人留了一页",
      friends: "友邻",
      end: "。",
    },
    product: {
      start: "最近在继续完善 ",
      end: "，也在重新整理这个网站，把技术、徒步和摄影留下的记录慢慢归档。",
    },
    mottoNote: "向阳而生",
    notesTitle: "最近",
    githubSummary:
      "从 {year} 年开始在 GitHub 上留下代码。目前有 {repos} 个公开仓库，收到 {stars} 颗 Star。",
    techSummary:
      "目前常用 {languages}。工具总会变化，先把手上的东西做好。",
    browseTitle: "随便看看",
    mainNavLabel: "主要内容",
    nav: {
      posts: { label: "文章", description: "技术、工具与工程实践" },
      essays: { label: "随笔", description: "徒步、摄影与生活随笔" },
      projects: { label: "项目", description: "持续维护的开源作品" },
      demos: { label: "产品", description: "可以直接体验的小产品" },
      map: { label: "足迹", description: "走过的山川与城市" },
      friends: { label: "友邻", description: "互联网中的朋友们" },
    },
    contactTitle: "找到我",
    contact: {
      start: "我相信记录的价值，也会继续记录技术与生活。如果你想聊聊，可以给我写封",
      email: "邮件",
      end: "。",
    },
    languageToggleLabel: "View this page in English",
    languageToggleShort: "EN",
  },
  posts: {
    seo: {
      title: "文章 — Lev Wu",
      description: "技术、工具与工程实践的文章归档。",
      keywords: "Lev Wu, 技术文章, 前端开发, TypeScript, Vue, 开源",
    },
    title: "文章",
    intro: "关于技术、工具与工程实践的记录。",
    archiveLabel: "文章归档",
    homeLabel: "返回首页",
    rssLabel: "订阅 RSS（在新窗口打开）",
    emptyTitle: "这里还没有文章",
    emptyDescription: "新的记录会陆续出现在这里。",
    browseOtherLocale: "查看英文文章",
    readingTime: "{minutes} 分钟",
    backToPosts: "返回文章",
    tocLabel: "目录",
    newerPost: "较新文章",
    olderPost: "较早文章",
  },
  essays: {
    seo: {
      title: "随笔 — Lev Wu",
      description: "徒步、摄影、阅读与生活的随笔归档。",
      keywords: "Lev Wu, 生活随笔, 徒步, 旅行, 摄影, 阅读",
    },
    title: "随笔",
    intro: "徒步、摄影、阅读与生活留下的片段。",
    archiveLabel: "随笔归档",
    homeLabel: "返回首页",
    rssLabel: "订阅 RSS（在新窗口打开）",
    emptyTitle: "这里还没有随笔",
    emptyDescription: "新的记录会陆续出现在这里。",
    browseOtherLocale: "查看英文随笔",
    readingTime: "{minutes} 分钟",
    backToEssays: "返回随笔",
    newerEssay: "较新随笔",
    olderEssay: "较早随笔",
  },
  projects: {
    seo: {
      title: "项目 — Lev Wu",
      description: "Lev Wu 的开源项目与社区贡献。",
      keywords: "Lev Wu, 开源项目, GitHub, Vue, TypeScript, Web Components",
    },
    title: "项目",
    intro: "从持续维护的作品，到参与过的开源社区。仓库名称、描述与数据均直接来自 GitHub。",
    archiveLabel: "项目列表",
    homeLabel: "返回首页",
    ownTitle: "我的项目",
    ownDescription: "我创建并持续探索的公开仓库，按最近代码更新排序。",
    contributionsTitle: "开源贡献",
    contributionsDescription: "曾提交并合并过代码的社区项目，按 GitHub Star 排序。",
    countLabel: "{count} 个",
    openRepositoryLabel: "在新窗口打开 {name} 的 GitHub 仓库",
    visitLabel: "访问",
    starsLabel: "GitHub Stars",
    forksLabel: "GitHub Forks",
    templateLabel: "模板",
    updatedLabel: "更新于 {date}",
    fallbackNotice: "GitHub 暂时不可用，当前显示静态项目资料。",
    emptyTitle: "暂时没有可显示的项目",
    emptyDescription: "GitHub 数据恢复后，项目会重新出现在这里。",
  },
};

const en: Dict = {
  layout: {
    skipToContent: "Skip to main content",
  },
  home: {
    seo: {
      title: "Lev Wu — Developer, Hiker, and Photographer",
      description:
        "Lev Wu's personal website about software, open source, hiking, photography, and everyday life.",
      keywords:
        "Lev Wu, full-stack developer, Vue, TypeScript, Nuxt, open source, frontend, blog",
    },
    homeAriaLabel: "Lev Wu home",
    githubAriaLabel: "Visit my GitHub profile",
    themeToggleLabel: "Toggle dark and light theme",
    avatarAlt: "Portrait of Lev Wu",
    subtitle: "Full-stack developer, open-source enthusiast.",
    greeting:
      "Hi, I'm Lev Wu (Icey Wu). I work across frontend and backend, and I enjoy building in the open. Away from the screen, I am usually hiking, taking photos, or planning my next trip.",
    catalog: {
      start: "This is where I keep my ",
      posts: "technical notes",
      afterPosts: ", ",
      essays: "personal essays",
      afterEssays: ", ",
      projects: "open-source projects",
      afterProjects: ", and a few ",
      demos: "demos you can try",
      afterDemos: ". Places I have visited live on the ",
      map: "Map",
      afterMap: ", and there is also a page for ",
      friends: "friends I have met online",
      end: ".",
    },
    product: {
      start: "Lately I have been continuing work on ",
      end: ", while reorganizing this website and slowly archiving notes from software, hiking, and photography.",
    },
    mottoNote: "Live towards the sun",
    notesTitle: "Lately",
    githubSummary:
      "I started leaving code on GitHub in {year}. There are currently {repos} public repositories with {stars} stars in total.",
    techSummary:
      "Current tools: {languages}. Tools change; the work matters more.",
    browseTitle: "Browse around",
    mainNavLabel: "Main content",
    nav: {
      posts: { label: "Posts", description: "Technical notes and engineering practice" },
      essays: { label: "Essays", description: "Hiking, photography, and everyday life" },
      projects: { label: "Projects", description: "Open-source work I continue to maintain" },
      demos: { label: "Demos", description: "Small products you can try" },
      map: { label: "Map", description: "Mountains and cities I have visited" },
      friends: { label: "Friends", description: "People I have met on the internet" },
    },
    contactTitle: "Find me",
    contact: {
      start: "I believe in the value of keeping a record, and I will continue writing about software and life. If you would like to talk, send me an ",
      email: "email",
      end: ".",
    },
    languageToggleLabel: "查看中文版本",
    languageToggleShort: "中",
  },
  posts: {
    seo: {
      title: "Posts — Lev Wu",
      description: "Notes on software, tools, and engineering practice.",
      keywords: "Lev Wu, software engineering, TypeScript, Vue, open source, blog",
    },
    title: "Posts",
    intro: "Notes on software, tools, and engineering practice.",
    archiveLabel: "Post archive",
    homeLabel: "Back to home",
    rssLabel: "Subscribe via RSS (opens in a new window)",
    emptyTitle: "No English posts yet",
    emptyDescription: "English writing and translations will appear here.",
    browseOtherLocale: "Browse the Chinese archive",
    readingTime: "{minutes} min",
    backToPosts: "Back to posts",
    tocLabel: "On this page",
    newerPost: "Newer post",
    olderPost: "Older post",
  },
  essays: {
    seo: {
      title: "Essays — Lev Wu",
      description: "Personal essays on hiking, photography, reading, and everyday life.",
      keywords: "Lev Wu, essays, hiking, travel, photography, reading",
    },
    title: "Essays",
    intro: "Notes from trails, books, photographs, and everyday life.",
    archiveLabel: "Essay archive",
    homeLabel: "Back to home",
    rssLabel: "Subscribe via RSS (opens in a new window)",
    emptyTitle: "No English essays yet",
    emptyDescription: "English essays and translations will appear here.",
    browseOtherLocale: "Browse the Chinese archive",
    readingTime: "{minutes} min",
    backToEssays: "Back to essays",
    newerEssay: "Newer essay",
    olderEssay: "Older essay",
  },
  projects: {
    seo: {
      title: "Projects — Lev Wu",
      description: "Open-source projects and community contributions by Lev Wu.",
      keywords: "Lev Wu, open source, GitHub, Vue, TypeScript, Web Components",
    },
    title: "Projects",
    intro: "Work I continue to maintain and open-source communities I have contributed to. Repository names, descriptions, and facts come directly from GitHub.",
    archiveLabel: "Project list",
    homeLabel: "Back to home",
    ownTitle: "My projects",
    ownDescription: "Public repositories I created and continue to explore, ordered by recent code activity.",
    contributionsTitle: "Open-source contributions",
    contributionsDescription: "Community projects where my changes have been merged, ordered by GitHub stars.",
    countLabel: "{count}",
    openRepositoryLabel: "Open the GitHub repository for {name} in a new window",
    visitLabel: "Visit",
    starsLabel: "GitHub stars",
    forksLabel: "GitHub forks",
    templateLabel: "Template",
    updatedLabel: "Updated {date}",
    fallbackNotice: "GitHub is temporarily unavailable. Static project information is shown instead.",
    emptyTitle: "No projects to show",
    emptyDescription: "Projects will return when GitHub data is available.",
  },
};

export const ui: Record<Locale, Dict> = {
  "zh-CN": zhCN,
  en,
};

export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.hasOwn(values, key) ? String(values[key]) : match,
  );
}
