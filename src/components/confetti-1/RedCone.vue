<template>
  <g class="cone cone-red">
    <g class="inner">
      <path fill="url(#lg-red)"
            d="M-30,0 q30,-5 60,-25 v50 q-30,-10 -60,-25 z"
      />
      <!--original d="M-30,0 l60,-25 v50 z" -->
      <g class="tails">
            <path fill="none"
                  d="M-30,0 q-7,-9 -15,-6 t-15,-2"
            />
            <path fill="none"
                  d="M-30,0 q-6,8 -12,4 t-12,2"
            />
            <path fill="none"
                  d="M-30,0 q-8,3 -16,0 t-20,0"
            />
      </g>
    </g>
  </g>
</template>
<script>
export default { name: 'RedCone' }
</script>
