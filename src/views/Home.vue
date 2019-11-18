<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <h2>button</h2>
    <Button type="primary" @click="handleClick">alert</Button>
    <Button @click="load">load</Button>
    <Button @click="load" disabled>主要按钮</Button>
    <Button @click="notify">notify</Button>
    <Button @click="openCustomConfrim">openCustomConfrim</Button>
    <Button @click="toastNone">toast</Button>
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

    <br />
    <grids-group :rows="3" title="等分3列">
      <grids-item :key="n" v-for="n in 4">
        <span slot="text">grids-3</span>
      </grids-item>
    </grids-group>

    <br />
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
      this.$dialog.alert({ mes: "消息一出，休想滚动屏幕[移动终端]！" });
    },
    load() {
      this.$dialog.loading.open("很快加载好了");

      setTimeout(() => {
        this.$dialog.loading.close();
      }, 2000);
    },
    notify() {
      this.$dialog.notify({
        mes: "2秒后自动消失，点我也可以消失！",
        timeout: 2000,
        callback: () => {
          console.log("我走咯！");
        }
      });
    },
    toastNone() {
      // this.$dialog.toast({
      //   mes: "<b>一个没有任何图标的提示！</b>",
      //   timeout: 2000
      // });
      this.$dialog.toast({
        mes: "鼠标不错哟！",
        timeout: 1500,
        icon: "success"
      });

      this.$dialog.toast({
        mes: "别乱点啊！",
        timeout: 1500,
        icon: "error",
        callback: () => {
          this.$dialog.alert({ mes: "给你一次重来的机会！" });
        }
      });
    },
    openCustomConfrim() {
      this.$dialog.confirm({
        title: "选填标题",
        mes: "我有一个小毛驴我从来也不骑！",
        opts: [
          {
            txt: "取消",
            color: false,
            callback: () => {
              this.$dialog.toast({ mes: "你点了取消", timeout: 1000 });
            }
          },
          {
            txt: "犹豫一下",
            stay: true,
            color: "#CCC",
            callback: () => {
              this.$dialog.toast({ mes: "别犹豫了", timeout: 1000 });
            }
          },
          {
            txt: "确定",
            color: true,
            callback: () => {
              this.$dialog.toast({ mes: "你点了确定", timeout: 1000 });
            }
          }
        ]
      });
    }
  }
};
</script>
