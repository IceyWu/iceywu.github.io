<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import turf_circle from '@turf/circle'
import { createVNode, render } from 'vue'
import MapPop from '@/components/Mappop.vue'

let map: any // 地图

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

// 初始化生命周期
onMounted(() => {
  init()
  addMarker([104.072325, 30.664893])
})
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
  map.addControl(new mapboxgl.NavigationControl(), 'top-left')
  map.on('style.load', () => {
    map.setFog({})
    map.flyTo({
      ...end,
      duration: 2000,
      essential: true,
    })
  })
  // 点击增加弹窗
  map.on('click', (e: any) => {
    // addPop([e.lngLat.lng, e.lngLat.lat])
    // drawCircle([e.lngLat.lng, e.lngLat.lat])
  })
}
// 传入坐标，添加标记
function addMarker(lnglat: number[] | any) {
  const el = document.createElement('div')
  el.className = 'marker'
  el.style.backgroundColor = '#3AB236'
  el.style.width = `${14}px`
  el.style.height = `${14}px`
  el.style.borderRadius = '50%'

  new mapboxgl.Marker(el).setLngLat(lnglat).addTo(map)
}
// 传入坐标，添加弹窗pop
const popObj = ref()
function addPop(lnglat: number[] | any) {
  if (popObj.value)
    popObj.value.remove()

  const el = document.createElement('div')
  el.id = 'markerId'
  el.style.width = `${32}px`
  el.style.height = `${32}px`
  const LngLat = lnglat
  const elpopup = document.createElement('div')
  const vNodePopup = createVNode(MapPop, {
    obj: '',
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
const hasAddLayer = ref(false)
function drawCircle(center: number[]) {
  // const radius = 8477.70727135986 / 1000 // 半径
  const radius = 8477.70727135986 / 100
  const options = {
    steps: 64,
    units: 'kilometers',
  } as any
  const circle = turf_circle(center, radius, options)

  if (hasAddLayer.value) {
    // 修改addSource
    map.getSource('circle').setData(circle)
    return
  }
  else {
    map.addSource('circle', {
      type: 'geojson',
      data: circle,
    })
  }
  map.addLayer({
    id: 'circleLine',
    type: 'line',
    source: 'circle',
    paint: {
      'line-color': '#000',
      'line-width': 3,
    },
  })
  hasAddLayer.value = true
}
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
</style>
