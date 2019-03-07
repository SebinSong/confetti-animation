<template>
  <g>
    <g class="confetti" display="none">
      <g class="inner">
        <path class="confetti-path"
              fill="rgba(80,80,80,1)"
              d="M15,-10 l-10,15 h-15 l10,-15z"
        />
      </g>
    </g>
    <g class="confetti circle" display="none">
      <g class="inner">
        <circle class="circle" 
                cx="0" cy="0" r="12"
        />
      </g>
    </g>
    <g class="confetti triangle" display="none">
      <g class="inner">
        <path class="triangle" 
              d="M0,-14 L-14,8 h28 z"
        />
      </g>
    </g>
  </g>
</template>

<script>
export default {

}
</script>

<style>

</style>
