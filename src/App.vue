<template>
  <div id="app">
    <confetti-animation></confetti-animation>
  </div>
</template>
<script>
import ConfettiAnimation from './components/confetti-1/ConfettiAnimation'

export default {
  name: 'app',
  components: { ConfettiAnimation }
}
</script>

<style lang="scss">
@import './assets/init.scss';
</style>
