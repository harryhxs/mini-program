<!-- 新建任务 -->
<template>
  <div class="page-content base-form-group">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item
            label="任务名称"
            prop="title"
          >
            <el-input
              v-model="form.title"
              size="small"
              placeholder="请输入任务名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item
            label="被指派人"
            prop="assinger"
          >
            <el-input
              v-model="form.assinger"
              size="small"
              placeholder="请输入任务名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item
            label="开始时间"
            prop="beginTime"
          >
            <el-date-picker
              v-model="form.beginTime"
              style="width: 100%;"
              type="date"
              size="small"
              value-format="timestamp"
              placeholder="请选择任务开始时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item
            label="截止时间"
            prop="expireTime"
          >
            <el-date-picker
              v-model="form.expireTime"
              style="width: 100%;"
              type="date"
              size="small"
              value-format="timestamp"
              placeholder="请选择任务截止时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item
            label="所在地区"
            prop="address"
            required
          >
            <el-cascader
              v-model="address"
              size="small"
              style="width: 100%;"
              clearable
              :props="options"
              @change="getAddress"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div
      id="container"
      class="margin-top-12"
      style="width: 100%; height: 400px;"
    />
  </div>
</template>

<script>
import AMap from 'AMap'
let id = 0
let validateAddress = (rule, value, callback) => {
  debugger
  if (!value || value.length == 0) {
    callback(new Error('请选择省市区'))
  } else {
    callback()
  }
}
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      form: {
        title: '',
        assinger: '',
        beginTime: '',
        expireTime: '',
        addressDTO: {

        },
        startPointName: '',
        endPointName: '',
        startPoint: '',
        endPoint: ''
      },
      address: [],
      rules: {
        title: [
          { required: true, message: '请输入任务名', trigger: 'blur' }
        ],
        assinger: [
          { required: true, message: '请输入被指派人', trigger: 'blur' }
        ],
        beginTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        expireTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ],
        address: [
          { validator: validateAddress, trigger: 'change' }
        ]
      },
      options: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 })
              .map(item => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2
              }))
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          }, 1000)
        }
      }
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let map = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10
      })
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
      })
    },
    getAddress() {
      console.log(this.address)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
