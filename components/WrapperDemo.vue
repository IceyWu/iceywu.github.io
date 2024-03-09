<script setup lang="ts">
interface CompType {
  link: string
  title: string
  description: string
  date: string
  type: string
}
interface DataType {
  comp: CompType
  link: string
  date: string
}
interface Props {
  data: DataType | undefined
  // desc?: string
  // lottieJsonData: Record<string, any>
}
const props = defineProps<Props>()
// console.log('🐬-----props-----', props);
const { comp, date, link } = props.data as DataType
const { title, type } = comp || {}
function getImageUrl() {
  if (type === 'gif')
    return import(`../content/demos/${title}.gif`)
  else return import(`../content/demos/${title}.png`)
}
const coverModule = ref()
const loading = ref(true)
async function getImgData() {
  loading.value = true
  coverModule.value = await getImageUrl()
  loading.value = false
}
onMounted(() => {
  getImgData()
})
</script>

<template>
  <div>
    <a
      border="~ base rounded-lg"
      block
      of-hidden
      class="group"
      hover="scale-101 shadow-xl z-10"
      transition-all
      duration-500
      bg-base
      relative
      :href="link"
      target="_blank"
    >
      <img v-if="!loading" :src="coverModule?.default">
      <div class="prose prose-sm p4 m0 pb3">
        <slot />
        <div op50 text-sm pt2>{{ formatDate(date, false) }}</div>
      </div>
    </a>
  </div>
</template>
