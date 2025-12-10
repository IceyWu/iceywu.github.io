<script lang='ts' setup>
import { useTitle } from "@vueuse/core";
import type { Repo } from "~/types";

useTitle("Projects | IceyWu");
useHead({
	title: "Projects | IceyWu",
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
function filterRepos(repos: Repo[], key: string) {
	return repos
		.filter((repo) => repo.topics?.includes(key))
		.sort((a, b) => {
			return a.stargazers_count > b.stargazers_count ? -1 : 1;
		});
}
// const { data, status } = useFetch('/api/repos')
const data: any = ref([]);
const status = ref("pending");
async function getData() {
	status.value = "pending";
	const data = await $fetch<Repo[]>(
		"https://api.github.com/users/iceywu/repos?per_page=100&type=owner&sort=updated",
	);

	const publicRepos = data.filter((repo) => !repo.private && !repo.archived);
	const publicAndNotForkRepos = publicRepos.filter((repo) => !repo.fork);

	const repoGroups: Record<string, Repo[]> = {
		Templates: filterRepos(publicAndNotForkRepos, "template"),
		"Vite Ecosystem": filterRepos(publicAndNotForkRepos, "vite"),
		Utils: filterRepos(publicAndNotForkRepos, "util"),
		UnoCSS: filterRepos(publicRepos, "unocss"),
		All: publicAndNotForkRepos,
	};
	status.value = "success";
	return Object.fromEntries(
		Object.entries(repoGroups).filter(([_, repos]) => repos.length > 0),
	);
}
onMounted(async () => {
	data.value = await getData();
});
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
      </template>
    </div>
  </div>
</template>
