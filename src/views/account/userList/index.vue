<!-- 客户列表 -->
<template>
  <div class="page-content">
    <div class="search-box">
      <el-form
        :model="form"
        label-width="80px"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="手机号">
              <el-input
                v-model="form.mobile"
                placeholder="请输入手机号"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户名">
              <el-input
                v-model="form.name"
                placeholder="请输入用户名"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="0">
              <el-button
                type="primary"
                size="small"
              >查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="extra-btns">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="待审批"
          name="0"
        />
        <el-tab-pane
          label="审批通过"
          name="1"
        />
        <el-tab-pane
          label="审批驳回"
          name="2"
        />
      </el-tabs>
    </div>
    <div class="table-container">
      <el-table :data="tableData">
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | dateFormat('date') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.realName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系手机">
          <template slot-scope="scope">
            <span>{{ scope.row.moblie }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审批状态">
          <template slot-scope="scope">
            <span>{{ getStatusName(scope.row.approvalStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              v-if="scope.row.approvalStatus == 0"
              class="e-text-link margin-right-4"
              @click="approve(scope.row)"
            >审批通过</span>
            <span
              v-if="scope.row.approvalStatus == 0"
              class="e-text-link"
              @click="reject(scope.row)"
            >审批驳回</span>
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
import { getUserList } from '@/api/user'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      form: {
        mobile: '',
        name: '',
        approvalStatus: ''
      },
      pageSize: 10,
      pageNum: 1,
      total: 0,
      tableData: [],
      activeName: '0'
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        search: this.form
      }
      getUserList(params).then(res => {

      })
      this.tableData.push({
        createTime: '2019-11-16 14:45:00',
        name: '小兰兰',
        realName: '李小兰',
        moblie: '17783136888',
        approvalStatus: 0
      })
    },
    getStatusName(status) {
      if (status == 0) {
        return '待审批'
      } else if (status == 1) {
        return '审批通过'
      } else {
        return '审批驳回 '
      }
    },
    approve() {
      this.$confirm('确定是否审批通过', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '审批成功'
        })
      })
    },
    reject() {
      this.$prompt('请输入驳回原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '请输入驳回原因'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '驳回成功'
        })
      })
    },
    handleClick(v) {
      this.form.approvalStatus = v.name
    },
    handleSizeChange(value) {
      this.pageSize = value
    },
    handleCurrentChange(value) {
      this.pageNum = value
    }
  }
}
</script>

<style scoped lang="scss">
</style>
