export let getOption = (x = ['1','2','3','4','5'] , data = [3, 1, 2, 1,1])=>{
    let option = {
        tooltip:{
            // trigger:'axis'
        },
        xAxis:{
            data: x,
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#329dd1',
                    width:'2'
                }
            }
        },
        yAxis:{
            type : 'value',
            splitLine : {show :false},
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#329dd1',
                    width:'2'
                }
            }
        },
        series:[
            {
                type:'bar',
                barWidth:30,      
                name:'测试',
                itemStyle:{
                    color:'#329dd1'
                },
                data:data
            }
        ]
    }
    return option
}