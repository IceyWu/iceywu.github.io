<script lang='ts' setup>
import { formatNumber } from "@iceywu/utils";
import { getLanguageColor } from "~/composables/utils";

defineProps<{
	repo: {
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
}>();
</script>

<template>
  <article
    b="~ black op-10"
    dark-b="white op-10"
    rounded-lg
    p="3.5 sm:4"
    text-xs
    shadow-sm
    trans
    hover="bg-orange bg-op-3"
    dark-hover="bg-white bg-op-3"
  >
    <a :href="repo.url" target="_blank" decoration-none flex="~ col gap-2.5 sm:gap-3" h-full>
      <div v-if="repo.owner" fsc gap-2 text="xs sm:sm" op-70>
        <img :src="repo.owner.avatarUrl" :alt="repo.owner.name" class="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full shrink-0" />
        <span>{{ repo.owner.name }}</span>
      </div>
      <div flex="~ col gap-2 sm:row sm:items-start" justify-between>
        <h5 fsc items-start gap-1 text-sm min-w-0 flex-1>
          <i i-ri:git-repository-line class="mt-0.5 shrink-0" />
          <span break-words>{{ repo.name }}</span>
        </h5>
        <span
          v-if="repo.badge"
          inline-block
          rounded-full
          text="[10px] sm:xs"
          p="x1.5 y0.4"
          leading-none
          self-start
          shrink-0
          :class="repo.isTemplate
            ? 'dark:bg-yellow/20 dark:text-yellow/80 bg-blue/20 text-blue/80'
            : 'dark:bg-purple/20 dark:text-purple/80 bg-red/20 text-red/80'
          "
        >
          {{ repo.badge }}
        </span>
      </div>
      <p flex-1 class="line-clamp-2 sm:line-clamp-3 leading-5 op-80">
        {{ repo.description }}
      </p>
      <p fsc gap-3 sm:gap-4 class="flex-wrap op-75">
        <span v-if="repo.language" fsc gap-1 min-w-0>
          <i
            w-2.5
            h-2.5
            sm:w-3
            sm:h-3
            rounded-full
            :style="{ backgroundColor: repo.language ? getLanguageColor(repo.language) : '' }"
          />
          <span class="truncate max-w-24 sm:max-w-none">{{ repo.language }}</span>
        </span>
        <span v-if="repo.stars" fsc gap-1>
          <i i-ri:star-line />
          {{ formatNumber(repo.stars) }}
        </span>
        <span v-if="repo.forks" fsc gap-1>
          <i i-carbon:direction-fork />
          {{ formatNumber(repo.forks) }}
        </span>
      </p>
    </a>
  </article>
</template>
