<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="list">
      <el-table-column prop="_id" label="id" width="240"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="icon" label="分类">
        <template slot-scope="scope">
          <span v-for="item in scope.row.categories" :key=item._id style="margin-right: 1rem">{{item.name}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
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
      list: []
    }
  },
  methods: {
    async fetch () {
      const { data } = await this.$http.get('rest/articles')
      this.list = data
    },
    async remove (row) {
      await this.$confirm(`删除文章 ${row.title}`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await this.$http.delete(`rest/articles/${row._id}`)
      this.$message({
        type: 'success',
        message: `删除成功 ${row.title}`
      })
      this.fetch()
    }
  },
  created () {
    this.fetch()
  }
}
</script>
