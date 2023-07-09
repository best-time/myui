import {isString, getObjKeys} from './base';

const unDef = void 0;

/** adapter demo
     let response = { nickname: { a: { b: { c: ["c"] } } }, counts: 2 };
      let res = adapter(response, {
        name: "nickname.a.b.c",
        score: "counts"
      });
    */
const adapter = (response: any, info: any) => {
  return getObjKeys(info).reduce((res, key) => {
    let keyArr = isString(info[key]) ? info[key].split('.') : [],
      len = keyArr.length;
    if (len > 1) {
      let i = -1,
        tmp = null;
      while (++i < len) {
        tmp = tmp ? tmp[keyArr[i]] : response[keyArr[i]];
        if (!tmp) break;
      }
      res[key] = tmp;
    } else {
      res[key] = isString(info[key]) ? response[info[key]] : unDef;
    }
    return res;
  }, {});
};
