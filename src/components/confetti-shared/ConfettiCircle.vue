<template lang="pug">
  g.confetti
    g.inner
      g.scale
        circle.circle(
          cx="0" cy="0" r="8"
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
