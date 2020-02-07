<template>
  <div class="swiper">
    <div class="swiper-box" :style="boxStyle" @touchstart="moveStart" @touchmove="move" @touchend="moveEnd">
      <img class="swiper-img vertical-align-middle" :src="imgs[imgs.length - 1]">
      <img class="swiper-img vertical-align-middle" v-for="(item, index) in imgs" :key="index" :src="item">
      <img class="swiper-img vertical-align-middle" :src="imgs[0]">
    </div>
    <div class="nav">
      <div class="nav-item margin-right-4" v-for="(item, index) in imgs" :key="index" :class="index === imgs.length - 1 - (currentIndex + imgs.length) % imgs.length ? 'background-color-primary' : 'background-color-light-4'"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['imgs'],
  data () {
    return {
      offsetWidth: document.body.offsetWidth,
      location: -document.body.offsetWidth,
      lastCurrectLocation: null,
      lastLocation: null,
      startLocation: null,
      lastMomentClientX: null,
      moveDirection: 0,
      boxStyle: {
        width: ((this.imgs.length + 2) * 100) + '%',
        transform: `translateX(${-document.body.offsetWidth}px)`
      },
      lastTimeStamp: null,
      maxFrame: 30,
      currentFrame: 0,
      rafId: null
    }
  },
  computed: {
    transform () {
      return `translateX(${this.location}px)`
    },
    currentIndex () {
      return Math.round(-1 - this.location / this.offsetWidth)
    },
    step () {
      return this.offsetWidth / this.maxFrame
    }
  },
  watch: {
    location () {
      this.boxStyle.transform = this.transform
    }
  },
  methods: {
    moveStart (event) {
      window.cancelAnimationFrame(this.rafId)
      const clientX = event.touches[0].clientX
      this.lastLocation = this.location
      this.lastCurrectLocation = Math.ceil(this.location / this.offsetWidth) * this.offsetWidth
      this.startLocation = clientX
      this.lastMomentClientX = clientX
    },
    move (event) {
      const clientX = event.touches[0].clientX
      this.location = this.lastLocation + clientX - this.startLocation
      this.moveDirection = clientX - this.lastMomentClientX
      this.lastMomentClientX = clientX
    },
    moveEnd (event) {
      if (this.moveDirection === null) {
        window.location.href = this.imgs[this.currentIndex].url
      } else {
        let target
        let difference
        const minSpeed = 3
        if (this.moveDirection > minSpeed) {
          target = this.lastCurrectLocation + this.offsetWidth
          difference = target - this.location
        } else if (this.moveDirection < -minSpeed) {
          target = this.lastCurrectLocation - this.offsetWidth
          difference = target - this.location
        } else {
          target = this.lastCurrectLocation
          difference = target - this.location
        }
        const maxCount = 10
        let count = 0
        const render = () => {
          if (count < maxCount) {
            count++
            this.location += difference / maxCount
            window.requestAnimationFrame(render)
          } else {
            this.location = target
            if (this.currentIndex < 0) {
              this.location = -this.offsetWidth * this.imgs.length
            } else if (this.currentIndex > this.imgs.length - 1) {
              this.location = -this.offsetWidth
            }
            this.lastLocation = null
            this.lastCurrectLocation = null
            this.startLocation = null
            this.lastMomentClientX = null
            this.moveDirection = null
            this.lastTimeStamp = window.performance.now()
            this.currentFrame = 0
            this.swipe()
          }
        }
        window.requestAnimationFrame(render)
      }
    },
    swipe () {
      const render = timeStamp => {
        if (this.lastTimeStamp) {
          if (timeStamp - this.lastTimeStamp > 4500) {
            if (this.currentFrame < this.maxFrame) {
              this.currentFrame++
              this.location -= this.step
            } else {
              this.location = Math.round(this.location / this.offsetWidth) * this.offsetWidth
              if (this.currentIndex < 0) {
                this.location = -this.offsetWidth * this.imgs.length
              } else if (this.currentIndex > this.imgs.length - 1) {
                this.location = -this.offsetWidth
              }
              this.lastTimeStamp = timeStamp
              this.currentFrame = 0
            }
          }
        } else {
          this.lastTimeStamp = timeStamp
        }
        this.rafId = window.requestAnimationFrame(render)
      }
      this.rafId = window.requestAnimationFrame(render)
    }
  },
  mounted () {
    this.swipe()
  }
}
</script>
<style scoped>
.swiper {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.swiper-img {
  width: 100vw;
  height: 4rem;
}
.nav {
  position: absolute;
  overflow: hidden;
  height: 0.16rem;
  bottom: 0.24rem;
  right: 0;
}
.nav-item {
  float: right;
  width: 0.16rem;
  height: 0.16rem;
  border-radius: 100%;
}
</style>
