<template lang="pug">
  g.confetti.gi-logo
    defs
      path#hook(
        ref="refPath"
        d="M 0,0 a 12.5,12.5 0 1 0 25,0 q -10,-15 -12,-22"
      )
    g.inner(stroke="rgb(93,200,240)")
      g.object(stroke="inherit")
        g.scale(transform="scale(0.5)" data-logo="true" stroke="inherit" fill="none")
          use(
            v-for="hook in hooks"
            xlink:href="#hook"
            :stroke="hook.stroke"
            :transform="`translate(${hook.tx},${hook.ty}) rotate(${hook.rotate})`"
            :id="hook.id"
          )
</template>

<script>
export default {
  name: 'ConfettiLogo',
  data () {
    return {
      hooks: [
        { stroke: 'rgb(160,209,14)', tx: 23, ty: -16, rotate: -137, id: 'lightgreen' },
        { stroke: 'rgb(93,200,240)', tx: 2, ty: 2, rotate: -10, id: 'skyblue' },
        { stroke: 'rgb(248,146,1)', tx: -4, ty: -24, rotate: 105, id: 'orange' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
#hook {
  fill: none;
  stroke: {
    width: 4;
    linejoin: round;
  }
}
</style>
