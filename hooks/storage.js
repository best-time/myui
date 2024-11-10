// import { ref} from 'vue'
function gussSerializerType (type) {
  if(type === null || type === undefined) {
    return 'any'
  }
  if(type instanceof Set) {
    return 'set'
  }
  if(type instanceof Map) {
    return 'map'
  }
  if(type instanceof Date) {
    return 'date'
  }
  if(typeof type === 'boolean') {
    return 'boolean'
  }
  if(typeof type === 'string') {
    return 'string'
  }
  if(typeof type === 'object') {
    return 'object'
  }
  if(!Number.isNaN(type)) {
    return 'number'
  }
  return 'any'
}

const StorageSerializers = {
  boolean: {
    read: v => v === 'true',
    write: v => String(v)
  },
  object: {
    read: v => JSON.parse(v),
    write: v => JSON.stringify(v)
  },
  number: {
    read: v => Number.parseFloat(v),
    write: v => String(v)
  },
  any: {
    read: v => v,
    write: v => String(v)
  },
  string: {
    read: v => v,
    write: v => String(v)
  },
  map: {
    read: v => new Map(JSON.parse(v)),
    write: v => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: v => new Set(JSON.parse(v)),
    write: v => JSON.stringify(Array.from(v))
  },
  date: {
    read: v => new Date(v),
    write: v => v.toISOString()
  }
}

function useLocalStorage (key, defaultValue) {
  const type = gussSerializerType(defaultValue)

  const serializer = StorageSerializers[type]

  const read = () => {
    const v = window.localStorage.getItem(key)
    return v ? serializer.read(v) : null
  }

  const write = (v) => {
    window.localStorage.setItem(key, serializer.write(v))
    // value.value = v
  }
  const value ='' //ref(read() || defaultValue)

  return {
    read, write, value
  }
}

const { read, write } = useLocalStorage('user', {})
write({name: 'yyyy', age: 20 })
console.log(read())
