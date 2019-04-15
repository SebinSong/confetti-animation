<template lang="pug">
  svg(v-bind="svgDefaultAttrs" ref="svgElement")
    defs
      g(ref="particles" id="particles")
        confetti-logo
        confetti-triangle
        confetti-circle
        confetti-rectangle
      linear-gradient-groupincome
    rect(ref="bgrect" x="0" y="0" width="100%" height="100%" fill="none", stroke="rgba(0,0,0,0)")
    clipPath(id="cp")
        welcome-text(ref="clipPathText" fill="url(#lg-gi)" stroke="rgba(0,0,0,0)")
    // text element below is added for fixing firefox bug related to SVGElement.getBBox()
    welcome-text(ref="clipPathTextMeasure" stroke="rgba(0,0,0,0)" fill="none")
    g.svgCanvas(ref="svgCanvas")
</template>

<script>
import { animateSvg, destroyAnimation } from './confetti-three.js'
import confettiParticles from '../confetti-shared/ConfettiParticles.js'
import linearGradientGroupincome from '../confetti-shared/LinearGradientGITheme'
import WelcomeText from './WelcomeText.vue'

export default {
  name: 'ConfettiThree',
  components: {
    ...confettiParticles,
    WelcomeText,
    linearGradientGroupincome
  },
  props: {
    svgDefaultAttrs: { type: Object }
  },
  mounted () {
    // Run the svg animation
    animateSvg(Object.assign({}, this.$refs, {
      // those two components below have to be passed as DOM Objects
      // instead of vue component objects
      clipPathText: this.$refs.clipPathText.$el,
      clipPathTextMeasure: this.$refs.clipPathTextMeasure.$el
    }))
  },
  beforeDestroy () {
    destroyAnimation()
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/scss/confettitwo.scss';
</style>
