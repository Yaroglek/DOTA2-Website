<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}英雄 {{id}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="外号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推荐出装">
        <el-select v-model="model.items" multiple>
          <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难度">
        <difficulty :base="model.difficulty" :fetched="fetched" @difficultyChange="value => model.difficulty = value"></difficulty>
      </el-form-item>
      <el-form-item v-for="key of Object.keys(model.scores)" :key="key" :label="scoreShowList[key]">
        <score :base="model.scores[key]" :fetched="fetched" @scoreChange="value => model.scores[key] = value"></score>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload class="avatar-uploader" :action="`${$http.defaults.baseURL}/upload`" :show-file-list="false" :on-success="afterUpload">
          <img class="avatar" v-if="model.avatar" :src="model.avatar">
          <i class="el-icon-plus avatar-uploader-icon" v-else></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="英雄介绍">
        <el-input type="textarea" v-model="model.brief"></el-input>
      </el-form-item>
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
    },
    afterUpload (res) {
      this.model.avatar = res.url
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
