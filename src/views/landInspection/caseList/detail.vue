<!-- 案件详情 -->
<template>
  <div
    v-loading="loading"
    class=""
  >
    <headContentLine title="案件详情">
      <el-form
        ref="form"
        :model="form"
        label-width="140px"
      >
        <el-row>
          <template v-for="(item,key) in labelList">
            <el-col
              :key="key"
              :span="8"
            >
              <template v-if="item.type === 'text'">
                <!-- 文字 -->
                <el-form-item :label="item.title">
                  <el-input
                    v-model="form[item.prop]"
                    size="small"
                    disabled
                  />
                </el-form-item>
              </template>
              <template v-if="item.type === 'num'">
                <!-- 带单位数字 -->
                <el-form-item :label="item.title">
                  <el-input
                    v-model="form[item.prop]"
                    size="small"
                    disabled
                  >
                    <template slot="append">{{ item.unit }}</template>
                  </el-input>
                </el-form-item>
              </template>
              <template v-else-if="item.type === 'time'">
                <!-- 时间 -->
                <el-form-item :label="item.title">
                  <el-date-picker
                    v-model="form[item.prop]"
                    style="width: 100%;"
                    type="date"
                    disabled
                    size="small"
                    value-format="timestamp"
                  />
                </el-form-item>
              </template>
              <template v-else-if="item.type === 'choose'">
                <!-- 下拉框选择 -->
                <el-form-item :label="item.title">
                  <el-select
                    v-model="form[item.prop]"
                    style="width:100%"
                    placeholder="请选择"
                    size="small"
                    disabled
                    clearable
                    filterable
                  >
                    <el-option
                      label="是"
                      :value="1"
                    />
                    <el-option
                      label="否"
                      :value="0"
                    />
                  </el-select>
                </el-form-item>

              </template>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </headcontentline>
    <headContentLine title="巡检点图片">
      <el-row>
        <template v-for="(item,key) in list">
          <el-col
            :key="key"
            class="img-content"
            :span="6"
          >
            <el-image
              :src="item.fileUrl"
              @click="showViewImg(item)"
            />
          </el-col>
        </template>
      </el-row>

    </headContentLine>
    <img-view
      v-model="showView"
      :img-url="viewUrl"
      title="巡检点图片"
      center
    />
  </div>
</template>

<script>
import headContentLine from '@/components/commonLine'
import { getLandCaseDetails } from '@/api/task'
import ImgView from '@/components/ImgView'
export default {
  components: {
    headContentLine,
    ImgView
  },
  props: {

  },
  data() {
    return {
      loading: false,
      form: {},
      list: [],
      showView: false,
      viewUrl: '',
      labelList: [
        {
          title: '案件编号',
          prop: 'caseCode',
          type: 'text'
        },
        {
          title: '发现时间',
          prop: 'discoveryTime',
          type: 'data'
        },
        {
          title: '案件名称',
          prop: 'caseName',
          type: 'text'
        },
        {
          title: '违法当事人',
          prop: 'party',
          type: 'text'
        },
        {
          title: '占地位置',
          prop: 'occupy_Position',
          type: 'text'
        },
        {
          title: '占地总面积',
          prop: 'occupyTotalArea',
          type: 'num',
          unit: '平方米'
        },
        {
          title: '农用地面积',
          prop: 'farmlandArea',
          type: 'num',
          unit: '平方米'
        },
        {
          title: '园地面积',
          prop: 'gardenArea',
          type: 'num',
          unit: '平方米'
        },
        {
          title: '耕地面积',
          prop: 'croplandArea',
          type: 'num',
          unit: '平方米'
        },
        {
          title: '基本农田面积',
          prop: 'baseFarmlandArea',
          type: 'num',
          unit: '平方米'
        },
        {
          title: '林地面积',
          prop: 'woodlandArea',
          type: 'num',
          unit: '平方米'
        },
        {
          title: '草地面积',
          prop: 'grasslandArea',
          type: 'num',
          unit: '平方米'
        },
        {
          title: '建设用地面积',
          prop: 'buildingArea',
          type: 'num',
          unit: '平方米'
        },
        {
          title: '未利用地面积',
          prop: 'unusedArea',
          type: 'num',
          unit: '平方米'
        },
        {
          title: '是否符合规划',
          prop: 'enablePlan',
          type: 'choose'
        },
        {
          title: '符合规划面积',
          prop: 'planningArea',
          type: 'num',
          unit: '平方米'
        },
        {
          title: '立案时间',
          prop: 'filingTime',
          type: 'data'
        },
        {
          title: '下达处罚决定时间',
          prop: 'punishTime',
          type: 'data'
        },
        {
          title: '违反法律条款',
          prop: 'breachLaw',
          type: 'text'
        },
        {
          title: '下达罚款',
          prop: 'issueFine',
          type: 'num',
          unit: '万元'
        },
        {
          title: '收缴罚款',
          prop: 'collectFine',
          type: 'num',
          unit: '万元'
        },
        {
          title: '拆除面积',
          prop: 'collectFine',
          type: 'num',
          unit: '平方米'
        },
        {
          title: '没收面积',
          prop: 'forfeitureArea',
          type: 'num',
          unit: '平方米'
        },
        {
          title: '处分责任人',
          prop: 'personLiable',
          type: 'text'
        },
        {
          title: '责任人级别',
          prop: 'liableLevel',
          type: 'text'
        },
        {
          title: '是否申请法院强制执行',
          prop: 'enableAppliedEnforce',
          type: 'choose'
        },
        {
          title: '申请时间',
          prop: 'appliedTime',
          type: 'data'
        },
        {
          title: '是否移送司法机关',
          prop: 'enableTransferOffice',
          type: 'choose'
        },
        {
          title: '移送时间',
          prop: 'transferTime',
          type: 'data'
        },
        {
          title: '是否结案',
          prop: 'enableClosed',
          type: 'choose'
        }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.getData()
  },
  methods: {
    showViewImg(v) {
      this.viewUrl = v.fileUrl
      this.showView = true
    },
    getData(v) {
      this.loading = true
      getLandCaseDetails({ landCaseId: this.$route.query.id }).then(res => {
        this.loading = false
        if (res && res.data) {
          this.form = res.data.landCase || {}
          this.list = res.data.landCaseAttachList || []
        }
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 12px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
