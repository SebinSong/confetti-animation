<template lang="pug">
  .welcomemessage
    img.group-pic(src="@/assets/img/pug.jpg")
    h1.text.text-big Welcome, The Dreamers!
    p.text.text-small You are now embarking on a new journey. We hope you have a blast!
    button.awesome Awesome
</template>

<style scoped lang="scss">
.welcomemessage {
  position: absolute;
  top: 272px; left: 50%;
  transform: translateX(-50%);
  min-width: 375px;
  padding: 0 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;

  > * { pointer-events: auto; }

  @media screen and (max-width:375px) {
    min-width: 0;
    width: 100%;
    top: 104px;
  }
}

.group-pic {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-bottom: 24px;
}

.text {
  text-align: center;

  &.text-big {
    font: {
      size: 32px;
      weight: black;
    }
    line-height: normal;
    margin-bottom: 10px;

    @media screen and (max-width:375px) {
      font-size: 24px;
    }
  }
  &.text-small {
    font-size: 14px;
    line-height: 21px;
    margin-bottom: 32px;
  }
}

button.awesome {
  width: 153px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  border-radius: 3px;
  background-color: #5dc8f0;
  color: #fff;
  font-size: 16px;
}
</style>
