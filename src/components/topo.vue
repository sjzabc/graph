<template>
  <div id="force" >
    <el-button @click='sendMsg' style="position: absolute; left: 10px; top: 10%">发送数据</el-button>
    <div class="loadState">
        <svg id="svg">
        </svg>
   </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import store from "../datasets/js/set2d.js";
// import store from "../../js/setStatic.js";
import test2d2 from '../datasets/js/topo/test2d2.json';
import add from '../datasets/js/topo/add.json';
import {icons} from '../datasets/js/topo/icons.js';
import auth from '../datasets/js/c_auth.js'
export default {
    data() {
        return {
            chart: '',
            time:'',
            option:{},
            lightNodes:{},
            lightLinks:{},
            storeData:{},
            storeLinks:{},
            light: false,
            graph:{
                nodes:[],
                links:[],
            },
            coGroup:{
                ca:{
                    left: '56.5px',
                    // leftLight: '37.5px',
                    opacity: 0.7,
                    text: {
                        size:'40',
                        x:'60',
                        show: true,
                        color: '#934244',//'#843C3E',
                        lightColor: '#FF4242',
                    }
                },
                ba:{
                    left: '46px',
                    // leftLight: '28px',
                    opacity: 0.65,
                    text: {
                        size:'37',
                        x:'50',
                        show: true,
                        color: '#AC7704',
                        lightColor: '#FFD776',
                    }
                },
                ae:{
                    left: '31px',
                    // leftLight: '12px',
                    opacity: 0.4,
                    text: {
                        color: '#eee',//'#D91919',
                        lightColor: '#eee',//'#FF9358',
                        size:'28',
                        x:'40',
                        show: false
                    }
                },
                ip:{
                    left: '41px',
                    // leftLight: '46px',
                    opacity: 0.5,
                    text: {
                        color: '#C877FF',//'#75508D',
                        lightColor: '#C877FF',
                        size:'33',
                        x:'40',
                        show: true
                    }
                },
                cve:{
                    left: '31px',
                    // leftLight: '12px',
                    opacity: 0.4,
                    text: {
                        color: '#C0F3FF',//'#D91919',
                        lightColor: '#C0F3FF',//'#FF9358',
                        size:'28',
                        x:'40',
                        show: false
                    }
                },
                sw:{
                    left: '31px',
                    // leftLight: '12px',
                    opacity: 0.4,
                    text: {
                        color: '#C4D4FF',//'#D91919',
                        lightColor: '#C4D4FF',//'#FF9358',
                        size:'28',
                        x:'40',
                        show: false
                    }
                },
            },
            reconnect: true,
            width: '',
            height: '',
        };
    },
    created() {
    },
    mounted() {
        let dom = document.getElementById("force");
        this.width = dom.offsetWidth;
        this.height = dom.offsetHeight;
        this.init();
        // this.getBasic();
        this.initTopo(test2d2,false);
        // this.getData();
    },
    methods: {
        sendMsg(){
            
            add.nodes.forEach((a,i)=>{
                a.x=this.width/2 + i*100*Math.random()*(i%2==0?1:-1);
                a.y=this.height/2 + i*100*Math.random()*(i%2==0?1:-1);
            })
            // console.log(add)
            this.initTopo(add,true);
            // this.chart._remove()
        },
        getBasic(){
            this.$get(`${this.$url}/event/getTopo/`).then((res)=>{
                // console.log(res)
                this.initTopo(res,false);
            }) 
        },
        getData(){
            if(!this.reconnect){
                return;
            }
            // console.log(`${this.$socket}/ws/event/ws_getTopo/`)
            auth.wsOpen.call(this,`${this.$socket}/ws/event/ws_getTopo/`).then(res => {
                this.ws = res;
                this.ws.onmessage = evt => {
                    this.ws.send(null);
                    let receiveDatas = JSON.parse(evt.data);
                    this.initTopo(receiveDatas,true);
                }
                auth.wsReconnect.call(this,this.ws,this.reconnect,this.getData)
            })
        },
        visibilitychange(e){
            if(document.visibilityState == 'hidden'){
                this.reconnect = false;
                this.ws.close();
            }else{
                this.reconnect = true;
                this.getData();
            }
        },
        init(){
            let data = {
                nodes: [],
                links: []
            };
            this.chart = new store({
                el: "#svg",
                zoom: true,
                width: this.width,
                height: this.height,
                data: data,
                size: 50,
                isCurve: false,
                isNode: false,
                isForce: false,
                label: {
                    show: false
                },
                _this: this
            });
        },
        initTopo(data,isL){
            if(this.time){
                clearInterval(this.time);
                this.time=''
            }
            this.light = false;
            let graph = this.graph;
            let n = this.lightNodes;//存储上一个websocket的闪烁数据
            let l = this.lightLinks;//存储上一个websocket的闪烁数据
            if(n!={}&&isL){  //清除之前闪烁数据,
                for(let i in n){
                    graph.nodes[n[i]].img = icons[graph.nodes[n[i]].type];
                    graph.nodes[n[i]].left = this.coGroup[graph.nodes[n[i]].type]['left'];
                    graph.nodes[n[i]].show ='';
                    graph.nodes[n[i]].opacity = 0.5;
                }
                n = {};
            }
            if(l!={}&&isL){  //清除之前闪烁数据,
                for(let i in l){
                    graph.links[l[i]].linesClass ='';
                }
                l = {};
            }
            /** data.nodes.forEach((node,index)=>{
                let ind = this.storeData[node.id];
                ind?graph.nodes.splice(ind,1):'';
                graph.nodes.push({
                    id: node.id,
                    name: node.name,
                    img: icons[!isL?node.type:(node.type+'Light')],
                    left: this.coGroup[node.type][!isL?'left':'leftLight'],
                    type: node.type,
                    text: this.coGroup[node.type].text,
                    show: !isL?'':node.type,    //class
                    opacity: !isL?0.5:1,
                });
                this.storeData[node.id]= graph.nodes.length-1;  //不能直接等于index，去重会让graph的nodes数量<data的nodes数量，index也不对应
                isL?this.lightNodes[node.id]=graph.nodes.length-1:'';
            }); 
            data.links.forEach((link,index)=>{
                let ind = this.storeLinks[link.id];
                ind?graph.links.splice(ind,1):'';
                graph.links.push({
                    source: link.src,
                    target: link.dst,
                    id: link.id,
                    linesClass: isL?'Attack':'',
                    color: '#4A90E2',
                    width: 3
                });
                this.storeLinks[link.id] = graph.links.length-1;
                isL?this.lightLinks[link.id]=graph.links.length-1:'';
            });  */
            data.nodes.forEach((node,index)=>{
                let ind = this.storeData[node.id];
                if(!this.storeData.hasOwnProperty(node.id)){   //去重
                    graph.nodes.push({
                        id: node.id,
                        name: node.name,
                        img: icons[!isL?node.type:(node.type+'Light')],
                        left: this.coGroup[node.type]['left'],
                        type: node.type,
                        text: this.coGroup[node.type].text,
                        show: !isL?'':node.type,    //class
                        opacity: !isL?this.coGroup[node.type].opacity:1//!isL?0.5:1,
                    });
                    this.storeData[node.id]= graph.nodes.length-1;  //不能直接等于index，去重会让graph的nodes数量<data的nodes数量，index也不对应
                    isL?this.lightNodes[node.id]=graph.nodes.length-1:'';
                }else if(isL){
                    graph.nodes[ind].img = icons[graph.nodes[ind].type+'Light'];
                    graph.nodes[ind].left = this.coGroup[graph.nodes[ind].type]['left'];
                    graph.nodes[ind].show = graph.nodes[ind].type;
                }
                
            }); 
            data.links.forEach((link,index)=>{
                let ind = this.storeLinks[link.id];
                if(!this.storeLinks.hasOwnProperty(link.id)){   //去重
                    graph.links.push({
                        source: link.src,
                        target: link.dst,
                        id: link.id,
                        linesClass: isL?'Attack':'',
                        color: '#4A90E2',
                        width: 3
                    });
                    this.storeLinks[link.id] = graph.links.length-1;
                    // isL?console.log(graph.links[this.storeLinks[link.id]]):''
                    isL?this.lightLinks[link.id]=graph.links.length-1:'';
                }else if(isL){
                    graph.links[ind].linesClass = 'Attack';
                    // console.log(graph.links[ind])
                }
            }); 
            this.chart._restart(graph,0.36);
            // this.chart._data_distance(50,this.charge);
            this.showAttack(); 
        },
        charge(a){
            let b = Math.random();
            return a.linesClass=='Attack'?10:100;
        },
        showAttack(){
            this.time = setInterval(()=>{
                this.light = !this.light;
                d3.selectAll('.linesAttack').select('path').attr('style',this.light?'stroke: #16F3FF;opacity: 0.6':'stroke: #4A90E2;opacity: 0.2').attr('stroke-width',this.light?6: 3);
                for(let i in this.coGroup){
                    d3.selectAll('g.type'+i).style('opacity',this.light?1:0.5)
                    this.light?d3.selectAll('g.type'+i).select('image').attr('xlink:href',icons[i+'Light'])//.attr("style",`transform: translate(-${this.coGroup[i]['leftLight']},-${this.coGroup[i]['leftLight']})`)
                        :d3.selectAll('g.type'+i).select('image').attr('xlink:href',icons[i])//.attr("style",`transform: translate(-${this.coGroup[i]['left']},-${this.coGroup[i]['left']})`);
                    d3.selectAll('g.type'+i).select('text').attr('style',`fill: ${this.light?this.coGroup[i].text.lightColor:this.coGroup[i].text.color}`);
                }
            },2000)
        },
    },
    beforeDestroy() {
    },
    destroyed() {
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
    .loadState{
        width:100%;
        height:100%;
        >svg{
            width:100%;
            height:100%
        }
    }
}
</style>