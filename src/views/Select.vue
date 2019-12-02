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

    <br />
    <br />
    <br />
    <br />

    <div class="yd-cell-title demo-small-pitch">单独使用 - {{ checkbox1 }}</div>
    <cell-group>
      <cell-item>
        <checkbox v-model="checkbox1" slot="left">啦啦啦啦</checkbox>
      </cell-item>
    </cell-group>

    <div class="yd-cell-title">true-value & false-value - {{ checkbox2 }}</div>
    <cell-group>
      <cell-item>
        <checkbox
          v-model="checkbox2"
          slot="left"
          true-value="aaa"
          false-value="bbb"
          >啦啦啦啦</checkbox
        >
      </cell-item>
    </cell-group>

    <div class="yd-cell-title">值和标签一致 -> {{ checkbox3 }}</div>
    <cell-group>
      <cell-item>
        <checkbox-group v-model="checkbox3" slot="left" :callback="fn2">
          <checkbox val="啦啦啦"></checkbox>
          <checkbox val="啊啊啊"></checkbox>
          <checkbox val="喔喔喔"></checkbox>
        </checkbox-group>
      </cell-item>
    </cell-group>

    <div class="yd-cell-title">值和标签不同 -> {{ checkbox4 }}</div>
    <cell-group>
      <cell-item>
        <checkbox-group v-model="checkbox4" slot="left">
          <checkbox val="1">啦啦啦</checkbox>
          <checkbox val="2">啊啊啊</checkbox>
          <checkbox val="3">喔喔喔</checkbox>
        </checkbox-group>
      </cell-item>
    </cell-group>

    <cell-group title="禁用">
      <cell-item>
        <checkbox-group v-model="checkbox5" slot="left">
          <checkbox val="1">啦啦啦</checkbox>
          <checkbox val="2" disabled>啊啊啊</checkbox>
          <checkbox val="3" disabled>喔喔喔</checkbox>
        </checkbox-group>
      </cell-item>
    </cell-group>

    <cell-group title="自定义图标颜色">
      <cell-item>
        <checkbox-group v-model="checkbox6" slot="left" color="#F00">
          <checkbox val="1">啦啦啦</checkbox>
          <checkbox val="2">啊啊啊</checkbox>
          <checkbox val="3">喔喔喔</checkbox>
        </checkbox-group>
      </cell-item>
    </cell-group>

    <cell-group title="圆形图标">
      <cell-item>
        <checkbox-group v-model="checkbox7" slot="left">
          <checkbox val="1" shape="circle">啦啦啦</checkbox>
          <checkbox val="2" shape="circle">啊啊啊</checkbox>
          <checkbox val="3" shape="circle">喔喔喔</checkbox>
        </checkbox-group>
      </cell-item>
    </cell-group>

    <cell-group title="自定义图标大小">
      <cell-item>
        <checkbox-group v-model="checkbox8" slot="left" size="30">
          <checkbox val="1"><span style="font-size: 24px;">男</span></checkbox>
          <checkbox val="2"><span style="font-size: 24px;">女</span></checkbox>
          <checkbox val="3"
            ><span style="font-size: 24px;">未知</span></checkbox
          >
        </checkbox-group>
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
      radio5: 2,

      checkbox1: true,
      checkbox2: "aaa",
      checkbox3: [],
      checkbox4: ["2"],
      checkbox5: ["1"],
      checkbox6: ["1"],
      checkbox7: ["3"],
      checkbox8: ["3"]
    };
  },
  methods: {
    fn(val) {
      console.log(val);
    },
    fn2(val) {
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
