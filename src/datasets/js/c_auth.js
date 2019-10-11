export default {
    calculateDistance( p1x, p1y, p2x, p2y ) {
        var xDistance = p1x - p2x,
            yDistance = p1y - p2y;
        return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
    },
    random( min, max ) {
        return Math.random() * ( max - min ) + min; 
    },
    async wsOpen(url){
        let ws = new WebSocket(url);
        ws.onopen = function(evt) {};
        this.over = () => {
            ws.close();
        };
        return ws;
    },
    wsReconnect(ws,reconnect,closeFun){
        ws.onerror = error => {
            console.log('ws错误了')
            if(reconnect){
                let timeouts = setTimeout(() => {
                    closeFun();//ws关闭后的回调函数
                    clearTimeout(timeouts)
                },10*1000)
            }
        };
        ws.onclose = () => {
            console.log('ws关闭了')
            // ws.close();
            if(reconnect){
                let timeouts = setTimeout(() => {
                    closeFun();//ws关闭后的回调函数
                    clearTimeout(timeouts)
                },10*1000)
            }
        };
    },
    isValidIP(ip) {
        var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        return reg.test(ip);
    },
    isValidURL(url){
        var name = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        if( !(name.test(url)))
        {
            return false;
        }
        else
        {
            return true;
	}
    }
}