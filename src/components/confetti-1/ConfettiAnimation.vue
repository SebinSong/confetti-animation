<template>
  <div class="container">
    <div class="bg-sky"></div>
    <svg xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         version="1.1"
         id="conefetti-two"
         ref="svg">
      <defs>
        <linear-gradient-red />
        <linear-gradient-grey />

        <rect id="bgrect" x="0" y="0" width="100%" height="100%" />
        
        <confetti-particle />
        <red-cone />
        <grey-cone />
      </defs>

      <!-- g#newcoordinate :  Actual svg canvas where things are drawn.
           The coordinate system will be flipped by script for convinience
      -->
      <g id="newcoordinate"></g>

    </svg>

    <div class="congrat">
      <p class="text-big">Wahooo!</p>
      <p class="text-small">Now you are all set! Ready to start your journey? :)</p>
    </div>
  </div>
</template>
<style scoped lang='scss'>
  @import '../../assets/confettione.scss';
</style>
<script>
import { confettiAnimationSettings } from '../../assets/js/confetti-animation.js';
import LinearGradientRed from './LinearGradientRed';
import LinearGradientGrey from './LinearGradientGrey';
import GreyCone from './GreyCone';
import RedCone from './RedCone';
import ConfettiParticle from './ConfettiParticle';

export default {
  name: 'ConfettiAnimation',
  components: {
    LinearGradientGrey, 
    LinearGradientRed,
    ConfettiParticle,
    GreyCone, 
    RedCone 
  }, 
  mounted(){
    confettiAnimationSettings.call(this, this.$refs.svg);
  }
}
</script>