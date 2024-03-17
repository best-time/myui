<template>
  <div class="box" contenteditable oninput="">
    输入
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

/*
MutationObserver()
创建并返回一个新的 MutationObserver 它会在指定的 DOM 发生变化时被调用。

方法
disconnect()
阻止 MutationObserver 实例继续接收的通知，直到再次调用其 observe() 方法，该观察者对象包含的回调函数都不会再被调用。

observe()
配置 MutationObserver 在 DOM 更改匹配给定选项时，通过其回调函数开始接收通知。

takeRecords()
从 MutationObserver 的通知队列中删除所有待处理的通知，并将它们返回到 MutationRecord 对象的新 Array 中。


MutationObserver是一个构造器，接受一个callback参数，用来处理节点变化的回调函数，返回两个固定参数mutations和observer

mutations：节点变化记录列表（sequence<MutationRecord>）
observer：构造MutationObserver对象。



关于observe方法中options参数有已下几个选项：

  1. childList：设置true，表示观察目标子节点的变化，比如添加或者删除目标子节点，不包括修改子节点以及子节点后代的变化
  2. attributes：设置true，表示观察目标属性的改变
  3. characterData：设置true，表示观察目标数据的改变
  4. subtree：设置为true，目标以及目标的后代改变都会观察
  5. attributeOldValue：如果属性为true或者省略，则相当于设置为true，表示需要记录改变前的目标属性值，设置了attributeOldValue可以省略attributes设置
  6. characterDataOldValue：如果characterData为true或省略，则相当于设置为true,表示需要记录改变之前的目标数据，设置了characterDataOldValue可以省略characterData设置
  7. attributeFilter：如果不是所有的属性改变都需要被观察，并且attributes设置为true或者被忽略，那么设置一个需要观察的属性本地名称（不需要命名空间）的列表
  注：

  attributeFilter/attributeOldValue 优先级高于 attributes
  characterDataOldValue 优先级高于 characterData
  attributes/characterData/childList（或更高级特定项）至少有一项为true；
  特定项存在, 对应选项可以忽略或必须为true
 */
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
let list = document.querySelector(`.box`);

// options
const config = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true,
};
// instance
const observer = new MutationObserver(function(mutations) {
  console.log(`mutations =`, mutations); // MutationRecord
  mutations.forEach(function(mutation) {
    // console.log("mutation =", mutation);
    if (mutation.type === "characterData") {
      // target & object === typeof(mutation.target)
      // console.log("A child node has been added OR removed.", mutation.target, typeof(mutation.target));
      // console.log("[...mutation.addedNodes].length", [...mutation.addedNodes].length);
      // console.log("[...mutation.removedNodes].length", [...mutation.removedNodes].length);
      // if (mutation.target && [...mutation.addedNodes].length) {
      //     // [...mutation.addedNodes].length
      //     console.log(`A child node ${mutation.target} has been added!`, mutation.target);
      // }
      // if (mutation.target && [...mutation.removedNodes].length) {
      //     // [...mutation.removedNodes].length
      //     console.log(`A child node ${mutation.target} has been removed!`, mutation.target);
      // }
    }
    if (mutation.type === "childList") {
      if (mutation.target && [...mutation.addedNodes].length) {
        console.log(`dom新增`, mutation.target);
      }
      if (mutation.target && [...mutation.removedNodes].length) {
        console.log(`dom删除`, mutation.target);
      }
      // do somwthings
      let list_values = [];
      list_values = [].slice.call(list.children).map(function(node) {
        return node.innerHTML;
      }).filter(function(str) {
        return str !== "<br>"
      });
      console.log(list_values);
    }
    if (mutation.type === "attributes") {
      console.log("属性更改mutation =", mutation);
      // console.log("list style =", list.style);
      let {
        width,
        height,
      } = list.style;
      console.log("style = ", JSON.stringify({
        width,
        height
      }));
    }
  });
});
// Later, you can stop observing
// setTimeout(() => {
//     observer.disconnect();
// }, 1000 * 100);
// bug ??? after disconnect
// list.attributes;
// list.setAttribute(`style`, `height: 212px; width: 213px;`);
// list.setAttribute(`data-test`, `666`);
// list.removeAttribute(`data-test`);
// list.children;
// list.childElementCount;
// list.childNodes;
// list.hasChildNodes();
// list.firstElementChild;
// list.firstChild;
// list.removeChild(li);
// list.removeChild(list.firstElementChild);
// list.replaceChild(li, li);
// list.replaceChild(list.firstElementChild, list.lastElementChild);

onMounted(() => {
  // target
  list = document.querySelector(`.box`);
  observer.observe(list, config);

})
</script>

<style lang="scss">
.box {
  box-sizing: border-box;
  width: 110px;
  height: 110px;
  border: 1px solid red;
  padding: 10px;
  resize: both;
  overflow: auto;
}
</style>
