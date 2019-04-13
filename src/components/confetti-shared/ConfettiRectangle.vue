<template lang="pug">
  g.confetti
    g.inner
      rect.rect(
        x="-6" y="-6" width="12" height="12"
        stroke-width="3"
        stroke-linejoin="round"
        stroke-linecap="round"
      )
</template>

<script>
export default {
  name: 'ConfettiRectangle'
};
</script>