<template>
  <el-slider v-model="selected" :min="0" :max="3" :marks="marks" :show-tooltip="false"></el-slider>
</template>
<script>
export default {
  props: ['base', 'fetched'],
  data () {
    return {
      selected: this.base,
      marks: {
        0: {
          label: '无'
        },
        1: {
          label: '弱'
        },
        2: {
          label: '中'
        },
        3: {
          label: '强'
        }
      }
    }
  },
  watch: {
    selected (value) {
      this.$emit(`scoreChange`, value)
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
