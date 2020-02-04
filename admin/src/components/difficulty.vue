<template>
  <el-slider v-model="selected" :min="0" :max="2" :marks="marks" :show-tooltip="false"></el-slider>
</template>
<script>
export default {
  props: ['base', 'fetched'],
  data () {
    return {
      selected: this.base,
      marks: {
        0: {
          label: '简单'
        },
        1: {
          label: '中等'
        },
        2: {
          label: '困难'
        }
      }
    }
  },
  watch: {
    selected (value) {
      this.$emit('difficultyChange', value)
    },
    fetched (value) {
      if (value) {
        this.$set(this.marks[this.base], 'style', { color: '#1989FA' })
        this.selected = this.base
      }
    }
  }
}
</script>
<style>
</style>
