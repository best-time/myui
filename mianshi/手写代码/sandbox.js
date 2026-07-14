// 黑名单：禁止访问的全局变量
const forbidden = [
  "window",
  "document",
  "fetch",
  "XMLHttpRequest",
  "cookie",
  "localStorage",
  "sessionStorage",
  "eval"
];
/**
 * 创建低代码脚本沙箱
 * @param {Object} context 注入上下文 $state、$api等
 * @returns {Function} 执行脚本的runCode函数
 */
function createSandbox(context) {

  // 创建代理对象
  const sandboxProxy = new Proxy(context, {
    get(target, prop) {
      // 禁止访问黑名单中的属性
      if (forbidden.includes(prop)) {
        throw new Error(`禁止访问 ${prop}，存在安全风险`);
      }
      // 禁止通过__proto__获取原型链
      if (prop === "__proto__" || prop === "constructor") {
        throw new Error("不允许访问原型链属性");
      }
      // 优先取我们注入的上下文，如果不存在返回undefined
      if (Reflect.has(target, prop)) {
        return Reflect.get(target, prop);
      }
      // 找不到属性就返回undefined，阻止向上访问window
      return undefined;
    },
    set(target, prop, value) {
      if (forbidden.includes(prop)) {
        throw new Error(`禁止修改属性:${prop}`);
      }
      return Reflect.set(target, prop, value);
    }
  });

  /**
   * 执行用户编写的js代码
   * @param {string} code 用户脚本
   */
  function runCode(code) {
    // with语法：改变作用域查找顺序，优先从sandboxProxy里面取值，不再向外查找window

    // new Function 创建函数，参数放 __sandbox__
    const fn = new Function("__sandbox__", `
      with(__sandbox__) {
        ${code}
      }
    `);
    fn(sandboxProxy);
  }

  return {
    runCode
  };
}

/*

const fn = new Function('data', `
  with(data) {
    return \`姓名:\${name},年龄:\${age}\`
  }
`)
const res = fn({ name: 'jack', age: 20 })
console.log(res) // 姓名:jack,年龄:20

 */

// ------------------------ 测试示例 ------------------------
// 平台注入的上下文，用户脚本只能访问这里面的值
const ctx = {
  $state: {
    name: "张三",
    age: 20
  },
  $api: {
    async submit() {
      console.log("调用平台内置接口");
    }
  },
  $message: (text) => {
    console.log("消息提示：", text);
  }
};

const sandbox = createSandbox(ctx);

// 合法脚本
sandbox.runCode(`
  $state.name = "李四";
  $message("执行成功");
  $api.submit();
  console.log($state.name);
`);

// 非法脚本，抛出异常，访问window被拦截
try {
  sandbox.runCode(`
    let a = window.document.cookie
  `);
} catch (err) {
  console.log(err.message); //禁止访问 window，存在安全风险
}