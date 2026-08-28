import rss from "@astrojs/rss";
import { getEssayUrl, getEssays } from "../lib/essays";
import { getPosts, getPostUrl } from "../lib/posts";

export async function GET(context) {
  const [posts, essays] = await Promise.all([
    getPosts("zh-CN"),
    getEssays("zh-CN"),
  ]);

  const items = [
    ...posts
      .filter((post) => !post.data.draft)
      .map((post) => ({
        categories: post.data.tags,
        description: post.data.description,
        link: getPostUrl(post),
        pubDate: post.data.date,
        title: post.data.title,
      })),
    ...essays
      .filter((essay) => !essay.data.draft)
      .map((essay) => ({
        categories: essay.data.tags,
        description: essay.data.description,
        link: getEssayUrl(essay),
        pubDate: essay.data.date,
        title: essay.data.title,
      })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    customData: [
      "<language>zh-cn</language>",
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
      "<managingEditor>3128006406@qq.com(LevWu)</managingEditor>",
      "<webMaster>3128006406@qq.com(LevWu)</webMaster>",
      `<copyright>© ${new Date().getFullYear()} LevWu</copyright>`,
      `<atom:link href="${new URL("rss.xml", context.site).href}" rel="self" type="application/rss+xml" />`,
    ].join(""),
    description:
      "LevWu 的个人网站 - 技术博客与生活随笔。专注 Vue、Nuxt、TypeScript 等前端技术。",
    items,
    site: context.site,
    title: "LevWu",
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
  });
}
