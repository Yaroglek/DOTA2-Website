<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="list">
      <el-table-column prop="_id" label="id" width="240"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope"><img style="height: 4rem" :src="scope.row.icon"></template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
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
      const { data } = await this.$http.get('rest/items')
      this.list = data
    },
    async remove (row) {
      await this.$confirm(`删除物品 ${row.name}`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await this.$http.delete(`rest/items/${row._id}`)
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
