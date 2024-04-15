<template>
  <div>
    <h1>{{ t('analytics.title') }}</h1>
    <h2>{{ t('analytics.subtitle') }}</h2>

    <div ref="chartdiv" id="chartdiv"></div>
  </div>
</template>

<script setup>
/* eslint-disable camelcase */
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const chartdiv = ref(null)
const store = useStore()
const { t } = useI18n()

onMounted(() => {
  renderChart()
})

function renderChart () {
  const root = am5.Root.new('chartdiv')

  const am5locales_ru_RU = JSON.stringify({
    January: 'Январь',
    July: 'Июль'
  })
  root.locale = am5locales_ru_RU

  const chartData = computed(() => store.state.analyticsData)
  const actualChartData = chartData.value.map((item) => ({ ...item }))

  const myTheme = am5.Theme.new(root)
  myTheme.rule('AxisLabel', ['minor']).setAll({
    dy: 1
  })
  myTheme.rule('Grid', ['minor']).setAll({
    strokeOpacity: 0.08
  })

  root.setThemes([am5themes_Animated.new(root), myTheme])

  const chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: 'panX',
    wheelY: 'zoomX',
    paddingLeft: 0
  }))

  const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {
    behavior: 'zoomX'
  }))
  cursor.lineY.set('visible', false)

  const prepareData = (d) => d.map(({ date, visits }) => {
    const dateObj = new Date(date)
    const timestamp = dateObj.getTime()
    return { date: timestamp, visits }
  })

  const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    maxDeviation: 0,
    baseInterval: {
      timeUnit: 'day',
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true,
      minGridDistance: 200,
      minorLabelsEnabled: true
    }),
    tooltip: am5.Tooltip.new(root, {})
  }))

  xAxis.set('minorDateFormats', {
    day: 'dd',
    month: 'MM'
  })

  const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  }))

  const series = chart.series.push(am5xy.LineSeries.new(root, {
    name: 'Series',
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: 'visits',
    valueXField: 'date',
    tooltip: am5.Tooltip.new(root, {
      labelText: `${t('analytics.visits')}: {valueY}`
    })
  }))

  series.bullets.push(function () {
    const bulletCircle = am5.Circle.new(root, {
      radius: 5,
      fill: series.get('fill')
    })
    return am5.Bullet.new(root, {
      sprite: bulletCircle
    })
  })

  chart.set('scrollbarX', am5.Scrollbar.new(root, {
    orientation: 'horizontal'
  }))

  series.data.setAll(prepareData(actualChartData))
}
</script>

<style>
#chartdiv {
  width: 100%;
  height: 500px;
}
</style>
