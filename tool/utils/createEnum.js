/**
 * 创建一个枚举对象
 *
 *        .5.7 20:29
 */
export function createEnum(types) {
  const staticProps = types.reduce((prev, item) => {
    prev[item] = item
    return prev
  }, {})
  return Object.assign(staticProps, { LIST: types })
}
//# sourceMappingURL=createEnum.js.map
