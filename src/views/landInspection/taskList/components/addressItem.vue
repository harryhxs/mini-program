<!-- 地址选择组件 -->
<template>
  <el-form-item
    label="开始地址"
    prop="inputPoint"
  >
    <template v-if="!editStart">
      <div class="left-search">
        <el-input
          v-model="form.startPointName"
          size="small"
          :title="form.startPointName"
          disabled
        />
        <div class="right-icon">
          <span
            title="编辑"
            @click="editStart = true"
          ><i class="el-icon-edit" />
          </span>
        </div>
      </div>
    </template>
    <template v-if="editStart">
      <div class="left-search">
        <el-select
          v-model="inputPoint"
          filterable
          remote
          size="small"
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="(type==='start'? autoCompleteStart :autoCompleteEnd)"
          :loading="loading"
          @change="(type==='start'? changeStart :changeEnd)"
        >
          <el-option
            v-for="(item, idx) in (type==='start'? startOptions :endOptions)"
            :key="idx"
            :label="item.name"
            :value="item.location.lng + ',' + item.location.lat"
          />
        </el-select>
        <div class="right-icon">
          <span
            title="保存"
            @click="saveStartObj"
          >
            <i class="el-icon-circle-check" />
          </span>
          <span
            title="取消"
            @click="editStart = false"
          >
            <i class="el-icon-delete" />
          </span>
        </div>
      </div>
    </template>
  </el-form-item>
</template>

<script>
export default {
  components: {

  },
  props: {
    type: {
      type: String,
      default: 'start'
    },
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    inputPoint: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editStart: false
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {
    saveStartObj() {
      this.$emit('saveAddress', this.type, this.inputPoint)
    },
    autoCompleteStart(query) {
      this.$emit('autoCompleteStart', query)
    },
    autoCompleteEnd(query) {
      this.$emit('autoCompleteEnd', query)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
