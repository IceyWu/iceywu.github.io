import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const [posts, essays] = await Promise.all([
    getCollection("posts"),
    getCollection("essays"),
  ]);

  const items = [
    ...posts
      .filter((p) => !p.data.draft)
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/posts/${post.id}/`,
        categories: post.data.tags,
      })),
    ...essays
      .filter((e) => !e.data.draft)
      .map((essay) => ({
        title: essay.data.title,
        pubDate: essay.data.date,
        description: essay.data.description,
        link: `/essays/${essay.id}/`,
        categories: essay.data.tags,
      })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: "IceyWu",
    description:
      "IceyWu 的个人网站 - 技术博客与生活随笔。专注 Vue、Nuxt、TypeScript 等前端技术。",
    site: context.site,
    items,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: [
      `<language>zh-cn</language>`,
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
      `<managingEditor>3128006406@qq.com(IceyWu)</managingEditor>`,
      `<webMaster>3128006406@qq.com(IceyWu)</webMaster>`,
      `<copyright>© ${new Date().getFullYear()} IceyWu</copyright>`,
      `<atom:link href="${new URL("rss.xml", context.site).href}" rel="self" type="application/rss+xml" />`,
    ].join(""),
  });
}
