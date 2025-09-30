const typeList = [
  "n",
  "s",
  "b",
  "o",
  "a",
  "d",
  "S",
  "r",
  "B",
  "f",
  "number",
  "string",
  "boolean",
  "object",
  "array",
  "date",
  "Symbol",
  "regexp",
  "bigint",
  "function",
];
const typeObj = {
  "[object Number]": ["n", "number"],
  "[object String]": ["s", "string"],
  "[object Boolean]": ["b", "boolean"],
  "[object Object]": ["o", "object"],
  "[object Array]": ["a", "array"],
  "[object Date]": ["d", "date"],
  "[object Symbol]": ["S", "Symbol"],
  "[object Regexp]": ["r", "regexp"],
  "[object BigInt]": ["B", "bigint"],
  "[object Function]": ["f", "function"],
};

function Overload(defaultCall) {
  let func = defaultCall || new Function();
  func.overloadCached = [];
  func.modifier = [];
  return new Proxy(func, {
    get(target, property, receiver) {
      if (property !== "load") {
        if (property.indexOf(",") !== -1) {
          property.split(",").map((item) => {
            target.modifier.push(item);
          });
        } else {
          property.split("").map((item) => {
            target.modifier.push(item);
          });
        }
      }
      return receiver;
    },
    set(target, prop, value) {
      let modi = null;
      if (prop.indexOf(",") !== -1) {
        modi = prop.split(",");
      } else {
        modi = prop.split("");
      }
      if (
        modi.every((p) => {
          return typeList.includes(p);
        })
      ) {
        modi.map((item) => {
          target.modifier.push(item);
        });
      }
      if (prop === "load" || target.modifier.length !== 0) {
        let str = value.toString();
        let m1 = str.match(/\(.+?\)/);
        if (m1 && m1[0].indexOf("...") != -1) {
          value.rest = true;
        }
        value.modifier = target.modifier;
        target.overloadCached.push(value);
        target.modifier = [];
      }
    },
    apply(target, thisArg, argumentsList) {
      let argLen = argumentsList.length;
      for (let i = target.overloadCached.length - 1; i > -1; i--) {
        let tmp = target.overloadCached[i];
        if (argLen === tmp.length || (tmp.rest && argLen > tmp.length)) {
          if (tmp.modifier.length !== 0) {
            let ty = typeObj;
            if (
              tmp.modifier.some((m, j) => {
                return !ty[
                  {}.__proto__.toString.call(argumentsList[j])
                ].includes(m);
              })
            ) {
              continue;
            }
          }
          return tmp.apply(thisArg, argumentsList);
        }
      }
      return target.apply(thisArg, argumentsList);
    },
  });
}

let sum = Overload();

sum.load.s.n.n = function (a, b, c) {
  return a + (b + c) * 0.85;
};
// sum.load['snn'] = function (a, b, c) {
//   return a + (b + c) * 0.85;
// }
// sum.load.snn = function (a, b, c) {
//   return a + (b + c) * 0.85;
// }
// //对于全称不能够写成.(点)的形式
// sum.load['string,number,number'] = function (a, b, c) {
//   return a + (b + c) * 0.85;
// }
//这四种形式的任意一种对于console.log(sum('$', 280, 190));
//都会输出：$399.5

console.log(sum("$", 280, 190));
