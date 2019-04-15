<template lang="pug">
  svg(v-bind="svgDefaultAttrs" ref="svgElement")
    defs
      g(ref="particles" id="particles")
        confetti-logo
        confetti-triangle
        confetti-circle
        confetti-rectangle
    rect(ref="bgrect" x="0" y="0" width="100%" height="100%" fill="none", stroke="rgba(0,0,0,0)")
    g.svgCanvas(ref="svgCanvas")
</template>

<script>
import { animateSvg, destroyAnimation } from './confetti-two.js'
import confettiParticles from '../confetti-shared/ConfettiParticles.js'

export default {
  name: 'ConfettiTwo',
  components: { ...confettiParticles },
  props: {
    svgDefaultAttrs: { type: Object }
  },
  mounted () {
    // Run the svg animation
    animateSvg(this.$refs)
  },
  beforeDestroy () {
    destroyAnimation()
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/scss/confettitwo.scss';
</style>
