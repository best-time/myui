class EventEmitter {
  constructor() {
    this.subs = {}
  }

  trigger(event, ...args) {
    if (!this.subs[event]) {
      return
    }
    this.subs[event].forEach((cb) => cb(...args))
  }

  once(event, onceCb) {
    const cb = (...args) => {
      onceCb(...args)
      this.off(event, onceCb)
    }
    this.on(event, cb)
  }

  on(event, cb) {
    if (!this.subs[event]) {
      this.subs[event] = []
    }
    this.subs[event].push(cb)
  }

  off(event, offCb) {
    if (!this.subs[event]) {
      return
    }
    const index = this.subs[event].findIndex((cb) => cb === offCb)
    this.subs[event].splice(index, 1)
    if (!this.subs[event].length) {
      delete this.subs[event]
    }
  }
}
