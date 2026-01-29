<script lang="ts" setup>
const route = useRoute();

const props = withDefaults(
	defineProps<{
		size?: string;
	}>(),
	{
		size: "w-10",
	},
);

const { data } = await useFetch("/api/user");
const user = computed(() => {
	return (
		data.value || {
			avatar_url: "https://avatars.githubusercontent.com/u/66096254?v=4",
			gravatar_id: "",
			url: "https://api.github.com/users/IceyWu",
			html_url: "https://github.com/IceyWu",
			name: "Icey Wu",
			company: null,
			blog: "https://iceywu.github.io/",
			location: "Chengdu, China",
			email: null,
			hireable: null,
			bio: null,
			twitter_username: null,
			public_repos: 60,
			public_gists: 0,
			followers: 30,
			following: 19,
			created_at: "2020-05-28T23:35:36Z",
			updated_at: "2024-12-23T16:20:27Z",
		}
	);
});
</script>

<template>
  <div view-transition-logo>
    <ImgBlurHash
      mode="bg"
      :src="user!.avatar_url"
      blurhash="LYN0}600~q%LIT9Ft7IoIV-;-pxu"
      alt="Avatar"
      :class="props.size"
      aspect-square
      rd="[62%_47%_82%_35%/45%_45%_80%_66%]"
      will-change="border-radius,transform,opacity"
      animate-shape
    />
  </div>
</template>
