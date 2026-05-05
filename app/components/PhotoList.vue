<script lang="ts" setup>
// 照片数据接口（对齐后端返回的数据结构）
export interface PhotoData {
	sec_uid: string;
	name: string;
	url: string;
	width: number;
	height: number;
	blurhash?: string;
	created_at?: string;
	updated_at?: string;
	live_photo_video_url?: string;
}

interface PhotoListProps {
	photos: PhotoData[]; // 照片列表数据
	columns?: number; // 列数
	gap?: number; // 间距
	itemWidth?: number | string; // 单项宽度
	itemHeight?: number | string; // 单项高度
	objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

const props = withDefaults(defineProps<PhotoListProps>(), {
	columns: 3,
	gap: 16,
	itemWidth: 300,
	itemHeight: 300,
	objectFit: "cover",
});

// 计算网格样式
const gridStyle = computed(() => {
	return {
		display: "grid",
		gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
		gap: `${props.gap}px`,
	};
});

function getPhotoSrc(photo: PhotoData) {
	return `${photo.url}?x-oss-process=image/resize,l_800/format,avif`;
}
</script>

<template>
  <div class="photo-list not-prose" :style="gridStyle">
    <PhotoItem
      v-for="photo in photos"
      :key="photo.sec_uid"
      :image-src="getPhotoSrc(photo)"
      :video-src="photo.live_photo_video_url"
      :blurhash="photo.blurhash"
      :alt="photo.name"
      :width="itemWidth"
      :height="itemHeight"
      :object-fit="objectFit"
    />
  </div>
</template>

<style scoped>
.photo-list {
  width: 100%;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .photo-list {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 640px) {
  .photo-list {
    grid-template-columns: repeat(1, 1fr) !important;
  }
}
</style>
