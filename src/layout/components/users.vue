<template>
  <!-- 面包屑导航区域 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="params.query"
            clearable
            @clear="getUsers"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsers"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showDialog = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="userlist" border>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <!-- 拿不到id -->
          <template v-slot="{ row }">
            <!-- 编辑 -->
            <el-button
              @click="edit(row.id)"
              size="small"
              type="primary"
              icon="el-icon-edit"
            >
            </el-button>
            <!-- 删除 -->
            <el-button
              @click="del(row.id)"
              size="small"
              type="danger"
              icon="el-icon-delete"
            >
            </el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                size="small"
                type="warning"
                icon="el-icon-setting"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pagenum"
        :page-sizes="[1, 2, 3, 10]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户框 -->
    <el-dialog title="添加用户" :visible.sync="showDialog" @close="close">
      <el-form
        :model="addFrom"
        :rules="addFromRules"
        ref="addFromRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addFrom.username"> </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addFrom.password"> </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFrom.email"> </el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addFrom.mobile"> </el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <template>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="addUser">确定</el-button>
        </template>
      </el-row>
    </el-dialog>
    <!-- 修改用户的框 -->
    <el-dialog title="提示" :visible.sync="editDialog" width="50%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, putUid, deleteId, postUsers, putUsers } from '@/api/login'
export default {
  data() {
    // 自定义校验规则
    const checkEmail = (rule, value, cb) => {
      // 验证邮箱
      const regEmail =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    // 验证手机号的规则
    const checkMobile = (rule, value, cb) => {
      // 验证邮箱
      const regEmail = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      editDialog: false,
      showDialog: false,
      userlist: [],
      total: 0,
      isShow: false,
      params: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5
      },
      // 添加用户的表单数据
      addFrom: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加表单的验证规则对象
      addFromRules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '用户名在3-10个字符之间'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '密码在6-15个字符之间'
          }
        ],
        email: [
          {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      },
      // 查询到的用户信息
      editFrom: {}
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    // 获取全部数据
    async getUsers() {
      const res = await getUsers(this.params)
      console.log(res)
      this.userlist = res.data.data.users
      this.total = res.data.data.total
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.params.pagesize = newSize
      this.getUsers()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.params.pagenum = newPage
      this.getUsers()
    },
    // 监听switch开关状态的改变
    async userStateChanged(userinfo) {
      // console.log(userinfo)
      const res = await putUid(userinfo.id, userinfo.mg_state)
      // console.log(res)
      if (res.data.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('更新用户状态成功')
    },
    // 删除
    async del(id) {
      const len = this.userlist.length
      if (len === 1 && this.params.pagenum > 1) {
        this.params.pagenum--
      }
      await this.$confirm('想好了再删')
      await deleteId(id)
      await this.$message.success('删除成功')
      await this.getUsers()
    },
    // 退出重置表单
    close() {
      this.showDialog = false
      this.$refs.addFromRef.resetFields()
    },
    // 点击按钮 添加新用户
    addUser() {
      this.$refs.addFromRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return
        const res = await postUsers(this.addFrom)
        console.log(res)
        this.$message.success('添加成功')
        this.getUsers()
        this.showDialog = false
      })
    },
    async edit(id) {
      const res = await putUsers(id)
      this.editFrom = res.data
      this.editDialog = true
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 20px;
}
</style>
