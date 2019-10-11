export default {
    //服务分类
    async getClass(){
        return await this.$ajax(`${this.$url}/dashboardNum/getServiceNum`).then(res=>{
            if(res.ret_code == 0){
            return res.data.infos
            //   this.blokData = res.data.infos
            }
        })
    },
    // 仪表
    async getMain(){
        return await this.$ajax(`${this.$url}/dashboardNum/getMainData`).then(res=>{
            if(res.ret_code == 0){
                return res.data
                // res.data.left = Number(res.data.left*100).toFixed(2)
                // res.data.right = Number(res.data.right*100).toFixed(2)
                // console.log(res.data)
                // this.percent = res.data
            }
        })
    },
    //流量获取
    async getFlow(){
        return await this.$ajax(`${this.$url}/dashboardNum/getAnyFlow`).then(res=>{
            if(res.ret_code == 0){
                return res.data
            }
        })
    },
    //漏洞
    async loopHole(){ 
        return await this.$ajax(`${this.$url}/dashboardNum/getVuln`).then(res=>{
            if(res.ret_code == 0){
                return res.data
            }
        })
    },
    //占用率
    async getRate(){
        return await this.$ajax(`${this.$url}/asset/getServerStatus`).then(res=>{
            if(res.ret_code == 0){
                return res.status
            }
        })
    },
    //转换时间戳
    formatDate(timeStamp, str) {
        let t = new Date(timeStamp);
        let obj = {
            // yyyy, 年份2017
            yyyy: t.getFullYear(),
            // yy, 年份17
            yy: ("" + t.getFullYear()).slice(-2),
            // 月份，9
            M: t.getMonth() + 1,
            // 月份，补满两位，09
            MM: ("0" + (t.getMonth() + 1)).slice(-2),
            // 日期，5
            d: t.getDate(),
            // 日期，补满两位，05
            dd: ("0" + t.getDate()).slice(-2),
            // 24制小时，13
            H: t.getHours(),
            //  24制小时，补满两位，13
            HH: ("0" + t.getHours()).slice(-2),
            // 12制小时，1
            h: t.getHours() % 12,
            //  12制小时，补满两位，01
            hh: ("0" + t.getHours() % 12).slice(-2),
            // 分钟，14
            m: t.getMinutes(),
            // 分钟，补满两位，14
            mm: ("0" + t.getMinutes()).slice(-2),
            // 秒,20
            s: t.getSeconds(),
            // 秒，补满两位，20
            ss: ("0" + t.getSeconds()).slice(-2),
            //  星期
            w: ["日", "一", "二", "三", "四", "五", "六"][t.getDay()]
        };
        return str.replace(/([a-z]+)/gi, function($1) {
            return obj[$1];
        });
    },
    //小数转换百分比
    getPercent(num){
        let str=Number(num*100).toFixed(0);
        // if(!num.toString().includes('.')){
        //     str=Number(num*100)
        // }
        return str;
    },
    //正则判断ip地址
    testIp(ip){
        let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        return reg.test(ip);
    },
    testPhone(phone){
        let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        if (!phoneReg.test(phone)) {
            return false;
        }else{
            return true;
        }
    },
    testEmail(email){
        if (email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1){
            return true;
        }else{
            return false;
        }
    },
    timeDiff(start,end){
        let startTime = new Date(start.replace(/-/g,'/'));
        let endTime = new Date(end.replace(/-/g,'/'));
        return endTime.getTime() - startTime.getTime() > 86400 *10 *1000 ? false : true;
    },
    //验证特殊字符
    testDetail(content){
        let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        console.log(pattern.test(content))
        if(pattern.test(content)){
            return false;
        }else{
            return true;
        }
    },
    countFont(str,charset){
        let realLength = 0;
        let len = str.length;
        let charCode = -1;
        for(let i = 0; i < len; i++){
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) { 
                realLength += 1;
            }else{ 
                // 如果是中文则长度加2
                realLength += 2;
            }
        } 
        return realLength;
    }
}