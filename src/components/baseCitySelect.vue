<!-- vue 模板 -->
<template>
  <el-form-item
    :required="required"
    :label="title"
    class="address-content"
    :label-width="labelWidth"
  >
    <el-form
      ref="rulesCommon"
      style="width: 100%;"
      require
      :rules="required ? rulesEnterprise : {}"
      :model="addressObj"
    >
      <!-- 省份，市，区 -->
      <el-row type="flex">
        <el-col :span="8">
          <el-form-item prop="provinceCode">
            <el-select
              v-model="addressObj.provinceCode"
              placeholder="省"
              class="address_select"
              :size="size"
              :disabled="disabled"
              clearable
              filterable
              style="width: 100%;"
              @change="changeSelect('province')"
            >
              <el-option
                v-for="item in province"
                :key="item.provinceCode"
                :label="item.provinceName"
                :value="item.provinceCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          style="margin: 0 15px;"
        >
          <el-form-item prop="cityCode">
            <el-select
              v-model="addressObj.cityCode"
              placeholder="市"
              class="address_select"
              :size="size"
              :disabled="disabled"
              clearable
              filterable
              style="width: 100%;"
              @change="changeSelect('city')"
            >
              <el-option
                v-for="item in city"
                :key="item.cityCode"
                :label="item.cityName"
                :value="item.cityCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="districtCode">
            <el-select
              v-model="addressObj.districtCode"
              placeholder="区"
              class="address_select"
              clearable
              filterable
              :size="size"
              :disabled="disabled"
              style="width: 100%;"
              @change="changeSelect('area')"
            >
              <el-option
                v-for="item in area"
                :key="item.districtCode"
                :label="item.districtName"
                :value="item.districtCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 详细地址 -->
      <template v-if="showAddress === 'right' || showAddress === 'bottom'">
        <el-form-item
          prop="address"
          :label="title1"
          :class="showAddress === 'right' ? 'address-input' : ''"
        >
          <el-input
            v-model="addressObj.address"
            placeholder="请填写详细地址"
            :disabled="disabled"
            :size="size"
            clearable
          />
        </el-form-item>
      </template>
    </el-form>
  </el-form-item>
</template>

<script>
import { getCitySelectList } from '@/api/citySelect'
Promise

export default {
  components: {
  },
  props: {
    address: {
      type: Object,
      default: () => {
        return {}
      }
    },
    required: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showAddress: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    size: {
      type: String,
      default: ''
    },
    ruleItem: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '默认值'
    },
    title1: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: () => {
        return {
          provinceCode: '',
          provinceName: '',
          cityCode: '',
          cityName: '',
          districtCode: '',
          districtName: '',
          address: ''
        }
      }
    }
  },
  data() {
    return {
      rulesEnterprise: {
        provinceCode: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        cityCode: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        districtCode: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        address: [
          { required: true, message: '详细地址不能为空', trigger: 'change' },
          { max: 50, message: '最大长度为50个字符', trigger: 'blur' }
        ]
      },
      addressObj: this.value || {},
      city: [],
      area: [],
      province: []
    }
  },
  computed: {
    // province() {
    //   return this.$store.state.dictionary.provinceList || []
    // }
  },
  watch: {
    value(val, oldval) {
      console.log('val', val)
      this.addressObj = val || {}
      if (this.addressObj.districtCode === '') {
        this.addressObj['areaId'] = ''
      }
      if (this.addressObj.cityCode === '') {
        this.addressObj['areaId'] = ''
        this.addressObj['cityId'] = ''
      }
      if (this.addressObj.cityCode && this.addressObj.districtCode) {
        this.checkSelectValue('province')
        this.checkSelectValue('city')
      }
      if (this.addressObj.provinceCode === '') {
        this.city = []
        this.area = []
        this.addressObj['areaId'] = ''
        this.addressObj['cityId'] = ''
        this.addressObj['provinceId'] = ''
      }
    }
  },
  mounted() {
    // 初始查询市级数据/区、县数据
    if (this.addressObj.cityCode) {
      this.checkSelectValue('province')
      if (this.addressObj.districtCode) {
        this.checkSelectValue('city')
      }
    }
  },
  created() {
    // 城市下拉框省级数据
    getCitySelectList({}).then(res => {
      if (res.data) {
        this.province = res.data
      }
    })
  },
  methods: {
    reutrnObj(v) {
      // 将code转换为int数据
      const { provinceCode, cityCode, districtCode } = v
      const obj = { provinceCode, cityCode, districtCode }
      obj.provinceCode = provinceCode || ''
      obj.cityCode = cityCode || ''
      obj.districtCode = districtCode || ''
      return { ...v, ...obj }
    },
    changeValue(obj, key1, key2) {
      obj.map((item) => {
        if (this.addressObj[key1] === item[key1]) {
          this.addressObj[key2] = item[key2]
        }
        return item
      })
    },
    changeSelect(type) {
      this.addressObj['id'] = ''
      if (type === 'province') {
        this.changeValue(this.province, 'provinceCode', 'provinceName')
        this.addressObj.cityCode = ''
        this.addressObj.districtCode = ''
        const result = this.province.find((item) => {
          return item.provinceCode === this.addressObj.provinceCode
        })
        if (result) {
          this.addressObj['id'] = result.id
          this.addressObj['provinceId'] = result.id
        }
      }
      if (type === 'city') {
        this.changeValue(this.city, 'cityCode', 'cityName')
        this.addressObj.districtCode = ''
        const result = this.city.find((item) => {
          return item.cityCode === this.addressObj.cityCode
        })
        if (result) {
          this.addressObj['id'] = result.id
          this.addressObj['cityId'] = result.id
        }
      }
      if (type === 'area') {
        const result = this.area.find((item) => {
          return item.districtCode === this.addressObj.districtCode
        })
        if (result) {
          this.addressObj.id = result.id
          this.addressObj['areaId'] = result.id
        }

        this.changeValue(this.area, 'districtCode', 'districtName')
      }
      // 查询城市下拉框联动
      if (type === 'province' && this.addressObj.provinceCode) {
        this.checkSelectValue('province')
      } else if (type === 'province' && !this.addressObj.provinceCode) {
        this.city = []
        this.area = []
      }
      if (type === 'city' && this.addressObj.provinceCode && this.addressObj.cityCode) {
        this.checkSelectValue('city')
      } else if (type === 'city' && !this.addressObj.cityCode) {
        this.area = []
      }
      this.$emit('change', this.address)
    },
    checkSelectValue(type) {
      let params = {}
      if (type === 'province') { // 查询市级下拉框数据
        params = {
          provinceCode: this.addressObj.provinceCode
        }
      }
      if (type === 'city') { // 查询区下拉框数据
        params = {
          provinceCode: this.addressObj.provinceCode,
          cityCode: this.addressObj.cityCode
        }
      }
      getCitySelectList(params).then(response => {
        if (response.data) {
          if (type === 'province') {
            this.city = response.data
          } else if (type === 'city') {
            this.area = response.data
          }
        }
      }).catch(() => {
      })
    },
    submitTest() {
      this.$refs.rulesCommon.validate((valid) => {
        if (valid) {
          this.$emit('submitType', ['subject', true])
        } else {
          this.$emit('submitType', ['subject', false])
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.address-content {
  position: relative;
  // margin-bottom: 0px !important;
}

.address-input {
  position: absolute;
  right: -240px;
  top: 0px;
  width: 224px;
}
</style>
