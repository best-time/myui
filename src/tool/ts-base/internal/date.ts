import {zeroFill, isString} from './base';

const ymd = (gutter: string, t: number): string => {
  let date = t ? new Date(t) : new Date();
  let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();
  if (isString(gutter)) {
    return `${year}${gutter}${zeroFill(month)}${gutter}${zeroFill(day)}`;
  }
  return `${year}${zeroFill(month)}${zeroFill(day)}`;
};

const ymdFull = (gutter: string, t: number): string => {
  let date = t ? new Date(t) : new Date();
  const h = date.getHours();
  const i = date.getMinutes();
  const s = date.getSeconds();
  return `${ymd(gutter, t)} ${h}:${zeroFill(i)}:${zeroFill(s)}`;
};

const countDaysInMonth = (year: number, month: number) => {
  var date = new Date();
  date.setFullYear(year, month - 1, 0);
  return date.getDate();
};

export {ymd, ymdFull, countDaysInMonth};
