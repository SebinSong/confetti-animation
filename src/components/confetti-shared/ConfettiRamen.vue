<template lang="pug">
  g.confetti
    g.inner
      path.cross(
        d="M2,-32 q-20,7.5 0,15 20,7.5 0,15 -20,7.5 0,15 20,7.5 -2,17"
        fill="none"
        stroke-width="3"
        stroke-linejoin="round"
        stroke-linecap="round"
      )
</template>

<script>
export default {
  name: 'ConfettiRamen'
};
</script>