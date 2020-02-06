<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}广告位 {{id}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="model.items.push({ image: '', url: '' })"><i class="el-icon-plus"></i>添加广告</el-button>
      </el-form-item>
      <el-row type="flex" style="flex-wrap: wrap">
        <el-col class="edit-el-col" :md="24" v-for="(item, index) in model.items" :key="index">
          <el-form-item label="链接">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="广告图">
            <el-upload class="avatar-uploader" action="" :http-request="upload" :show-file-list="false" :on-success="data => item.image = data.url">
              <img class="avatar" v-if="item.image" :src="item.image">
              <i class="el-icon-plus avatar-uploader-icon" v-else></i>
            </el-upload>
          </el-form-item>
          <el-button class="delete-button" type="danger" @click="model.items.splice(index, 1)">删除</el-button>
        </el-col>
      </el-row>
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
        items: []
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
      const { data } = await this.$http.get(`rest/ads/${this.id}`)
      this.model = data
    },
    async save () {
      const { data } = this.id
        ? await this.$http.put(`rest/ads/${this.id}`, this.model)
        : await this.$http.post('rest/ads', this.model)
      this.$router.push('/ads/list')
      this.$message({
        type: 'success',
        message: `保存成功 ${data.title}`
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
