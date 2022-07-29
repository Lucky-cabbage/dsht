<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/heima.b5a855ee.png" alt="" />
        <span>黑马电商后台管理</span>
      </div>
      <el-button type="info" @click="exit">退出</el-button>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <!-- 开启状态的话=true=64 否则200 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">| | |</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          router
          :collapse-transition="false"
          :collapse="isCollapse"
          unique-opened
          default-active="path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <!-- 11111111111111111级菜单 -->
          <el-submenu
            :index="item.path.toString()"
            v-for="item in menuslist"
            :key="item.id"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 222222222222222222级菜单 -->
            <el-menu-item
              :index="'/' + i.path"
              v-for="i in item.children"
              :key="i.id"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ i.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenus } from '@/api/login'
export default {
  data() {
    return {
      activeIndex: '',
      isCollapse: false,
      menuslist: [],
      iconsObj: {
        125: 'iconfont icon-duoren2',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-bg-lock',
        102: 'iconfont icon-biaodan',
        145: 'iconfont icon-baobiao'
      }
    }
  },
  created() {
    this.getMenus()
  },
  methods: {
    async getMenus() {
      const res = await getMenus()
      console.log(res)
      this.menuslist = res.data.data
    },
    // 退出
    exit() {
      this.$router.push('/login')
    },
    // 点击折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
    // saveNavState(activePath) {
    //   window.sessionStorage.setItem('activePath', activePath)
    // }
  }
}
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  div {
    display: flex;
    align-items: center;
    font-size: 20px;
    img {
      margin-left: 15px;
    }
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #373d41;
  .el-menu {
    // border-right: none;
    overflow: hidden;
  }
}
.el-main {
  background-color: #eee;
}
.toggle-button {
  background-color: hotpink;
  // 行高 类似跨度
  line-height: 36px;
  text-align: center;
  overflow: hidden;
  color: #fff;
  font-size: 18px;
  //  鼠标经过变成小手
  cursor: pointer;
  // letter-spacing: 0.2em;
}
</style>
