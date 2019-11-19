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

    <br />

    <div class="demo-small-pitch">
      <slider autoplay="0">
        <slider-item>
          <a href="http://www.ydcss.com">
            <img src="http://m.ydui.org/img/1.jpg" />
          </a>
        </slider-item>
        <slider-item>
          <a href="http://www.ydcss.com">
            <img src="http://m.ydui.org/img/2.jpg" />
          </a>
        </slider-item>
        <slider-item>
          <a href="http://www.ydcss.com">
            <img src="http://m.ydui.org/img/3.jpg" />
          </a>
        </slider-item>
      </slider>
    </div>

    <br>
    <br>
    <br>
    <br>
    <br>

    <Cell>
      <span slot="left">所在地区：</span>
      <input slot="right" type="text" @click.stop="show5 = true" v-model="model5" readonly placeholder="请选择收货地址">
    </Cell>
      <cityselect v-model="show5" :done="result1" :items="district"></cityselect>
    
    <br />
    <br />
    <br />
    <Button @click.native="show1 = true">带取消</Button>
    <Button @click.native="show2 = true">不带取消</Button>
    <actionsheet :items="myItems1" v-model="show1" cancel="取消"></actionsheet>

    <actionsheet :items="myItems2" v-model="show2"></actionsheet>
    <br>
    <br>
    <br>
    <Button @click.native="show3 = true">打开键盘</Button>
    <Button @click.native="show4 = true">打开乱序键盘</Button>

    <keyboard v-model="show3" :input-done="done1" ref="kbdemo1"></keyboard>
        <keyboard v-model="show4" :input-done="done2" disorder ref="kbdemo2"></keyboard>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import {citys} from "@/city.js"
export default {
  name: "home",
  // components: {
  //   HelloWorld
  // },
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      model5: '',
      district: citys,
      myItems1: [
        {
          label: "拍照",
          method: () => {
            this.$dialog.toast({ mes: "咔擦，此人太帅！", timeout: 1000 });
            //注意： method: function() {} 和 method() {}  这样是无法正常使用当前this的
          }
        },
        {
          label: "从相册中偷取",
          method: () => {
            this.$dialog.toast({
              mes: "看到了不该看到的东西！",
              timeout: 1000
            });
          }
        }
      ],
      myItems2: [
        {
          label: "示例菜单一 - 我是不会关闭的",
          method: () => {
            this.$dialog.toast({ mes: "Say: 我是不会关闭的！", timeout: 1000 });
          },
          stay: true // 不关闭
        },
        {
          label: "示例菜单二 - 自动关闭",
          method: () => {
            this.$dialog.toast({ mes: "Say: 我关闭啦啦啦！", timeout: 1000 });
          }
        },
        { label: "示例菜单三 - 自动关闭" },
        { label: "示例菜单四 - 自动关闭" }
      ]
    };
  },
  methods: {
    result1(ret) {
        console.log(ret);
        this.model5 = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
    },
    done1(val) {
        console.log('输入的密码是：' + val);
        this.$dialog.loading.open('验证支付密码');

        setTimeout(() => {
            this.$refs.kbdemo1.$emit('keyboard.error', '对不起，您的支付密码不正确，请重新输入。');
            this.$dialog.loading.close();
        }, 2000);
    },
    done2(val) {
                console.log('输入的密码是：' + val + ' - 无序');
                this.$dialog.loading.open('验证支付密码');

                setTimeout(() => {
                    this.$refs.kbdemo2.$emit('keyboard.error', '对不起，您的支付密码不正确，请重新输入。');
                    this.$dialog.loading.close();
                }, 2000);
            },
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

<style lang="less">

</style>
