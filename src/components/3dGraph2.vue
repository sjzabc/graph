<template>
    <div>
        <div class="top">
            <div class="left">
                <input placeholder="搜索" v-model="inputId" @keyup.enter="searchId(inputId,true)">
                <span @click="searchId(inputId,true)" title="搜索">
                    <img src="../assets/3dGraph/搜索.png" alt="">
                </span>
                <!-- <el-button @click="$router.push({path:'/'})" >返回首页</el-button> -->
            </div>
            <div class="right">
                <span @click="refresh" @mouseover="hover('refresh','2')" @mouseout="hover('refresh','')">
                    <img :src="img.refresh" alt="">
                    <span>刷新</span>
                </span>
                <span @click="showGravity=!showGravity" @mouseover="hover('gravity','2')" @mouseout="hover('gravity','')">
                    <img :src="showGravity?img.gravity2:img.gravity" alt="">
                    <span :style="showGravity?'color: #F9AC39;':''">引力</span>
                </span>

            </div>
            <div class="gravity" id="gravity" v-if="showGravity">
                <div>
                    <el-slider v-model="cl" @change="change('node')" height="10" :min="5" :max="30"></el-slider>
                    <span>节点大小</span>
                </div>
                <div>
                    <el-slider v-model="space" height="10" @change="change('space')" :min="3" :max="500"></el-slider>
                    <span>连线长度</span>
                </div>
            </div>
            <div class="legend" v-if="isClick||isInit">
                <span class="node1" v-if="isClick">攻击场景节点</span>
                <span class="node2" v-if="isClick">攻击类型节点</span>
                <span class="node3" v-if="isClick">攻击步骤节点</span>
                <span class="node4" v-if="isClick">其他攻击节点</span>
                <span class="node5">普通节点</span>
                <span class="node6">属性节点</span>
                <span class="node7">未关联节点</span>
            </div>
        </div>
        <div id="3d-graph" class="topo"></div>
         <!-- 显示攻击流程 -->
        <div class="attackAlert" v-if="process">
            <div>
                <div class="title">
                    <img src="../assets/3dGraph/copy 2.png" alt="">
                    <span style="">攻击步骤</span>
                    <i class="el-icon-close" @click="process=false"></i>
                </div>
                <Scroll style="overflow-x:auto;position:absolute;top:44px;left:10px;right:10px;bottom:2px;" ref="scrollBox">
                    <ul slot="page" class="stepList">
                        <li v-for="(item,index) in stepList" class="stepItem" :key="index">
                            <p>
                                <span>攻击步骤{{index+1}}:{{item.type}}</span>
                            </p>
                            <ul>
                                <li>源IP: {{item.src}}</li>
                                <li>目的IP: {{item.dst}}</li>
                                <li>日期: {{item.date}}</li>
                                <li>时间: {{item.time}}</li>
                                <li>类型: {{item.type}}</li>
                                <li style="color:#fff;">来源: <span style="font-weight:600;">{{item.device}}</span></li>
                                <li :title="item.desc">描述: {{item.desc}}</li>
                            </ul>
                        </li>
                    </ul>
                </Scroll>
            </div>
        </div>
        <div class="bottom">
            <div class="right">
                <span @click="runCanvas()">
                    <img :src="img.play" alt="" :title="run?'点击暂停':'点击播放'">
                </span>
            </div>
        </div>
    </div>
</template>
<script>
// @mouseover="pic1 = pic11" @mouseout="pic11 = pic1"
import ForceGraph3D from '3d-force-graph';
// import * as THREE from 'three'
import {CSS2DObject,CSS2DRenderer} from '../utils/THREE/CSS2DRenderer.js'
import blocks from '../datasets/test3d.json';
import blocks2 from '../datasets/test3d2.json';
import ba from '../datasets/ba.json';
import {tDgraphIcon} from './icon.js';
import Scroll from '@/components/scroll'
import { setTimeout } from 'timers';
// import SpriteText from 'three-spritetext';

