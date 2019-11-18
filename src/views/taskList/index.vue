<!-- 任务列表 -->
<template>
  <div class="page-content">
    <div class="search-box">
      <el-form
        :model="form"
        label-width="80px"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="被指派人">
              <el-input
                v-model="form.assigner"
                placeholder="请输入被指派人姓名"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务名">
              <el-input
                v-model="form.title"
                placeholder="请输入任务名"
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
                value-format="timestamp"
                placeholder="请选择任务截止时间"
              />
            </el-form-item>
          </el-col>
          <el-col
            :span="24"
            style="text-align: right; margin-bottom: 10px;"
          >
            <el-button
              type="primary"
              size="small"
              @click="getData"
            >查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="extra-btn">
      <el-button
        type="danger"
        size="small"
        @click="createNew"
      >新建</el-button>
    </div>
    <div class="table-container">
      <el-table :data="tableData">
        <el-table-column label="任务名称">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="被指派人">
          <template slot-scope="scope">
            <span>{{ scope.row.assinger }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系手机">
          <template slot-scope="scope">
            <span>{{ scope.row.moblie }}</span>
          </template>
        </el-table-column>
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
              v-if="scope.row.approvalStatus == 0"
              class="e-text-link margin-right-4"
              @click="viewDetail(scope.row)"
            >查看</span>
            <span
              v-if="scope.row.approvalStatus == 0"
              class="e-text-link margin-right-4"
              @click="deleteTask(scope.row)"
            >删除</span>
            <span
              v-if="scope.row.approvalStatus == 0"
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
export default {
  components: {

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
  methods: {
    getData() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        search: this.form
      }
      getTaskList(params).then(res => {

      })
    },
    createNew() {
      this.$router.push('/inspection_task/create')
    },
    handleSizeChange(value) {
      this.pageSize = value
    },
    handleCurrentChange(value) {
      this.pageNum = value
    },
    getStatusName(status) {
      if (status == '1') {
        return '巡查发布'
      } else if (status == '2') {
        return '巡查中'
      } else if (status == '3') {
        return '巡查暂停'
      } else {
        return '巡查结束'
      }
    },
    viewDetail(row) {

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
