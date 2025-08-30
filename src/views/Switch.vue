<template>
  <div>
    <input type="checkbox" v-model="checked" class="xm__switch" :disabled="disabled" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      disabled: false
    }
  },
  watch: {
    checked(val) {
      console.log('checkstatus: ', val)
      // this.$emit("input", val);
    }
  }
}
</script>

<style scoped lang="less">
.border-radius (@radius: 4px) {
  border-radius: @radius;
}
.size(@width, @height) {
  width: @width;
  height: @height;
}

@color: #4cd864;

.xm__switch {
  position: relative;
  z-index: 10;
  display: block;
  .size(52px, 28px);
  left: 0;
  border: 1px solid #dddee1;
  .border-radius(16px);
  background-color: #dfdfdf;
  -webkit-appearance: none;
  color: @color;

  &:checked {
    border-color: currentColor;
    background-color: currentColor;

    &:before {
      transform: scale(0);
      transition: transform 0.3s;
    }
    &:after {
      transform: translateX(24px);
      transition: transform 0.3s;
    }
  }

  &[disabled] {
    opacity: 0.5;
  }

  &:after,
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 26px;
    .border-radius(15px);
    transition: transform 0.3s;
  }

  &:before {
    width: 50px;
    background-color: #fdfdfd;
  }

  &:after {
    width: 26px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
}
</style>
