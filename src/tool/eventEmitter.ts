const eventName = ['API:UN_AUTH', 'API:INVALID']

type EventName = (typeof eventName)[number]

class EventEmitter {
  private listeners: Record<EventName, Set<Function>> = {
    'API:UN_AUTH': new Set(),
    'API:INVALID': new Set()
  }

  emit(eventName: string, ...args: any[]) {
    this.listeners[eventName].forEach((listener) => listener(...args))
  }

  on(eventName: EventName, listener: Function) {
    this.listeners[eventName].add(listener)
  }
}
export default new EventEmitter()
