<template>
  <div>
    <div class="topbar background-color-dark-3 display-flex padding-2 justify-content-center align-items-center">
      <img src="./../../public/Dota_2.png">
    </div>
    <div class="nav background-color-light-3 display-flex justify-content-around align-items-center">
      <router-link tag="div" class="nav-item font-size-sm color-dark-4 bold flex-1 text-align-center" v-for="(item, index) in navList" :key="index" :to="item.to">
        <span class="nav-item-text" :class="selectedNavItemIndex === index ? 'active' : ''">{{item.label}}</span>
      </router-link>
    </div>
    <Swiper :imgs="['https://img.dota2.com.cn/dota2/f4/4d/f44d58532d01396d95520a9d9a28da371578419636.jpg', 'https://img.dota2.com.cn/dota2/2c/ce/2cce4174c3fcda5543240dbbc5c560c91565130040.png', 'https://img.dota2.com.cn/dota2/43/fd/43fdf01c4a67acfdb49418eab3bf8ff21580075453.jpg']"></Swiper>
    <router-view></router-view>
  </div>
</template>
<script>
import Swiper from '@/components/Swiper.vue'
export default {
  components: {
    Swiper
  },
  data () {
    return {
      navList: [{
        label: '首页',
        to: '/'
      }, {
        label: '攻略中心',
        to: '/'
      }, {
        label: '赛事中心',
        to: '/'
      }],
      selectedNavItemIndex: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.topbar {
  height: 0.96rem;
  img {
    height: 100%;
  }
}
.nav {
  width: 100%;
  height: 0.96rem;
}
.nav-item {
  border-right: 0.02rem solid #888;
  .nav-item-text {
    padding-bottom: 0.02rem;
    border-bottom: 0.06rem solid transparent;
    &.active {
      border-bottom-color: #444;
    }
  }
}
.nav-item:last-child {
  border-right: none;
}
</style>
