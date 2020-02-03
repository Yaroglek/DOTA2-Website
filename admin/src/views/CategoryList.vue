<template>
  <div class="list">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="id" width="240"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
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
    }
  },
  created () {
    this.fetch()
  }
}
</script>
