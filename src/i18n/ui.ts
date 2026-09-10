import type { Locale } from "./locales";

export type HomeNavKey =
  | "posts"
  | "essays"
  | "projects"
  | "demos"
  | "map"
  | "friends";

interface HomeNavItem {
  description: string;
  label: string;
}

export interface Dict {
  demos: {
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
    title: string;
    intro: string;
    archiveLabel: string;
    homeLabel: string;
    countLabel: string;
    openDemoLabel: string;
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
    tocLabel: string;
    newerEssay: string;
    olderEssay: string;
  };
  friends: {
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
    title: string;
    intro: string;
    archiveLabel: string;
    homeLabel: string;
    countLabel: string;
    openFriendLabel: string;
    contactTitle: string;
    contact: {
      start: string;
      link: string;
      end: string;
    };
  };
  home: {
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
    homeAriaLabel: string;
    homeLinkLabel: string;
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
  layout: {
    skipToContent: string;
  };
  map: {
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
    title: string;
    intro: string;
    homeLabel: string;
    iframeTitle: string;
    openMapLabel: string;
    loading: string;
    timeout: string;
    error: string;
    retryLabel: string;
    dismissLabel: string;
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
  demos: {
    archiveLabel: "产品与实验列表",
    countLabel: "共 {count} 个作品",
    homeLabel: "返回首页",
    intro:
      "一些可以直接体验的产品，也有从日常需求里生长出来的开源工具与小实验。",
    openDemoLabel: "在新窗口打开 {name}",
    seo: {
      description: "Lev Wu 制作的产品、创意实验与开源工具。",
      keywords: "Lev Wu, 产品, 创意实验, 开源工具, Vue, TypeScript",
      title: "产品 — Lev Wu",
    },
    title: "产品",
  },
  essays: {
    archiveLabel: "随笔归档",
    backToEssays: "返回随笔",
    browseOtherLocale: "查看英文随笔",
    emptyDescription: "新的记录会陆续出现在这里。",
    emptyTitle: "这里还没有随笔",
    homeLabel: "返回首页",
    intro: "徒步、摄影、阅读与生活留下的片段。",
    newerEssay: "较新随笔",
    olderEssay: "较早随笔",
    readingTime: "{minutes} 分钟",
    rssLabel: "订阅 RSS（在新窗口打开）",
    seo: {
      description: "徒步、摄影、阅读与生活的随笔归档。",
      keywords: "Lev Wu, 生活随笔, 徒步, 旅行, 摄影, 阅读",
      title: "随笔 — Lev Wu",
    },
    title: "随笔",
    tocLabel: "目录",
  },
  friends: {
    archiveLabel: "友邻列表",
    contact: {
      end: " 与我联系。",
      link: "GitHub",
      start: "如果你也在认真维护自己的网络空间，欢迎通过 ",
    },
    contactTitle: "交换友链",
    countLabel: "共 {count} 位友邻",
    homeLabel: "返回首页",
    intro: "在互联网的不同角落持续写作和创造的人。",
    openFriendLabel: "在新窗口打开 {name} 的网站",
    seo: {
      description: "Lev Wu 在互联网上遇见并持续关注的朋友与数字花园。",
      keywords: "Lev Wu, 友邻, 友情链接, 独立博客, 数字花园",
      title: "友邻 — Lev Wu",
    },
    title: "友邻",
  },
  home: {
    avatarAlt: "Lev Wu 头像",
    browseTitle: "随便看看",
    catalog: {
      afterDemos: "。走过的地方留在",
      afterEssays: "、",
      afterMap: "，也给互联网上认识的人留了一页",
      afterPosts: "、",
      afterProjects: "和一些可以直接玩的",
      demos: "产品",
      end: "。",
      essays: "生活随笔",
      friends: "友邻",
      map: "足迹",
      posts: "技术文章",
      projects: "开源项目",
      start: "这里放着我写下的",
    },
    contact: {
      email: "邮件",
      end: "。",
      start:
        "我相信记录的价值，也会继续记录技术与生活。如果你想聊聊，可以给我写封",
    },
    contactTitle: "找到我",
    githubAriaLabel: "访问我的 GitHub",
    githubSummary:
      "从 {year} 年开始在 GitHub 上留下代码。目前有 {repos} 个公开仓库，收到 {stars} 颗 Star。",
    greeting:
      "你好，我是 Lev Wu（Icey Wu）。我做前端开发，也写一点后端，是一个开源爱好者。离开屏幕后，我通常在徒步、拍照，或者计划下一次出发。",
    homeAriaLabel: "Lev Wu 首页",
    homeLinkLabel: "首页",
    languageToggleLabel: "View this page in English",
    languageToggleShort: "EN",
    mainNavLabel: "主要内容",
    mottoNote: "向阳而生",
    nav: {
      demos: { description: "可以直接体验的小产品", label: "产品" },
      essays: { description: "徒步、摄影与生活随笔", label: "随笔" },
      friends: { description: "互联网中的朋友们", label: "友邻" },
      map: { description: "走过的山川与城市", label: "足迹" },
      posts: { description: "技术、工具与工程实践", label: "文章" },
      projects: { description: "持续维护的开源作品", label: "项目" },
    },
    notesTitle: "最近",
    product: {
      end: "，也在重新整理这个网站，把技术、徒步和摄影留下的记录慢慢归档。",
      start: "最近在继续完善 ",
    },
    seo: {
      description:
        "Lev Wu 的个人网站。记录技术实践、开源项目、徒步旅行、摄影与日常生活。",
      keywords: "Lev Wu, 全栈开发, Vue, TypeScript, Nuxt, 开源, 前端, 博客",
      title: "Lev Wu — 开发者、徒步与摄影爱好者",
    },
    subtitle: "全栈开发者、开源爱好者，也喜欢徒步和摄影。",
    techSummary: "目前常用 {languages}。工具总会变化，先把手上的东西做好。",
    themeToggleLabel: "切换深色/浅色模式",
  },
  layout: {
    skipToContent: "跳到主要内容",
  },
  map: {
    dismissLabel: "关闭提示",
    error: "地图暂时无法显示，请稍后重试。",
    homeLabel: "返回首页",
    iframeTitle: "Lev Wu 的旅行足迹地图",
    intro:
      "地图收录了旅途中留下的照片与坐标，可以缩放、拖动或圈选一片区域慢慢查看。",
    loading: "正在加载旅行地图…",
    openMapLabel: "在新窗口打开完整地图",
    retryLabel: "重新加载",
    seo: {
      description: "Lev Wu 走过的山川、城市与旅途中留下的照片足迹。",
      keywords: "Lev Wu, 足迹, 旅行地图, 徒步, 摄影, LifePalette",
      title: "足迹 — Lev Wu",
    },
    timeout: "地图加载时间较长，你可以重试或在新窗口打开。",
    title: "足迹",
  },
  posts: {
    archiveLabel: "文章归档",
    backToPosts: "返回文章",
    browseOtherLocale: "查看英文文章",
    emptyDescription: "新的记录会陆续出现在这里。",
    emptyTitle: "这里还没有文章",
    homeLabel: "返回首页",
    intro: "关于技术、工具与工程实践的记录。",
    newerPost: "较新文章",
    olderPost: "较早文章",
    readingTime: "{minutes} 分钟",
    rssLabel: "订阅 RSS（在新窗口打开）",
    seo: {
      description: "技术、工具与工程实践的文章归档。",
      keywords: "Lev Wu, 技术文章, 前端开发, TypeScript, Vue, 开源",
      title: "文章 — Lev Wu",
    },
    title: "文章",
    tocLabel: "目录",
  },
  projects: {
    archiveLabel: "项目列表",
    contributionsDescription:
      "曾提交并合并过代码的社区项目，按 GitHub Star 排序。",
    contributionsTitle: "开源贡献",
    countLabel: "{count} 个",
    emptyDescription: "GitHub 数据恢复后，项目会重新出现在这里。",
    emptyTitle: "暂时没有可显示的项目",
    fallbackNotice: "GitHub 暂时不可用，当前显示静态项目资料。",
    forksLabel: "GitHub Forks",
    homeLabel: "返回首页",
    intro:
      "从持续维护的作品，到参与过的开源社区。仓库名称、描述与数据均直接来自 GitHub。",
    openRepositoryLabel: "在新窗口打开 {name} 的 GitHub 仓库",
    ownDescription: "我创建并持续探索的公开仓库，按最近代码更新排序。",
    ownTitle: "我的项目",
    seo: {
      description: "Lev Wu 的开源项目与社区贡献。",
      keywords: "Lev Wu, 开源项目, GitHub, Vue, TypeScript, Web Components",
      title: "项目 — Lev Wu",
    },
    starsLabel: "GitHub Stars",
    templateLabel: "模板",
    title: "项目",
    updatedLabel: "更新于 {date}",
    visitLabel: "访问",
  },
};

const en: Dict = {
  demos: {
    archiveLabel: "Products and experiments",
    countLabel: "{count} works",
    homeLabel: "Back to home",
    intro:
      "Products you can try, alongside open-source tools and small experiments that grew from everyday needs.",
    openDemoLabel: "Open {name} in a new window",
    seo: {
      description:
        "Products, creative experiments, and open-source tools made by Lev Wu.",
      keywords:
        "Lev Wu, products, demos, creative coding, open source, TypeScript",
      title: "Demos — Lev Wu",
    },
    title: "Demos",
  },
  essays: {
    archiveLabel: "Essay archive",
    backToEssays: "Back to essays",
    browseOtherLocale: "Browse the Chinese archive",
    emptyDescription: "English essays and translations will appear here.",
    emptyTitle: "No English essays yet",
    homeLabel: "Back to home",
    intro: "Notes from trails, books, photographs, and everyday life.",
    newerEssay: "Newer essay",
    olderEssay: "Older essay",
    readingTime: "{minutes} min",
    rssLabel: "Subscribe via RSS (opens in a new window)",
    seo: {
      description:
        "Personal essays on hiking, photography, reading, and everyday life.",
      keywords: "Lev Wu, essays, hiking, travel, photography, reading",
      title: "Essays — Lev Wu",
    },
    title: "Essays",
    tocLabel: "On this page",
  },
  friends: {
    archiveLabel: "Friend list",
    contact: {
      end: ".",
      link: "GitHub",
      start:
        "If you also maintain a space of your own on the web, reach out on ",
    },
    contactTitle: "Exchange links",
    countLabel: "{count} friend",
    homeLabel: "Back to home",
    intro:
      "People who keep writing and creating in their own corners of the internet.",
    openFriendLabel: "Open {name}'s website in a new window",
    seo: {
      description:
        "Friends and independent digital gardens Lev Wu follows across the web.",
      keywords: "Lev Wu, friends, blogroll, independent blogs, digital gardens",
      title: "Friends — Lev Wu",
    },
    title: "Friends",
  },
  home: {
    avatarAlt: "Portrait of Lev Wu",
    browseTitle: "Browse around",
    catalog: {
      afterDemos: ". Places I have visited live on the ",
      afterEssays: ", ",
      afterMap: ", and there is also a page for ",
      afterPosts: ", ",
      afterProjects: ", and a few ",
      demos: "demos you can try",
      end: ".",
      essays: "personal essays",
      friends: "friends I have met online",
      map: "Map",
      posts: "technical notes",
      projects: "open-source projects",
      start: "This is where I keep my ",
    },
    contact: {
      email: "email",
      end: ".",
      start:
        "I believe in the value of keeping a record, and I will continue writing about software and life. If you would like to talk, send me an ",
    },
    contactTitle: "Find me",
    githubAriaLabel: "Visit my GitHub profile",
    githubSummary:
      "I started leaving code on GitHub in {year}. There are currently {repos} public repositories with {stars} stars in total.",
    greeting:
      "Hi, I'm Lev Wu (Icey Wu). I work across frontend and backend, and I enjoy building in the open. Away from the screen, I am usually hiking, taking photos, or planning my next trip.",
    homeAriaLabel: "Lev Wu home",
    homeLinkLabel: "Home",
    languageToggleLabel: "查看中文版本",
    languageToggleShort: "中",
    mainNavLabel: "Main content",
    mottoNote: "Live towards the sun",
    nav: {
      demos: { description: "Small products you can try", label: "Demos" },
      essays: {
        description: "Hiking, photography, and everyday life",
        label: "Essays",
      },
      friends: {
        description: "People I have met on the internet",
        label: "Friends",
      },
      map: { description: "Mountains and cities I have visited", label: "Map" },
      posts: {
        description: "Technical notes and engineering practice",
        label: "Posts",
      },
      projects: {
        description: "Open-source work I continue to maintain",
        label: "Projects",
      },
    },
    notesTitle: "Lately",
    product: {
      end: ", while reorganizing this website and slowly archiving notes from software, hiking, and photography.",
      start: "Lately I have been continuing work on ",
    },
    seo: {
      description:
        "Lev Wu's personal website about software, open source, hiking, photography, and everyday life.",
      keywords:
        "Lev Wu, full-stack developer, Vue, TypeScript, Nuxt, open source, frontend, blog",
      title: "Lev Wu — Developer, Hiker, and Photographer",
    },
    subtitle: "Full-stack developer, open-source enthusiast.",
    techSummary:
      "Current tools: {languages}. Tools change; the work matters more.",
    themeToggleLabel: "Toggle dark and light theme",
  },
  layout: {
    skipToContent: "Skip to main content",
  },
  map: {
    dismissLabel: "Dismiss",
    error: "The map is temporarily unavailable. Please try again later.",
    homeLabel: "Back to home",
    iframeTitle: "Lev Wu's travel map",
    intro:
      "Photographs and coordinates from the road. Zoom, pan, or draw around an area to explore them.",
    loading: "Loading the travel map…",
    openMapLabel: "Open the full map in a new window",
    retryLabel: "Reload",
    seo: {
      description:
        "A map of the mountains, cities, and photographs from Lev Wu's travels.",
      keywords: "Lev Wu, travel map, hiking, photography, places, LifePalette",
      title: "Map — Lev Wu",
    },
    timeout:
      "The map is taking longer than expected. You can retry or open it in a new window.",
    title: "Map",
  },
  posts: {
    archiveLabel: "Post archive",
    backToPosts: "Back to posts",
    browseOtherLocale: "Browse the Chinese archive",
    emptyDescription: "English writing and translations will appear here.",
    emptyTitle: "No English posts yet",
    homeLabel: "Back to home",
    intro: "Notes on software, tools, and engineering practice.",
    newerPost: "Newer post",
    olderPost: "Older post",
    readingTime: "{minutes} min",
    rssLabel: "Subscribe via RSS (opens in a new window)",
    seo: {
      description: "Notes on software, tools, and engineering practice.",
      keywords:
        "Lev Wu, software engineering, TypeScript, Vue, open source, blog",
      title: "Posts — Lev Wu",
    },
    title: "Posts",
    tocLabel: "On this page",
  },
  projects: {
    archiveLabel: "Project list",
    contributionsDescription:
      "Community projects where my changes have been merged, ordered by GitHub stars.",
    contributionsTitle: "Open-source contributions",
    countLabel: "{count}",
    emptyDescription: "Projects will return when GitHub data is available.",
    emptyTitle: "No projects to show",
    fallbackNotice:
      "GitHub is temporarily unavailable. Static project information is shown instead.",
    forksLabel: "GitHub forks",
    homeLabel: "Back to home",
    intro:
      "Work I continue to maintain and open-source communities I have contributed to. Repository names, descriptions, and facts come directly from GitHub.",
    openRepositoryLabel:
      "Open the GitHub repository for {name} in a new window",
    ownDescription:
      "Public repositories I created and continue to explore, ordered by recent code activity.",
    ownTitle: "My projects",
    seo: {
      description:
        "Open-source projects and community contributions by Lev Wu.",
      keywords: "Lev Wu, open source, GitHub, Vue, TypeScript, Web Components",
      title: "Projects — Lev Wu",
    },
    starsLabel: "GitHub stars",
    templateLabel: "Template",
    title: "Projects",
    updatedLabel: "Updated {date}",
    visitLabel: "Visit",
  },
};

export const ui: Record<Locale, Dict> = {
  en,
  "zh-CN": zhCN,
};

export function interpolate(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.hasOwn(values, key) ? String(values[key]) : match
  );
}
