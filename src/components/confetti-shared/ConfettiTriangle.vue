<template lang="pug">
  g.confetti
    g.inner
        g.scale
          polygon.triangle(
            points="0 -12, 8 6, -8 6"
            stroke-width="3"
            stroke-linejoin="round"
            stroke-linecap="round"
          )
</template>
<script>
export default {
  name: 'ConfettiTriangle'
}
</script>
