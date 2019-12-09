<!-- vue 模板 -->
<template>
  <div class="table-container etc-table-wraper">
    <el-table
      :data="tableData"
      height="250"
      border
    >
      <el-table-column label="巡检标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="省">
        <template slot-scope="scope">
          <span>{{ scope.row.province }}</span>
        </template>
      </el-table-column>
      <el-table-column label="市">
        <template slot-scope="scope">
          <span>{{ scope.row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区">
        <template slot-scope="scope">
          <span>{{ scope.row.district }}</span>
        </template>
      </el-table-column>
      <el-table-column label="具体地址">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | dateFormat('date') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span @click="details(scope.row)">详情</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {
    details(row) {
      // 查看详情
      this.$router.push({ path: '/inspection_task/inspection_point_detail', query: { id: row.id } })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
