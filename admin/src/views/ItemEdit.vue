<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}物品 {{id}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload class="avatar-uploader" action="" :http-request="upload" :show-file-list="false" :on-success="data => model.icon = data.url">
          <img class="avatar" v-if="model.icon" :src="model.icon">
          <i class="el-icon-plus avatar-uploader-icon" v-else></i>
        </el-upload>
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
        name: '',
        icon: ''
      }
    }
  },
  methods: {
    async upload (option) {
      const formData = new FormData()
      if (option.data) {
        Object.keys(option.data).forEach(function (key) {
          formData.append(key, option.data[key])
        })
      }
      formData.append(option.filename, option.file, option.file.name)
      const headers = option.headers || {}
      const { data } = await this.$http.post('upload', formData, headers)
      return data
    },
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
<style>
</style>
