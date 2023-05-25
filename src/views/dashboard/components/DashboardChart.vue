<script setup lang="ts">
import { echarts } from '@/utils'
import { useResizeObserver } from '@vueuse/core'
import type { EChartsOption } from 'echarts'
import { onMounted, ref } from 'vue'

const option: EChartsOption = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: '10%',
    data: ['2021', '2022', '2023']
  },
  grid: {
    left: '0',
    right: '0',
    bottom: '0',
    top: '20%',
    containLabel: false
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [
        '第1周',
        '第2周',
        '第3周',
        '第4周',
        '第5周',
        '第6周',
        '第7周',
        '第8周',
        '第9周',
        '第10周',
        '第11周',
        '第12周',
        '第13周',
        '第14周',
        '第15周',
        '第16周',
        '第17周',
        '第18周',
        '第19周',
        '第20周',
        '第21周',
        '第22周',
        '第23周',
        '第24周',
        '第25周',
        '第26周',
        '第27周',
        '第28周',
        '第29周',
        '第30周',
        '第31周',
        '第32周',
        '第33周',
        '第34周',
        '第35周',
        '第36周',
        '第37周',
        '第38周',
        '第39周',
        '第40周'
      ]
    }
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '2023',
      type: 'line',
      color: '#ebfaf4',
      showSymbol: false,
      areaStyle: {
        color: '#ebfaf4',
        opacity: 1
      },
      data: [
        98, 88, 80, 90, 98, 98, 90, 92, 78, 88, 84, 76, 80, 72, 74, 74, 88, 80, 72, 62, 62, 72, 72,
        78, 78, 72, 75, 78, 68, 68, 60, 68, 70, 75, 70, 80, 82, 78, 78, 84
      ],
      emphasis: {
        disabled: true
      }
    },
    {
      name: '2022',
      type: 'line',
      showSymbol: false,
      color: '#caede1',
      areaStyle: {
        color: '#caede1',
        opacity: 1
      },
      data: [
        35, 28, 32, 42, 44, 46, 42, 50, 48, 30, 35, 48, 42, 40, 54, 58, 56, 55, 59, 58, 57, 60, 66,
        54, 38, 40, 42, 44, 42, 43, 42, 38, 43, 41, 43, 50, 58, 58, 68, 72
      ],
      emphasis: {
        disabled: true
      }
    },
    {
      name: '2021',
      type: 'line',
      showSymbol: false,
      color: '#9be0ca',
      areaStyle: {
        color: '#9be0ca',
        opacity: 1
      },
      data: [
        42, 42, 30, 30, 18, 22, 16, 21, 22, 22, 22, 20, 24, 20, 18, 22, 30, 34, 32, 33, 33, 24, 32,
        34, 30, 34, 19, 34, 18, 10, 22, 24, 20, 22, 20, 21, 10, 10, 5, 9
      ],
      emphasis: {
        disabled: true
      }
    }
  ]
}

const lineRef = ref()

let myChart: echarts.ECharts
onMounted(() => {
  myChart = echarts.init(lineRef.value)
  myChart.setOption(option)
})

useResizeObserver(lineRef, () => {
  myChart.resize()
})
</script>

<template>
  <a-card :title="$t('dashboard.year')" class="dashboard-chart">
    <div class="line" ref="lineRef"></div>
  </a-card>
</template>

<style lang="scss" scoped>
.dashboard-chart {
  margin-top: 16px;
  .line {
    width: 100%;
    height: 300px;
  }
  :deep(.ant-card-body) {
    padding: 0;
  }
}
</style>
