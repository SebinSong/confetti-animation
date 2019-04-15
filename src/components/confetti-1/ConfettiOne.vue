<template lang="pug">
  div#confetti-one
    svg(v-bind="svgDefaultAttrs" id="confetti-one" ref="svg")
      defs
        linear-gradient-red
        linear-gradient-grey
        confetti-particle
        red-cone
        grey-cone
      rect(id="bgrect" x="0" y="0" width="100%" height="100%" fill="none" stroke="rgba(0,0,0,0)")
      //
        g#newcoordinate :  Actual svg canvas where things are drawn.
        The coordinate system will be flipped by script for convinience
      g#newcoordinate
</template>
<style scoped lang='scss'>
  @import '../../assets/scss/confettione.scss';
</style>
<script>
import { confettiAnimationSettings, destroyAnimation } from './confetti-one.js'
import LinearGradientRed from '../confetti-shared/LinearGradientRed'
import LinearGradientGrey from '../confetti-shared/LinearGradientGrey'
import ConfettiParticle from '../confetti-shared/ConfettiLogo'
import GreyCone from './GreyCone'
import RedCone from './RedCone'

export default {
  name: 'ConfettiAnimation',
  components: {
    LinearGradientGrey,
    LinearGradientRed,
    ConfettiParticle,
    GreyCone,
    RedCone
  },
  props: {
    svgDefaultAttrs: { type: Object }
  },
  mounted () {
    confettiAnimationSettings(this.$refs.svg)
  },
  beforeDestroy () {
    destroyAnimation()
  }
}
</script>
