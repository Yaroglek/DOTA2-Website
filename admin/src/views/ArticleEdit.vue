<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}文章 {{id}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  props: [
    'id'
  ],
  data () {
    return {
      model: {
        title: '',
        body: '',
        categories: []
      },
      categories: []
    }
  },
  methods: {
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      const { data } = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', data.url)
      resetUploader()
    },
    async fetch () {
      const { data } = await this.$http.get(`rest/articles/${this.id}`)
      this.model = data
    },
    async fetchCategories () {
      const { data } = await this.$http.get(`rest/categories`)
      this.categories = data
    },
    async save () {
      const { data } = this.id
        ? await this.$http.put(`rest/articles/${this.id}`, this.model)
        : await this.$http.post('rest/articles', this.model)
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: `保存成功 ${data.title}`
      })
    }
  },
  created () {
    this.id && this.fetch()
    this.fetchCategories()
  }
}
</script>
<style>
</style>
