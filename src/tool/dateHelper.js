export class DateHelper {
  constructor(date = new Date()) {
    this.date = new Date(date)
  }
  static create(date) {
    return new DateHelper(date)
  }
  format(options = {}) {
    const defaults = { year: 'numeric', month: 'long', day: 'numeric' }
    return this.date.toLocaleDateString('en-US', { ...defaults, ...options })
  }
  formatTime(options = {}) {
    const defaults = { hour: '2-digit', minute: '2-digit', second: '2-digit' }
    return this.date.toLocaleTimeString('en-US', { ...defaults, ...options })
  }
  formatRelative() {
    const now = new Date()
    const diffMs = now - this.date
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)
    if (diffSecs < 60) return 'just now'
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return this.format()
  }
  addDays(days) {
    const newDate = new Date(this.date)
    newDate.setDate(newDate.getDate() + days)
    return new DateHelper(newDate)
  }
  addMonths(months) {
    const newDate = new Date(this.date)
    newDate.setMonth(newDate.getMonth() + months)
    return new DateHelper(newDate)
  }
  startOfDay() {
    const newDate = new Date(this.date)
    newDate.setHours(0, 0, 0, 0)
    return new DateHelper(newDate)
  }
  endOfDay() {
    const newDate = new Date(this.date)
    newDate.setHours(23, 59, 59, 999)
    return new DateHelper(newDate)
  }
  isSameDay(otherDate) {
    const other = new Date(otherDate)
    return this.date.toDateString() === other.toDateString()
  }
  isToday() {
    return this.isSameDay(new Date())
  }
  toISO() {
    return this.date.toISOString()
  }
  valueOf() {
    return this.date.getTime()
  }
}
// Usage examples
const date = DateHelper.create('2024-01-15')
console.log(date.format()) // "January 15, 2024"
console.log(date.formatTime()) // "12:00:00 AM"
console.log(date.formatRelative()) // "2 days ago"
const nextWeek = date.addDays(7)
console.log(nextWeek.format()) // "January 22, 2024"
console.log(date.isToday()) // false
console.log(date.startOfDay().toISO()) // "2024-01-15T00:00:00.000Z"
