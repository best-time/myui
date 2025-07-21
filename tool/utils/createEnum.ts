/**
 * 创建一个枚举对象
 *
 *        .5.7 20:29
 */
export function createEnum<T extends any[] | readonly any[]>(
  types: T
): { [k in T[number]]: k } & { TYPE: T[number]; LIST: T } {
  const staticProps = types.reduce((prev, item) => {
    prev[item] = item
    return prev
  }, {} as any)
  return Object.assign(staticProps, { LIST: types })
}
