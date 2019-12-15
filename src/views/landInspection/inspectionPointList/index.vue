<!-- 巡检点列表 -->
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
          <el-form-item label="巡检任务ID">
            <el-input
              v-model="form.inspectId"
              placeholder="请输入巡检任务ID"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="巡检标题">
            <el-input
              v-model="form.title"
              placeholder="请输入巡检标题"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
      </TableSearch>
    </div>
    <div class="table-container etc-table-wraper">
      <el-table
        :data="tableData"
        border
      >
        <el-table-column
          label="序号"
          width="60"
        >
          <template slot-scope="scope">
            <span>{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="巡检ID">
          <template slot-scope="scope">
            <span>{{ scope.row.inspectId||'-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="巡检标题">
          <template slot-scope="scope">
            <span>{{ scope.row.title||'-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="巡检内容">
          <template slot-scope="scope">
            <span>{{ scope.row.memo||'-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="省">
          <template slot-scope="scope">
            <span>{{ scope.row.province||'-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="市">
          <template slot-scope="scope">
            <span>{{ scope.row.city||'-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="区">
          <template slot-scope="scope">
            <span>{{ scope.row.district||'-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | dateFormat('date') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime | dateFormat('date') }}</span>
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
import { listLandInspectPointByInspectId } from '@/api/task'
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
        inspectId: '',
        title: ''
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
    getData(v) {
      if (v === 'reset') {
        this.form = {
          inspectId: '',
          title: ''
        }
        return
      }
      this.loading = true
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      listLandInspectPointByInspectId({ ...params, ...this.form }).then(res => {
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
    createNew() {
      this.$router.push('/inspection_task/add_inspection_point')
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
      this.$router.push({ path: '/inspection_task/inspection_point_detail', query: { id: row.id } })
    },
    deleteTask(row) {

    },
    editTask(row) {

    }
  }
}
</script>

<style scoped lang="scss">
</style>
