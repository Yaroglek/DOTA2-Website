<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}物品 {{id}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="model.icon"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: [
    'id'
  ],
  data () {
    return {
      model: {
        name: ''
      }
    }
  },
  methods: {
    async fetch () {
      const { data } = await this.$http.get(`rest/items/${this.id}`)
      this.model = data
    },
    async save () {
      const { data } = this.id
        ? await this.$http.put(`rest/items/${this.id}`, this.model)
        : await this.$http.post('rest/items', this.model)
      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: `保存成功 ${data.name}`
      })
    }
  },
  created () {
    this.id && this.fetch()
  }
}
</script>
