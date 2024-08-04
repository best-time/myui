export const isArray = a => Array.isArray(a)
export const isNil = v => v === null || v === undefined
export const noop = () => {}
/**
 * list转map
 * [
 *  {value:1,label:'启用’}
 *  {value:2,label:'停用’}
 * ]
 * 转换为
 * {1：启用，2：停用}
 */
const listToMapFnGenerator = (valueKey, textKey) => list => {
    const obj = {}
    list.forEach(item => {
        obj[item[valueKey]] = item[textKey]
    })

    return obj;
}
// listToMapFnGenerator('value', 'label')(list)


//
export class ErrorResult extends Error {
  constructor(data) {
    super();
    this.code = data.code;
    this.msg = data.msg;
  }
}

export const toResult = p => {
    return p
        .then(v => {
            if (v.data.success && v.data.code === 200) {
                return Promise.resolve([null, v.data.data]);
            } else {
                return Promise.reject(new ErrorResult(v.data));
            }
        })
        .catch(e => Promise.resolve([e, null]));
};


// 数组中找item
export const findO = (v, listKey, list) => {
    if(!list) {
        list = listKey || []
        listKey = 'value'
    }
    return list.find(it => `${it[listKey]}` === `${v}`)
}

// 数组中找index
export const findI = (v, listKey, list) => {
    if(!list) {
        list = listKey || []
        return list.findIndex(it => `${it}` === `${v}`)
    }
    return list.findIndex(it => `${it[listKey]}` === `${v}`)
}

 const _base = {
     falsy (key) {
         if (isArray (key)) {
             key.forEach (k => {
                 this[k] = false;
             });
         } else {
             this[key] = false;
         }
         return this;
     },
     truy (key) {
         if (isArray (key)) {
             key.forEach (k => {
                 this[k] = true;
             });
         } else {
             this[key] = true;
         }
         return this;
     },
 }




export const compose = (...fns) => {
    if (!fns.length) {
        return arg => arg;
    } else if (fns.length - 1 === 0) {
        return fns[0];
    }
    return fns.reduce ((a, b) => {
        return (...args) => {
            console.log(a, b, args, '---');
            return a (b (...args));
        };
    });
};

// function add (a, b=100) {
//   return a + b;
// }
// function xx (a, b = 10) {
//   return a * b;
// }
// let r = compose (add, xx)(1, 3, 4);
// console.log (r);


function compose2 (...fns) {
    return function composed (result) {
        // 拷贝一份保存函数的数组
        let list = fns.slice ();

        while (list.length > 0) {
            // 将最后一个函数从列表尾部拿出
            // 并执行它
            result = list.pop () (result);
        }

        return result;
    };
}

export const composePromise = function (...args) {
    const init = args.pop ();
    return function (...arg) {
        return args.reverse ().reduce (function (sequence, func) {
            return sequence.then (function (result) {
                return func.call (null, result);
            });
        }, Promise.resolve (init.apply (null, arg)));
    };
};


// 删除提交的查询表单空值属性
export const deleteEmptyProps = (form, excludeList) => {
    for (let paramName in form) {
        if (form.hasOwnProperty(paramName)) {
            if ((!form[paramName]) && (!excludeList || excludeList && excludeList.indexOf(paramName) < 0)) {
                delete form[paramName];
            }
        }
    }
    return form;
};


let isType = type => {
    return function (value) {
        return Object.prototype.toString.call(value) === `[object ${type}]`;
    };
};

let isObject = isType("Object");
let isArray = isType("Array");




/**
 * map转list
 * {1：启用，2：停用}
 * 转换为
 * [
 *  {value:1,label:'启用’}
 *  {value:2,label:'停用’}
 * ]
 */
export const mapToList = (map, type = "number", isSort = false) => {
    let list = []
    let keyArr = Object.keys(map).sort((a, b) => a - b)
    keyArr.forEach(key => {
        list.push({
            value: type === "number" ? Number(key) : key,
            label: map[key]
        })
    })
    return list
}
/**
 * list转map
 * [
 *  {value:1,label:'启用’}
 *  {value:2,label:'停用’}
 * ]
 * 转换为
 * {1：启用，2：停用}
 */
export const listToMap = (list) => {
    let map = {}
    list.forEach(item => {
        map[item.value] = item.label
    })
    return map
}

