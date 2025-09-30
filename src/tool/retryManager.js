// 具有指数退避的健壮异步重试逻辑
export class RetryManager {
  constructor(options = {}) {
    this.options = {
      maxAttempts: 3,
      baseDelay: 1000,
      maxDelay: 30000,
      backoffFactor: 2,
      jitter: true,
      retryCondition: (error) => true,
      onRetry: (attempt, error, delay) => {},
      ...options
    }
  }
  async execute(asyncFunction, ...args) {
    let lastError
    for (let attempt = 1; attempt <= this.options.maxAttempts; attempt++) {
      try {
        const result = await asyncFunction(...args)
        return result
      } catch (error) {
        lastError = error
        // Check if we should retry this error
        if (!this.options.retryCondition(error)) {
          throw error
        }
        // Don't delay after the last attempt
        if (attempt === this.options.maxAttempts) {
          break
        }
        const delay = this.calculateDelay(attempt)
        this.options.onRetry(attempt, error, delay)
        await this.sleep(delay)
      }
    }
    throw lastError
  }
  calculateDelay(attempt) {
    const exponentialDelay = this.options.baseDelay * Math.pow(this.options.backoffFactor, attempt - 1)
    const cappedDelay = Math.min(exponentialDelay, this.options.maxDelay)
    if (this.options.jitter) {
      // Add random jitter (±25% of the delay)
      const jitterRange = cappedDelay * 0.25
      const jitter = (Math.random() - 0.5) * 2 * jitterRange
      return Math.max(0, cappedDelay + jitter)
    }
    return cappedDelay
  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  // Convenience method for HTTP requests
  static async retryFetch(url, options = {}, retryOptions = {}) {
    const retryManager = new RetryManager({
      retryCondition: (error) => {
        // Retry on network errors or 5xx server errors
        if (error.name === 'TypeError') return true // Network error
        if (error.status >= 500) return true // Server error
        if (error.status === 429) return true // Too many requests
        return false
      },
      ...retryOptions
    })
    return retryManager.execute(async () => {
      const response = await fetch(url, options)
      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
        error.status = response.status
        error.response = response
        throw error
      }
      return response
    })
  }
}

// 使用

// Specialized retry managers for common scenarios
class DatabaseRetryManager extends RetryManager {
  constructor(options = {}) {
    super({
      maxAttempts: 5,
      baseDelay: 500,
      retryCondition: (error) => {
        // Retry on connection errors, timeouts, and deadlocks
        const retryableErrors = ['ConnectionError', 'TimeoutError', 'DeadlockError']
        return retryableErrors.some((errorType) => error.name.includes(errorType))
      },
      onRetry: (attempt, error, delay) => {
        console.log(`Database operation failed (attempt ${attempt}), retrying in ${delay}ms:`, error.message)
      },
      ...options
    })
  }
}
class APIRetryManager extends RetryManager {
  constructor(options = {}) {
    super({
      maxAttempts: 3,
      baseDelay: 1000,
      maxDelay: 10000,
      retryCondition: (error) => {
        // Don't retry client errors (4xx), except rate limiting
        if (error.status >= 400 && error.status < 500 && error.status !== 429) {
          return false
        }
        return true
      },
      onRetry: (attempt, error, delay) => {
        console.log(`API call failed (attempt ${attempt}), retrying in ${delay}ms:`, error.message)
      },
      ...options
    })
  }
}
// Usage examples
// Basic retry for any async function
const retryManager = new RetryManager({
  maxAttempts: 3,
  baseDelay: 1000,
  onRetry: (attempt, error, delay) => {
    console.log(`Attempt ${attempt} failed, retrying in ${delay}ms`)
  }
})
async function unreliableFunction() {
  if (Math.random() < 0.7) {
    throw new Error('Random failure')
  }
  return 'Success!'
}
try {
  const result = await retryManager.execute(unreliableFunction)
  console.log(result)
} catch (error) {
  console.log('All retry attempts failed:', error.message)
}

// HTTP requests with retry
async function fetchWithRetry() {
  try {
    const response = await RetryManager.retryFetch(
      'https://api.example.com/data',
      { method: 'GET', headers: { Authorization: 'Bearer token' } },
      { maxAttempts: 5, baseDelay: 2000 }
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Request failed after all retries:', error)
    throw error
  }
}
// Database operations with specialized retry logic
const dbRetry = new DatabaseRetryManager()
async function saveUser(userData) {
  return dbRetry.execute(async () => {
    // Simulate database operation
    if (Math.random() < 0.3) {
      const error = new Error('Database connection failed')
      error.name = 'ConnectionError'
      throw error
    }
    return { id: 123, ...userData }
  })
}
// API calls with rate limiting awareness
const apiRetry = new APIRetryManager({
  maxAttempts: 5,
  baseDelay: 2000,
  onRetry: (attempt, error, delay) => {
    if (error.status === 429) {
      console.log(`Rate limited, waiting ${delay}ms before retry ${attempt}`)
    }
  }
})
async function callAPI(endpoint, data) {
  return apiRetry.execute(async () => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const error = new Error(`API Error: ${response.statusText}`)
      error.status = response.status
      throw error
    }
    return response.json()
  })
}
