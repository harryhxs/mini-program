<!-- 图片预览、图片旋转 -->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :center="center"
    :before-close="closeHandle"
    width="50%"
  >
    <template v-if="isString">
      <img
        :class="rotateClass"
        :style="{width:height}"
        :src="imgUrl"
      >
      <span
        class="rotate-style"
        @click="rotate"
      >
        <i
          class="el-icon-refresh-right"
          :class="{'animation-icon':showAnimation}"
        />
      </span>
    </template>

    <div v-else>
      <el-row :gutter="20">
        <template>
          <el-carousel
            ref="carousel"
            arrow="always"
            :autoplay="false"
            :initial-index="initialIndex"
          >
            <el-carousel-item
              v-for="item in imgUrl"
              :key="item"
              :name="item"
            >
              <el-image
                :style="{'height': height}"
                :src="item"
                style="width: 100%;"
                fit="contain"
              />
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: {

  },
  props: {
    title: {
      type: String,
      default: '图片预览'
    },
    center: {
      type: Boolean,
      default: false
    },
    imgUrl: {
      type: [Array, String],
      default: ''
    },
    col: {
      type: Number,
      default: 2
    },
    imgHeight: {
      type: String,
      default: '350px'
    },
    value: {
      type: Boolean,
      default: false
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      num: 0,
      rotateClass: '',
      showAnimation: false
    }
  },
  computed: {
    isString() {
      return typeof this.imgUrl === 'string'
    },
    colNum() {
      return 24 / this.col
    },
    height() {
      return parseFloat(this.imgHeight) + 'px'
    },
    dialogVisible: {
      get() {
        return this.value
      },
      set() {
        return this.value
      }
    }
  },
  watch: {
    initialIndex() {
      this.$refs.carousel.setActiveItem(this.initialIndex)
    }
  },
  mounted() {
  },
  methods: {
    closeHandle() {
      this.dialogVisible = false
      this.$emit('input', false)
      this.$emit('clear-title')
    },
    rotate() {
      // 旋转图片
      if (this.num < 3) {
        this.num += 1
      } else {
        this.num = 0
      }
      this.rotateClass = ('rotate-class' + this.num)
      this.showAnimation = true
      setTimeout(() => {
        this.showAnimation = false
      }, 500)
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.el-dialog .el-dialog__body {
  overflow: auto;
  text-align: center;
  padding: 100px 40px;
  margin-bottom: 40px;
}
.rotate-class1 {
  transform: rotate(90deg);
  -ms-transform: rotate(90deg); /* IE 9 */
  -moz-transform: rotate(90deg); /* Firefox */
  -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
  -o-transform: rotate(90deg); /* Opera */
}
.rotate-class2 {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
  -o-transform: rotate(180deg); /* Opera */
}
.rotate-class3 {
  transform: rotate(270deg);
  -ms-transform: rotate(270deg); /* IE 9 */
  -moz-transform: rotate(270deg); /* Firefox */
  -webkit-transform: rotate(270deg); /* Safari 和 Chrome */
  -o-transform: rotate(270deg); /* Opera */
}
.rotate-style {
  position: absolute;
  bottom: 10px;
  left: 50%;
  i {
    font-size: 22px;
  }
  .animation-icon {
    /*动画属性*/
    animation: animations 0.5s; // .5秒内完成动画
    animation-iteration-count: infinite; // 规定动画无限次执行
    animation-timing-function: linear; // 规定动画匀速执行
  }
}
/* 定义动画如何执行 */
@keyframes animations {
  /* 写法1 这种写法只能定义开始和结束时的动画 */
  form {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
