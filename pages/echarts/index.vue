<template>
  <div>
    <client-only>
      <v-chart class="chart" :option="option" />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LabelLayout } from "echarts/features";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LabelLayout,
]);

const option = ref({
  title: {
    text: "测试图表",
    subtext: "nuxt3.0中的EChart初探",
    left: "center",
    textStyle: {
      //主标题样式
      color: "#DC143C",
    },
    subtextStyle: {
      //副标题样式
      color: "#008000",
    },
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "horizontal", //图例方向
    bottom: "bottom", //图例距离底部位置
    textStyle: { color: "#FFFDFE" }, //图例字体颜色
  },
  series: [
    {
      name: "技术量",
      type: "pie",
      radius: "50%",
      label: {
        color: "#FFA500",
      },
      data: [
        { value: 1048, name: "前端技术" },
        { value: 735, name: "后端技术" },
        { value: 580, name: "服务器技术" },
        { value: 484, name: "运维技术" },
        { value: 300, name: "测试技术" },
      ],
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 800px;
}
</style>
