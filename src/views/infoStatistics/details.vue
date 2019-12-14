<!-- 信息统计 -->
<template>
  <div
    v-loading="loading"
    class="info-statistics-style"
  >
    <div class="search-box">
      <TableSearch
        label-width="70px"
        @toOperate="getData"
      >
        <el-col :span="6">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="form.startTime"
              style="width: 100%;"
              type="date"
              clearable
              size="small"
              value-format="timestamp"
              placeholder="请选择开始时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="截止时间">
            <el-date-picker
              v-model="form.endTime"
              style="width: 100%;"
              type="date"
              size="small"
              clearable
              value-format="timestamp"
              placeholder="请选择截止时间"
            />
          </el-form-item>
        </el-col>
      </TableSearch>
    </div>
    <headContentLine title="统计列表">
      <div class="table-container etc-table-wraper">
        <div class="set-echarts-button">
          <el-button
            type="danger"
            size="small"
            :disabled="multipleSelection.length === 0"
            @click="createEcharts"
          >生成报表</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          max-height="350px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <template v-for="(item,key) in thList">
            <el-table-column
              :key="key"
              :prop="item.prop"
              :label="item.title"
            >
              <template slot-scope="scope">
                <span>{{ scope.row[item.prop]||'-' }}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </headContentLine>
    <template v-if="chooseList.length >0 && resourceList1.length > 0&& resourceList2.length > 0&& resourceList3.length > 0">
      <headContentLine title="统计报表-柱状图">
        <echartsContent
          :choose-list="chooseList"
          :status="status"
          type="detail"
          :title-list="titleList"
        />
      </headContentLine>
      <headContentLine title="统计报表-饼图">
        <el-row>
          <el-col :span="12">
            <circleEcharts
              id="circle-echart3"
              title="总里程数(公里)"
              type="公里"
              :status="status"
              :resource-list="resourceList1"
            />
          </el-col>
          <el-col :span="12">
            <circleEcharts
              id="circle-echart1"
              title="图片数量(张)"
              type="张"
              :status="status"
              :resource-list="resourceList2"
            />
          </el-col>
          <el-col :span="12">
            <circleEcharts
              id="circle-echart2"
              title="巡检点数量(个)"
              type="张"
              :status="status"
              :resource-list="resourceList3"
            />
          </el-col>
        </el-row>
      </headContentLine>
    </template>
  </div>
</template>
<script>
import { checkStatisticsReport } from '@/api/task'
import TableSearch from '@/components/TableSearch/index'
import headContentLine from '@/components/commonLine'
import echartsContent from './components/echarts'
import circleEcharts from './components/circleEcharts'
export default {
  components: {
    headContentLine,
    TableSearch,
    echartsContent,
    circleEcharts
  },
  props: {

  },
  data() {
    return {
      form: {
        statsType: 1,
        startTime: '',
        endTime: ''
      },
      titleList: ['总里程数(公里)', '图片数量(张)', '巡检点数量(个)'],
      chooseList: [], // 柱状图
      resourceList1: [], // 生成报表的数据
      resourceList2: [], // 生成报表的数据
      resourceList3: [], // 生成报表的数据
      status: false,
      loading: false,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      multipleSelection: [],
      tableData: [
        {
          inspectName: '巡查任务A',
          pointNum: '12',
          mileage: '32',
          picSize: '122'
        },
        {
          inspectName: '巡查任务B',
          pointNum: '12',
          mileage: '32',
          picSize: '122'
        },
        {
          inspectName: '巡查任务C',
          pointNum: '2',
          mileage: '12',
          picSize: '12'
        },
        {
          inspectName: '巡查任务D',
          pointNum: '43',
          mileage: '667',
          picSize: '122'
        }
      ],
      thList: [
        {
          title: '任务名称',
          prop: 'inspectName'
        },
        {
          title: '巡检点数量',
          prop: 'pointNum'
        },
        {
          title: '里程数(公里)',
          prop: 'mileage'
        },
        {
          title: '总图片数',
          prop: 'picSize'
        }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
  },
  activated() {
    this.getData()
  },
  methods: {
    getData(v) {
      if (v === 'reset') {
        this.form = {
          assignerId: '',
          startTime: '',
          endTime: ''
        }
        return
      }
      this.form.assignerId = this.$route.query.id
      this.loading = true
      this.resourceList1 = []
      this.resourceList2 = []
      this.resourceList3 = []
      this.chooseList = []
      checkStatisticsReport({ ...this.form }).then(res => {
        this.loading = false
        if (res && res.data) {
          this.tableData = res.data || []
        }
      }).catch(() => {
        this.loading = false
      })
    },
    createEcharts() {
      this.resourceList1 = []
      this.resourceList2 = []
      this.resourceList3 = []
      this.chooseList = []
      this.multipleSelection.forEach((item, key) => {
        // 设置数据
        this.resourceList1.push({ value: item.mileage, legendname: item.inspectName, name: (key + 1) + '-' + item.inspectName })
        this.resourceList2.push({ value: item.picSize, legendname: item.inspectName, name: (key + 1) + '-' + item.inspectName })
        this.resourceList3.push({ value: item.pointNum, legendname: item.inspectName, name: (key + 1) + '-' + item.inspectName })
      })
      this.chooseList = this.multipleSelection
      // 选中数据，点击生成报表
      setTimeout(() => {
        this.status = true
        setTimeout(() => {
          this.status = false
        }, 100)
      }, 100)
    },
    handleSizeChange(value) {
      this.pageSize = value
    },
    handleCurrentChange(value) {
      this.pageNum = value
    },
    handleSelectionChange(val) {
      // 多选选中与反选
      this.multipleSelection = val
    },
    viewDetail(row) {
      this.$router.push('/info_statistics/details')
    }
  }
}
</script>

<style scoped lang="scss">
.info-statistics-style {
  padding: 5px 20px;
}
.set-echarts-button {
  padding: 10px 0;
  text-align: right;
}
</style>
