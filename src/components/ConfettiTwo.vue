<template>
  <div id="confetti-container">
    <svg xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         version="1.1"
         ref="svg">
      <defs>
        <rect id="bgrect" x="0" y="0" width="100%" height="100%" />
        <g class="confetti">
          <g class="inner">
            <path class="confetti-path"
                  fill="rgba(190,20,25,1)"
                  d="M10,-5 l-5,10 h-10 l5,-10z"
            />
          </g>
        </g>
      </defs>
      <g id="newcoordinate">
      </g>

    </svg>

    <p id="txt" ref="txtBoard"></p>
  </div>
</template>
<style scoped lang='scss'>
  @import '../assets/confettione.scss';
</style>
<script>
import { confettiAnimationSettings } from '../assets/js/confetti-animation.js';

export default {
  name: 'ConfettiTwo',
  data(){
    return {
      requestId: null,
      prevPoint: null,
      pointsForPath: [],

      confettis: []
    };
  },
  methods: {
 
  },
  mounted(){
    console.log('el: ', this.$el);
    confettiAnimationSettings.call(this, this.$refs.svg);
  }
}
</script>