<!-- 模块分割线组件，代注册用 -->
<template>
  <div class="content">
    <div
      class="content-header"
      :class="{'right-line':showLine,'margon-bottom-20':!showLine}"
    >
      <span class="content_title">{{ title }}</span>
    </div>
    <div
      v-if="description"
      class="content_decoration"
    >{{ description }}</div>
    <div class="margin-top-20">
      <slot />
    </div>

  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    showLine: {
      type: Boolean,
      default: true
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

  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.content {
  padding-top: 20px;
  margin: 5px 29px;
  min-height: 100px;
  background: $main-white;

  .right-line {
    border-bottom: 1px dashed $main-grey;
  }
  .content-header {
    position: relative;
    margin-bottom: 8px;
    padding-top: 10px;
    .content_icon {
      color: $main-red;
    }
    .content_title {
      position: absolute;
      left: 0;
      top: 0px;
      font-size: 16px;
      color: $main-black-light;
      border-left: 4px solid $main-red;
      font-weight: 600;
      padding: 1px 7px;
      background: $main-white;
      // font-size: 16px;
      // color: #000;
      // border-left: 4px solid $main-red;
      // padding: 0px 7px;
      // padding-left: 10px;
      // padding-right: 20px;
      // background: #fff;
    }
  }
  .margon-bottom-20 {
    margin-bottom: 30px;
  }
  .content_decoration {
    font-size: 12px;
    color: $main-red;
    text-align: left;
    padding-top: 5px;
  }
  .content-container {
    padding: 30px 0px;
    background: $main-white;
    overflow: hidden;
  }
}
</style>
