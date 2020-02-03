<template>
  <div class="list">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="id" width="240"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: []
    }
  },
  methods: {
    async fetch () {
      const { data } = await this.$http.get('categories')
      this.items = data
    },
    async remove (row) {
      await this.$confirm(`删除分类 ${row.name}`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await this.$http.delete(`categories/${row._id}`)
      this.$message({
        type: 'success',
        message: `删除成功 ${row.name}`
      })
      this.fetch()
    }
  },
  created () {
    this.fetch()
  }
}
</script>
