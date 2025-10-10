<script lang="ts" setup>
// 照片数据接口
export interface PhotoData {
  id: string | number
  imageSrc: string // 图片源路径
  videoSrc?: string // 视频源路径(可选,有此字段则为实况照片)
  blurhash?: string // blurhash 值
  alt?: string // 图片描述
  width?: number
  height?: number
}

interface PhotoListProps {
  photos: PhotoData[] // 照片列表数据
  columns?: number // 列数
  gap?: number // 间距
  itemWidth?: number | string // 单项宽度
  itemHeight?: number | string // 单项高度
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

const props = withDefaults(defineProps<PhotoListProps>(), {
  columns: 3,
  gap: 16,
  itemWidth: 300,
  itemHeight: 300,
  objectFit: 'cover',
})

// 计算网格样式
const gridStyle = computed(() => {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
    gap: `${props.gap}px`,
  }
})
function getphotoSrc(data: any) {
  const { imageSrc } = data

  return `${imageSrc}?x-oss-process=image/resize,l_800/format,avif`
}
</script>

<template>
  <div class="photo-list not-prose" :style="gridStyle">
    <PhotoItem
      v-for="photo in photos"
      :key="photo.id"
      :image-src="getphotoSrc(photo)"
      :video-src="photo.videoSrc"
      :blurhash="photo.blurhash"
      :alt="photo.alt || `Photo ${photo.id}`"
      :width="itemWidth"
      :height="itemHeight"
      :object-fit="objectFit"
    />
  </div>
</template>

<style scoped>
.photo-list {
  width: 100%;
  padding: 1rem;
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
