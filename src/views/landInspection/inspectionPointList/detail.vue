<!-- 巡检点详情 -->
<template>
  <div
    v-loading="loading"
    class=""
  >
    <headContentLine title="巡检点详情">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
      >
        <el-row>
          <template v-for="(item,key) in labelList">
            <el-col
              :key="key"
              :span="6"
            >
              <el-form-item :label="item.title">
                <el-input
                  v-model="form[item.prop]"
                  size="small"
                  disabled
                />
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </headcontentline>
    <headContentLine title="巡检点图片">
      <el-row>
        <template v-for="(item,key) in list">
          <el-col
            :key="key"
            class="img-content"
            :span="6"
          >
            <el-image
              :src="item.src"
              @click="showViewImg(item)"
            />
          </el-col>
        </template>
      </el-row>

    </headContentLine>
    <img-view
      v-model="showView"
      :img-url="viewUrl"
      title="巡检点图片"
      center
    />
  </div>
</template>

<script>
import headContentLine from '@/components/commonLine'
import { getPointDomainObjectDetailByPointId } from '@/api/task'
import ImgView from '@/components/ImgView'
export default {
  components: {
    headContentLine,
    ImgView
  },
  props: {

  },
  data() {
    return {
      loading: false,
      form: {},
      list: [],
      showView: false,
      viewUrl: '',
      labelList: [
        {
          title: '巡检任务ID',
          prop: 'inspectId'
        },
        {
          title: '巡查标题',
          prop: 'title'
        },
        {
          title: '省',
          prop: 'province'
        },
        {
          title: '市',
          prop: 'city'
        },
        {
          title: '区',
          prop: 'district'
        },
        {
          title: '具体地址',
          prop: 'address'
        },
        {
          title: '经度',
          prop: 'longitude'
        },
        {
          title: '纬度',
          prop: 'latitude'
        },
        {
          title: '创建时间',
          prop: 'createTime'
        },
        {
          title: '更新时间',
          prop: 'updateTime'
        }
      ]
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
    showViewImg(v) {
      this.viewUrl = v.fileUrl
      this.showView = true
    },
    getData(v) {
      this.loading = true
      getPointDomainObjectDetailByPointId({ pointId: this.$route.query.id }).then(res => {
        this.loading = false
        if (res && res.data) {
          this.form = res.data.landInspectPoint || {}
          this.list = res.data.attachList || []
        }
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 12px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
