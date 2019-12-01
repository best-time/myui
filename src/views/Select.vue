<template>
  <div>
    <div class="cell-title demo-small-pitch">
      值和标签一致 - 【值：{{ radio1 }}】
    </div>
    <cell-group>
      <cell-item>
        <radio-group v-model="radio1" slot="left" :callback="fn">
          <radio val="啦啦啦"></radio>
          <radio val="啊啊啊"></radio>
          <radio val="喔喔喔"></radio>
        </radio-group>
      </cell-item>
    </cell-group>

    <div class="cell-title">值和标签不同 - 【值：{{ radio2 }}】</div>
    <cell-group>
      <cell-item>
        <radio-group v-model="radio2" slot="left">
          <radio val="1">啦啦啦</radio>
          <radio val="2">啊啊啊</radio>
          <radio val="3">喔喔喔</radio>
        </radio-group>
      </cell-item>
    </cell-group>

    <cell-group title="禁用">
      <cell-item>
        <radio-group v-model="radio3" slot="left">
          <radio val="啦啦啦"></radio>
          <radio val="啊啊啊"></radio>
          <radio val="喔喔喔" disabled></radio>
        </radio-group>
      </cell-item>
    </cell-group>

    <cell-group title="自定义图标颜色">
      <cell-item>
        <radio-group v-model="radio4" color="#F00" slot="left">
          <radio val="啦啦啦"></radio>
          <radio val="啊啊啊"></radio>
          <radio val="喔喔喔"></radio>
        </radio-group>
      </cell-item>
    </cell-group>

    <cell-group title="自定义图标大小">
      <cell-item>
        <radio-group v-model="radio5" size="30" slot="left">
          <radio val="1"><span style="font-size: 24px;">男</span></radio>
          <radio val="2"><span style="font-size: 24px;">女</span></radio>
          <radio val="3"><span style="font-size: 24px;">未知</span></radio>
        </radio-group>
      </cell-item>
    </cell-group>
  </div>
</template>

<script type="text/babel">
export default {
  data() {
    return {
      radio1: "啦啦啦",
      radio2: 2,
      radio3: "喔喔喔",
      radio4: "啊啊啊",
      radio5: 2
    };
  },
  methods: {
    fn(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped>
.demo-small-pitch {
  padding-bottom: 20px;
}
</style>