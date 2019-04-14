<template lang="pug">
  g.confetti
    g.inner
      g.scale
        path.cross(
          d="M-10,-10 L10,10 M10,-10 L-10,10"
          fill="none"
          stroke-width="3"
          stroke-linejoin="round"
          stroke-linecap="round"
        )
</template>

<script>
export default {
  name: 'ConfettiCross'
};
</script>