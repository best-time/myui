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

    <br />
    <br />
    <br />
    <h2>tab</h2>
    <tab class="demo-small-pitch" :change="tabChange">
      <tab-panel label="选项一" tabkey="1"
        >土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食，而是真理。如果只能滋生瞑想和幻想的话，即使再大的才能也只是砂地或盐池，那上面连小草也长不出来的。</tab-panel
      >
      <tab-panel label="选项二" tabkey="2" active
        >我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。</tab-panel
      >
      <tab-panel label="选项三" tabkey="3"
        >时间是一切财富中最宝贵的财富。</tab-panel
      >
      <tab-panel label="选项四" tabkey="4"
        >真理惟一可靠的标准就是永远自相符合。</tab-panel
      >
    </tab>
    <br />
    <br />

    <h2>areaSelect</h2>
    <Cell>
      <span slot="left">所在地区：</span>
      <input
        slot="right"
        type="text"
        @click.stop="show5 = true"
        v-model="model5"
        readonly
        placeholder="请选择收货地址"
      />
    </Cell>
    <cityselect v-model="show5" :done="result1" :items="district"></cityselect>

    <br />
    <br />
    <div class="demo-rollnotice">
      <span class="itm">快报</span>
      <rollnotice autoplay="2000">
        <rollnotice-item
          ><span style="color:#F00;">&nbsp;荐&nbsp;</span>荣耀V9
          3月超级钜惠！</rollnotice-item
        >
        <rollnotice-item
          ><span style="color:#F00;">&nbsp;荐&nbsp;</span
          >3.23京东超级品牌日格力盛典</rollnotice-item
        >
        <rollnotice-item
          ><span style="color:#F00;">&nbsp;荐&nbsp;</span>京东服饰
          早春新品低至7折</rollnotice-item
        >
      </rollnotice>
    </div>

    <accordion class="demo-small-pitch">
      <accordion-item title="李白《月下独酌》" open>
        <div style="padding: .24rem;">
          <p>花间一壶酒，独酌无相亲。</p>
          <p>举杯邀明月，对影成三人。</p>
          <p>月既不解饮，影徒随我身。</p>
          <p>暂伴月将影，行乐须及春。</p>
          <p>我歌月徘徊，我舞影零乱。</p>
          <p>醒时同交欢，醉后各分散。</p>
          <p>永结无情游，相期邈云汉。</p>
        </div>
      </accordion-item>
      <accordion-item title="杜甫《望岳》">
        <div style="padding: .24rem;">
          <p>岱宗夫如何，齐鲁青未了。</p>
          <p>造化钟神秀，阴阳割昏晓。</p>
          <p>荡胸生层云，决眦入归鸟。</p>
          <p>会当凌绝顶，一览众山小。</p>
        </div>
      </accordion-item>
      <accordion-item title="王维《青溪》">
        <div style="padding: .24rem;">
          <p>言入黄花川，每逐青溪水。</p>
          <p>随山将万转，趣途无百里。</p>
          <p>声喧乱石中，色静深松里。</p>
          <p>漾漾泛菱荇，澄澄映葭苇。</p>
          <p>我心素已闲，清川澹如此。</p>
          <p>请留盘石上，垂钓将已矣。</p>
        </div>
      </accordion-item>
    </accordion>

    <br />
    <br />
    <Button @click.native="show1 = true">带取消</Button>
    <Button @click.native="show2 = true">不带取消</Button>
    <actionsheet :items="myItems1" v-model="show1" cancel="取消"></actionsheet>

    <actionsheet :items="myItems2" v-model="show2"></actionsheet>
    <br />
    <br />
    <br />
    <Button @click.native="show3 = true">打开键盘</Button>
    <Button @click.native="show4 = true">打开乱序键盘</Button>

    <keyboard v-model="show3" :input-done="done1" ref="kbdemo1"></keyboard>
    <keyboard
      v-model="show4"
      :input-done="done2"
      disorder
      ref="kbdemo2"
    ></keyboard>

    <br />
    <br />
    <br />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { citys } from "@/city.js";

// console.log(MyLib)
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
      model5: "",
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
    tabChange(label, tabkey) {
      console.log(label, tabkey, "tab-change");
    },
    result1(ret) {
      console.log(ret);
      this.model5 = ret.itemName1 + " " + ret.itemName2 + " " + ret.itemName3;
    },
    done1(val) {
      console.log("输入的密码是：" + val);
      this.$dialog.loading.open("验证支付密码");

      setTimeout(() => {
        this.$refs.kbdemo1.$emit(
          "keyboard.error",
          "对不起，您的支付密码不正确，请重新输入。"
        );
        this.$dialog.loading.close();
      }, 2000);
    },
    done2(val) {
      console.log("输入的密码是：" + val + " - 无序");
      this.$dialog.loading.open("验证支付密码");

      setTimeout(() => {
        this.$refs.kbdemo2.$emit(
          "keyboard.error",
          "对不起，您的支付密码不正确，请重新输入。"
        );
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
.demo-rollnotice {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 12px;
  img,
  .itm {
    width: 73px;
    height: 16px;
    margin-right: 4px;
  }
}
</style>
