<!-- 时间范围选择组件 -->
<template>
  <el-row>
    <el-col :span="12">
      <el-form-item
        :label="title"
        :prop="ruleItem"
      >
        <el-date-picker
          v-model="startValue"
          type="date"
          :disabled="disabled"
          :placeholder="placeHolderStart"
          format="yyyy-MM-dd"
          :value-format="valueType"
          :picker-options="startPickerOptions"
          size="small"
          @change="changeDate"
        />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item
        :prop="ruleItem"
        label="——"
      >
        <!-- label-width="45px" -->
        <!-- <div :style="{'padding-right': padding }"> -->
        <div>
          <el-date-picker
            v-model="endValue"
            type="date"
            :disabled="disabled"
            :placeholder="placeHolderEnd"
            format="yyyy-MM-dd"
            :value-format="valueType"
            :picker-options="endPickerOptions"
            size="small"
            @change="changeDate"
          />
        </div>

      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
// import { setHours, setMinutes, setSeconds } from 'date-fns'
export default {
  components: {

  },
  props: {
    valueType: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    ruleItem: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '120px'
    },
    placeHolderStart: {
      type: String,
      default: '请选择开始时间'
    },
    placeHolderEnd: {
      type: String,
      default: '请选择结束时间'
    },
    value: {
      type: [Array, String],
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      startValue: this.value[0] || '',
      endValue: this.value[1] || '',
      startPickerOptions: {
        disabledDate: (time) => {
          const endDate = JSON.parse(JSON.stringify(this.endValue))
          if (!time || !endDate) {
            return false
          }
          return time.getTime() > new Date(endDate).getTime() - 8.46e7 + (24 * 60 * 60 * 1000)
        }
      },
      endPickerOptions: {
        disabledDate: (time) => {
          const startDate = JSON.parse(JSON.stringify(this.startValue))
          if (!time || !startDate) {
            return false
          }
          return time.getTime() < new Date(startDate).getTime() - 8.46e7
        }
      }
    }
  },
  computed: {
    padding() {
      return (parseFloat(this.width) - 45) + 'px'
    }
  },
  watch: {
    value(val) {
      this.startValue = this.value[0] || ''
      this.endValue = this.value[1] || ''
    }
  },
  mounted() {

  },
  methods: {
    changeDate() {
      let startValue = ''
      let endValue = ''
      if (this.startValue) {
        startValue = JSON.parse(JSON.stringify(this.startValue))
        // startValue = setHours(startValue, 0)
        // startValue = new Date(startValue).toLocaleDateString()
      }
      if (this.endValue) {
        endValue = JSON.parse(JSON.stringify(this.endValue))
        // endValue = setHours(endValue, 23)
        // endValue = setMinutes(endValue, 59)
        // endValue = setSeconds(endValue, 59)
        // endValue = new Date(endValue).toLocaleDateString()
      }
      const returnDate = [startValue, endValue]
      this.$emit('input', returnDate)
    }
  }
}
</script>

<style scoped lang="scss">
.el-row .el-col-12:nth-child(1) {
  padding-right: 6px;
}
.el-row .el-col-12:nth-child(2) {
  padding-left: 6px;
}
</style>
