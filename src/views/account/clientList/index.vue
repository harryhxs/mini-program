<!-- 客户列表 -->
<template>
  <div class="page-content">
    <div class="search-box">
      <el-form
        :model="form"
        label-width="80px"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="手机号">
              <el-input
                v-model="form.mobile"
                placeholder="请输入手机号"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人">
              <el-input
                v-model="form.contactName"
                placeholder="请输入用户名"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="0">
              <el-button
                type="primary"
                size="small"
                @click="getData"
              >查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="extra-btn">
      <el-button
        type="danger"
        size="small"
        @click="clientShow = true"
      >新建</el-button>
    </div>
    <div class="table-container">
      <el-table :data="tableData">
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | dateFormat('date') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="到期时间">
          <template slot-scope="scope">
            <span>{{ scope.row.endTime | dateFormat('date') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所在区域">
          <template slot-scope="scope">
            <span>{{ scope.row.provinceName+scope.row.cityName+scope.row.districtName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="授权人数">
          <template slot-scope="scope">
            <span>{{ scope.row.userNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系手机">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人">
          <template slot-scope="scope">
            <span>{{ scope.row.contactName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              class="e-text-link"
              @click="editTime(scope.row)"
            >修改</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="修改授权信息"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="600px"
    >
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="到期时间"
          prop="endTime"
        >
          <el-date-picker
            v-model="editForm.endTime"
            style="width: 100%;"
            type="date"
            size="small"
            value-format="timestamp"
            placeholder="请选择结束时间"
          />
        </el-form-item>
        <el-form-item
          label="授权人数"
          prop="userNumber"
        >
          <el-input
            v-model="editForm.userNumber"
            placeholder="请输入授权人数"
            size="small"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateInfo"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新建客户 -->
    <div v-if="clientShow">
      <el-dialog
        title="新建客户"
        :visible.sync="clientShow"
        :close-on-click-modal="false"
        width="800px"
      >
        <el-form
          ref="newForm"
          :model="newForm"
          :rules="newFormRules"
          label-width="100px"
        >
          <el-row>
            <el-col :span="24">
              <CitySelect
                v-model="addressObj"
                title="所在区域"
                label-width="100px"
              />
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="客户名称"
                prop="name"
              >
                <el-input
                  v-model="newForm.name"
                  placeholder="请输入授权人数"
                  size="small"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="联系电话"
                prop="mobile"
              >
                <el-input
                  v-model="newForm.mobile"
                  placeholder="请输入联系电话"
                  size="small"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="联系人"
                prop="contactName"
              >
                <el-input
                  v-model="newForm.contactName"
                  placeholder="请输入联系人"
                  size="small"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="到期时间"
                prop="endTime"
              >
                <el-date-picker
                  v-model="newForm.endTime"
                  style="width: 100%;"
                  type="date"
                  size="small"
                  value-format="timestamp"
                  placeholder="请选择结束时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="授权人数"
                prop="userNumber"
              >
                <el-input
                  v-model="newForm.userNumber"
                  placeholder="请输入授权人数"
                  size="small"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="备注"
                prop="remark"
              >
                <el-input
                  v-model="newForm.remark"
                  placeholder="请输备注"
                  size="small"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click=" clientShow = false">取 消</el-button>
          <el-button
            type="primary"
            @click="createClient"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { createClient, getClientList, updateEndTime } from '@/api/client'
import CitySelect from '@/components/CitySelect'
export default {
  components: {
    CitySelect
  },
  props: {

  },
  data() {
    return {
      form: {
        mobile: '',
        contactName: ''
      },
      editForm: {
        endTime: '',
        userNumber: '',
        id: ''
      },
      addressObj: {
        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: '',
        districtCode: '',
        districtName: '',
        address: ''
      },
      rules: {
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ],
        userNumber: [
          { required: true, message: '请输入授权人数', trigger: 'blur' }
        ]
      },
      newForm: {
        name: '',
        moblie: '',
        contactName: '',
        endTime: '',
        userNumber: '',
        remark: ''
      },
      newFormRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ],
        userNumber: [
          { required: true, message: '请输入授权人数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '请输入数字', trigger: 'blur' }
        ]
      },
      tableData: [],
      dialogFormVisible: false,
      clientShow: false
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let params = { ...this.form }
      getClientList(params).then(res => {
        if (res && res.data) {
          this.tableData = res.data.list || []
        }
      })
    },
    editTime(row) {
      this.editForm.endTime = row.endTime
      this.editForm.userNumber = row.userNumber
      this.editForm.id = row.id
      this.dialogFormVisible = true
    },
    updateInfo() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          let params = { ... this.editForm }
          updateEndTime(params).then(res => {
            if (res && res.data) {
              this.getData()
              this.$message.success('修改用户成功', '提示')
              this.dialogFormVisible = false
            }
          })
        }
      })
    },
    createClient() {
      this.$refs.newForm.validate(valid => {
        if (valid) {
          this.clientShow = false
          let params = { ...this.newForm, ...this.addressObj }
          createClient(params).then(res => {
            if (res && res.data) {
              this.$message.success('创建用户成功', '提示')
              this.getData()
              this.clientShow = false
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
