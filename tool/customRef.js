import { customRef } from 'vue'

// 防抖输入框
export function useDebouncedRef(initialValue, delay = 300) {
  returncustomRef((track, trigger) => {
    let value = initialValue
    let timeoutId = null

    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

// 在组件中使用
const searchQuery = useDebouncedRef('', 500)

// 异步加载数据
export function useAsyncRef(fetcher) {
  return customRef((track, trigger) => {
    let value = null
    let loading = false
    let error = null

    const load = async () => {
      if (loading) return

      loading = true
      error = null
      trigger()

      try {
        value = await fetcher()
      } catch (err) {
        error = err
      } finally {
        loading = false
        trigger()
      }
    }

    return {
      get() {
        track()
        if (value === null && !loading) {
          load()
        }
        return { value, loading, error }
      },
      set(newValue) {
        value = newValue
        trigger()
      }
    }
  })
}

// 使用示例
const userData = useAsyncRef(() => fetch('/api/user').then((res) => res.json()))

// 数据验证

export function useValidatedRef(initialValue, validator) {
  return customRef((track, trigger) => {
    let value = initialValue
    let error = null

    return {
      get() {
        track()
        return { value, error }
      },
      set(newValue) {
        try {
          const validationResult = validator(newValue)
          if (validationResult === true) {
            value = newValue
            error = null
          } else {
            error = validationResult
          }
        } catch (err) {
          error = err.message
        }
        trigger()
      }
    }
  })
}

// 使用示例
const age = useValidatedRef(18, (value) => {
  if (value < 0) {
    return '年龄不能为负数'
  }
  if (value > 150) {
    return '年龄不能超过150岁'
  }
  returntrue
})
