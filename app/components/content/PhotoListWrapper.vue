<script lang="ts" setup>
import type { PhotoData } from '../PhotoList.vue'

interface Props {
  data?: string // JSON 字符串格式的照片数据
  columns?: number
  gap?: number
  itemWidth?: number | string
  itemHeight?: number | string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

const props = withDefaults(defineProps<Props>(), {
  columns: 3,
  gap: 16,
  itemWidth: 300,
  itemHeight: 300,
  objectFit: 'cover',
})

// 解析照片数据
const photos = computed<PhotoData[]>(() => {
  if (!props.data)
    return []

  try {
    return JSON.parse(props.data)
  }
  catch (error) {
    console.error('Failed to parse photo data:', error)
    return []
  }
})
</script>

<template>
  <PhotoList
    :photos="photos"
    :columns="columns"
    :gap="gap"
    :item-width="itemWidth"
    :item-height="itemHeight"
    :object-fit="objectFit"
  />
</template>
