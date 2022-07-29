<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <!-- :model 动态绑定 -->
      <!-- ref 拿到这个表单名的实例对象 -->
      <el-form
        ref="loginFormRef"
        :rules="loginFormRules"
        :model="loginForm"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-wodedamaijihuo"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-suoding"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="btn">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单的绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则对象
      loginFormRules: {
        // 验证用户是否合法
        username: [
          {
            // blur失去焦点 校验文本框是否为空,
            // change数据改变
            required: true,
            message: '请输入登录名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在3-10个字符',
            trigger: 'blur'
          }
        ],
        // 验证密码是否合法
        password: [
          {
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 15,
            message: '长度在5-15个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 重置按钮
    resetLoginForm() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 登录
    async btn() {
      // console.log(123)
      // await this.$refs.loginFormRef.validate()
      try {
        // 登录成功后获取的数据存在本地存储和vuex中
        this.$store.dispatch('user/login', this.loginForm)
        this.$message.success('登陆成功')
        this.$router.push('/layout')
      } catch (e) {
        console.log(111)
        this.$message.error(e?.response?.data?.message || '服务器端错误')
      }
    }
  }
}
</script>

<style scoped lang="less">
.login_container {
  width: 100%;
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    // 根据坐标定位
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  // 减去padding过后超出的边框
  box-sizing: border-box;
}
.btns {
  display: flex;
  //  放到最右边
  justify-content: flex-end;
}
</style>
