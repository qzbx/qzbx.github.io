import { Date } from "./assets";

const zeroPadding: (num: Number) => String = (num) => { // 2桁のゼロパディング
  return ("00" + String(num)).slice(-2);
};

export const dateToStr: (date: Date) => String = (date) => { // 日付を文字列に
  return String(date.y) + "/" + zeroPadding(date.m) + "/" + zeroPadding(date.d);
};
