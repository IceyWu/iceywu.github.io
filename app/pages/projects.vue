<script lang='ts' setup>
import { useTitle } from "@vueuse/core";
import type { Repo } from "~/types";
import { proseHeadingClick } from "~/utils";

useTitle("Projects | IceyWu");
useHead({
	title: "Projects",
	meta: [
		{
			hid: "description",
			name: "description",
			content: "List of projects that I am proud of.",
		},
		{
			hid: "keywords",
			name: "keywords",
			content:
				"projects, github, open source, vue, nuxt, node, javascript, typescript",
		},
	],
});

type ContributedRepo = {
	name: string;
	fullName: string;
	description: string | null;
	url: string;
	stars: number;
	language: string | null;
	owner: {
		login: string;
		avatarUrl: string;
	};
};

type ProjectCard = {
	id: string;
	name: string;
	description: string | null;
	url: string;
	language: string | null;
	stars: number;
	forks: number;
	badge?: string;
	isTemplate?: boolean;
	owner?: {
		name: string;
		avatarUrl: string;
	};
};

type ProjectSection = {
	title: string;
	id: string;
	repos: ProjectCard[];
};

const { data, status } = await useFetch<Record<string, Repo[]>>("/api/repos", {
	default: () => ({}),
});

const { data: contributions } = await useFetch<ContributedRepo[]>(
	"/api/contributions",
	{
		default: () => [],
		transform: (data) => data.sort((a, b) => b.stars - a.stars),
	},
);

const contributionCards = computed<ProjectCard[]>(() =>
	(contributions.value || []).map((repo) => ({
		id: repo.fullName,
		name: repo.name,
		description: repo.description,
		url: repo.url,
		language: repo.language,
		stars: repo.stars,
		forks: 0,
		owner: {
			name: repo.owner.login,
			avatarUrl: repo.owner.avatarUrl,
		},
	})),
);

const route = useRoute();
const activeSection = ref("");

function getSectionId(title: string) {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

const projectSections = computed<ProjectSection[]>(() => {
	const sections: ProjectSection[] = [];

	if (contributionCards.value.length > 0) {
		sections.push({
			title: "Contributed To",
			id: getSectionId("Contributed To"),
			repos: contributionCards.value,
		});
	}

	for (const [title, repos] of Object.entries(data.value || {})) {
		sections.push({
			title,
			id: getSectionId(title),
			repos: repos.map((repo) => ({
				id: String(repo.id),
				name: repo.name,
				description: repo.description,
				url: repo.homepage || repo.html_url,
				language: repo.language,
				stars: repo.stargazers_count,
				forks: repo.forks_count,
				badge: `${repo.private ? "Private" : "Public"}${repo.is_template ? " Template" : ""}`,
				isTemplate: repo.is_template,
			})),
		});
	}

	return sections;
});

function updateActiveSection() {
	const sections = projectSections.value;
	if (!sections.length || !import.meta.client) return;

	const visible = sections
		.map((section) => {
			const element = document.getElementById(section.id);
			if (!element) return null;

			return {
				id: section.id,
				top: element.getBoundingClientRect().top,
			};
		})
		.filter((item): item is { id: string; top: number } => Boolean(item));

	if (!visible.length) return;

	const current =
		[...visible].reverse().find((item) => item.top <= 140) || visible[0];
	if (!current) return;
	activeSection.value = current.id;
}

function goToSection(event: MouseEvent, id: string) {
	activeSection.value = id;
	proseHeadingClick(event, id);
}

onMounted(() => {
	activeSection.value =
		route.hash?.slice(1) || projectSections.value[0]?.id || "";

	nextTick(() => {
		updateActiveSection();
	});

	useEventListener("scroll", updateActiveSection);
	useEventListener("resize", updateActiveSection);
});

watch(
	() => route.hash,
	(hash) => {
		if (hash) {
			activeSection.value = hash.slice(1);
			return;
		}

		activeSection.value = projectSections.value[0]?.id || "";
	},
);
</script>

<template>
  <div mxa w="full max-7xl" px-3 sm:px-4 lg:px-6>
    <PageHeader title="Projects" description="List of projects (maintained or created) that I am proud of." />
    <div my-6 flex="~ col lg:row" items-start gap-6 lg:gap-8>
      <aside class="w-full lg:w-54 lg:shrink-0 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:pr-2">
        <div class="border border-black/8 rounded-2xl p-3 dark:border-white/10 lg:border-0 lg:rounded-none lg:p-0">
          <div class="px-1 pb-2 text-[11px] tracking-[0.22em] op-35 uppercase lg:hidden">
            Explore
          </div>
          <nav class="grid grid-cols-2 gap-2 lg:flex lg:flex-col">
          <a
            v-for="section in projectSections"
            :key="section.id"
            :href="`#${section.id}`"
            class="rounded-lg px-3 py-2.5 text-sm decoration-none border border-transparent transition-colors min-w-0"
            decoration-none
            :class="activeSection === section.id
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'op-55 hover:op-100 lg:bg-transparent lg:hover:translate-x-1'"
            @click="goToSection($event, section.id)"
          >
            <span class="block truncate text-center lg:text-left">{{ section.title }}</span>
          </a>
          </nav>
        </div>
      </aside>

      <div flex-1 min-w-0 w-full>
        <div space-y-7 sm:space-y-8>
          <template v-if="status === 'pending'">
            <div v-for="section in 2" :key="section">
              <h4 mb-3 class="h-6 w-32 bg-gray-300:72 dark:bg-gray:32 rounded animate-pulse" />
              <div grid="~ cols-1 md:cols-2 gap-4">
                <RepoSkeleton v-for="n in 4" :key="n" />
              </div>
            </div>
          </template>

          <template v-else-if="status === 'success'">
            <section
              v-for="section in projectSections"
              :id="section.id"
              :key="section.id"
              scroll-mt-30 lg:scroll-mt-28
              class="space-y-3"
            >
              <h4 mb-2 text-base sm:text-lg class="tracking-[0.01em]">
                {{ section.title }}
              </h4>
              <div class="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-2">
                <RepoCard v-for="repo in section.repos" :key="repo.id" :repo="repo" />
              </div>
            </section>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
