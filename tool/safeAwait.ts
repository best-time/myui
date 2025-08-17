type SafeAwaitResult<T> = [true, T] | [false, Error]

export async function safeAwait<T>(promise: Promise<T>): Promise<SafeAwaitResult<T>> {
  try {
    const result = await promise
    return [true, result]
  } catch (err: any) {
    const error = err instanceof Error ? err : new Error(String(err))
    return [false, error]
  }
}
