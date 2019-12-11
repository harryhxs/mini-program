<!-- 信息统计 -->
<template>
  <div class="info-statistics-style">
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
  </div>
</template>

<script>
// import { checkStatisticsReport } from '@/api/task'
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
        statsType: 1,
        startTime: '',
        endTime: ''
      }
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {
    getData() {

    }
  }
}
</script>

<style scoped lang="scss">
.info-statistics-style {
  padding: 5px 20px;
}
</style>
