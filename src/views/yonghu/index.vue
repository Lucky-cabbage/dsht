<template>
  <el-submenu index="1">
    <!-- 一级菜单的模板区域 -->
    <template slot="title">
      <!-- 图标 -->
      <i class="el-icon-location"></i>
      <!-- 文本 -->
      <span>用户管理</span>
    </template>
    <!-- 222222222222222222级菜单 -->
    <el-menu-item index="1-4-1">
      <template slot="title">
        <!-- 图标 -->
        <i class="el-icon-location"></i>
        <!-- 文本 -->
        <span>用户列表</span>
      </template>
    </el-menu-item>
  </el-submenu>
</template>

<script>
export default {}
</script>

<style></style>
