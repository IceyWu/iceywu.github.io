/**
 * GSAP Nuxt Plugin
 * 懒加载 GSAP 核心和 ScrollTrigger 插件
 * 提供 $gsap 和 $ScrollTrigger 全局访问
 */
export default defineNuxtPlugin(async () => {
	// 懒加载 GSAP 核心和所有需要的模块
	const gsapModule = await import("gsap");
	const gsap = gsapModule.gsap || gsapModule.default;

	// 懒加载 ScrollTrigger 插件
	const scrollTriggerModule = await import("gsap/ScrollTrigger");
	const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

	// 注册插件
	if (ScrollTrigger) {
		gsap.registerPlugin(ScrollTrigger);
	}

	// 设置全局默认配置
	gsap.defaults({
		ease: "power2.out",
		duration: 0.8,
	});

	return {
		provide: {
			gsap,
			ScrollTrigger,
		},
	};
});
