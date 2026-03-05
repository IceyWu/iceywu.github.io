export default defineNuxtConfig({
	devServer: {
		port: 1111,
	},

	modules: [
		"@vueuse/nuxt",
		"@unocss/nuxt",
		"@nuxt/content",
		"@nuxtjs/sitemap",
		// '@nuxtjs/color-mode',
		// '@vite-pwa/nuxt',
	],

	site: {
		url: "https://iceywu.cn",
		name: "IceyWu",
	},

	sitemap: {
		exclude: ["/api/**"],
	},

	experimental: {
		viewTransition: true,
		renderJsonPayloads: true,
	},

	// colorMode: {
	//   preference: 'system',
	//   fallback: 'dark',
	//   classSuffix: '',
	// },

	css: [
		"~/styles/vars.css",
		"~/styles/fonts.css",
		"~/styles/prose.css",
		"~/styles/main.css",
	],

	content: {
		build: {
			markdown: {
				toc: {
					depth: 3,
					searchDepth: 3,
				},
				highlight: {
					theme: {
						default: "vitesse-dark",
						light: "vitesse-light",
					},
				},
			},
		},
	},

	vite: {
		define: {
			"import.meta.env.__BUILD_TIME__": JSON.stringify(
				new Date().toISOString(),
			),
			__DEV__: process.env.NODE_ENV !== "production",
		},
		build: {
			target: "esnext",
		},
	},

	// intlify: {
	//   localeDir: 'locales',
	//   vueI18n: {
	//     locale: 'zh-cn',
	//   },
	// },
	nitro: {
		prerender: {
			crawlLinks: false,
			routes: ["/"],
		},
	},

	future: {
		compatibilityVersion: 4,
	},
	compatibilityDate: "2024-09-05",
});
