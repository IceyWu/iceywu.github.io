<script lang="ts" setup>
import { decode } from 'blurhash'
import { LivePhotoViewer } from 'live-photo'

// Props interface
interface PhotoItemProps {
  blurhash?: string
  imageSrc: string
  videoSrc?: string
  alt?: string
  width?: number | string
  height?: number | string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

const props = withDefaults(defineProps<PhotoItemProps>(), {
  alt: 'Photo',
  width: 300,
  height: 300,
  objectFit: 'cover',
})

// 判断是否是实况照片(有视频源)
const isLivePhoto = computed(() => !!props.videoSrc)

// Refs
const containerRef = ref<HTMLElement | null>(null)
const placeholderSrc = ref<string>()
const isLoaded = ref(false)
const livePhotoViewer = ref<any>(null)

// 生成 blurhash 占位图
function getDataUrlFromArr(arr: Uint8ClampedArray, w: number, h: number) {
  if (typeof w === 'undefined' || typeof h === 'undefined')
    w = h = Math.sqrt(arr.length / 4)

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  canvas.width = w
  canvas.height = h

  const imgData = ctx.createImageData(w, h)
  imgData.data.set(arr)
  ctx.putImageData(imgData, 0, 0)

  return canvas.toDataURL()
}

// 初始化 blurhash
function initBlurhash() {
  if (props.blurhash) {
    const pixels = decode(props.blurhash, 32, 32)
    placeholderSrc.value = getDataUrlFromArr(pixels, 32, 32)
  }
}

// 初始化普通图片
function initNormalImage() {
  const img = document.createElement('img')
  img.onload = () => {
    isLoaded.value = true
  }
  img.onerror = () => {
    isLoaded.value = true
  }
  img.src = props.imageSrc

  // 回退超时
  setTimeout(() => {
    isLoaded.value = true
  }, 3000)
}

// 初始化 LivePhoto
function initLivePhoto() {
  if (!containerRef.value || !props.videoSrc)
    return

  try {
    livePhotoViewer.value = new LivePhotoViewer({
      photoSrc: props.imageSrc,
      videoSrc: props.videoSrc,
      container: containerRef.value,
      width: props.width,
      height: props.height,
      autoplay: true,
      lazyLoadVideo: true,
      imageCustomization: {
        styles: {
          objectFit: props.objectFit,
          borderRadius: '8px',
        },
        attributes: {
          alt: props.alt,
          loading: 'lazy',
        },
      },
      videoCustomization: {
        styles: {
          objectFit: props.objectFit,
          borderRadius: '8px',
        },
      },
      onPhotoLoad: () => {
        isLoaded.value = true
      },
      onError: (e) => {
        console.error('LivePhoto加载失败:', e)
        isLoaded.value = true
      },
    })
  }
  catch (error) {
    console.error('LivePhoto初始化失败:', error)
    isLoaded.value = true
  }
}

// 显示的图片 URL
const displayUrl = computed(() => {
  if (isLoaded.value || !placeholderSrc.value)
    return props.imageSrc
  return placeholderSrc.value
})

onMounted(() => {
  initBlurhash()

  if (isLivePhoto.value) {
    // 实况照片
    nextTick(() => {
      initLivePhoto()
    })
  }
  else {
    // 普通图片
    initNormalImage()
  }
})

onBeforeUnmount(() => {
  // 清理 LivePhoto 实例
  if (livePhotoViewer.value) {
    livePhotoViewer.value = null
  }
})
</script>

<template>
  <div class="photo-item-wrapper not-prose">
    <!-- LivePhoto 容器 -->
    <div v-if="isLivePhoto" ref="containerRef" class="live-photo-container" :style="{ width: typeof width === 'number' ? `${width}px` : width, height: typeof height === 'number' ? `${height}px` : height }">
      <!-- 加载中显示 blurhash 占位图 -->
      <div v-if="!isLoaded && placeholderSrc" class="placeholder-image" :style="{ backgroundImage: `url(${placeholderSrc})`, backgroundSize: 'cover', width: '100%', height: '100%', borderRadius: '8px' }" />
    </div>

    <!-- 普通图片 -->
    <div v-else class="normal-image-container " :style="{ width: typeof width === 'number' ? `${width}px` : width, height: typeof height === 'number' ? `${height}px` : height }">
      <img
        :src="displayUrl"
        :alt="alt"
        :style="{ objectFit, borderRadius: '8px', width: '100%', height: '100%' }"
        loading="lazy"
      >
    </div>
  </div>
</template>

<style scoped>
.photo-item-wrapper {
  position: relative;
  display: inline-block;
}

.live-photo-container,
.normal-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.placeholder-image {
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(10px);
  transform: scale(1.1);
}

.normal-image-container img {
  display: block;
  transition: opacity 0.3s ease;
}
</style>
