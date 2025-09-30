export class StorageManager {
  constructor(prefix = 'app_') {
    this.prefix = prefix
    this.isSupported = this.checkSupport()
  }
  checkSupport() {
    try {
      const test = '__storage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  }
  set(key, value, expirationMinutes = null) {
    if (!this.isSupported) return false
    const item = {
      value,
      type: typeof value,
      timestamp: Date.now(),
      expiration: expirationMinutes ? Date.now() + expirationMinutes * 60 * 1000 : null
    }
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(item))
      return true
    } catch (e) {
      console.warn('Storage quota exceeded:', e)
      this.cleanup()
      try {
        localStorage.setItem(this.prefix + key, JSON.stringify(item))
        return true
      } catch (e2) {
        return false
      }
    }
  }
  get(key, defaultValue = null) {
    if (!this.isSupported) return defaultValue
    try {
      const itemStr = localStorage.getItem(this.prefix + key)
      if (!itemStr) return defaultValue
      const item = JSON.parse(itemStr)
      // Check expiration
      if (item.expiration && Date.now() > item.expiration) {
        this.remove(key)
        return defaultValue
      }
      return item.value
    } catch (e) {
      console.warn('Error parsing stored item:', e)
      this.remove(key)
      return defaultValue
    }
  }
  remove(key) {
    if (!this.isSupported) return false
    localStorage.removeItem(this.prefix + key)
    return true
  }
  has(key) {
    return this.get(key) !== null
  }
  clear() {
    if (!this.isSupported) return false
    Object.keys(localStorage)
      .filter((key) => key.startsWith(this.prefix))
      .forEach((key) => localStorage.removeItem(key))
    return true
  }
  cleanup() {
    if (!this.isSupported) return 0
    let cleaned = 0
    const keys = Object.keys(localStorage).filter((key) => key.startsWith(this.prefix))
    keys.forEach((key) => {
      try {
        const itemStr = localStorage.getItem(key)
        const item = JSON.parse(itemStr)
        if (item.expiration && Date.now() > item.expiration) {
          localStorage.removeItem(key)
          cleaned++
        }
      } catch (e) {
        // Remove corrupted items
        localStorage.removeItem(key)
        cleaned++
      }
    })
    return cleaned
  }
  size() {
    if (!this.isSupported) return 0
    return Object.keys(localStorage).filter((key) => key.startsWith(this.prefix)).length
  }
  usage() {
    if (!this.isSupported) return { used: 0, total: 0 }
    let used = 0
    Object.keys(localStorage)
      .filter((key) => key.startsWith(this.prefix))
      .forEach((key) => {
        used += key.length + localStorage.getItem(key).length
      })
    // Rough estimate of localStorage limit (usually 5-10MB)
    return {
      used,
      usedFormatted: this.formatBytes(used),
      estimated: this.formatBytes(used * 2) // Very rough estimate
    }
  }
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  // Batch operations
  setMultiple(items, expirationMinutes = null) {
    const results = {}
    Object.entries(items).forEach(([key, value]) => {
      results[key] = this.set(key, value, expirationMinutes)
    })
    return results
  }
  getMultiple(keys) {
    const results = {}
    keys.forEach((key) => {
      results[key] = this.get(key)
    })
    return results
  }
}
// Usage examples
const storage = new StorageManager('myApp_') // Set items with different types
storage.set('user', { name: 'John', id: 123 }, 60) // Expires in 1 hour
storage.set('settings', { theme: 'dark', notifications: true })
storage.set('lastLogin', new Date().toISOString(), 24 * 60) // Expires in 1 day

// Get items (automatically typed)
const user = storage.get('user')
const theme = storage.get('settings').theme
const nonExistent = storage.get('missing', 'default value') // Batch operations
const multipleItems = storage.getMultiple(['user', 'settings', 'lastLogin'])
storage.setMultiple({ temp1: 'value1', temp2: 'value2' }, 30) // All expire in 30 minutes
// Maintenance
console.log('Storage size:', storage.size())
console.log('Storage usage:', storage.usage())
console.log('Cleaned items:', storage.cleanup()) // Auto-cleanup on page load
window.addEventListener('load', () => {
  storage.cleanup()
})
