/**

 核心机制：每一个方法执行完成后返回当前实例对象 this；
 调用完一个方法拿到实例，就能继续调用实例上其他方法，形成连续调用链；
 异步链式需要基于 Promise 串行保存异步任务，通过 .then 依次执行；
 常见应用场景：jQuery、Lodash、Axios 请求、表单链式校验、工具类封装。

 */

//  class 模式

class Calculator {
  constructor() {
    this.num = 0;
  }

  add(n) {
    this.num += n;
    return this; // 返回实例，支持链式
  }

  subtract(n) {
    this.num -= n;
    return this;
  }

  multiply(n) {
    this.num *= n;
    return this;
  }

  getResult() {
    return this.num;
  }
}

// 使用
const res = new Calculator()
  .add(10)
  .subtract(3)
  .multiply(2)
  .getResult();

console.log(res); // 14


// 纯对象形式


function createChain() {
  const obj = {
    count: 0,
    add(n) {
      this.count += n;
      return this;
    },
    minus(n) {
      this.count -= n;
      return this;
    },
    done() {
      return this.count;
    }
  };
  return obj;
}

const val = createChain().add(5).minus(2).done();
console.log(val); // 3



// 异步链式

class AsyncChain {
  constructor() {
    this.promise = Promise.resolve();
  }

  wait(ms) {
    this.promise = this.promise.then(() => {
      return new Promise(resolve => setTimeout(resolve, ms));
    });
    return this;
  }

  log(text) {
    this.promise = this.promise.then(() => {
      console.log(text);
    });
    return this;
  }

  end() {
    return this.promise;
  }
}

// 使用
new AsyncChain()
  .log('开始')
  .wait(1000)
  .log('等待1秒后')
  .wait(500)
  .log('结束')
  .end();