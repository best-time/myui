<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <h2>button</h2>
    <Button type="primary" @click="handleClick">alert</Button>
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

    <br>
    <grids-group :rows="3" title="等分3列">
            <grids-item :key="n" v-for="n in 4">
                <span slot="text">grids-3</span>
            </grids-item>
        </grids-group>

        <br>
         <grids-group :rows="4" title="等分4列">
            <grids-item :key="n" v-for="n in 6">
                <span slot="text">grids-3</span>
            </grids-item>
        </grids-group>

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
      this.$dialog.alert({mes: '消息一出，休想滚动屏幕[移动终端]！'});
    }
  }
};
</script>
