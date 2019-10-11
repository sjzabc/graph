/**
 *  验证
 */
export const verifyPhone = (phone) => {
  /* 
   *  @param phone 手机号
   *  @returns {boolean} 返回true或false
   */
  var reg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
  return reg.test(phone);
}


export const checkLoginName = (name) => {
  /**
   * 用户名验证 英文或英文数字 
   * @param pname 账号
   * @returns {boolean} 返回true或false
   */
  return /^[A-Za-z0-9]*$/.test(name) && !/(^\d*$)|(^\S+\s+\S+$)/.test(name);
}


export const checkPasswordValidate = (password) => {
  /**
   * JS验证密码，必须是字母和数字结合
   * @param password 密码
   * @returns {boolean} 返回true或false
   */
  return /^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,20}$/.test(password);
}
