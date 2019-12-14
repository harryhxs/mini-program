<!-- vue 模板 -->
<template>
  <div class="echarts-style">
    <div
      id="myChart"
      :style="{width: '100%', height: '500px'}"
    />
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  components: {

  },
  props: {
    chooseList: {
      type: Array,
      default: () => {
        return []
      }
    },
    titleList: {
      type: Array,
      default: () => {
        return []
      }
    },
    status: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: {
        backgroundColor: '#323a5e',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '14%',
          top: '16%',
          containLabel: true
        },
        legend: {
          data: [],
          right: 10,
          top: 12,
          textStyle: {
            color: '#fff'
          },
          itemWidth: 12,
          itemHeight: 10
          // itemGap: 35
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: 'white'

            }
          },
          axisLabel: {
            // interval: 0,
            // rotate: 40,
            textStyle: {
              fontFamily: 'Microsoft YaHei'
            }
          }
        },

        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: 'white'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.3)'
            }
          },
          axisLabel: {}
        },
        'dataZoom': [{
          'show': true,
          'height': 12,
          'xAxisIndex': [
            0
          ],
          bottom: '8%',
          'start': 0,
          'end': 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '100%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff'
          },
          borderColor: '#90979c'
        }, {
          'type': 'inside',
          'show': true,
          'height': 15,
          'start': 1,
          'end': 35
        }],
        series: [{
          name: '',
          type: 'bar',
          barWidth: '10%',
          barMaxWidth: 20,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#fccb05'
              }, {
                offset: 1,
                color: '#f5804d'
              }]),
              barBorderRadius: 0
            }
          },
          data: []
        },
        {
          name: '',
          type: 'bar',
          barWidth: '10%',
          barMaxWidth: 20,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#8bd46e'
              }, {
                offset: 1,
                color: '#09bcb7'
              }]),
              barBorderRadius: 0
            }

          },
          data: []
        },
        {
          name: '',
          type: 'bar',
          barWidth: '10%',
          barMaxWidth: 20,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#248ff7'
              }, {
                offset: 1,
                color: '#6851f1'
              }]),
              barBorderRadius: 0
            }
          },
          data: []
        }
        ]
      }
    }
  },
  computed: {
    xList() {
      const list = []
      this.chooseList.forEach(item => {
        // 设置数据
        list.push(this.type === 'detail' ? item.inspectName : item.userName)
      })
      return list
    },
    list1() {
      const list = []
      this.chooseList.forEach(item => {
        // 设置数据
        list.push(item.mileage)
      })
      return list
    },
    list2() {
      const list = []
      this.chooseList.forEach(item => {
        // 设置数据
        list.push(item.picSize)
      })
      return list
    },
    list3() {
      const list = []
      this.chooseList.forEach(item => {
        // 设置数据
        list.push(this.type === 'detail' ? item.pointNum : item.inspectNum)
      })
      return list
    }
  },
  watch: {

    status(v) {
      if (v) {
        this.setData()
      }
    }
  },
  mounted() {
    this.setData()
  },
  methods: {
    setData() {
      const chart = echarts.init(document.getElementById('myChart'), null)
      this.options.xAxis.data = this.xList
      this.options.legend.data = this.titleList
      this.options.series[0].data = this.list1
      this.options.series[1].data = this.list2
      this.options.series[2].data = this.list3
      this.options.series[0].name = this.titleList[0]
      this.options.series[1].name = this.titleList[1]
      this.options.series[2].name = this.titleList[2]
      chart.setOption(this.options)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
