export function formatOptions(sourceOption, externalOption) {
  const option =
    typeof sourceOption === 'string' || typeof sourceOption === 'number' ? { message: sourceOption } : sourceOption
  if (!!externalOption) {
    Object.assign(option, externalOption)
  }
  return option
}
//# sourceMappingURL=formatServiceOptions.js.map
