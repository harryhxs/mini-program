<!-- 案件列表页面 -->
<template>
  <div
    v-loading="loading"
    class="page-content"
  >
    <div class="search-box">
      <TableSearch
        label-width="80px"
        @toOperate="getData"
      >
        <el-col :span="6">
          <el-form-item label="案件创建人">
            <el-input
              v-model="form.reserveField1"
              placeholder="请输入案件创建人"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="案件名称">
            <el-input
              v-model="form.caseName"
              placeholder="请输入案件名称"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="违法当事人">
            <el-input
              v-model="form.party"
              placeholder="请输入违法当事人"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否结案">
            <el-select
              v-model="form.enableClosed"
              placeholder="请选择"
              size="small"
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
        </el-col>
      </TableSearch>
    </div>
    <div class="extra-btn">
      <el-button
        type="danger"
        size="small"
        :disabled="multipleSelection.length === 0"
        @click="exportFileSome"
      >批量导出</el-button>
      <el-button
        type="danger"
        size="small"
        @click="exportFileAll"
      >全部导出</el-button>
    </div>
    <div class="table-container etc-table-wraper">
      <el-table
        :data="tableData"
        border
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
        <el-table-column label="是否符合规划">
          <template slot-scope="scope">
            <span>{{ typeList[scope.row.enablePlan] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否结案">
          <template slot-scope="scope">
            <span>{{ isClose[scope.row.enableClosed] }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              class="e-text-link margin-right-4"
              @click="viewDetail(scope.row)"
            >查看</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="footer-pagination"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        size="small"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getLandCaseList, fileDownload } from '@/api/task'
import TableSearch from '@/components/TableSearch/index'
import format from 'date-fns/format'
export default {
  components: {
    TableSearch
  },
  props: {

  },
  data() {
    return {
      form: {
        reserveField1: '',
        caseName: '',
        party: '',
        enableClosed: ''
      },
      multipleSelection: [],
      loading: false,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      tableData: [],
      typeList: [
        '不符合',
        '符合'
      ],
      isClose: [
        '否',
        '是'
      ],
      thList: [
        {
          title: '案件编号',
          prop: 'caseCode'
        },
        {
          title: '案件创建人',
          prop: 'reserveField1'
        },
        {
          title: '案件名称',
          prop: 'caseName'
        },
        {
          title: '违法当事人',
          prop: 'party'
        },
        {
          title: '立案时间',
          prop: 'filingTime'
        }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
  },
  activated() {
    this.getData()
  },
  methods: {
    toOperateBottom() {
      // 搜索
    },
    getData(v) {
      if (v === 'reset') {
        this.form = {
          reserveField1: '',
          caseName: '',
          party: ''
        }
        return
      }
      // 查询列表
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.loading = true
      getLandCaseList({ ...params, ...this.form }).then(res => {
        this.loading = false
        if (res && res.data) {
          this.tableData = res.data.list || []
          this.pageSize = res.data.pageSize
          this.pageNum = res.data.pageNum
          this.total = res.data.total
        } else {
          this.pageSize = 10
          this.pageNum = 1
          this.total = 0
        }
      }).catch(() => {
        this.loading = false
        this.pageSize = 10
        this.pageNum = 1
        this.total = 0
      })
    },
    handleSizeChange(value) {
      this.pageSize = value
    },
    handleCurrentChange(value) {
      this.pageNum = value
    },
    getStatusName(status) {
      if (status == '1') {
        return '巡检发布'
      } else if (status == '2') {
        return '巡检中'
      } else if (status == '3') {
        return '巡检暂停'
      } else {
        return '巡检结束'
      }
    },
    viewDetail(row) {
      this.$router.push({ path: '/inspection_task/case_detail', query: { id: row.id } })
    },
    deleteTask(row) {

    },
    editTask(row) {

    },
    handleSelectionChange(val) {
      // 多选选中与反选
      this.multipleSelection = val
    },
    exportFileAll() {
      // 导出全部
      const obj = {
        assignerId: this.form.assignerId,
        caseName: this.form.caseName,
        enableClosed: this.form.caseName,
        party: this.form.party
      }
      this.exportCommon(obj)
    },
    exportFileSome() {
      // 导出选中部分
      let idList = []
      this.multipleSelection.forEach(item => {
        idList.push(item.id)
      })
      const obj = {
        caseIdList: idList || []
      }
      this.exportCommon(obj)
    },
    exportCommon(obj) {
      this.loading = true
      const fileName = '案件列表' + format(new Date(), 'yyyy-MM-dd HH时mm分ss秒') + '.csv'
      fileDownload(obj, fileName).then(res => {
        this.loading = false
      }).catch(() => {
        this.$message.error('导出失败')
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.extra-btn {
  margin-top: 10px;
  text-align: right;
}
</style>
