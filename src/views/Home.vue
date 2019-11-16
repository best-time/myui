<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <h2>button</h2>
    <Button type="primary" @click="handleClick">主要按钮</Button>
    <Button>主要按钮</Button>
    <Button disabled>主要按钮</Button>
    <Button plain>纯文字</Button>

    <br />
    <h2>cell</h2>
    <Cell>
      <span slot="left">姓名：</span>
      <span slot="right">顺丰快递</span>
    </Cell>

    <Cell>
      <input slot="right" type="text" placeholder="请输入您的姓名" />
    </Cell>


    <Cell>
      <div slot="left">
        <a href="123">baidu</a>
        <span>-444</span>
      </div>
      <span slot="right">顺丰快递</span>

    </Cell>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  // components: {
  //   HelloWorld
  // },
  methods: {
    handleClick() {
      console.log(1);
    }
  }
};
</script>
