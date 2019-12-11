<!-- 公用新建/编辑/查询详情 -->
<template>
  <div
    v-loading="loadingDetails"
    class="page-content base-form-group"
  >
    <headContentLine title="巡检任务详情">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-row :gutter="20">
          <template v-if="pageType !== 'add'">
            <el-col :span="8">
              <el-form-item
                label="巡检任务ID"
                prop="title"
              >
                <el-input
                  v-model="form.id"
                  size="small"
                  disabled
                />
              </el-form-item>
            </el-col>
          </template>

          <el-col :span="8">
            <el-form-item
              label="巡检任务名称"
              prop="title"
            >
              <el-input
                v-model="form.title"
                size="small"
                :disabled="pageType === 'detail'"
                placeholder="请输入巡检任务名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="巡检任务类型"
              prop="inspectType"
            >
              <el-select
                v-model="form.inspectType"
                filterable
                size="small"
                clearable
                :disabled="pageType === 'detail'"
                placeholder="请选择巡检任务类型"
              >
                <el-option
                  v-for="item in inspectTypeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="被指派人"
              prop="assinger"
            >
              <el-select
                v-model="form.assignerName"
                filterable
                size="small"
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :disabled="pageType === 'detail'"
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
              label="巡检任务状态"
              prop="inspectType"
            >
              <el-select
                v-model="form.inspectStatus"
                filterable
                size="small"
                disabled
                clearable
                placeholder="请选择巡检任务状态"
              >
                <el-option
                  v-for="item in inspectStatusList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
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
                :disabled="pageType === 'detail'"
                size="small"
                value-format="timestamp"
                placeholder="请选择巡检任务开始时间"
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
                :disabled="pageType === 'detail'"
                size="small"
                value-format="timestamp"
                placeholder="请选择巡检任务截止时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item
              label="所在地区"
              required
            >
              <el-row
                :gutter="20"
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
              <template v-if="!editStart&&pageType!=='add'">
                <div :class="{'left-search':pageType==='edit'}">
                  <el-input
                    v-model="form.startPointName"
                    size="small"
                    :title="form.startPointName"
                    disabled
                  />
                  <div
                    v-if="pageType==='edit'"
                    class="right-icon"
                  >
                    <span
                      title="编辑"
                      @click="editStart = true"
                    ><i class="el-icon-edit" />
                    </span>
                  </div>
                </div>
              </template>
              <template v-if="editStart">
                <div :class="{'left-search':pageType==='edit'}">
                  <el-select
                    v-model="startPoint"
                    filterable
                    clearable
                    remote
                    size="small"
                    :disabled="pageType === 'detail'"
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
                  <div
                    v-if="pageType==='edit'"
                    class="right-icon"
                  >
                    <span
                      title="保存"
                      @click="saveStartObj"
                    >
                      <i class="el-icon-circle-check" />
                    </span>
                    <span
                      title="取消"
                      @click="editStart = false"
                    >
                      <i class="el-icon-delete" />
                    </span>
                  </div>
                </div>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="结束地址"
              prop="endPoint"
            >
              <template v-if="!editEnd&&pageType!=='add'">
                <div :class="{'left-search':pageType==='edit'}">
                  <el-input
                    v-model="form.endPointName"
                    size="small"
                    :title="form.endPointName"
                    disabled
                  />
                  <div
                    v-if="pageType==='edit'"
                    class="right-icon"
                  >
                    <span
                      title="编辑"
                      @click="editEnd = true"
                    ><i class="el-icon-edit" />
                    </span>
                  </div>
                </div>
              </template>
              <template v-if="editEnd">
                <div :class="{'left-search':pageType==='edit'}">
                  <el-select
                    v-model="endPoint"
                    filterable
                    clearable
                    remote
                    size="small"
                    reserve-keyword
                    :disabled="pageType === 'detail'"
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
                  <div
                    v-if="pageType==='edit'"
                    class="right-icon"
                  >
                    <span
                      title="保存"
                      @click="saveEndObj"
                    >
                      <i class="el-icon-circle-check" />
                    </span>
                    <span
                      title="取消"
                      @click="editEnd = false"
                    >
                      <i class="el-icon-delete" />
                    </span>
                  </div>
                </div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="24">
          <div
            id="container"
            class="margin-top-12"
            style="width: 100%; height: 450px;"
          />
        </el-col>
      </el-row>
    </headContentLine>
    <headContentLine
      v-if="pageType !=='add'"
      title="巡检任务点列表"
    >
      <inspectTable :table-data="list" />
    </headContentLine>
    <el-row v-if="pageType !== 'detial'">
      <el-col :span="24">
        <div class="text-center margin-top-40 margin-bottom-20">
          <el-button
            style="width: 200px;"
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
import { getCustomerInfo, getUserList } from '@/api/customer'
import { getTaskDetails } from '@/api/task'
import { setDrievingLine } from '@/utils/index'
import headContentLine from '@/components/commonLine'
import inspectTable from './inspectTable'
export default {
  components: {
    headContentLine,
    inspectTable
  },
  props: {
    // form: {
    //   type: Object,
    //   default: () => {
    //     return {}
    //   }
    // },
    pageType: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      form: {},
      list: [],
      loadingDetails: false,
      editStart: this.pageType === 'add',
      startPoint: '',
      startPointName: '',
      editEnd: this.pageType === 'add',
      endPoint: '',
      endPointName: '',
      detailMap: {},
      inspectTypeList: [
        {
          name: '任务巡检',
          value: 1
        },
        {
          name: '自由巡检',
          value: 2
        }
      ],
      inspectStatusList: [
        {
          name: '已创建',
          value: 1
        },
        {
          name: '巡检中',
          value: 2
        },
        {
          name: '巡检结束',
          value: 3
        },
        {
          name: '暂停巡检',
          value: 4
        }
      ],
      addressObj: {
        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: '',
        districtCode: '',
        districtName: '',
        address: ''
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
    getCustomerInfo().then(res => {
      this.init()
      if (res && res.data) {
        this.sendPointObj = res.data || {}
      }
    })
    if (this.pageType !== 'add') {
      this.getData()
    }
  },
  methods: {
    saveStartObj() {
      // 保存开始点
      this.form.startPointName = this.startPointName
      this.form.startPoint = this.startPoint
      this.editStart = false
      this.getPolyline()
    },
    saveEndObj() {
      // 保存终点
      this.form.endPointName = this.endPointName
      this.form.endPoint = this.endPoint
      this.editEnd = false
      this.getPolyline()
    },
    getData() {
      this.loadingDetails = true
      // 获取详情
      let params = {
        inspectId: this.$route.query.id || ''
      }
      getTaskDetails(params).then(res => {
        this.loadingDetails = false
        if (res && res.data) {
          this.form = { ...res.data.landInspect || {} }
          this.list = [...res.data.landInspectPointList || []]
          this.autoCompleteEnd(this.form.endPointName || '')
          this.autoCompleteStart(this.form.startPointName || '')
          this.remoteMethod(this.form.assignerName || '')
          this.getPolyline() // 默认初始规划路线
        }
      }).catch(() => {
        this.loadingDetails = false
      })
    },
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
      if (query) {
        AMap.plugin('AMap.Autocomplete', function() {
          // 实例化Autocomplete
          var autoOptions = {
            // city 限定城市，默认全国
            city: '重庆'
          }
          const autoComplete = new AMap.Autocomplete(autoOptions)
          autoComplete.search(query, function(status, result) {
            // 搜索成功时，result即是对应的匹配数据
            if (result.info == 'OK') {
              _this.startOptions = result.tips || []
            }
          })
        })
      }
    },
    autoCompleteEnd(query) {
      let _this = this
      if (query) {
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
      }
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
          city: '010'
        })
        var lnglat = location ? location.split(',') : []
        geocoder.getAddress(lnglat, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // result为对应的地理位置详细信息
            console.log(result)
            if (type == 'start') {
              _this.startPointName = result.regeocode.formattedAddress
            } else {
              _this.endPointName = result.regeocode.formattedAddress
            }
          }
        })
      })
    },
    changeStart(val) {
      this.getAddressBy(val, 'start')
    },
    changeEnd(val) {
      this.getAddressBy(val, 'end')
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
          if (this.pageType === 'add') {
            this.form.assignerName = this.form.assigner.split(',')[1]
            this.form.assignerId = this.form.assigner.split(',')[0]
          }
          this.$emit('saveOrUpdate', this.form)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.left-search {
  padding-right: 60px;
  position: relative;
}
.right-icon {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 60px;
  text-align: center;
  cursor: pointer;
  i {
    font-size: 16px;
  }
}
</style>
