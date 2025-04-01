class Dep {
  constructor() {
    this.subscribers = new Set()
  }
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }
  notify() {
    this.subscribers.forEach((effect) => {
      effect.update()
    })
  }
}

let activeEffect = null

class Watcher {
  constructor(effect) {
    this.effect = effect
    this.run()
  }
  run() {
    activeEffect = this
    this.effect()
    activeEffect = null
  }
  update() {
    this.run()
  }
}

function effect(effect) {
  return new Watcher(effect)
}

let targetMap = new WeakMap()
function getDep(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}

const handler = {
  get(target, key) {
    const dep = getDep(target, key)
    dep.depend()
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    const result = Reflect.set(target, key, value)
    const dep = getDep(target, key)
    dep.notify()
    Reflect.set(target, key, value)
    return result
  }
}
const reactive = (target) => {
  return new Proxy(target, handler)
}

const state = reactive({
  count: 1
})

const render = () => {
  document.body.innerHTML = `<h2>${state.count}</h2>`
}

effect(() => {
  render()
})

document.body.addEventListener(
  'click',
  () => {
    state.count++
  },
  false
)
// render()
