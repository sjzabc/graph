const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
}
const count = 10
export default {
  chartColors,
  count,
  ipToNumber: function (ip) {
    let num = 0;
    if (ip == "") {
      return '';
    }
    let aNum = ip.split(".");
    if (aNum.length != 4) {
      return num;
    }
    num += parseInt(aNum[0]) << 24;
    num += parseInt(aNum[1]) << 16;
    num += parseInt(aNum[2]) << 8;
    num += parseInt(aNum[3]) << 0;
    num = num >>> 0; //这个很关键，不然可能会出现负数的情况
    return num;
  },

  numberToIp: function (number) {
    let ip = "";
    if (number <= 0) {
      return ip;
    }
    let ip3 = (number << 0) >>> 24;
    let ip2 = (number << 8) >>> 24;
    let ip1 = (number << 16) >>> 24;
    let ip0 = (number << 24) >>> 24;

    ip += ip3 + "." + ip2 + "." + ip1 + "." + ip0;

    return ip;
  },
  isIp: function (ip) {
    let re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return re.test(ip);
  }
}
