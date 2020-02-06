<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}英雄 {{id}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card">
        <el-tab-pane label="基本">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="avatar-uploader" action="" :http-request="upload" :show-file-list="false" :on-success="data => model.avatar = data.url">
              <img class="avatar" v-if="model.avatar" :src="model.avatar">
              <i class="el-icon-plus avatar-uploader-icon" v-else></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="外号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <difficulty :base="model.difficulty" :fetched="fetched" @difficultyChange="value => model.difficulty = value"></difficulty>
          </el-form-item>
          <el-form-item label="英雄介绍">
            <el-input type="textarea" v-model="model.brief"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能">
          <el-button type="text" @click="model.skills.push({ name: '', icon: '', description: '', tips: '' })"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col class="edit-el-col" :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="技能名">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="使用技巧">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item label="技能图标">
                <el-upload class="avatar-uploader" action="" :http-request="upload" :show-file-list="false" :on-success="data => item.icon = data.url">
                  <img class="avatar" v-if="item.icon" :src="item.icon">
                  <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                </el-upload>
              </el-form-item>
              <el-button class="delete-button" type="danger" @click="model.skills.splice(index, 1)">删除</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="定位">
          <el-form-item v-for="key of Object.keys(model.scores)" :key="key" :label="scoreShowList[key]">
            <score :base="model.scores[key]" :fetched="fetched" @scoreChange="value => model.scores[key] = value"></score>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="其他">
          <el-form-item label="推荐出装">
            <el-select v-model="model.items" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import difficulty from './../components/difficulty.vue'
import score from './../components/score.vue'
export default {
  components: { difficulty, score },
  props: [
    'id'
  ],
  data () {
    return {
      model: {
        name: '',
        avatar: '',
        title: '',
        categories: [],
        difficulty: 0,
        scores: {
          carry: 0,
          support: 0,
          nuker: 0,
          disabler: 0,
          jungler: 0,
          durable: 0,
          escape: 0,
          pusher: 0,
          initiator: 0
        },
        skills: [],
        items: [],
        brief: ''
      },
      categories: [],
      items: [],
      scoreShowList: {
        carry: '核心',
        support: '辅助',
        nuker: '爆发',
        disabler: '控制',
        jungler: '打野',
        durable: '耐久',
        escape: '逃生',
        pusher: '推进',
        initiator: '先手'
      },
      fetched: false
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
      const { data } = await this.$http.get(`rest/heroes/${this.id}`)
      this.model = data
    },
    async fetchCategories () {
      const { data } = await this.$http.get(`rest/categories`)
      this.categories = data
    },
    async fetchItems () {
      const { data } = await this.$http.get('rest/items')
      this.items = data
    },
    async save () {
      const { data } = this.id
        ? await this.$http.put(`rest/heroes/${this.id}`, this.model)
        : await this.$http.post('rest/heroes', this.model)
      this.$router.push('/heroes/list')
      this.$message({
        type: 'success',
        message: `保存成功 ${data.name}`
      })
    }
  },
  async created () {
    this.id && await this.fetch()
    this.fetched = true
    this.fetchCategories()
    this.fetchItems()
  }
}
</script>
<style>
</style>
