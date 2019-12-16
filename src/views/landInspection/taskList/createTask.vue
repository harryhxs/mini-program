<!-- 新建任务 -->
<template>
  <div class="page-content base-form-group">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-row :gutter="24">
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item
            label="被指派人"
            prop="assinger"
          >
            <el-select
              v-model="form.assigner"
              filterable
              size="small"
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.realName"
                :value="item.id + ',' + item.realName"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        <el-col :span="8">
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
        <el-col :span="16">
          <el-form-item
            label="所在地区"
            required
          >
            <el-row
              :gutter="24"
              type="flex"
            >
              <el-col :span="8">
                <el-input
                  v-model="sendPointObj.provinceName"
                  size="small"
                  disabled
                />
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="sendPointObj.cityName"
                  size="small"
                  disabled
                />
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="sendPointObj.districtName"
                  size="small"
                  disabled
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="开始地址"
            prop="startPoint"
          >
            <el-select
              v-model="form.startPoint"
              filterable
              remote
              size="small"
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="autoCompleteStart"
              :loading="loading"
              @change="changeStart"
            >
              <el-option
                v-for="(item, idx) in startOptions"
                :key="idx"
                :label="item.name"
                :value="item.location.lng + ',' + item.location.lat"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="结束地址"
            prop="endPoint"
          >
            <el-select
              v-model="form.endPoint"
              filterable
              remote
              size="small"
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="autoCompleteEnd"
              :loading="loading"
              @change="changeEnd"
            >
              <el-option
                v-for="(item, idx) in endOptions"
                :key="idx"
                :label="item.name"
                :value="item.location.lng + ',' + item.location.lat"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="24">
        <div
          id="container"
          class="margin-top-12"
          style="width: 100%; margin:0 auto;height: 350px;"
        />
      </el-col>
      <el-col :span="24">
        <div class="text-center margin-top-40">
          <el-button
            style="width: 240px;"
            type="danger"
            @click="submitData"
          >提交</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AMap from 'AMap'
import AMapUI from 'AMapUI'
import { getCustomerInfo, creatTask, getUserList } from '@/api/customer'
import { setDrievingLine } from '@/utils/index'
export default {
  components: {
  },
  props: {

  },
  data() {
    return {
      detailMap: {},
      form: {
        title: '',
        assingerName: '',
        beginTime: '',
        expireTime: '',
        startPointName: '',
        endPointName: '',
        startPoint: '',
        endPoint: '',
        assigner: '',
        inspectType: 1
      },
      userList: [],
      address: [],
      startOptions: [],
      endOptions: [],
      sendPointObj: {},
      loading: false,
      rules: {
        title: [
          { required: true, message: '请输入任务名', trigger: 'blur' }
        ],
        assigner: [
          { required: true, message: '请输入被指派人', trigger: 'blur' }
        ],
        beginTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        expireTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ],
        startPoint: [
          { required: true, message: '请选择任务开始点', trigger: 'blur' }
        ],
        endPoint: [
          { required: true, message: '请选择任务节点', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  activated() {
    this.form = {
      title: '',
      assingerName: '',
      beginTime: '',
      expireTime: '',
      startPointName: '',
      endPointName: '',
      startPoint: '',
      endPoint: '',
      assigner: '',
      inspectType: 1
    }
    getCustomerInfo().then(res => {
      this.init()
      if (res && res.data) {
        this.sendPointObj = res.data || {}
      }
    })
  },
  methods: {
    init() {
      let _this = this
      _this.detailMap = new AMap.Map('container', {
        center: _this.sendPointObj.districtCoordinate ? _this.sendPointObj.districtCoordinate.split(',') : '',
        resizeEnable: true,
        zoom: 14
      })
      _this.detailMap.on('complete', () => {
        AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {
          const layerCtrl = new BasicControl.LayerSwitcher({
            position: 'tr'
          })
          _this.detailMap.addControl(layerCtrl)
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView', 'AMap.MapType', 'AMap.Geolocation'], () => {
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          _this.detailMap.addControl(new AMap.ToolBar())

          // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          _this.detailMap.addControl(new AMap.Scale())

          // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
          _this.detailMap.addControl(new AMap.OverView({ isOpen: true }))

          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          // this.detailMap.addControl(new AMap.MapType())

          // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
          // this.detailMap.addControl(new AMap.Geolocation())
        })
      })
    },
    getAddress() {
      console.log(this.address)
    },
    autoCompleteStart(query) {
      let _this = this
      AMap.plugin('AMap.Autocomplete', function() {
        // 实例化Autocomplete
        var autoOptions = {
          // city 限定城市，默认全国
          city: '重庆'
        }
        var autoComplete = new AMap.Autocomplete(autoOptions)
        autoComplete.search(query, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log('result')
          console.log(result)
          if (result.info == 'OK') {
            _this.startOptions = result.tips || []
          }
        })
      })
    },
    autoCompleteEnd(query) {
      let _this = this
      AMap.plugin('AMap.Autocomplete', function() {
        // 实例化Autocomplete
        var autoOptions = {
          // city 限定城市，默认全国
          city: _this.sendPointObj.provinceName + _this.sendPointObj.cityName + _this.sendPointObj.districtName
        }
        var autoComplete = new AMap.Autocomplete(autoOptions)
        autoComplete.search(query, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if (result.info == 'OK') {
            _this.endOptions = result.tips || []
          }
        })
      })
    },
    getPolyline() {
      // 规划起点终点路线
      if (!this.form.startPoint || !this.form.endPoint) {
        return
      }
      let _this = this
      let start = _this.form.startPoint.split(',')
      let end = _this.form.endPoint.split(',')
      let startLngLat = [Number(start[0]), Number(start[1])] // 起点
      let endLngLat = [Number(end[0]), Number(end[1])] // 终点
      this.detailMap.clearMap()
      // 规划行车路线
      setDrievingLine(startLngLat, endLngLat, AMap, _this)
    },
    getAddressBy(location, type) {
      let _this = this
      AMap.plugin('AMap.Geocoder', function() {
        var geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: '08'
        })
        var lnglat = location ? location.split(',') : []
        console.log(lnglat)

        geocoder.getAddress(lnglat, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // result为对应的地理位置详细信息
            console.log(result)
            if (type == 'start') {
              _this.form.startPointName = result.regeocode.formattedAddress
            } else {
              _this.form.endPointName = result.regeocode.formattedAddress
            }
            if (_this.form.startPointName && _this.form.endPointName) {
              _this.getPolyline()
            }
          }
        })
      })
    },
    changeStart(val) {
      this.getAddressBy(val, 'start')
      // this.getPolyline()
    },
    changeEnd(val) {
      this.getAddressBy(val, 'end')
      // this.getPolyline()
    },
    onChange(val) {
      console.log('---val---')
      console.log(this.sendPointObj)
    },
    remoteMethod(query) {
      if (query) {
        this.loading = true
        let params = {
          pageSize: 999,
          pageNum: 1,
          search: {
            realName: query
          }
        }
        getUserList(params).then(res => {
          this.loading = false
          if (res && res.data) {
            this.userList = res.data.list || []
          }
        }).catch(() => {
          this.loading = false
        })
      }
    },
    submitData() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.assignerName = this.form.assigner.split(',')[1]
          this.form.assignerId = this.form.assigner.split(',')[0]
          creatTask(this.form).then(res => {
            if (res && res.data) {
              this.$message.success('创建任务成功')
              this.$router.go(-1)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
