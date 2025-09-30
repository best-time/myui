const deepClone = (obj, hash = new WeakMap()) => {
    // 日期对象直接返回一个新的日期对象
    if (obj instanceof Date){
        return new Date(obj);
    }
    //正则对象直接返回一个新的正则对象
    if (obj instanceof RegExp){
        return new RegExp(obj);
    }
    //如果循环引用,就用 weakMap 来解决
    if (hash.has(obj)){
        return hash.get(obj);
    }
    // 获取对象所有自身属性的描述
    let allDesc = Object.getOwnPropertyDescriptors(obj);
    // 遍历传入参数所有键的特性
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

    hash.set(obj, cloneObj)
    for (let key of Reflect.ownKeys(obj)) {
        if(typeof obj[key] === 'object' && obj[key] !== null){
            cloneObj[key] = deepClone(obj[key], hash);
        } else {
            cloneObj[key] = obj[key];
        }
    }
    return cloneObj
}



// Native
const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

// console.log(isEmpty(null))
// // output: true
// console.log(isEmpty(''))
// // output: true
// console.log(isEmpty({}))
// // output: true
// console.log(isEmpty([]))
// // output: true


// Native
const has = function (obj, key) {
    let keyParts = key.split('.');

    return !!obj && (
        keyParts.length > 1
            ? has(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
            : hasOwnProperty.call(obj, key)
    );
};

let object = { a: 1, b: 'settings' };
let result = has(object, 'a');
// output: true


// Native
const get = (obj, path, defaultValue = undefined) => {
    const travel = regexp =>
        String.prototype.split
            .call(path, regexp)
            .filter(Boolean)
            .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    return result === undefined || result === obj ? defaultValue : result;
};

let object = { a: [{ b: { c: 3 } }] };
let result = get(object, 'a[0].b.c', 1);
// output: 3



// Native
function pick(object, keys) {
    return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
}
let result = pick(object, ['a', 'c']);
console.log(result)
// output: {a: 1, c: 3}





let object = { 'a': 1, 'b': null, 'c': 3, 'd': false, 'e': undefined };

// Native
// 返回 'trusy'
function pickBy(object) {
    const obj = {};
    for (const key in object) {
        if (object[key]) {
            obj[key] = object[key];
        }
    }
    return obj;
}
let result = pickBy(object);
console.log(result)
// output: {a: 1, c: 3}
