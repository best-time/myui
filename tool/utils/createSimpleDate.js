export function createSimpleDate(_date) {
  const date = _date || new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const YYYY = String(year)
  const MM = String(month).padStart(2, '0')
  const DD = String(day).padStart(2, '0')
  const HH = String(hour).padStart(2, '0')
  const mm = String(minute).padStart(2, '0')
  const ss = String(second).padStart(2, '0')
  return {
    'YYYY-MM-DD HH:mm:ss': `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`,
    'YYYY-MM-DD': `${YYYY}-${MM}-${DD}`,
    'HH:mm:ss': `${HH}:${mm}:${ss}`,
    YMDHms: Number(`${YYYY}${MM}${DD}${HH}${mm}${ss}`),
    YMD: Number(`${YYYY}${MM}${DD}`)
  }
}
export const parseDateString = (dateString) => {
  const match = /(\d\d\d\d)-(\d\d)-(\d\d)/.exec(dateString)
  if (!match) {
    return null
  }
  const year = Number(match[1])
  const month = Number(match[2])
  const date = Number(match[3])
  return new Date(year, month - 1, date)
}
export const parseDatetimeString = (datetimeString) => {
  const match = /(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)/.exec(datetimeString)
  if (!match) {
    return null
  }
  const year = Number(match[1])
  const month = Number(match[2])
  const date = Number(match[3])
  const hour = Number(match[4])
  const minute = Number(match[5])
  const second = Number(match[6])
  return new Date(year, month - 1, date, hour, minute, second)
}
export const nowDate = () => createSimpleDate()['YYYY-MM-DD']
export const nowTime = () => createSimpleDate()['HH:mm:ss']
export const nowDatetime = () => createSimpleDate()['YYYY-MM-DD HH:mm:ss']
//# sourceMappingURL=createSimpleDate.js.map
