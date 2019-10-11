import Cookies from 'js-cookie'
/**
 *  cookie
 *  https://github.com/js-cookie/js-cookie
 */
/* 存储登录验证 */
/**
 * @export
 * @returns 获取的Cookie Token值
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * @export
 * @param token 传递的Token值
 * @returns 设置Token到cookie
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token, {
    expires: 7
  })
}
//删除token 的cookie
export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function encodeUnicode(str) {
  /**
   * 转为unicode 编码  
   * @param {str} string 
   * @returns string
   */
  var res = [];
  for (var i = 0; i < str.length; i++) {
    res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "\\u" + res.join("\\u");
}
/** 
 * @param string name 
 * @param val 参数
 * @param time 存储cookie的参数
 */
export function setCookie(name, val, time = 0) {
  return Cookies.set(name, val, time === 0 ? {} : {
    expires: 7
  })
}
/** 
 * @param string 获取指定name
 * @return 获取的cookie值
 */
export function getCookie(name) {
  return Cookies.get(name)
}

/**   
 * @returns  删除指定cookie
 */
export function removeCookie(name) {
  return Cookies.remove(name)
}
