<template lang="pug">
  .container
    component(:is="currentComponent" :svgDefaultAttrs="svgDefaultAttrs")
    welcome-message
    ul(id="remote")
      li(v-for="(component, key, index) in componentList" :key="key")
        button(@click="currentComponent = component") opt {{ index+1 }}
</template>
<script>
import ConfettiOne from './components/confetti-1/ConfettiOne'
import ConfettiTwo from './components/confetti-2/ConfettiTwo'
import WelcomeMessage from './components/confetti-shared/WelcomeMessage'
// import ExperimentBoard from './components/experiment/ExperimentBoard'
// import SvgFilterExperiment from './components/experiment/svgFilterExperiment'

export default {
  name: 'app',
  components: {
    WelcomeMessage
  },
  data(){
    return {
      componentList: null,
      currentComponent: null,
      svgDefaultAttrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        "version": '1.1'
      }
    };
  },
  created(){
    this.componentList = { 
      ConfettiOne,
      ConfettiTwo
    };
    this.currentComponent = ConfettiOne;

  }
}
</script>

<style lang="scss">
@import './assets/scss/init.scss';

#remote {
  position: absolute;
  top: 30px; right: 30px;
  min-height: 30px;
  min-width: 80px;
  display: flex;
  justify-content: flex-start;
  z-index: 1;
  list-style: none;

  >li {
    margin-left: 8px;
  }

  button {
    padding: 6px 12px;
    color: #fff;
    font-size: 14px;
    background-color: $red-primary;
    border-radius: 3px;
    transition: background-color 0.15s linear;

    &:hover { 
      background-color: darken($red-primary, 5%);
    }
  }
}
</style>
