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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span
                class="e-text-link margin-right-4"
                @click="viewDetail(scope.row)"
              >详情</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </headContentLine>
    <template v-if="chooseList.length >0 && resourceList1.length > 0&& resourceList2.length > 0&& resourceList3.length > 0">
      <headContentLine title="统计报表-柱状图">
        <echartsContent
          :choose-list="chooseList"
          :status="status"
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
              title="任务数量(张)"
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
import { checkPersonReport } from '@/api/task'
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
        assignerId: '',
        startTime: '',
        endTime: ''
      },
      titleList: ['总里程数(公里)', '图片数量(张)', '任务数量(个)'],
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

      ],
      thList: [
        {
          title: '指派人',
          prop: 'userName'
        },
        {
          title: '任务数量',
          prop: 'inspectNum'
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
      this.loading = true
      this.resourceList1 = []
      this.resourceList2 = []
      this.resourceList3 = []
      this.chooseList = []
      checkPersonReport({ ...this.form }).then(res => {
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
        this.resourceList1.push({ value: item.mileage, legendname: item.userName, name: (key + 1) + '-' + item.userName })
        this.resourceList2.push({ value: item.picSize, legendname: item.userName, name: (key + 1) + '-' + item.userName })
        this.resourceList3.push({ value: item.inspectNum, legendname: item.userName, name: (key + 1) + '-' + item.userName })
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
      this.$router.push(
        {
          path: '/info_statistics/details',
          query: { id: row.userId }
        }
      )
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
.info-statistics-style {
  padding: 5px 20px;
}
.set-echarts-button {
  padding: 10px 0;
  text-align: right;
}
</style>
