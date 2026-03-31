<script lang='ts' setup>
import { useTitle } from "@vueuse/core";
import { getLanguageColor } from "~/composables/utils";
import type { Repo } from "~/types";

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

const { data, status } = await useFetch<Record<string, Repo[]>>("/api/repos", {
	default: () => ({}),
});

const { data: contributions } = await useFetch<ContributedRepo[]>(
	"/api/contributions",
	{ default: () => [] },
);
</script>

<template>
  <div mxa w-65ch>
    <PageHeader title="Projects" description="List of projects (maintained or created) that I am proud of." />
    <div my-8 space-y-8>
      <template v-if="status === 'pending'">
        <div v-for="section in 2" :key="section">
          <h4 mb-3 class="h-6 w-32 bg-gray-300:72 dark:bg-gray:32 rounded animate-pulse" />
          <div grid="~ cols-1 md:cols-2 gap-4">
            <RepoSkeleton v-for="n in 4" :key="n" />
          </div>
        </div>
      </template>

      <template v-else-if="status === 'success'">
        <div v-for="(repos, key) in data" :key="key">
          <h4 mb-2>
            {{ key }}
          </h4>
          <div grid="~ cols-1 md:cols-2 gap-4">
            <RepoCard v-for="repo in repos" :key="repo.id" :repo="repo" />
          </div>
        </div>

        <div v-if="contributions && contributions.length > 0">
          <h4 mb-2>
            Contributed To
          </h4>
          <div grid="~ cols-1 md:cols-2 gap-4">
            <a
              v-for="repo in contributions"
              :key="repo.fullName"
              :href="repo.url"
              target="_blank"
              class="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            >
              <div flex items-center gap-2 mb-2>
                <img :src="repo.owner.avatarUrl" :alt="repo.owner.login" class="w-5 h-5 rounded-full" />
                <span text-sm op-60>{{ repo.owner.login }}</span>
              </div>
              <h5 font-medium>{{ repo.name }}</h5>
              <p v-if="repo.description" text-sm op-60 line-clamp-2 mt-1>
                {{ repo.description }}
              </p>
              <div flex items-center gap-3 mt-2 text-sm op-50>
                <span v-if="repo.language" flex items-center gap-1>
                  <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: getLanguageColor(repo.language) }" />
                  {{ repo.language }}
                </span>
                <span flex items-center gap-1>
                  ★ {{ repo.stars }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
