<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu flex-row-end">
      <div class="color-primary">
        <i class="el-icon-edit font-18" />
        <a @click="dialogFormVisible = true">修改密码</a>
      </div>
      <div class="margin-left-20">
        <i class="el-icon-user-solid font-18" />
        <span class="margin-left-4">{{ userInfo.realName }}</span>
      </div>
      <span
        class="color-primary"
        @click="logout"
      >【退出】</span>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="500px"
    >
      <!-- <input
        type="password"
        style="position: abosolute; z-index: -1;"
      > -->
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="旧密码"
          prop="oldPassword"
        >
          <el-input
            v-model="editForm.oldPassword"
            type="password"
            placeholder="请输入授权人数"
            size="small"
          />
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPassword"
        >
          <el-input
            v-model="editForm.newPassword"
            type="password"
            placeholder="请输入授权人数"
            size="small"
          />
        </el-form-item>
        <el-form-item
          label="重复密码"
          prop="checkPassword"
        >
          <el-input
            v-model="editForm.checkPassword"
            type="password"
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
          @click="changePassword"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data: function() {
    return {
      dialogFormVisible: false,
      editForm: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userInfo'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    changePassword() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          if (this.editForm.newPassword !== this.editForm.checkPassword) {
            this.$alert('输入密码不一致', '提示')
            return
          }
          let params = { ...this.editForm }
          updatePassword(params).then(res => {
            if (res && res.data) {
              this.$message.success('修改密码成功')
              this.dialogFormVisible = false
            }
          })
        }
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  font-size: 14px;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 20px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:focus {
      outline: none;
    }
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
