<template>
  <div id="force" >
    <!-- <el-button>test</el-button> -->
    <div class="loadState">
        <svg id="svg">
            <!-- 线性渐变 -->
            <linearGradient id="ca" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#8F00D8" />
                <stop offset="100%" stop-color="#250045" />
            </linearGradient>
            <linearGradient id="ca-light" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#DA92FF" />
                <stop offset="100%" stop-color="#E200FF" />
            </linearGradient>
            <linearGradient id="ba" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#00DCE2" />
                <stop offset="100%" stop-color="#003F43" />
            </linearGradient>
            <linearGradient id="ba-light" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#9BFCFF" />
                <stop offset="100%" stop-color="#00F1FF" />
            </linearGradient>
            <linearGradient id="ae" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#D91919" />
                <stop offset="100%" stop-color="#3C0000" />
            </linearGradient>
            <linearGradient id="ae-light" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FF9358" />
                <stop offset="100%" stop-color="#FF0606" />
            </linearGradient>
            <linearGradient id="ae0" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0080FF" />
                <stop offset="100%" stop-color="#000717" />
            </linearGradient>
        </svg>
   </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import store from "../utils/set2d.js";
import * as Data from "../utils/2d_graph.js";
// import test2d from '../datasets/test2d.json';
import test2d2 from '../datasets/test2d2.json';
import { setInterval } from 'timers';
// import kg from '../datasets/kg.json';
export default {
    data() {
        return {
            myChart: '',
            option:{},
            lightNodes:[],
            light: false,
            time:'',
            graph:{
                nodes:[],
                links:[],
                categories:[]
            },
            coGroup:{
                ca:{
                    color: '#8F00D8',
                    lightColor: '#DA92FF',
                    border : '#C88CFC',
                    lightBorder : '#E9CFFF',
                    size: 45,
                    text: {
                      size:'35',
                      x:'60',
                      show: true
                    }
                },
                ba:{
                    color: '#00DCE2',
                    lightColor: '#9BFCFF',
                    border : '#32FFF9',
                    lightBorder : '#C9FFFD',
                    size: 40,
                    text: {
                      size:'32',
                      x:'50',
                      show: true
                    }
                },
                ae:{
                    color: '#D91919',
                    lightColor: '#FF9358',
                    border_normal : '#429AFF',
                    border : '#DE2828',
                    lightBorder : '#FFB8B8',
                    size: 20,
                    text: {
                      size:'20',
                      x:'40',
                      color: '#0080FF',
                      show: true
                    }
                },

            },
            testWeb:'',
        };
    },
    created() {
        this.$ajax(`${this.$baseUrl}/api/undisposal_unit/`).then(res => {
            // console.log(JSON.stringify(res[0]));
            console.log(res);
        })
    },
    mounted() {
        window.addEventListener('resize',this.resize);
        this.init();
    },
    methods: {
        init(){
            let data = {
                nodes: [],
                links: []
            };
            //求得最大宽度和高度
            let dom = document.getElementById("force");
            let width = dom.offsetWidth;
            let height = dom.offsetHeight;
            this.chart = new store({
                el: "#svg",
                zoom: true,
                isNode: true,
                isCurve: true,
                width: width,
                height: height,
                data: data,
                size: 50,
                label: {
                    show: true
                },
                _this: this
            });
            // this.initTopo(test2d[0]);
            // console.log(kg)
            this.getNodeMessage(test2d2);
            /* setInterval(()=>{
                this.getNodeMessage(test2d2);
            },10000) */
            this.wsOpen().then(res => {
                console.log('open')
                this.ws = res;
                this.ws.onmessage = e=>{
                    console.log(e.data)
                    let rd = JSON.parse(e.data)
                    this.getNodeMessage(rd)
                }
                
            })
        },
        initTopo(data){
            this.time?clearInterval(this.time):'';
            this.graph={
                nodes:[],
                links:[],
                categories:[]
            };
            let graph = this.graph;
            let storeData=[],area={},lightNodes={
                ca:[],
                ba:[],
                ae:[]
            };
            data.nodes.forEach((node)=>{
                if(storeData.indexOf(node.id)==-1){
                    if(parseInt(node.tag)===1){
                        lightNodes[node.type].push({
                            itemStyle: {color: `url(#${node.type})`},
                            id: node.id,
                            name: node.name,
                            tag: 1,
                            type: node.type,
                            category: node.type,
                            show: node.type,
                            size: this.coGroup[node.type].size,
                            stroke: this.coGroup[node.type].border,
                            text: this.coGroup[node.type].text
                        });
                        area[node.id]=`light-${lightNodes.length-1}`;
                    }else{
                        // console.log(node.id=='antiy-10005'?'bbbbbbbbbb':'');
                        // console.log(node.id=='antiy-10005'?graph.nodes.length:'');
                        graph.nodes.push({
                            itemStyle: {color: `url(#${node.type=='ae'?'ae0':node.type})`},
                            id: node.id,
                            name: node.name,
                            tag: 0,
                            type: node.type,
                            category: node.type,
                            // show: '',
                            size: this.coGroup[node.type].size,
                            stroke: node.type=='ae'?this.coGroup[node.type].border_normal:this.coGroup[node.type].border,
                            text: this.coGroup[node.type].text
                        });
                        area[node.id]=`normal-${graph.nodes.length-1}`;
                    }
                    graph.categories.push({name: node.type})
                    storeData.push(node.id);
                }else if(node.name!=node.id){
                    console.log('change name')
                    let a = area[node.id].split('-');
                    if(a[0]=='light'&&lightNodes[a[1]].name==lightNodes[a[1]].id){
                        lightNodes[a[1]].name = node.name;
                    }else if(a[0]=='normal'&&graph.nodes[a[1]].name==graph.nodes[a[1]].id){
                        graph.nodes[a[1]].name = node.name;
                    }
                }
            }); 
            graph.nodes.push(...lightNodes['ae'],...lightNodes['ba'],...lightNodes['ca']);
            data.links.forEach((link)=>{
                graph.links.push({
                    source: link.src,
                    target: link.dst,
                    tag: link.tag,
                    id: link.id,
                    linesClass: link.tag=='1'?'Attack':'',
                    color: '#4A90E2',
                    width: 3
                });
            }); 
            console.log(graph);
            this.chart._restart(graph);
            this.chart._scale(0.45);
            this.chart._data_distance(400,this.charge);
            //修改样式
            /*d3.selectAll('path').attr('style','stroke: #4A90E2').attr('stroke-width',2);
             d3.selectAll('circle').attr('r',20).attr('fill','url(#ae0)')//.attr('stroke','');
            d3.selectAll('.typeca').select('circle').attr('r',45).attr('fill','url(#ca)');
            d3.selectAll('.typeba').select('circle').attr('r',40).attr('fill','url(#ba)');
            d3.selectAll('.typeae').select('circle').attr('fill','url(#ae)'); 
            d3.selectAll('tspan').attr('style','font-size: 20px').attr('x',40);
            d3.selectAll('.typeca').select('tspan').attr('style','font-size: 35px').attr('x',60);
            d3.selectAll('.typeba').select('tspan').attr('style','font-size: 32px').attr('x',50);
            d3.selectAll('.typeae').select('tspan').attr('style','font-size: 25px').attr('x',40);*/
            this.showAttack(); 
        },
        charge(a){
            let b = Math.random();
            return parseInt(a.tag)==1?300:500*b;
        },
        showAttack(){
            this.time = setInterval(()=>{
                this.light = !this.light;
                d3.selectAll('.linesAttack').select('path').attr('style',this.light?'stroke: #16F3FF':'stroke: #4A90E2').attr('stroke-width',this.light?6: 3);
                for(let i in this.coGroup){
                    d3.selectAll('g.type'+i).select('circle').attr('fill',`url(#${this.light?i+'-light':i})`).attr('stroke',`${this.light?this.coGroup[i].lightBorder:this.coGroup[i].border}`);
                    d3.selectAll('g.type'+i).select('text').attr('style',`fill: ${this.light?this.coGroup[i].lightColor:this.coGroup[i].color}`);
                }
            },1000)
        },
        resize() {
            let dom = document.getElementById("force");
            let width = dom.clientWidth;
            let height = dom.clientHeight;
            this.chart._resize({ width: width, height: height});
            this.chart.center();
        },
        getNodeMessage(rd){
            let data = {
                nodes: rd[0].nodes,
                links: rd[1].links,
            }
            this.initTopo(data);
        },
        async wsOpen() {
            let _this = this;
            let ws = new WebSocket(`${this.$socket}/ca/kg/node_list`);///kg/node_list
            ws.onopen = function(evt) {
                console.log('sssssssss');
                this.testWeb = window.setInterval(function(){ //每隔5秒钟发送一次心跳，避免websocket连接因超时而自动断开
                    ws.send('hello');
                },5000); 
            };
             ws.onclose = function(evt) {
                console.log("closed")
                clearInterval(this.testWeb)
            };
            this.over = () => {
                ws.close();
            };
            return ws;
        },
    },
    beforeDestroy() {
        this.time?clearInterval(this.time):'';
        clearInterval(this.testWeb);
    },
    destroyed() {
        window.removeEventListener("resize", this.resize);
        this.chart._destroyed();
    },
    //数据距离  this.chart._data_distance(val);
    //分类距离 this.chart._class_distance(val);
        
};
</script>
<style lang="less" scoped>
#force{
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top:0;
    background: #000;
    .loadState{
        width:100%;
        height:100%
    }
}
</style>