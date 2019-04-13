<template lang="pug">
  .container
    svg(v-bind="svgDefaultAttrs")
      defs 
        filter(id="turb1")
          feTurbulence(v-bind="feTurbulenceAttrs" result="TURB")
          feDisplacementMap(in="SourceGraphic" in2="TURB" scale="20" xChannelSelector="R" yChannelSelector="R")
      image(xlink:href="@/assets/img/pic1.jpg" x="300" y="300" width="300" height="300" filter="url(#turb1)")
</template>

<script>
import { randomBetween } from '@/assets/js/utils.js';

export default {
  name: 'svgFilterExperiment',
  data() {
    return {
      svgDefaultAttrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        "version": '1.1'
      },
      feTurbulenceAttrs: {
        type: 'fractalNoise',
        baseFrequency: '0.02 0.02',
        numOctaves: '1',
        seed: 10
      },
      turbAni: {
        curr: 0.01, min: 0.01, max: 0.2, vel: 0.0025, sign: 1
      },
      requestId: null,
      animationQueue: []
    };
  },
  methods: {
    randomizeTurbulence() {
      const s = this.turbAni;
      this.feTurbulenceAttrs.baseFrequency = `${s.curr} ${s.curr}`;

      s.curr += s.vel * s.sign;
      if(s.curr >= s.max) {
        s.curr = s.max;
        s.sign = -1;
      } 
      else if(s.curr <= s.min) {
        s.curr = s.min;
        s.sign = 1;
      }
    },
    animateThings() {
      this.animationQueue.forEach(callback => callback());
      this.requestId = window.requestAnimationFrame(this.animateThings);
    },
    addToAnimationQueue(...callbacks) {
      this.animationQueue.push(...callbacks);
    }
  },
  mounted() {
    this.addToAnimationQueue(this.randomizeTurbulence);
    this.requestId = window.requestAnimationFrame(this.animateThings)
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/scss/experimentboard.scss';
</style>
