<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LabelLayout } from 'echarts/features'
import { GraphChart } from 'echarts/charts'
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { ref } from 'vue'
import type { ChartItem } from '@/types/chartItem'

interface ChartDataList {
  [key: string]: ChartItem[]
}

const skillData: ChartDataList = {
  // 方向
  direction: [
    {
      name: '前端',
      val: 'web',
      icon: 'https://api.iconify.design/vscode-icons:file-type-html.svg',
    },
    {
      name: '后端',
      val: 'backend',
      icon: 'https://api.iconify.design/vscode-icons:file-type-apib.svg',
    },
    {
      name: 'IOS',
      val: 'ios',
      icon: 'https://api.iconify.design/vscode-icons:file-type-applescript.svg',
    },
    {
      name: 'APP',
      val: 'app',
      icon: 'https://api.iconify.design/vscode-icons:file-type-appsemble.svg',
    },
  ],
  // 语言
  language: [
    {
      name: 'JavaScript',
      target: ['Vue', 'Nuxt', '前端', '后端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-js-official.svg',
    },
    {
      name: 'TypeScript',
      target: ['Vue', 'Nuxt', '前端', '后端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-tsconfig.svg',
    },
    {
      name: 'Python',
      icon: 'https://api.iconify.design/vscode-icons:file-type-python.svg',
    },
    {
      name: 'CSS',
      target: ['Vue', 'Nuxt', '前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-css.svg',
    },
    {
      name: 'HTML',
      target: ['Vue', 'Nuxt', '前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-html.svg',
    },
    {
      name: 'C',
      target: ['APP'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-c.svg',
    },
    {
      name: 'Lua',
      icon: 'https://api.iconify.design/vscode-icons:file-type-lua.svg',
    },
    {
      name: 'C++',
      target: ['APP'],
      icon: '',
    },
    {
      name: 'Swift',
      target: ['IOS', 'APP'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-swift.svg',
    },
    {
      name: 'Objective-C',
      target: ['IOS', 'APP'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-objectivec.svg',
    },
    {
      name: 'PHP',
      target: ['后端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-php.svg',
    },
  ],
  // 框架
  frame: [
    {
      name: 'Vue',
      target: ['前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-vue.svg',
    },
    {
      name: 'Nuxt',
      target: ['前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-nuxt.svg',
    },
    {
      name: 'Electron',
      target: ['前端', 'APP'],
      icon: 'https://api.iconify.design/vscode-icons:folder-type-electron.svg',
    },
    {
      name: 'Tauri',
      target: ['前端', 'APP'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-tauri.svg',
    },
    {
      name: 'Vite',
      target: ['前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-vite.svg',
    },
    {
      name: 'Unocss',
      target: ['前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-unocss.svg',
    },
    {
      name: 'Webpack',
      target: ['前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-webpack.svg',
    },
    {
      name: 'Nestjs',
      target: ['后端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-nestjs.svg',
    },
  ],
}

function handleChartData(skillDataList: any) {
  const seriesData: any[] = []
  const baseDataList: any[] = []
  Object.keys(skillDataList).forEach((key) => {
    skillDataList[key].forEach((item: any) => {
      seriesData.push({
        name: item.name,
        draggable: true,
        symbol: item.icon ? `image://${item.icon}` : 'circle',
        label: {
          position: 'bottom',
        },
      })
      baseDataList.push(item)
    })
  })
  return {
    seriesData,
    baseDataList,
  }
}

function handleChartLinks(baseDataList: any) {
  const tempLinksList: any[] = []
  baseDataList.forEach((item: any) => {
    if (item.target) {
      item.target.forEach((target: any) => {
        tempLinksList.push({
          source: item.name,
          target,
          value: '',
        })
      })
    }
  })
  return tempLinksList
}

function getChartData() {
  const { seriesData, baseDataList } = handleChartData(skillData)
  const linksList = handleChartLinks(baseDataList)
  return {
    seriesData,
    linksList,
  }
}

use([
  CanvasRenderer,
  GraphChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LabelLayout,
])

const option = ref<any>({
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  label: {
    show: true,
    fontSize: 12,
  },
  series: [
    {
      type: 'graph',
      layout: 'force',
      symbolSize: 45,
      roam: true,
      categories: [],
      label: {
        show: true,
      },
      force: {
        repulsion: 1000,
      },
      edgeSymbolSize: [4, 50],
      edgeLabel: {
        show: true,
        fontSize: 10,
        formatter: '{c}',
      },
      data: [],
      links: [],
      lineStyle: {
        opacity: 0.9,
        width: 1,
        curveness: 0,
      },
    },
  ],
})

onMounted(() => {
  const { seriesData, linksList } = getChartData()
  option.value.series[0].data = seriesData
  option.value.series[0].links = linksList
})
</script>

<template>
  <div>
    <client-only>
      <VChart class="chart" :option="option" />
    </client-only>
  </div>
</template>

<style scoped>
.chart {
  height: 800px;
}
</style>
