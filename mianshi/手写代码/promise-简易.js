/*
我们来过一遍Promise/A+规范：

三种状态pending| fulfilled(resolved) | rejected
当处于pending状态的时候，可以转移到fulfilled(resolved)或者rejected状态
当处于fulfilled(resolved)状态或者rejected状态的时候，就不可变。


必须有一个then异步执行方法，then接受两个参数且必须返回一个promise：

 */

function MyPromise(constructor) {
  let self = this;
  self.status = "pending";
  self.value = null;
  self.reason = null;
  function resolve(value) {
    if (self.status === "pending") {
      self.status = "resolved";
      self.value = value;
    }
  }
  function reject(reason) {
    if (self.status === "pending") {
      self.status = "rejected";
      self.reason = reason;
    }
  }
  try {
    constructor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  switch (self.status) {
    case "resolved":
      onFullfilled(self.value);
      break;
    case "rejected":
      onRejected(self.reason);
      break;
    default:
  }
};

//test
let p = new MyPromise(function (resolve, reject) {
  resolve(1);
});
p.then(function (x) {
  console.log(x);
});
//输出1
