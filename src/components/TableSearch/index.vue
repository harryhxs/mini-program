<!-- 搜索模块组件 -->
<template>
  <div class="search-form-group">
    <el-form
      :label-width="labelWidth"
      label-position="right"
      size="small"
    >
      <el-row
        :gutter="12"
        type="flex"
        class="flex-wrap"
        :class="isShow? 'flex-start': 'flex-start-space'"
      >
        <slot />
        <el-col
          v-if="!isShow"
          style="flex: 1; align-self: flex-end;"
        >
          <div class="flex-row-end padding-bottom-16 operate-btns">
            <el-button
              v-if="type === 'all' || type === 'reset'"
              type="info"
              size="small"
              @click="reset"
            >重置</el-button>
            <el-button
              v-if="type === 'all' || type === 'search'"
              type="primary"
              size="small"
              :disabled="disabled"
              @click="search"
            >搜索</el-button>
          </div>
        </el-col>
      </el-row>
      <transition name="fade">
        <el-row
          v-show="expanded"
          :gutter="12"
        >
          <slot name="more" />
        </el-row>
      </transition>
    </el-form>
    <div
      v-if="isShow"
      class="expand-box flex-row-space"
    >
      <span
        class="e-text-link font-12"
        @click="expand()"
      >
        <span>{{ expanded?'收起':'展开' }}</span>
        <!-- <i :class="expanded?'el-icon-arrow-up':'el-icon-arrow-down'" /> -->
      </span>
      <div class="flex-row-end padding-bottom-16 operate-btns">
        <el-button
          v-if="type === 'all' || type === 'reset'"
          type="info"
          size="small"
          @click="reset"
        >重置</el-button>
        <el-button
          v-if="type === 'all' || type === 'search'"
          type="primary"
          size="small"
          @click="search"
        >搜索</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableSearch',
  components: {
  },
  props: {
    labelWidth: {
      type: String,
      default: '100px'
    },
    type: {
      type: String,
      default: 'all'
    },
    ispackup: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    isShow() {
      return this.$slots.more
    }
  },
  mounted() {
  },
  methods: {
    expand() {
      this.expanded = !this.expanded
    },
    search() {
      this.toOperate('search')
    },
    reset() {
      this.toOperate('reset')
    },
    toOperate(type) {
      this.$emit('toOperate', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.padding-left-15 {
  padding-left: 30px;
}
</style>
