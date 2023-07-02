<template>
  <div>
    <Cell>
      <input type="text" slot="right" placeholder="请输入手机号码" />
      <Button
        slot="right"
        :disabled="start"
        type="primary"
        @click.native="sendCode"
        >{{ tmpStr }}</Button
      >
    </Cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tmpStr: "获取短信验证码",
      timer: null,
      start: false,
      second: 60,
      runStr: "{%s}秒后重新获取",
      resetStr: "重新获取验证码"
    };
  },
  methods: {
    sendCode() {
      let second = this.second;
      this.tmpStr = this.getStr(this.second);
      this.start = true;

      this.timer = setInterval(() => {
        second--;
        this.tmpStr = this.getStr(second);
        if (second <= 0) {
          this.stop();
          this.start = false;
        }
      }, 1000);
    },
    getStr(second) {
      return this.runStr.replace(/\{([^{]*?)%s(.*?)\}/g, second);
    },
    stop() {
      this.tmpStr = this.resetStr;
      // this.$emit('input', false);
      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped lang="less"></style>
