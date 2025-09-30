type RequestInterceptor = (input: RequestInfo, init?: RequestInit) => Promise<[RequestInfo, RequestInit?]>
type ResponseInterceptor = (response: Response) => Promise<Response>

class HttpClient {
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []

  // 添加请求拦截器
  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor)
  }

  // 添加响应拦截器
  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor)
  }

  // 封装的 fetch 方法
  async fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    // 执行所有的请求拦截器
    for (const interceptor of this.requestInterceptors) {
      ;[input, init] = await interceptor(input, init)
    }

    // 发起请求
    let response = await fetch(input, init)

    // 执行所有的响应拦截器
    for (const interceptor of this.responseInterceptors) {
      response = await interceptor(response)
    }

    return response
  }
}

// 使用示例
const httpClient = new HttpClient()

// 添加一个请求拦截器
httpClient.addRequestInterceptor(async (input, init) => {
  const modifiedInit = {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: 'Bearer token'
    }
  }
  return [input, modifiedInit]
})

// 添加一个响应拦截器
httpClient.addResponseInterceptor(async (response) => {
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Request failed: ${errorData.message}`)
  }
  return response
})

// 使用封装的 fetch 发送请求
httpClient
  .fetch('https://api.example.com/data')
  .then((response) => response.json())
  .then((data) => console.log('Data:', data))
  .catch((error) => console.error('Error:', error))
