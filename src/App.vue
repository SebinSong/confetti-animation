<template>
  <div id="app">
    <confetti-two></confetti-two>
  </div>
</template>
<script>
import ConfettiOne from './components/ConfettiOne'
import ConfettiTwo from './components/ConfettiTwo'

export default {
  name: 'app',
  components: { ConfettiOne, ConfettiTwo }
}
</script>

<style lang="scss">
@import './assets/init.scss';
</style>