var THREE = require("three");
// export default Stats;
export default {
    components:{
        Scroll
    },
    data(){
        return {
            elem:'',
            Graph:'',
            initData: {},
            initStore: {
                storeData: [],  //暂存数据id
                storeLinks: [],  //暂存数据连线
                nodeLink:{},    //节点相连字典
                cas:{},
                aes:{},
                sets:[],
                linkPos:{
                    no:{}   //存入每个nodeid对应的连线所在位置
                },  
            },
            graphData: {nodes:[],links:[]},  //blocks
            storeData: [],  //暂存数据id
            storeLinks: [],  //暂存数据连线
            nodeLink:{},    //节点相连字典
            cas:{},
            aes:{},
            sets:[],
            rn: 0,  //判断是否重复
            linkPos:{
                no:{}   //存入每个nodeid对应的连线所在位置
            },    //连线存储位置
            img:{
                refresh: tDgraphIcon.refresh,
                gravity: tDgraphIcon.gravity,
                gravity2: tDgraphIcon.gravity2,
                play: tDgraphIcon.play2
            },
            run: true,
            inputId:'',
            showGravity: false,
            cl:10,
            space:150,
            colors:{
                focus: [],
                linkNodes: [],
                caNodes : [],   //蓝色
                baNodes : [],   //蓝色
                aeNodes : [],   //红色
                noaeNodes : [],   //红色
                atrNodes : [],  //蓝白色
                normalNodes : [],   //黄色
                mainLinks : [], //绿
                atrLinks : [],  //白色
                aeLinks : [],  //红色
                noaeLinks : [],  //红色
            },
            isClick: false,
            isInit: false,
            isfocus: false,
            process: false,
            timeout: '',
            stepTimer:{ //方便清除步骤展示定时器
                step:[],
                node:[]
            },
            stepList: [],
            aeList:[],
            aeOrder:{},
            socketNode: '',
            socketAe: '',
            attackNode:'',
            clickNode:'',
            twoDRenderer:'',
            attackLabel:[],
            testWeb1: '',
            testWeb2: '',
            meshs:{},
            t1: '',
            t2: '',
            status: false,
        }
    },
    created() {
        // this.getData();
        setTimeout(()=>{
            this.getNodeMessage()
        },5000)
        /* this.initNodeWebsocket();
        this.initAeWebsocket(); */
    },
    mounted() {
        window.addEventListener('resize',this.resize);
        this.init();
        this.initGraph();
    },
    destroyed () {
        this.clearConnect();
        this.clearTimer();
        clearTimeout(this.t1);
        clearTimeout(this.t2);
        /* this.socketNode.onclose = (e)=>{
            this.socketNode.close();
            console.log("connection closed (" + e + ")");
        }
        this.socketAe.onclose = (e)=>{
            this.socketNode.close();
            console.log("connection closed (" + e + ")");
        } */
        // this.socketNode.close();
        // this.socketAe.close();
    },
    methods:{
         //存入模型信息，方便取用
        handleMesh(){
            this.Graph.scene().children[2].children.forEach((x,i) => {
                if(x.type == 'Mesh' && x.__data){
                    this.meshs[x.__data.id] = i;
                }
            })
        },
        init(ind){
            ind=='0'||ind==undefined?this.wsOpen('/node_list/','0').then(res => {
                console.log('open node')
                this.socketNode = res;
                this.socketNode.onmessage = e=>{
                    this.getNodeMessage(e)
                }
            }):''
            ind=='1'||ind==undefined?this.wsOpen('/ae_list/','1').then(res => {
                console.log('open ae')
                this.socketAe = res;
                this.socketAe.onmessage = e=>{
                    // console.log(e.data)
                    this.getAeMessage(e)
                }
            }):''
        },
        async wsOpen(url,ind) {
            let _this = this;
            let ws = new WebSocket(`${this.$socket}${url}`);///kg/node_list
            ws.onopen = function(evt) {
                console.log(url);
                this['testWeb'+ind] = setInterval(()=>{ //每隔5秒钟发送一次心跳，避免websocket连接因超时而自动断开
                    ws.send('hello');
                },5000); 
            }; 
            /* ws.onclose = () => {
                console.log('close')
                ws.close();
                this.clearConnect();
            }; */
            ws.onerror = () => {
                console.log("连接错误");
                ws.close();
                this.clearConnect();
                setTimeout(()=>{
                    this.init(ind);
                },10000)
            };
            return ws;
        },
        render(){
            requestAnimationFrame(this.render);
            this.twoDRenderer.render( this.Graph.scene(), this.Graph.camera() );
        },
        render2D(){
            let a = document.getElementById('3d-graph');
            this.twoDRenderer = new THREE.CSS2DRenderer();
            this.twoDRenderer.setSize( a.clientWidth, a.clientWidth );
            this.twoDRenderer.domElement.style.position = 'absolute';
            this.twoDRenderer.domElement.style.top = '0px';
            this.twoDRenderer.domElement.style.zIndex = -1;
            // console.log(document.getElementById('3d-graph'))
            // console.log(this.Graph.scene())
            a.appendChild( this.twoDRenderer.domElement );
            this.twoDRenderer.render( this.Graph.scene(), this.Graph.camera());
            /* let grid = new THREE.GridHelper(1000, 50, 0x64FE00, 0x0C291F); //网格辅助，大小，行距，中心线颜色，网格线条颜色
            this.Graph.scene().add(grid); */
        },
        //  获取数据
        getData(){
            this.$ajax(`${this.$baseUrl}/kg/init`).then((res)=>{
                this.storeData = [];
                this.removeDitto(res[0],true).then(()=>{
                    this.initData = JSON.parse(JSON.stringify(this.graphData));
                    this.initStore = {
                        storeData: JSON.parse(JSON.stringify(this.storeData)),  //暂存数据id
                        storeLinks: JSON.parse(JSON.stringify(this.storeLinks)),  //暂存数据连线
                        nodeLink: JSON.parse(JSON.stringify(this.nodeLink)),    //节点相连字典
                        cas: JSON.parse(JSON.stringify(this.cas)),
                        aes: JSON.parse(JSON.stringify(this.aes)),
                        sets: JSON.parse(JSON.stringify(this.sets)),
                        linkPos: JSON.parse(JSON.stringify(this.linkPos))
                    }
                });
                this.isInit=true;
                this.initGraph();
               /*  setTimeout(()=>{
                    this.handleMesh();
                },500) */
            });
        },
        //数据处理
        handleData(node,links,index){
            this.nodeLink[node.id]=this.nodeLink[node.id]?this.nodeLink[node.id]:{
                type:'',
                index: index,
                source:[],
                target:[]
            }
            let a = this.nodeLink[node.id];
            this.linkPos.no[node.id]?this.linkPos.no[node.id].forEach((i)=>{
                let link = links[i];
                (link.target==node.id&&a.source.indexOf(link.source)==-1)?a.source.push(link.source)
                :(link.source==node.id&&a.target.indexOf(link.target)==-1)?a.target.push(link.target):''
                if(link.desc=='ae'){
                    link.target==node.id?a.type='ae'
                        :link.source==node.id?a.type='ba':''
                }
                if(link.desc=='ba'){
                    link.target==node.id?a.type='ba'
                        :link.source==node.id?a.type='ca':''
                }
            }):'';
            /* if(a.type=='ba'&&a.source.length==0){
                a.type='ca';
            } */
            if(a.type==''){
                node.id.split(":").length==1?a.type='normal':a.type='atr';
            }
        },
        async handleBA(links){
            var store = [],ad={};
            links.forEach((link,i)=>{
                let ca = ba[this.cas[link.source]];
                if(ca&&link.desc=='ae'){    //ba中存在的ca,link.source
                    if(this.sets.indexOf(link.source)==-1){ //每个ca都加上所有的ba和ae
                        this.sets.push(link.source);
                        for(let b in ca['ba']){
                            this.graphData.nodes.push({
                                id: link.source+'+'+b,
                                type: 'ba',
                                name: ca['ba'][b]
                            });
                            this.storeData.push(link.source+'+'+b);
                            store.push({
                                source: link.source,
                                target: link.source+'+'+b, //ba_id
                                desc:'ba'
                            })
                            
                        }
                        for(let e in ca['ae']){ 
                            if(this.aes[i]==undefined){
                                let aeId = link.source+'+'+ca['ae'][e]+'+'+e;
                                let baId = ca['ae'][e];
                                
                                // 添加ae节点
                                this.graphData.nodes.push({
                                    id: aeId,
                                    type: 'ae',
                                    name: ca['ba'][baId]
                                });
                                this.storeData.push(aeId);
                               /*  // 添加相应的属性节点
                                this.graphData.nodes.push({
                                    id: aeId+':id:'+aeId,
                                    type: 'atr',
                                    name: aeId+':id:'+aeId
                                });
                                this.storeData.push(aeId+':id:'+aeId);
                                this.graphData.nodes.push({
                                    id: aeId+':time:'+'2019/8/29',
                                    type: 'atr',
                                    name: aeId+':time:'+'2019/8/29'
                                });
                                this.storeData.push(aeId+':time:'+'2019/8/29');
                                this.graphData.nodes.push({
                                    id: aeId+':sport:'+'1.1.1.1',
                                    type: 'atr',
                                    name: aeId+':sport:'+'1.1.1.1'
                                });
                                this.storeData.push(aeId+':sport:'+'1.1.1.1'); */
                                store.push({
                                    source: link.source+'+'+baId,
                                    target: aeId, 
                                    desc:'ae'
                                })
                                /* store.push({
                                    source: aeId,
                                    target: aeId+':id:'+aeId, 
                                    desc:'id'
                                })
                                store.push({
                                    source: aeId,
                                    target: aeId+':time:'+'2019/8/29', 
                                    desc:'time'
                                })
                                store.push({
                                    source: aeId,
                                    target: aeId+':sport:'+'1.1.1.1', 
                                    desc:'sport'
                                }) */
                               
                            }
                        }
                    }
                    let id = link.source+'+'+ca['ae'][this.aes[link.target]];   //ba_id,如果ae为空会出现问题
                    // console.log('++++++++++++++++++++=')
                    // console.log(link)
                    // console.log(this.aes[link.target])
                    // this.aes['type'][link.target]=id;   //////////////////
                    link.source = this.aes[link.target]?id:link.source;              
                }else if(link.desc=='ae'&&!ca&&this.aes[link.target]){
                    ad[link.source] = ad[link.source]?ad[link.source]:[];
                    ad[link.source].push(link);
                    console.log(',,,,,,,,,,,,,,,,');
                    console.log(link.source);
                    console.log('----------------');
                }
                link.id=link.source+'-'+link.target;
                link.idr=link.target+'-'+link.source;
                if(this.storeLinks.indexOf(link.id)==-1&&this.storeLinks.indexOf(link.idr)==-1){
                    this.rn++;
                    this.storeLinks.push(link.id);
                    this.graphData.links.push(link);
                    let ind = this.graphData.links.length-1;
                    this.linkPos[link.id] = ind;
                    let a = this.linkPos.no;
                    a[link.source]=a[link.source]?a[link.source]:[];
                    a[link.source].indexOf(ind)==-1?a[link.source].push(ind):'';
                    a[link.target]=a[link.target]?a[link.target]:[];
                    a[link.target].indexOf(ind)==-1?a[link.target].push(ind):'';
                }
            })
            ////////////////////////////////////////////////////////////////////////////
            /* if(JSON.stringify(ad) != "{}"){ //将无法判断为ba.json中ca的ca与已存在的ba相连，而不是直接与ae相连
                for(let i in ad){
                    ad[i].forEach((a)=>{
                        a.target = this.aes['type'][link.target];
                    })
                }
            } */
            store.length>0?this.handleBA(store):'';
        },
        async removeDitto(data,t){
            // this.cas={},this.aes={};
            data.nodes.forEach((node,i)=>{
                let arr = node.id.split(':');
                if(arr[1]=='ce_id'){
                    this.cas[arr[0]] = arr[2];
                }
                if(arr[1]=='id'){
                    this.aes[arr[0]] = arr[2];
                    this.aes[arr[2]] = this.aes[arr[2]]?this.aes[arr[2]]:[];
                    this.aes[arr[2]].push(arr[0]);
                }
                let ind = this.storeData.indexOf(node.id);
                if(ind==-1){
                    this.rn++;
                    this.storeData.push(node.id);
                    this.graphData.nodes.push(node);
                }else if(node.id!=node.name){
                    this.graphData.nodes[ind].name =  node.name;//a.name==a.id?dt.name:a.name;
                }
            })
            this.handleBA(data.links);
            this.graphData.nodes.forEach((node,i)=>{
                this.handleData(node,this.graphData.links,i);
                t?this.colors[this.nodeLink[node.id].type+'Nodes'].push(node.id):'';
            })
        },
        clearConnect(){
            console.log(this.testWeb1)
            console.log(this.testWeb2)
            console.log('clearInterval')
            clearInterval(this.testWeb1);
            clearInterval(this.testWeb2);
        },
        // websocket处理
        initNodeWebsocket(){
            this.clearConnect();
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                this.socketNode = new WebSocket(`${this.$socket}/node_list/`);
                // 监听socket连接
                this.socketNode.onopen = ()=>{
                    console.log("连接成功");
                    /* let t = setInterval(function(){ //每隔5秒钟发送一次心跳，避免websocket连接因超时而自动断开
                        this.socketNode.send('hello node');
                    },5000); 
                    this.testWeb.push(t) */
                }
                // 监听socket错误信息
                this.socketNode.onerror = ()=>{
                    console.log("连接错误");
                    this.socketNode.onclose = (e)=>{
                        console.log("connection closed (error)");
                    }
                    setTimeout(()=>{
                        this.initWebsocket()
                    },10000)
                }
                // 监听socket消息
                this.socketNode.onmessage =  this.getNodeMessage;
                // 销毁监听
                this.socketNode.onclose = ()=>{
                     console.log("connection closed (closed)");
                    // this.initNodeWebsocket();
                }
            }
        },
        initAeWebsocket(){
            this.clearConnect();
            this.socketAe = new WebSocket(`${this.$socket}/ae_list/`);
            // 监听socket连接
            this.socketAe.onopen = ()=>{
                console.log("连接成功");
               /*  let t = setInterval(function(){ //每隔5秒钟发送一次心跳，避免websocket连接因超时而自动断开
                        this.socketAe.send('hello ae');
                    },5000); 
                this.testWeb.push(t) */
            }
            // 监听socket错误信息
            this.socketAe.onerror = ()=>{
                console.log("连接错误")
                this.socketAe.onclose = (e)=>{
                    console.log("connection closed (error)");
                }
                setTimeout(()=>{
                    this.initAeWebsocket()
                },10000)
            }
            // 监听socket消息
            this.socketAe.onmessage =  this.getAeMessage;
            // 销毁监听
            this.socketAe.onclose = ()=>{
                console.log("connection closed (closed)");
                // this.initAeWebsocket();
            }
        },
        getNodeMessage(msg){
            // this.clearTimer();
            this.rn = 0;
            this.isInit=false;
            let m = blocks//JSON.parse(msg.data);
            console.log(this.status)
            if(m.length>0){
                clearTimeout(this.t1);
                clearTimeout(this.t2);
                let data = {
                    "nodes":[],
                    "links":[]
                }
                m.forEach((m)=>{
                    data.nodes.push(...m.nodes);
                    data.links.push(...m.links);
                })
                if(!this.status){
                    this.colors={
                        focus: [],
                        linkNodes: [],
                        caNodes : [],   //蓝色
                        baNodes : [],   //蓝色
                        aeNodes : [],   //红色
                        noaeNodes : [],   //红色
                        atrNodes : [],  //蓝白色
                        normalNodes : [],   //黄色
                        mainLinks : [], //绿
                        atrLinks : [],  //白色
                        aeLinks : [],  //红色
                        noaeLinks : [],  //红色
                    };
                    let no = this.graphData.nodes.length-this.initData.nodes.length,len = this.graphData.links.length-this.initData.links.length;
                    this.graphData.nodes.splice(this.initData.nodes.length,no)
                    this.graphData.links.splice(this.initData.links.length,len)
                    // this.graphData = JSON.parse(JSON.stringify(this.initData));
                    this.storeData= JSON.parse(JSON.stringify(this.initStore.storeData)),  //暂存数据id
                    this.storeLinks= JSON.parse(JSON.stringify(this.initStore.storeLinks)),  //暂存数据连线
                    this.nodeLink= JSON.parse(JSON.stringify(this.initStore.nodeLink)),    //节点相连字典
                    this.cas= JSON.parse(JSON.stringify(this.initStore.cas)),
                    this.aes= JSON.parse(JSON.stringify(this.initStore.aes)),
                    this.sets= JSON.parse(JSON.stringify(this.initStore.sets)),
                    this.linkPos= JSON.parse(JSON.stringify(this.initStore.linkPos))
                }
                this.removeDitto(data).then(()=>{
                    //点击ca，再在首页点击传过来的ca和原来的相同，不会重置
                    data.nodes[0]&&this.clickNode!=data.nodes[0].id&&this.nodeLink[data.nodes[0].id].type=='ca'?this.attackNode=data.nodes[0].id:'';
                    if(this.rn>0){
                        this.clearLabel();
                        this.Graph.graphData(this.graphData);
                    }
                });
                this.t1 = setTimeout(()=>{
                    // this.handleMesh();
                    this.clickNode!=data.nodes[0].id?this.searchId(data.nodes[0].id):'';    //不能总调用此方法会陷入点击循环，因为搜索一个点会自动点击，点击若是ca/ae会使websoket再推送数据
                },500)
            }else if(typeof(this.status)=='string'&&this.status.split('=').length==2){
                this.$message.error('没有id为'+this.status.split('=')[1]+'的节点');
            }
            this.status=false;
            this.Graph.nodeRelSize(this.cl);
        },
        getAeMessage(msg){
            this.aeOrder={};
            this.aeList = JSON.parse(msg.data);
            this.aeList.forEach((ae,i)=>{
                this.aeOrder[ae.id]=i;
            })
            /* setTimeout(()=>{
                this.showAttack();
            },2500) */
            // this.showAtack();
        },
        //展示攻击流程
        showAttack(){
            // console.log(this.aeList);
            this.process = true,this.stepList = [];
            let time = 2000, t = [];
            this.aeList.forEach((val,i) => {
                t[i] = setTimeout(()=>{
                    if(i){
                        clearTimeout(t[i-1]);
                        this.stepTimer.step[i-1] = '';
                    }
                    this.stepList.push(val);
                    if(this.$refs.scrollBox){
                        this.$refs.scrollBox.left();
                    }
                },(i+1)*time)
                this.stepTimer.step.push(t);
            });
        },
        // 鼠标移上样式
        hover(type,num){
            this.img[type] = tDgraphIcon[type+num];
        },
        // 播放
        runCanvas(){
            this.run = !this.run;
            this.img.play = this.run?tDgraphIcon.play2:tDgraphIcon.play;
            !this.run?this.Graph.pauseAnimation():this.Graph.resumeAnimation();
        },
        //重力图修改节点
        change(type){
            if(type=='space'){
                // console.log(type)
                this.Graph.d3Force('link').distance(this.space)
                this.Graph.numDimensions(3);
            }else if(type=='node'){
                this.Graph.nodeRelSize(this.cl);
            }
        },
        // 搜索
        searchId(id,a){ //输入搜索传入a=true
            this.clearLabel();
            if(id&&this.graphData){
                a?this.$ajax(`${this.$baseUrl}/send_ca/?id=${id}`):'';   
                a?this.status='search':'';
                if(this.nodeLink[id]!=undefined){
                    let node = this.graphData.nodes[this.nodeLink[id].index];
                    this.handleCamera(node);
                }else if(a){
                    this.status='search='+id
                    // this.$message.error('没有id为'+id+'的节点');
                }
            }else{
                this.Graph.cameraPosition(
                    {}, // new position
                    { x: 0, y:0, z: 0 }, // lookAt ({ x, y, z })
                    2000  // ms transition duration
                );
            }
        },
        // 调整拉近相机
        handleCamera(node){
            this.clearLabel();
            const distance = 1000;
            const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);//Math.hypot返回它的所有参数的平方和的平方根
            this.Graph.cameraPosition(
                { }, // new position    { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
                node, // lookAt ({ x, y, z })
                2000  // ms transition duration
            );
            if(node.id!=this.clickNode){
                this.colors={
                    focus: [],
                    linkNodes: [],
                    caNodes : [],   //蓝色
                    baNodes : [],   //蓝色
                    aeNodes : [],   //红色
                    noaeNodes : [],   //红色
                    atrNodes : [],  //蓝白色
                    normalNodes : [],   //黄色
                    mainLinks : [], //绿
                    atrLinks : [],  //白色
                    aeLinks : [],  //红色
                    noaeLinks : [],  //红色
                };
                // console.log(1111)
                this.isfocus = true;
                this.colors.focus.push(node.id);
                this.colors.linkNodes.push(...this.nodeLink[node.id].source,...this.nodeLink[node.id].target);
                this.Graph.nodeRelSize(this.cl);
                this.t2 = setTimeout(() => {
                    this.onNodeClick(node)
                }, 1500);
            }else{
                this.isfocus = false;
            }
        },
        // 刷新
        refresh(){
            window.location.reload(); 
            /* this.inputId = '';
            this.isClick = false;
            this.getData();
            // this.initWebsocket();
            this.showGravity = false; */
        },
        //创建2d标签
        createAttackLabel(node){
            let type = this.nodeLink[node.id].type;
            let labelDiv = document.createElement('div');
            labelDiv.className = 'attackLabel';
            labelDiv.style = `color: ${type=='ae'?'#FF103F':'#fff'};font-weight: ${type=='ae'?'bold':'normal'};font-size: ${type=='ae'||type=='ca'?'18px':type=='ba'?'14px':'10px'}`;
            labelDiv.id = node.id;
            labelDiv.textContent = this.aeOrder[node.id]!=undefined?`攻击步骤${this.aeOrder[node.id]+1}：${this.aeList[this.aeOrder[node.id]].type}`:node.name;
            let label = new THREE.CSS2DObject( labelDiv );
            label.position.set(0,30,0);    //node.x+20,node.y+100,node.z
            this.Graph.scene().add( label );
            this.twoDRenderer.setSize( document.getElementById('3d-graph').clientWidth, document.getElementById('3d-graph').clientHeight );
            this.attackLabel.push(node);
            return label;
        },
        handleTitle(node){
            let arr = node.id.split(":");
            let a = node.id.split("+");
            // console.log(node)
            let title = node.id==node.name?'':`${node.name}：`;
            if(arr.length>1){
                title += (arr[2]?arr[2]:node.id);
            }else if(a.length>1){
                title += a[a.length-1];
            }else{
                title += node.id;
            }
            return title;
        },
        // 处理颜色
        handleColor(colors,node,link){
            switch(this.nodeLink[node.id].type){
                case 'ca':
                    colors.caNodes.indexOf(node.id)==-1?colors.caNodes.push(node.id):'';
                    break;
                case 'ba':
                    if(link&&link.target.id==node.id&&this.process==true){  //去重，不然这里会出现多条相同的线，增加多余的dom
                        colors.baNodes.indexOf(node.id)==-1?colors.baNodes.push(node.id):'';
                        var t = [];
                        this.linkPos.no[node.id]?this.linkPos.no[node.id].forEach((i)=>{
                            let l = this.graphData.links[i];
                            if(l.source.id==node.id&&l.desc=='ae'){
                                if(this.aeOrder[l.target.id]!=undefined){
                                    let ind=this.aeOrder[l.target.id];
                                    t[ind] = setTimeout(()=>{
                                        if(ind){
                                            clearTimeout(t[ind-1]);
                                            this.stepTimer.step[ind-1]='';
                                        }
                                        this.colors.aeLinks.push(l.id);
                                        colors.aeNodes.indexOf(l.target.id)==-1?colors.aeNodes.push(l.target.id):'';  
                                        l.target.id.split(":")[1]=='ae'?'':this.findAttr(colors,l.target,node);
                                        this.Graph.nodeRelSize(this.cl);
                                    },2000*(this.aeOrder[l.target.id]+1))
                                    this.stepTimer.node.push(t);
                                }else{
                                    this.colors.noaeLinks.push(l.id);
                                    colors.noaeNodes.indexOf(l.target.id)==-1?colors.noaeNodes.push(l.target.id):''; 
                                }
                            }
                        }):'';
                    }else{
                        colors.baNodes.indexOf(node.id)==-1?colors.baNodes.push(node.id):'';
                    }
                    break;
                case 'ae':
                    // this.aeOrder[node.id]?colors.aeNodes.push(node.id):colors.noaeNodes.push(node.id)
                    colors.aeNodes.push(node.id)
                    break;
                case 'normal':
                    colors.normalNodes.push(node.id);
                    break;
                case 'atr':
                    colors.atrNodes.push(node.id);
                    break;
            }
        },
        // 找到节点对应的属性节点
        findAttr(colors,no,node){
            this.linkPos.no[no.id]?this.linkPos.no[no.id].forEach((i)=>{
                let link = this.graphData.links[i];
            // this.graphData.links.forEach((link)=>{
                if(link.source.id == no.id && link.target.id!=node.id){
                    colors.atrLinks.push(link.id);
                    colors.atrNodes.push( link.target.id);
                }
            }):''
        },
        useColor(id){
            if(this.colors.caNodes.indexOf(id)!=-1){
                return '#00B5FF';//'rgba(9,142,255,1)'; // return 'rgba(255,151,48,1)';
            }else if(this.colors.baNodes.indexOf(id)!=-1){
                return '#FF7C7C';//'rgba(221,90,255,1)';
            }else if(this.colors.aeNodes.indexOf(id)!=-1){
                return '#FF103F';//'rgba(255,0,64,1)';
            }else if(this.colors.noaeNodes.indexOf(id)!=-1||this.colors.noaeLinks.indexOf(id)!=-1){
                return '#90DED7';//'rgba(22,252,255,0.8)';
            }else if(this.colors.atrNodes.indexOf(id)!=-1){
                return 'rgba(152,170,233,1)';
            }else if(this.colors.normalNodes.indexOf(id)!=-1){
                return 'rgba(255,224,93,1)';
            }else if(this.colors.focus.indexOf(id)!=-1){
                return 'rgba(255,255,255,1)';
            }else if(this.colors.linkNodes.indexOf(id)!=-1){
                return 'rgba(162,162,198,1)';
            }else if(this.isfocus){
                return 'rgb(90,90,107,1)';
            }else{
                return this.isClick?'rgb(60,63,65,0.3)':'rgba(160,160,160,1)';
            }/* else{
                let r=Math.floor(Math.random()*256);
                let g=Math.floor(Math.random()*256);
                let b=Math.floor(Math.random()*256);
                let a=Math.random();
                // return "rgb("+r+','+g+','+b+','+a+")";
                // return "rgb(60,63,65,0.3)";
                return this.isClick?'rgb(60,63,65,0.3)':"rgb("+r+','+g+','+b+','+a+")";
            } */
        },
        clearLabel(){
            let arr = document.getElementById('3d-graph').children[1].children;
            if(arr.length>0){
                let parent = arr[0].parentElement;
                for(let i=0;i<arr.length;i++){
                    parent.removeChild(arr[i]);
                }
                this.attackLabel.forEach(a=>{
                    // console.log(a.__threeObj.children[0])
                    // a.__threeObj.children[0].dispose();
                    a.__threeObj.remove(a.__threeObj.children[0]);
                })
                this.attackLabel = [];
                // arr.length>0?this.clearLabel():'';
            }
        },
        clearTimer(){
            this.stepTimer.node.forEach((t)=>{
                clearTimeout(t);
            })
            this.stepTimer.step.forEach((t)=>{
                clearTimeout(t);
            })
            this.stepTimer={
                node:[],
                step:[]
            }
            // console.log(this.stepTimer);
        },
        initGraph(){
            this.elem = document.getElementById('3d-graph');
            let WIDTH = document.getElementById('3d-graph').clientWidth;
            let HEIGHT = document.getElementById('3d-graph').clientHeight;
            let colors = this.colors;
            this.Graph = ForceGraph3D()
            (this.elem)
                // .jsonUrl('../datasets/block.json')
                .graphData(this.graphData)
                .backgroundColor('rgba(0,0,0,0)')
                .nodeThreeObject(node => {
                    //(this.isInit&&this.nodeLink[node.id].type!='atr')||(this.aeOrder[node.id]!=undefined&&this.colors.aeNodes.indexOf(node.id)!=-1)
                    if(this.nodeLink[node.id].type!='atr'&&(this.colors.aeNodes.indexOf(node.id)!=-1||this.colors.caNodes.indexOf(node.id)!=-1||this.colors.baNodes.indexOf(node.id)!=-1||this.colors.normalNodes.indexOf(node.id)!=-1)){
                        this.clearLabel(node);
                        this.twoDRenderer.setSize( WIDTH, HEIGHT );
                        return this.createAttackLabel(node);
                    }
                })
                .nodeThreeObjectExtend(true)
                .nodeLabel((node)=>{
                    return this.handleTitle(node);
                })
                .linkLabel((link)=>{
                    // console.log(link);
                    let label = '';
                    let arr = link.target.id.split(":");
                    if(arr.length>1&&link.desc == arr[1]){
                        switch(arr[1]){
                            case 'time':
                                label = '时间';
                                break;
                            case 'src':
                                label = '源设备IP';
                                break;
                            case 'dst':
                                label = '目的设备IP';
                                break;
                            case 'device':
                                label = '检测设备';
                                break;
                            case 'protocol':
                                label = '协议';
                                break;
                            case 'sport':
                                label = '源端口';
                                break;
                            case 'dport':
                                label = '目的端口';
                                break;
                            case 'ca_id':
                                label = '攻击场景';
                                break;
                            case 'ce_id':
                                label = '攻击事件标识';
                                break;
                            case 'ba_id':
                                label = '攻击步骤';
                                break;
                            default:
                                label = arr[1];
                                break;
                        }
                    }else{
                        label = link.desc;
                    }
                    return label;
                })
                // .nodeAutoColorBy('id')
                .nodeColor((node)=>{
                    return this.useColor(node.id);
                })
                .nodeOpacity(0.75)
                .linkColor((link)=>{
                    if(this.colors.mainLinks.indexOf(link.id)!=-1){
                        return 'rgba(53,222,0,1)';
                    }else if(this.colors.atrLinks.indexOf(link.id)!=-1){
                        return 'rgba(255,255,255,1)';
                        // return 'rgba(255,40,248,1)';
                    }else if(this.colors.aeLinks.indexOf(link.id)!=-1){
                        return 'rgba(255,0,64,1)';
                    }else if(this.colors.noaeLinks.indexOf(link.id)!=-1){
                        return '#90DED7';//'rgba(22,252,255,0.8)';
                    }else{
                        return 'rgba(160,160,160,1)';
                    }
                })
                .linkOpacity(0.8)
                .linkWidth((link)=>this.colors.aeLinks.indexOf(link.id)!=-1||this.colors.mainLinks.indexOf(link.id)!=-1 ? 2: 1)
                .width(WIDTH)
                .height(HEIGHT)
                .onNodeHover(node => this.elem.style.cursor = node ? 'pointer' : null)
                .onNodeClick(node => {
                    this.onNodeClick(node);
                })
                .onLinkHover(link => this.elem.style.cursor = link ? 'pointer' : null)
                .onLinkClick(link=>{
                    console.log(link);
                });
                this.Graph.cameraPosition(
                    {}, // new position
                    {x: 0, y:0, z: 0 }, // lookAt ({ x, y, z })
                    3000  // ms transition duration
                );
                this.Graph.d3Force('link').distance((link)=>{
                   /*  if(this.nodeLink[link.source.id].type=='normal'&&this.nodeLink[link.target.id].type=='atr'){
                        return 40;
                    }else if(link.desc!='ae'&&this.nodeLink[link.target.id].type=='atr'){
                        return 80;
                    }else { //if(link.desc=='ba'&&this.nodeLink[link.source.id].type=='ca')
                        return this.space//150;
                    } */
                    return  this.space;
                });  
            // this.Graph.d3Force('link').distance(this.space);
            this.Graph.nodeRelSize(this.cl);
            this.render2D();
            this.render();
        },
        onNodeClick(node){
            console.log(node)
            this.clearLabel();
            // return ;
            this.isClick = true,this.clickNode=node.id;
            if(this.$refs.scrollBox&&this.$refs.scrollBox.scrollEvent){
                this.$refs.scrollBox.scrollEvent.destroy();
                setTimeout(()=>{
                    this.process?this.$refs.scrollBox.init():'';
                },500)
            }
            this.colors = {
                focus: [],
                linkNodes: [],
                caNodes : [],   //蓝色
                baNodes : [],   //
                aeNodes : [],   //红色
                noaeNodes : [],   //红色
                atrNodes : [],  //蓝白色
                normalNodes : [],   //黄色
                mainLinks : [], //绿
                atrLinks : [],  //白色
                aeLinks : [],  //红色
                noaeLinks : [],  //红色
            }
            this.clearTimer();
            this.handleColor(this.colors,node);
            if(this.nodeLink[node.id].type=='ae'||this.nodeLink[node.id].type=='ca'){
                this.status = 'click';
                this.queryNode(node.id);    //websoket会推送该节点相关数据
            }
            node.id==this.attackNode?this.showAttack():this.process = false;

            this.linkPos.no[node.id]?this.linkPos.no[node.id].forEach((i)=>{
                let link = this.graphData.links[i];
                if(link.source.id==node.id||link.target.id==node.id){   //node:该节点
                    let no = link.source.id==node.id?link.target:link.source;   //no:同线另一个节点
                    this.handleColor(this.colors,no,link);
                    if(link.desc=='ae'){
                        // this.aeOrder[node.id]||this.aeOrder[no.id]?this.colors.aeLinks.push(link.id):this.colors.noaeLinks.push(link.id)
                        this.colors.aeLinks.push(link.id)
                    }else if(link.desc=='ba'){
                        this.colors.aeLinks.push(link.id);
                    }else if(no.id.split(":").length==3){
                        this.colors.atrLinks.push(link.id);
                    }else{
                        this.colors.mainLinks.push(link.id);
                    }
                }
            }):'';
            this.Graph.nodeRelSize(this.cl);
        },
        queryNode(id){
            // console.log("nodeid："+id);
            this.$ajax(`${this.$baseUrl}/query_node/?id=${id}`);
        },
        resize(){
            let WIDTH = document.getElementById('3d-graph').clientWidth;
            let HEIGHT = document.getElementById('3d-graph').clientHeight;
            this.Graph.width(WIDTH);    //图谱大小更新
            this.Graph.height(HEIGHT);
            this.twoDRenderer.setSize(WIDTH,HEIGHT); //文字位置更新
        }
    },
}
</script>
<style lang="less">
    .top{
        position: absolute;
        top: 0;
        left: 30px;
        right: 30px;
        // width: 95%;
        color: #fff;
        padding: 5px 10px;
        box-sizing: border-box;
        z-index: 10000;
        .left{
            float: left;
            position: relative;
            >input{
                width:397px;
                height:32px;
                padding: 2px 10px;
                color: #fff;
                background:rgba(1,4,18,1);
                border:1px solid rgba(36,201,231,1);
            }
            >span{
                position: absolute;
                top: 0;//有按钮2.5px;
                left: 362.5px;
                width: 55px;
                height: 36px;
                background: rgba(38,217,247,0.24);
                img{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                }
            }
            >span:hover{
                cursor: pointer;
            }
            >button{
                color: #fff;
                margin-left: 20px;
                background: rgba(38,217,248,0.23);
                border:1px solid rgba(36,201,231,1);
            }
        }
        .right{
            // position: relative;
            float: right;
            width:212px;
            height:35px;
            display: flex;
            background:rgba(38,217,248,0.23);
            opacity:0.7509;
            background: url('../assets/3dGraph/编组.png') center left no-repeat;
            // border: 1px solid rgba(39,218,248,1);
            >span{
                display: inline-block;
                flex: 1;
                font-size:16px;
                font-family:SourceHanSansCN-Normal;
                font-weight:400;
                color:rgba(255,255,255,1);
                display: flex;
                align-items: center;
                justify-content: center;
                border-right: 1px solid rgba(39,218,248,1);
                img{
                    margin-right: 5px;
                }
            }
            >span:hover{
                cursor: pointer;
                color: #F9AC39;
            }
        }
        >.gravity{
            position: absolute;
            right: 10px;
            top: 42px;
            width:192px;
            height:132px;
            padding: 0 10px;
            background:rgba(0,158,248,0.21109999999999998);
            border-radius:1px;
            // opacity:0.21109999999999998;
            >div{
                height: 50%;
                >span{
                    color: #fff;
                    font-size:14px;
                }
                .el-slider__runway{
                    // height:3px;
                }
                .el-slider__bar{
                    background: rgba(30,165,190,1);
                    // height:3px;
                }
                .el-slider__button-wrapper{
                    // top:-17px;
                }
                .el-slider__button{
                    width:11px;
                    height:11px;
                    background:rgba(0,36,66,1);
                    border:2px solid rgba(39,217,248,1);
                }
            }
            >div:first-child{
                border-bottom: 1px solid rgba(30,165,190,0.2481);
            }
        }
        >.legend{
            position: absolute;
            left: 10px;
            top: 50px;
            height: 32px;
            padding: 0 10px;
            background:rgba(0,158,248,0.21109999999999998);
            // border-radius:1px;
            >span{
                margin-right: 10px;
                line-height: 32px;
                font-size: 14px;
            }
            >span::before{
                content: '';
                width: 10px;
                height: 10px;
                display: inline-block;
                border-radius: 50%;
                margin-right: 5px;
            }
            >span.node1::before{
                background: #00B5FF;
            }
            >span.node2::before{
                background: #FF7C7C;
            }
            >span.node3::before{
                background: #FF103F;
            }
            >span.node4::before{
                background: #90DED7;
            }
            >span.node5::before{
                background: rgba(255,224,93,1);
            }
            >span.node6::before{
                background: rgba(152,170,233,1);
            }
            >span.node7::before{
                background: rgb(60,63,65,0.3);
            }
           /*  >span:nth-child(1)::before{
                background: rgba(9,142,255,1);
            }
            >span:nth-child(2)::before{
                background: rgba(255,0,64,1);
            }
            >span:nth-child(3)::before{
                background: rgba(255,224,93,1);
            }
            >span:nth-child(4)::before{
                background: rgba(152,170,233,1);
            }
            >span:nth-child(5)::before{
                background: rgb(60,63,65,0.3);
            } */
        }

    }
    .bottom{
        position: absolute;
        right: 30px;
        bottom:30px;
        height: 10%;
        color: #fff;
        padding: 5px 10px;
        z-index: 10000;
        .right{
            float: right;
            >span:hover{
                cursor: pointer;
            }
        }
    }
    .topo{
        position:absolute;
        top:-102px;
        left:0;
        right:0;
        bottom:0;
        background: transparent;
        overflow: hidden;
        z-index: 2;
    }
    .attackAlert{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 400px;
        height: 340px;
        background: rgba(0, 0, 0, 0.5);
        z-index:10000;
        .yl-box-txt{
            padding-left:0;
        }
        >div{
            box-sizing: border-box;
            text-align: left;
            // transform: translate(-50%,-50%);
            width:100%;
            height:100%;
            background:rgba(6,36,68,0.9);
            border:1px solid rgba(65,140,255,0.8);
            box-shadow:0px -61px 172px 0px rgba(4,127,255,0.28);
            border-radius:3px;
            padding:0 10px;
            >div{
                background:rgba(6,36,68,0.9);
            }
            >.title{
                height: 44px;
                line-height: 44px;
                position: relative;
                // background: #274f7b;
                >img{
                    vertical-align: middle;
                }
                >span{
                    display: inline-block;
                    color:#fff;
                    text-shadow:0px 1px 4px rgba(4,124,255,1);
                    font-size:22px;
                    vertical-align: top;
                    margin-left: 5px;
                }
                >.el-icon-close{
                    color:#fff;
                    position: absolute;
                    top:50%;
                    right:10px;
                    transform: translateY(-50%);
                    font-size: 22px;
                    cursor: pointer;
                    &:hover{
                        opacity: 0.7;
                    }
                }
            }
            >img{
                position: absolute;
                top: 0;
                left: -57px;
                height: 100%;
            }
        }

    }
    .stepList{
        height: 94%;
        padding-top:1.2%;
        width:100%;
        white-space: nowrap;
        // display:flex;
        .stepItem{
            width:48%;
            padding-right:1%;
            height: 100%;
            // height: 100%;
            display: inline-block;
            p{
                height:13%;
                width:106%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                background-repeat: no-repeat;
                background-position:left top;
                background-size:100% 100%;
                font-size: 13px;
                margin-bottom:5%;
                span{
                    width:90%;
                    text-align: center;
                    white-space: nowrap;
                    overflow:hidden;
                    text-overflow: ellipsis;
                }
            }
            ul{
                height: 80%;
                padding:1% 8px;
                color: #b9b5b5;
                font-size: 13px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                li{
                    overflow: hidden;
                    line-height: 28px;
                    white-space: nowrap;
                    overflow:hidden;
                    text-overflow: ellipsis;
                }
            }
        }
        li:nth-child(odd){
            p{
                background-image: url(../assets/3dGraph/step/step3.png);
            }
            ul{
                background:rgba(0,158,248,0.2);
                li{
                    color:#A0E7FF;
                }
            }
        }
        li:nth-child(even){
            p{
                background-image: url(../assets/3dGraph/step/step6.png);
            }
            ul{
                background:rgba(255,176,57,0.2);;
                li{
                    color:#FFEFD7;
                }
            }
        }
        li:nth-child(1){
            p{
                background-image: url(../assets/3dGraph/step/step1.png);
            }
        }
    }
</style>
