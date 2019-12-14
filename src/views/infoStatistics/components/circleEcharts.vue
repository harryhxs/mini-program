<!-- vue 模板 -->
<template>
  <div
    :id="id"
    :style="{width: '100%', height: '300px'}"
  />
</template>

<script>
import echarts from 'echarts';
export default {
  components: {

  },
  props: {
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    resourceList: {
      type: Array,
      default: () => {
        return []
      }
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: {
        title: [
          {
            text: '',
            subtext: '',
            textStyle: {
              fontSize: 16,
              color: 'black'
            },
            subtextStyle: {
              fontSize: 14,
              color: 'black'
            },
            textAlign: 'center',
            x: '34.5%',
            y: '44%'
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: function(parms) {
            var str = parms.seriesName + '</br>' +
              parms.marker + '' + parms.data.name + '</br>' +
              '数量：' + parms.data.value + '</br>' +
              '占比：' + parms.percent + '%';
            return str;
          }
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: '70%',
          align: 'left',
          top: 'middle',
          textStyle: {
            color: '#8C8C8C'
          },
          height: 250
        },
        series: [
          {
            name: '',
            type: 'pie',
            center: ['35%', '50%'],
            radius: ['40%', '65%'],
            clockwise: false, // 饼图的扇区是否是顺时针排布
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'outter',
                formatter: function(parms) {
                  return parms.data.legendname
                }
              }
            },
            labelLine: {
              normal: {
                length: 5,
                length2: 3,
                smooth: true
              }
            },
            data: []
          }
        ]
      }
    }
  },
  computed: {
    totalValue() {
      // 返回总数
      const list = JSON.parse(JSON.stringify(this.resourceList))
      let num = 0
      list.forEach(item => {
        num += Number(item.value)
      })
      return num
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
  },
  methods: {
    setData() {
      // 设置数据
      const chart = echarts.init(document.getElementById(this.id), null)
      this.options.series[0].data = this.resourceList
      this.options.series[0].name = this.title
      this.options.title[0].text = this.title
      this.options.title[0].subtext = this.totalValue + this.type
      chart.setOption(this.options)
    },
    returnColor() {
      // 动态生成随机颜色
      let colorStr = ''
      let randomArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
      for (let i = 0; i < 6; i++) {
        colorStr += randomArr[Math.ceil(Math.random() * (15 - 0) + 0)];
      }
      return '#' + colorStr
    }
  }
}
</script>

<style scoped lang="scss">
</style>
