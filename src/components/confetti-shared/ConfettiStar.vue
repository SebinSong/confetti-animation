<template lang="pug">
  g.confetti
    g.inner
      g.scale
        path.star(
          d="M-7,-7 L7,7 M7,-7 L-7,7 M0,-12 L0,12 M-12,0 L12,0"
          fill="none"
          stroke-width="3"
          stroke-linejoin="round"
          stroke-linecap="round"
        )
</template>

<script>
export default {
  name: 'ConfettiStar'
}
</script>
