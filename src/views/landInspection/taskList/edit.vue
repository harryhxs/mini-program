<!-- 编辑 -->
<template>
  <div class="task-details-style">
    <commonForm
      :form="resourceObj"
      :list="list"
      page-type="edit"
      @saveOrUpdate="save"
    />
  </div>
</template>

<script>
import { updateLandInspect } from '@/api/task'
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
  methods: {
    save(form) {
      updateLandInspect(form).then(res => {
        if (res && res.data) {
          this.$message.success('更新任务成功')
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
