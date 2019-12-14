<!-- 任务列表 -->
<template>
  <div
    v-loading="loading"
    class="page-content"
  >
    <div class="search-box">
      <TableSearch
        label-width="70px"
        @toOperate="getData"
      >
        <el-col :span="6">
          <el-form-item label="被指派人">
            <el-input
              v-model="form.assignerName"
              placeholder="请输入被指派人姓名"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="任务名">
            <el-input
              v-model="form.title"
              placeholder="请输入任务名"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="form.beginTime"
              style="width: 100%;"
              type="date"
              clearable
              size="small"
              value-format="timestamp"
              placeholder="请选择任务开始时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="截止时间">
            <el-date-picker
              v-model="form.expireTime"
              style="width: 100%;"
              type="date"
              size="small"
              clearable
              value-format="timestamp"
              placeholder="请选择任务截止时间"
            />
          </el-form-item>
        </el-col>
      </TableSearch>
    </div>
    <div class="extra-btn">
      <el-button
        type="danger"
        size="small"
        @click="createNew"
      >新建</el-button>
    </div>
    <div class="table-container etc-table-wraper">
      <el-table
        :data="tableData"
        border
      >
        <el-table-column label="巡检任务ID">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务名称">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="被指派人">
          <template slot-scope="scope">
            <span>{{ scope.row.assignerName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="联系手机">
          <template slot-scope="scope">
            <span>{{ scope.row.moblie }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | dateFormat('date') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务状态">
          <template slot-scope="scope">
            <span>{{ getStatusName(scope.row.inspectStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              class="e-text-link margin-right-4"
              @click="viewDetail(scope.row)"
            >查看</span>
            <span
              v-if="scope.row.approvalStatus == 0"
              class="e-text-link margin-right-4"
              @click="deleteTask(scope.row)"
            >删除</span>
            <span
              class="e-text-link"
              @click="editTask(scope.row)"
            >编辑</span>
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
import { getTaskList } from '@/api/task'
import TableSearch from '@/components/TableSearch/index'
export default {
  components: {
    TableSearch
  },
  props: {

  },
  data() {
    return {
      form: {
        assigner: '',
        title: '',
        beginTime: '',
        expireTime: ''
      },
      loading: false,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      tableData: []
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
          assigner: '',
          title: '',
          beginTime: '',
          expireTime: ''
        }
        return
      }
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.loading = true
      getTaskList({ ...params, ...this.form }).then(res => {
        this.loading = false
        if (res && res.data) {
          this.tableData = res.data.list || []
          this.pageSize = res.data.pageSize
          this.pageNum = res.data.pageNum
          this.total = res.data.total
        } else {
          this.pageSize = 0
          this.pageNum = 0
          this.total = 0
        }
      }).catch(() => {
        this.loading = false
        this.pageSize = 0
        this.pageNum = 0
        this.total = 0
      })
    },
    createNew() {
      this.$router.push('/inspection_task/add_task')
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
      this.$router.push({ path: '/inspection_task/task_details', query: { id: row.id } })
    },
    deleteTask(row) {

    },
    editTask(row) {
      this.$router.push({ path: '/inspection_task/task_edit', query: { id: row.id } })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
