export const email = (state) => {
  return
}
export const checkIp = (ip) => {
  var obj = ip;
  var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  var reg = obj.match(exp);
  if (reg == null) {
    return false; //不合法
  } else {
    return true; //合法
  }

}
/* ***************** */
/* 判断IP地址是否合法 */
export var judgeIpIsLegal = function (ipAddr) {
  var regIps = /^(((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[0-9])\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[0-9]))$/;
  return regIps.test(ipAddr);
}
/* IP地址转换为二进制字符串 */
/* 例如：172.16.4.235 --> 10101100000100000000010011101011 */
export var praseIpToBinary = function (ipAddress) {
  var numArray = ipAddress.split(".");
  if (numArray.length != 4) {
    alert("输入的IP有误");
    return;
  }
  var returnIpStr = "";
  for (var i = 0; i < 4; i++) {
    var curr_num = numArray[i];
    var number_Bin = parseInt(curr_num);
    number_Bin = number_Bin.toString(2);
    var iCount = 8 - number_Bin.length;
    for (var j = 0; j < iCount; j++) {
      number_Bin = "0" + number_Bin;
    }
    returnIpStr += number_Bin;
  }
  return returnIpStr;
}
/* 判断子网掩码是否合法 */
/* 子网掩码必须是 1 和 0组成的连续的一段 如 11110000 */
export var judgeSubnetMask = function (ipAddress) {
  var binaryIpString = praseIpToBinary(ipAddress).toString();
  var subIndex = binaryIpString.lastIndexOf("1") + 1;
  var frontHalf = binaryIpString.substring(0, subIndex);
  var backHalf = binaryIpString.substring(subIndex);
  if (frontHalf.indexOf("0") != -1 || backHalf.indexOf("1") != -1) {
    return false;
  } else {
    return true;
  }
}
/* 两个IP地址做 与 操作 返回结果 */
/* 该功能主要用来实现 IP地址和子网掩码 相与，获取当前IP地址的IP地址段 */
/* 以此来验证输入的网关地址是否合法 */
export var getIPsAndResult = function (ipAddr1, ipAddr2) {
  var ipArray1 = ipAddr1.split(".");
  var ipArray2 = ipAddr2.split(".");
  var returnResult = "";
  if (ipArray1.length != 4 || ipArray2.length != 4) {
    alert("输入的IP有误");
    return;
  }
  for (var i = 0; i < 4; i++) {
    var number1 = parseInt(ipArray1[i]);
    var number2 = parseInt(ipArray2[i]);
    returnResult += number1 & number2;
    if (i < 3) {
      returnResult += ".";
    }
  }
  return returnResult;
}
/* 判断网关地址是否合法 */
export var judgeGatewayResult = function (ipAddr, subnetMask, gateway) {
  var andResult1 = getIPsAndResult(ipAddr, subnetMask);
  var andResult2 = getIPsAndResult(gateway, subnetMask);
  if (andResult1 == andResult2) {
    return true;
  } else {
    return false;
  }
}
