<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { createVNode, render } from 'vue'
import { to } from '@iceywu/utils'
import MapPop from '@/components/Mappop.vue'

let map: any // 地图
// const colorList = []

const isDark = useDark({
  onChanged() {
    nextTick(() => {
      if (map)
        setMapStyle()
    })
  },
})
const mapStyle = computed(() => {
  const mode = isDark.value ? 'dark' : 'light'
  return `mapbox://styles/mapbox/${mode}-v11`
})

function setMapStyle() {
  map.setStyle(mapStyle.value)
}

// 🌈 接口数据请求
const dataList = ref<any>([])
const getDataLoading = ref(false)
async function getData() {
  if (getDataLoading.value)
    return
  getDataLoading.value = true
  const params = {
    baseApi: 'https://test.wktest.cn:3001',
    // baseApi: 'http://localhost:3001',
    page: 1,
    size: 100,
    userId: 1,
  }
  const API = `${params.baseApi}/api/topic?page=${params.page}&size=${params.size}&sort=desc,createdAt&userId=${params.userId}`
  const [err, res] = await to($fetch<any>(API))
  if (res) {
    const { code, result = [] } = res || {}
    if (code === 200 && result) {
      const { data = [] } = result
      dataList.value = data
    }
  }
  if (err)
    getDataLoading.value = false

  getDataLoading.value = false
}

// 初始化生命周期
onMounted(() => {
  init()
  addMarkers()
})
async function addMarkers() {
  await getData()

  for (let index = 0; index < dataList.value.length; index++) {
    const element = dataList.value[index]
    const { extraData } = element || {}
    if (extraData) {
      const { gps_data } = JSON.parse(extraData)
      addMarker([gps_data?.lng, gps_data?.lat], element)
    }
  }
}
onBeforeUnmount(() => {
  map = null
})

const basicMapbox = ref<any>(null)
const start = {
  center: [80, 80],
  zoom: 1,
  pitch: 75,
  bearing: 0,
}
const end = {
  center: [104.072325, 30.664893],
  zoom: 10,
  // bearing: 20, //目标方位角
  // pitch: 75,
  pitch: 0,
}
function init() {
  mapboxgl.accessToken
    = 'pk.eyJ1IjoidnlrYXd6YXRpcyIsImEiOiJjbHJycm1lYXAwaGxhMmlvMWhwZTA3Zmg2In0.eo2EYOK6v0smB1IRunC8VA'
  map = new mapboxgl.Map({
    container: basicMapbox.value,
    style: mapStyle.value,
    ...start,
    minZoom: 2.5,
    maxZoom: 17,
  })
  map.addControl(new MapboxLanguage({ defaultLanguage: 'zh-Hans' }))
  // ### 添加导航控制条
  // map.addControl(new mapboxgl.NavigationControl(), 'top-left')
  map.on('style.load', () => {
    map.setFog({})
    map.flyTo({
      ...end,
      duration: 2000,
      essential: true,
    })
  })
  // 点击增加弹窗
  // map.on("click", (e: any) => {
  //   console.log('🐠-----click-----');

  //   // addPop([e.lngLat.lng, e.lngLat.lat])
  //   // drawCircle([e.lngLat.lng, e.lngLat.lat])
  // });
}
function getCover(data: any) {
  const fileTemp = data || {}
  const { fileType, file, cover } = fileTemp || {}
  if (fileType === 'IMAGE') {
    const preSrc = `${file}?x-oss-process=image/resize,l_50`
    const src = file
    return {
      src,
      preSrc,
    }
  }
  else if (fileType === 'VIDEO') {
    const srcT
      = cover
      || `${file}?x-oss-process=video/snapshot,t_7000,f_jpg,w_0,h_0,m_fast`
    return {
      src: srcT,
      preSrc: srcT,
    }
  }
}
// const popIsOpen = ref(false);
// 传入坐标，添加标记
function addMarker(lnglat: number[] | any, data?: any) {
  const flagEl = document.createElement('div')
  flagEl.className = 'marker-flag z-998 i-meteocons-windsock text-6xl'
  new mapboxgl.Marker(flagEl).setLngLat(lnglat).addTo(map)

  // cover
  if (data) {
    const { files, id } = data
    const firstFile = files[0] || {}
    const cover = getCover(firstFile) || {}

    const dot = document.createElement('div')
    dot.className = `marker-dot-${id} marker-dot`
    // dot.style.backgroundColor = "#3AB236";
    dot.style.backgroundImage = `url(${cover?.preSrc})`
    new mapboxgl.Marker(dot).setLngLat(lnglat).addTo(map)
    dot.addEventListener('click', () => {
      // popIsOpen.value = true
      addPop(lnglat, data)
    })
  }
}
// 传入坐标，添加弹窗pop
const popObj = ref()
function addPop(lnglat: number[] | any, data?: any) {
  if (!data)
    return

  if (popObj.value)
    popObj.value.remove()

  const el = document.createElement('div')
  el.id = 'markerId'
  el.style.width = `${32}px`
  el.style.height = `${32}px`
  const LngLat = lnglat
  const elpopup = document.createElement('div')
  const vNodePopup = createVNode(MapPop, {
    data,
    onClosePop: () => {
      if (popObj.value)
        popObj.value.remove()
    },
  })
  render(vNodePopup, elpopup)

  const option = {
    closeOnClick: false,
    closeButton: false,
    anchor: 'bottom',
    offset: [0, -20],
  } as any

  const popups = new mapboxgl.Popup(option)
    .setLngLat(LngLat)
    .setMaxWidth('300px')
    .setDOMContent(elpopup)
    .addTo(map)
  popObj.value = popups
}
// 绘制圆形区域的函数
// const hasAddLayer = ref(false)
// function drawCircle(center: number[]) {
//   // const radius = 8477.70727135986 / 1000 // 半径
//   const radius = 8477.70727135986 / 100
//   const options = {
//     steps: 64,
//     units: 'kilometers',
//   } as any
//   const circle = turf_circle(center, radius, options)

//   if (hasAddLayer.value) {
//     // 修改addSource
//     map.getSource('circle').setData(circle)
//     return
//   }
//   else {
//     map.addSource('circle', {
//       type: 'geojson',
//       data: circle,
//     })
//   }
//   map.addLayer({
//     id: 'circleLine',
//     type: 'line',
//     source: 'circle',
//     paint: {
//       'line-color': '#000',
//       'line-width': 3,
//     },
//   })
//   hasAddLayer.value = true
// }
</script>

<template>
  <div ref="basicMapbox" class="w-full relative map-temp-box" />
</template>

<style>
.map-temp-box {
  transform: translateY(-100px);
  padding-bottom: 100px;
  height: calc(100vh + 100px);
}
.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right {
  display: none;
}

.mapboxgl-ctrl-icon {
  box-sizing: border-box;
}
.marker-dot {
  /* background: red;
  border: 2px solid white;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transform: translateX(-30px);
  position: absolute;
  top: 20px;
  left: -15px; */
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  position: absolute;
  top: 20px;
  left: -15px;
  border: 2px solid white;
  cursor: pointer;
  z-index: 999;
}
</style>
