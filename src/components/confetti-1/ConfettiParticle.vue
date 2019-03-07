<template>
  <g class="confetti gi-logo">
    <g class="inner">
      <g class="object">
        <defs>
          <path id="hook"
                ref="refPath"
                fill="none" stroke-width="4"
                stroke-linejoin="round"
                d="M 0,0 a 12.5,12.5 0 1 0 25,0 q -10,-15 -12,-22"
          />
        </defs>
        <g transform="scale(0.5)">
          <use xlink:href="#hook" stroke="rgb(160,209,14)"
              transform="translate(23,-16) rotate(-137)" />
          <use xlink:href="#hook" stroke="rgb(93,200,240)"
              transform="translate(2,2) rotate(-10)"/>
          <use xlink:href="#hook" stroke="rgb(248,146,1)"
              transform="translate(-4,-24) rotate(105)" />
        </g>
      </g>
    </g>
  </g>
</template>