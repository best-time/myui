
export function singleton(className) {
  let ins = null
  const proxy = new Proxy(className, {
    construct(target, argArray, newTarget) {
      if(!ins) {
        ins = Reflect.construct(target, argArray, newTarget);
      }
      return ins
    }
  })
  className.prototype.constructor = proxy
  return proxy
}

class MyVideo {
  constructor() {

  }
}



const MyVideoClass = singleton(MyVideo);

export default new MyVideoClass()