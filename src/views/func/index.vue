<template>
123123
    1234
</template>
<script setup lang="tsx">
function addMethod(object, name, fn) {
    const old = object[name]
    
    object[name] = function (...args) {
      // console.log(fn, args.length, fn.length);
      // console.log(old)
      // console.log('=====================')
        if (args.length === fn.length) {
            fn.apply(this, args)
        } else if (typeof old === 'function') {
            old.apply(this, args)
        }
    }
}

const searcher = {}
function a (query) {
    console.log('searching for ' + query)
}

function b (query, callback) {
    console.log('searching for ' + query + ' and calling ' + callback())
}
function c (query, query2, callback) {
    console.log(`${query}-${query2}`, callback())
}
addMethod(searcher, 'search', a)
addMethod(searcher, 'search', b)
searcher.search('hello') // searching for hello
addMethod(searcher, 'search', c)
searcher.search('hello', function () { return '两个参数' }) // searching for hello and calling anonymous
searcher.search('hello', 'world', function () { return '3个参数' }) // searching for hello and calling anonymous
console.log(searcher);


function createOverload() {
    const fnMap = new Map()
    function overload(...args) {
      const key = args.map(it => typeof it).join(',')
      const fn = fnMap.get(key)
      if(!fn) {
        throw new TypeError('没有匹配的函数')
      }
      return fn.apply(this, args)
    }
    overload.addImpl = function (...args) {
      const fn = args.pop()
      if(typeof fn !== 'function') {
        throw new TypeError('最后一个参数必须是函数')
      }
      const key = args.join(',')
      fnMap.set(key, fn)
    }
    window.fnMap = fnMap
    return overload
}

const getUser = createOverload()
getUser.addImpl('string', function (name) {
  console.log('name', name)
})
getUser.addImpl('string', 'number', function (name, num) {
  console.log(`两个参数${name}-${num}`)
})
getUser.addImpl('string', 'object', function (name, num) {
  console.log(`两个参数${name}-${JSON.stringify(num)}`)
})
getUser.addImpl('string', 'number', 'function', function (name, num, fn) {
  console.log(`3个参数${name}-${num}-${fn()}`)
  })

  getUser('hello')
  getUser('hello', 222)
  getUser('hello', {a:1, b: 2})
  getUser('hello', 444, () => {return '参数是函数'})
  console.log(fnMap);
  
</script>