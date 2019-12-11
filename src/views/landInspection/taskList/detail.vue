<!-- vue 模板 -->
<template>
  <div class="task-details-style">
    <commonForm
      :form="resourceObj"
      :list="list"
      page-type="detail"
    />
  </div>
</template>

<script>
import { getTaskDetails } from '@/api/task'
import commonForm from './components/commonForm'
export default {
  components: {
    commonForm
  },
  props: {

  },
  data() {
    return {
      resourceObj: {},
      list: []
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
    getData() {
      // 获取详情
      let params = {
        inspectId: this.$route.query.id || ''
      }
      getTaskDetails(params).then(res => {
        if (res && res.data) {
          let aa = {}
          aa = { ...res.data.landInspect || {} }
          aa.assigner = '123'
          this.resourceObj = aa
          this.list = [...res.data.landInspectPointList || []]
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
