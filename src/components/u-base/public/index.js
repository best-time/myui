Function.prototype.after = function (fn) {
  const self = this;
  return function (...args) {
    let result = self.apply (null, args);
    return fn.call (null, result);
  };
};
const compose = function (...args) {
  if (args.length) {
    let r = args.reverse ();
    let res = r.reduce (function (f1, f2) {
      return f1.after (f2);
    });
    return res;
  }
};
const getCountStepAttr = function (args, N) {
  // 获取前 N 步的入参；
  N = N - 1;
  let resObj = args[0];
  for (let i = 0; i < N; i++) {
    resObj = resObj.args[0];
  }
  return resObj;
};
function init (...args) {
  // console.log(args, 'init');
  console.log ('【在 init 中调用原始传参】：', getCountStepAttr (args, 1));
  return {args: args, init1: 'init1', init: 'init'};
}
function step1 (...args) {
  // console.log(args, 'step1');
  console.log (getCountStepAttr (args, 1), 'step1');
  return {args: args, step1: 'step1'};
}
function step2 (...args) {
  console.log (getCountStepAttr (args, 1), 'step2');
  return {args: args, step2: 'param-step2', step2Add: 'param-step2-add'};
}
function step3 (...args) {
  console.log (
    '【在 step3 中调用 step2 的传参】：',
    getCountStepAttr (args, 1).step2,
    getCountStepAttr (args, 1).step2Add
  );
  console.log (
    '【在 step3 中调用 init 的传参】：',
    getCountStepAttr (args, 3).init,
    getCountStepAttr (args, 3).init1
  );
  console.log ('【在 step3 中调用原始传参】：', getCountStepAttr (args, 4));
  return {args: args, step3: 'step3'};
}
compose (step3, step2, step1, init) ('start');
// compose (step1, init) ('start');

// --------------------------------------------
let composePromise = function (...args) {
  const init = args.pop ();
  return function (...arg) {
    let ori = Promise.resolve (init.apply (null, arg));
    return args.reverse ().reduce (function (sequence, func) {
      return sequence.then (function (result) {
        return func.call (null, result);
      });
    }, ori);
  };
};

let a = async () => {
  return new Promise ((resolve, reject) => {
    setTimeout (() => {
      console.log ('xhr1');
      resolve ('xhr1');
    }, 3000);
  });
};

let b = async () => {
  return new Promise ((resolve, reject) => {
    setTimeout (() => {
      console.log ('xhr2');
      resolve ('xhr2');
    }, 1000);
  });
};

let steps = [a, b]; // 从右向左执行
let composeFn = composePromise (...steps);

composeFn (123).then (res => {
  console.log (666);
});

// --------------------------------------------

function forEachValue (obj, fn) {
  Object.keys (obj).forEach (key => fn (obj[key], key));
}
// let p = []
// forEachValue({a: 1, b : 2}, function(v, k) {
//   p.push(v)
// })

function assert (condition, msg) {
  if (!condition) throw new Error (`[vuex] ${msg}`);
}

function partial (fn, arg) {
  return function () {
    return fn (arg);
  };
}

function f1 (...rest) {
  console.log (rest);
  return rest;
}

var a3 = [3, 44, 12, 9, 8]; // len = 5

function mergeSort (arr) {
  if (arr == null || arr.length <= 0) {
    return [];
  }
  sortProcess (arr, 0, arr.length - 1);
  return arr;
}

function sortProcess (arr, L, R) {
  //递归的终止条件，就是左右边界索引一样
  if (L - R === 0) {
    return;
  }
  var middle = L + ((R - L) >> 1); //找出中间值
  sortProcess (arr, L, middle); //对左侧部分进行递归
  sortProcess (arr, middle + 1, R); //对右侧部分进行递归
  merge (arr, L, middle, R); //然后利用外排方式进行结合
}

function merge (arr, L, middle, R) {
  var help = [];
  var l = L;
  var r = middle + 1;
  var index = 0;
  //利用外排方式进行
  while (l <= middle && r <= R) {
    help[index++] = arr[l] < arr[r] ? arr[l++] : arr[r++];
  }
  while (l <= middle) {
    help.push (arr[l++]);
  }
  while (r <= R) {
    help.push (arr[r++]);
  }

  for (var i = 0; i < help.length; i++) {
    arr[L + i] = help[i];
  }
  //arr.splice(L, help.length, ...help);//这个利用了ES6的语法
}

let ra = mergeSort (a3);



// -----------------------------

// async function async1 () {
//   console.log ('async1 start');
//   await async2 ();
//   console.log ('async1 end');
// }

// async function async2 () {
//   console.log ('async2');
// }

// console.log ('script start');

// setTimeout (function () {
//   console.log ('setTimeout');
// }, 0);

// async1 ();

// new Promise (function (resolve) {
//   console.log ('promise1');
//   resolve ();
// }).then (function () {
//   console.log ('promise2');
// });

// console.log ('script end');


/**
 script start
 async1 start
 async2
 promise1
 script end
 async1 end
 promise2
 setTimeout
 */



 async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = []; // 用于存放所有的promise实例
  const executing = []; // 用于存放目前正在执行的promise
  for (const item of array) {
    const p = Promise.resolve(iteratorFn(item)); // 防止回调函数返回的不是promise，使用Promise.resolve进行包裹
    ret.push(p);
    if (poolLimit <= array.length) {
      // then回调中，当这个promise状态变为fulfilled后，将其从正在执行的promise列表executing中删除
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        // 一旦正在执行的promise列表数量等于限制数，就使用Promise.race等待某一个promise状态发生变更，
        // 状态变更后，就会执行上面then的回调，将该promise从executing中删除，
        // 然后再进入到下一次for循环，生成新的promise进行补充
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

const timeout = (i) => {
  console.log('开始', i);
  return new Promise((resolve) => setTimeout(() => {
    resolve(i);
    console.log('结束', i);
  }, i));
};

(async () => {
    const res = await asyncPool(2, [1000, 5000, 3000, 2000], timeout);
    console.log(res);
  })();