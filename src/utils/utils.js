import {
  isNumber
} from "util";

export const utils = state => {

}
export const getLocalTime = (now) => {
  if (!now) return;
  now = new Date(Date.parse(new Date(now)))
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  try {
    var hour = now.getHours();
  } catch (err) {

  }
  console.log(date)
  var minute = now.getMinutes();
  var second = now.getSeconds();
  return year + "-" + `${month<10?'0'+month:month}` + "-" + (date < 10 ? '0' + date : date) + " " + `${hour<10?'0'+hour:hour}` + ":" + `${minute<10?'0'+minute:minute}` + ":" + `${second<10?'0'+second:second}`;
}

/**
 * JS获取当前时间
 * 传入时间戳。转换成时间戳时间
 * @returns {string}
 * @constructor
 */
export const GetCurrentDate = (timestamps = false) => {
  const add_zero = (temp) => {
    if (temp < 10) {
      return "0" + temp;
    }
    return temp;
  }
  //转换后是数值
  var d;
  if (timestamps) {
    if (typeof timestamps === 'string') {
      return
    }
    /* 13位时间戳 */
    if (String(timestamps).length === 13) {
      d = new Date(timestamps)
    }
    /* 10位时间搓 */
    if (String(timestamps).length === 10) {
      d = new Date(timestamps * 1000)
    }
  } else {
    d = new Date();
  }
  var y = d.getYear() + 1900;
  var month = add_zero(d.getMonth() + 1);
  var days = add_zero(d.getDate());
  var hours = add_zero(d.getHours());
  var minutes = add_zero(d.getMinutes());
  var seconds = add_zero(d.getSeconds());
  var str = y + '-' + month + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
  return str;
}
/**
 * BASE64加密
 * @param str
 * @returns {string}
 */
export function base64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

/**
 * BASE64解密
 * @param str
 * @returns {string}
 */
export function base64Decode(str) {
  return decodeURIComponent(escape(atob(str)));
}
