<script setup>
const ogUrl = "https://iceywu.cn/";
const ogImage = `${ogUrl}og.png`;
const title = "IceyWu - Full Stack Developer";
const description =
	"IceyWu 的个人网站。全栈开发者，热爱开源，专注于 Vue、Nuxt、TypeScript 等前端技术，分享技术博客、开源项目与生活随笔。";

useHead({
	title: "IceyWu",
	titleTemplate: "%s | IceyWu",
	link: [
		{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
		{ rel: "apple-touch-icon", href: "/avatar.jpg" },
	],
	meta: [
		{ name: "author", content: "IceyWu" },
		{ hid: "description", name: "description", content: description },
		{
			hid: "keywords",
			name: "keywords",
			content:
				"IceyWu, Blog, Portfolio, Vue, Nuxt, TypeScript, 开源, 前端开发, 全栈开发",
		},

		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "IceyWu" },
		{ property: "og:url", content: ogUrl },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:image", content: ogImage },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:image", content: ogImage },
		{ name: "twitter:site", content: "@IceyWu" },
		{ name: "twitter:url", content: ogUrl },
	],
	charset: "utf-8",
	viewport:
		"width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0",
});

// 结构化数据 - WebSite + SiteNavigationElement
useHead({
	script: [
		{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "WebSite",
						name: "IceyWu",
						url: ogUrl,
						description,
						author: {
							"@type": "Person",
							name: "IceyWu",
							url: ogUrl,
						},
					},
					{
						"@type": "SiteNavigationElement",
						name: "Blog",
						url: `${ogUrl}posts`,
						description: "技术博客 - 分享前端开发、Vue、Nuxt 等技术文章",
					},
					{
						"@type": "SiteNavigationElement",
						name: "Essays",
						url: `${ogUrl}essays`,
						description: "随笔 - 生活感悟与旅行记录",
					},
					{
						"@type": "SiteNavigationElement",
						name: "Projects",
						url: `${ogUrl}projects`,
						description: "开源项目 - 我引以为豪的开源作品",
					},
					{
						"@type": "SiteNavigationElement",
						name: "Demos",
						url: `${ogUrl}demos`,
						description: "产品演示 - 项目与工具的在线展示",
					},
					{
						"@type": "SiteNavigationElement",
						name: "Friends",
						url: `${ogUrl}friends`,
						description: "友情链接 - 一些有趣的朋友们",
					},
				],
			}),
		},
	],
});
</script>

<template>
  <NuxtLoadingIndicator
    :height="1"
    color="repeating-linear-gradient(to right,rgba(192,132,252,1) 0%,rgba(248,113,113,1) 50%,rgba(45,212,191,1) 100%)"
  />
  <NuxtLayout>
    <NuxtPage
      :transition="{
        name: 'page',
        mode: 'out-in',
      }"
    />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
