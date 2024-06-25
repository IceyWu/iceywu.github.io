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
import { getChartData } from './base'

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
