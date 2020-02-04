<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="list">
      <el-table-column prop="_id" label="id" width="240"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="外号"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope"><img style="height: 4rem" :src="scope.row.avatar"></template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
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
      const { data } = await this.$http.get('rest/heroes')
      this.list = data
    },
    async remove (row) {
      await this.$confirm(`删除英雄 ${row.name}`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await this.$http.delete(`rest/heroes/${row._id}`)
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
