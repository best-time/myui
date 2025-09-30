export function formatOptions<Option extends Record<string, any>>(
  sourceOption: string | Option,
  externalOption?: Option
): Option {
  const option =
    typeof sourceOption === 'string' || typeof sourceOption === 'number' ? { message: sourceOption } : sourceOption
  if (!!externalOption) {
    Object.assign(option, externalOption)
  }
  return option as any
}
