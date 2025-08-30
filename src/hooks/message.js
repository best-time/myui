import { ElMessage, MessageOptions } from 'element-plus'

export function message(message, option) {
  ElMessage({ message, ...option })
}
export function warningMessage(message, option) {
  ElMessage({ message, ...option, type: 'warning' })
}
export function errorMessage(message, option) {
  ElMessage({ message, ...option, type: 'error' })
}
export function infoMessage(message, option) {
  ElMessage({ message, ...option, type: 'info' })
}
