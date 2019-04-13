<template lang="pug">
  g.confetti
    g.inner
      g(transform="scale(0.7)")
        polygon.triangle(
          points="0 -16, 10 8, -10 8"
          stroke-width="3"
          stroke-linejoin="round"
          stroke-linecap="round"
        )
</template>
<script>
export default {
  name: 'ConfettiTriangle'
};
</script>