<template>
    <div class="c_index">
        <div id="3d-graph" class="topo">
        </div>
    </div>
</template>
<script>

import test3d from '../datasets/test3d2.json';
import blocks from '../datasets/blocks.json';
var THREE = require("three");
var MeshLine = require('three.meshline');
import ForceGraph3D from '3d-force-graph';
import SpriteText from 'three-spritetext';
import {CSS2DObject,CSS2DRenderer} from '../utils/THREE/CSS2DRenderer.js';
import {createAtmosphereMaterial} from '../utils/THREE/threex.atmospherematerial.js';

export default {
    data(){
        return {
            testWeb:'',     //定时器，定时向服务端发送数据，防止断连
            twoDRenderer:'',
            graphData: {},  //力导图数据
            storeData: [],  //存入所有节点id，去重时用
            nodeLink:{},    //处理数据，存入分析类型，连线相关节点id
            elem: '',
            Graph: '',
            get:'',
            distance: 800,  //镜头距离
            lightNodes:[],  //点亮节点id
            meshs:{},   //存入graph加载后场景中的mesh信息，{nodeid: mesh}
            attack : [],//攻击数据
            tim:{   //定时器
                intval:[],
                out:[]
            },
            meshGroup:{ //存入自定义模型，方便复用
                node:{
                    ca:{
                        geometry:'',
                        material:{},
                        children:{}
                    },
                    ae:{
                        geometry:'',
                        material:{},
                        children:{}
                    },
                    normal:{
                        geometry:'',
                        material:'',
                        mesh:'',
                    },
                    atr:{
                        geometry:'',
                        material:'',
                        mesh:'',
                    },
                },
                text:{  
                    geometry:'',
                    material:''
                },
                shader:{
                    ca:{
                        geometry:'',
                        material:'',
                        mesh:''
                    },
                    ae:{
                        geometry:'',
                        material:'',
                        mesh:''
                    },
                    atr:{
                        geometry:'',
                        material:''
                    },
                },
                line:{
                    geometry:'',
                    liine:'',
                    material:''
                },
                texture: ''
            },
            vertexShader:'',
            fragmentShader:'',
            materialGroup:{},   //存入每个攻击步骤的ca/ae的属性节点的复用材质{aeid: material}
            isLight: false, //是否点亮
            cg:[    //攻击步骤的颜色
                '#38F6F1',//'#3AFFFA',
                // '#FFD422',
                '#BE57F0',//'#FF2FEC',//'#ff6363',
                '#4EB3FF',//'#FF1D6D',
                '#5C6AFF',//'#8062FF',//'#72beff',
                '#F3DE6B',//'#28FF4D',
                '#FF6F6F'//'#FFEB27'//'#ea82ff',
            ],
            colors:[],
            attackIndex:''
        }
    },
    created(){
        this.initGM();  //初始化模型
        // console.log('THREEx')
        // console.log(THREEx)
    },
    beforeDestroy() {
        this.clearTime();
        clearInterval(this.testWeb);
    },
    destroyed () {
    },
    methods:{
         //初始化模型和材质
        initGM(a){
            let geometry1 = new THREE.SphereBufferGeometry( 25, 32, 32 );//ca
            let text = new THREE.SphereBufferGeometry( 10 ); 
            let textM = new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 });
            this.meshGroup['text']['geometry'] = text;
            this.meshGroup['text']['material'] = textM;
            
            this.vertexShader	= [
                'varying vec3	vVertexWorldPosition;',
                'varying vec3	vVertexNormal;',

                'varying vec4	vFragColor;',

                'void main(){',
                '	vVertexNormal	= normalize(normalMatrix * normal);',//将法线转换到视图坐标系中

                '	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;',//将顶点转换到世界坐标系中

                '	// set gl_Position',
                '	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
                '}'

            ].join('\n');
           
            this.fragmentShader	= [
                'uniform vec3	glowColor;',
                'uniform float	coeficient;',
                'uniform float	power;',

                'varying vec3	vVertexNormal;',
                'varying vec3	vVertexWorldPosition;',

                'varying vec4	vFragColor;',

                'void main(){',
                '	vec3 worldVertexToCamera= cameraPosition - vVertexWorldPosition;',	//世界坐标系中顶点位置到相机位置到的距离
                '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldVertexToCamera, 0.0)).xyz;',//视图坐标系中从相机位置到顶点位置的距离
                '	viewCameraToVertex	= normalize(viewCameraToVertex);',//规一化
                '	float intensity		= coeficient + dot(vVertexNormal, viewCameraToVertex);',
                '	if(intensity > 0.55){ intensity = 0.0;}',
                '	gl_FragColor		= vec4(glowColor, intensity);',
                '}'//vVertexNormal视图坐标系中点的法向量
                //viewCameraToVertex视图坐标系中点到摄像机的距离向量
                //dot点乘得到它们的夹角的cos值
                //从中心向外面角度越来越大（从锐角到钝角）从cos函数也可以知道这个值由负变正，不透明度最终从高到低
            ].join('\n');
            let sphere_out1 =  geometry1.clone();//new THREE.SphereBufferGeometry( 27, 32, 32 ); //ca
            sphere_out1.scale(1.08,1.08,1.08);  //1.08
            let sphere_out2 =  geometry1.clone();//new THREE.SphereBufferGeometry( 17, 32, 32 ); //ae/normal
            sphere_out2.scale(0.68,0.68,0.68);  //0.68
            let sphere_out3 =  geometry1.clone();//new THREE.SphereBufferGeometry( 10, 32, 32 ); //atr
            sphere_out3.scale(0.38,0.38,0.38); //0.4
            let material_out1	= new THREE.ShaderMaterial({    //ca
                uniforms: {
                    coeficient	: {
                        type	: "f",
                        value	: 0.0
                    },
                    power		: {
                        type	: "f",
                        value	: 4
                    },
                    glowColor	: {
                        type	: "c",
                        value	: new THREE.Color('#11eed8')
                    }
                },
                vertexShader	: this.vertexShader,
                fragmentShader	: this.fragmentShader,
                blending	: THREE.NormalBlending,
                transparent	: true
            });
            let material_out2	= new THREE.ShaderMaterial({    //ae
                uniforms: {
                    coeficient	: {
                        type	: "f",
                        value	: 0.0
                    },
                    power		: {
                        type	: "f",
                        value	: 4
                    },
                    glowColor	: {
                        type	: "c",
                        value	: new THREE.Color('#fd2121')
                    }
                },
                vertexShader	: this.vertexShader,
                fragmentShader	: this.fragmentShader,
                blending	: THREE.NormalBlending,
                transparent	: true
            });
            let material_out4	= new THREE.ShaderMaterial({    //atr
                uniforms: {
                    coeficient	: {
                        type	: "f",
                        value	: 0.0
                    },
                    power		: {
                        type	: "f",
                        value	: 4
                    },
                    glowColor	: {
                        type	: "c",
                        value	: new THREE.Color('#d7d4d3')
                    }
                },
                vertexShader	: this.vertexShader,
                fragmentShader	: this.fragmentShader,
                blending	: THREE.NormalBlending,
                transparent	: true
            });
            this.meshGroup['shader']['ca']['geometry'] = sphere_out1;
            this.meshGroup['shader']['ca']['material'] = material_out1;
            this.meshGroup['shader']['ca']['mesh'] = new THREE.Mesh( sphere_out1, material_out1);
            this.meshGroup['shader']['ae']['geometry'] = sphere_out2;
            this.meshGroup['shader']['ae']['material'] = material_out2;
            this.meshGroup['shader']['ae']['mesh'] = new THREE.Mesh( sphere_out2, material_out2);
            this.meshGroup['shader']['atr']['geometry'] = sphere_out3;
            this.meshGroup['shader']['atr']['material'] = material_out4;
        },
        //处理数据初始化图形
        addData(res,init){
            console.log(res)
            if(this.Graph){ //websocket传新数据之前先清除原来的模型材质定时器
                this.clearTime();
                this.clearMesh(this.Graph.scene());
                this.Graph.renderer().dispose();
                this.Graph.renderer().forceContextLoss();
                console.log(this.Graph.scene())
                console.log(this.Graph.renderer())
            }
            this.attack = [];
            this.lightNodes = [];
            let data = {
                "nodes":[],
                "links":[]
            }
            res.forEach((m,i)=>{
                m.type=='ca'?this.nodeLink[m.nodes[0].id] = {
                    type: m.type,
                    source:[],
                    target:[]
                }:''
                if(m.type!='normal'){
                    this.nodeLink[m.nodes[0].id] = this.nodeLink[m.nodes[0].id]&&this.nodeLink[m.nodes[0].id].type?this.nodeLink[m.nodes[0].id]:{
                        type: m.type,
                        source:[],
                        target:[]
                    }
                    this.attack.indexOf(m.nodes[0].id)==-1?this.attack.push(m.nodes[0].id):'';
                }
                data.nodes.push(...m.nodes);
                data.links.push(...m.links);
            })
            this.storeData = [];
            this.graphData = {
                "nodes":[],
                "links":data.links
            };
            // 去重
            data.nodes.forEach((dt,ind)=>{
                let index = this.storeData.indexOf(dt.id);
                if(index==-1){
                    this.storeData.push(dt.id);
                    this.graphData.nodes.push(dt);
                    this.handleData(dt,data.links);
                }else{
                    let a = this.graphData.nodes[index];
                    a.name =  a.name==a.id?dt.name:a.name;
                }
            })
            // console.log(JSON.stringify(this.graphData))
            this.initGraph().then(res => {
                this.init();
            })
        },
        rotate(){
            // camera orbit
            let angle = 0;
            let i1 = setInterval(() => {
                this.Graph.cameraPosition({
                    x: this.distance * Math.sin(angle),
                    z: this.distance * Math.cos(angle)
                });
                angle += Math.PI / 300;
            }, 50);
            this.tim.intval.push(i1)
        },
        init(){
            let t4 = setTimeout(() => {
                this.handleMesh();
                clearTimeout(t4);
            },1000)
            let time = this.graphData.nodes.length>99?1500*(this.graphData.nodes.length/100):1500;
            let t6 = setTimeout(()=>{
                this.rotate();
                this.showAttack();
                clearTimeout(t6);
            },time)
        },
        clearColors(){
            this.attack.forEach((id,i)=>{
                this.colors[i]=[];
            })
        },
         //处理亮/暗操作，子方法
        shine(mesh,a,isl,isatr){
            if(isl){
                // console.log(mesh)
                // mesh.__data.id
                if(this.attackIndex){
                    this.clearColors();
                    this.colors[this.attackIndex].push(mesh.__data.id);
                    this.Graph.nodeOpacity(1);
                }else{
                    mesh.material.opacity=1;
                    mesh.material.color=new THREE.Color(a.lightColor);
                }
                // mesh.add(this.haloOutside(a,isatr));
            }else{
                if(this.attackIndex){
                    this.clearColors();
                    this.Graph.nodeOpacity(0.9);
                }else{
                    mesh.material.opacity=0.9;
                    mesh.material.color=new THREE.Color(a.color);
                }
                // mesh.remove(mesh.children[mesh.children.length-1]);
            }
        },
        // 清除单个模型材质
        removeMesh(mesh,scene){
            if(mesh.geometry){
                mesh.geometry.dispose();
                mesh.material.dispose();
            }
            scene.remove(mesh);
        },
        // 闪烁，子方法
        twinkling(id,ind,isLight){
            let aeMesh = this.Graph.scene().children[2].children[this.meshs[id]];
            let ae = this.nodeLink[aeMesh.__data.id];
            let co = {
                color: ae.color,
                lightColor: this.cg[ind],
                type: ae.type
            }
            this.shine(aeMesh,co,isLight);
            this.nodeLink[id].target.forEach((i,index)=>{
                let mesh = this.Graph.scene().children[2].children[this.meshs[i]];
                // console.log(mesh)
                if(this.nodeLink[i].type=='atr'){
                    // console.log(!isLight?'关灯':'开灯')
                    let a = this.nodeLink[mesh.__data.id];
                    let cr = {
                        aeid: id,
                        color: a.color,
                        lightColor: this.cg[ind],
                        type: a.type,
                    }
                    mesh.children.length==0?mesh.add(this.addSpriteText(mesh.__data,a.size,this.cg[ind])):'';
                    this.shine(mesh,cr,isLight,true);
                    /* if(index==0){
                    }else{
                        // isLight?mesh.add(this.haloOutside(cr,true)):this.removeMesh(mesh.children[mesh.children.length-1],mesh);//mesh.remove(mesh.children[mesh.children.length-1])
                    } */

                }
            })
        },
         // 展示闪烁，子方法
        showShine(){
            let time2 = 4000;
            let t = '',attack = this.attack,t3 ='';
            attack.forEach((id,ind)=>{
                t3 = setTimeout(()=>{
                    this.attackIndex = ind;
                    if(t){
                        clearInterval(t);
                        if(!this.isLight){
                            this.twinkling(attack[ind-1],ind-1,false);
                        }
                    }
                    this.isLight = true;
                    t = setInterval(()=>{
                        this.twinkling(id,ind,this.isLight);
                        this.isLight = !this.isLight;
                    },700)
                    this.tim.intval.push(t)
                    if(ind==attack.length-1){
                        let tt = setTimeout(()=>{
                            clearInterval(t);
                            if(!this.isLight){
                                this.twinkling(id,ind,false);
                            }
                            clearTimeout(tt);
                        },3800)
                    }
                },ind*time2)
                this.tim.out.push(t3)   //在timeout结束时clear会出现错误，无法遍历attack所有
            })
            // }
        },
        //展示攻击流程
        showAttack(){
            let attack = this.attack;
            let isl = true; //是否闪烁
            // 初始闪烁
            let t1 = setInterval(()=>{
                // this.Graph.nodeOpacity(0.2)
                this.attack.forEach((i)=>{
                    let mesh = this.Graph.scene().children[2].children[this.meshs[i]];
                    let a = this.nodeLink[mesh.__data.id];
                    this.shine(mesh,a,isl); //处理亮/暗操作
                })
                isl = !isl;
            },500)
            this.tim.intval.push(t1);
            //轮流闪烁
            let t2 = setTimeout(()=>{
                if(!isl){   //如果isl为false这说明闪烁完成后并没有回复暗淡，同理之后的islight
                    this.attack.forEach((i)=>{
                        let mesh = this.Graph.scene().children[2].children[this.meshs[i]];
                        let a = this.nodeLink[mesh.__data.id];
                        this.shine(mesh,a,isl);
                    })
                }
                clearInterval(t1);
                this.showShine();   //展示闪烁
                let i = setInterval(()=>{   //根据攻击步骤，定时回放
                    this.showShine();
                },this.attack.length*5000)//30000
                this.tim.intval.push(i)
                clearTimeout(t2);
            },7000) //7000
            this.tim.out.push(t2);
        },
         //数据处理
        handleData(node){ 
            this.nodeLink[node.id]=this.nodeLink[node.id]?this.nodeLink[node.id]:{
                type:'',
                source:[],
                target:[],
                mesh: '',
            }
            let a = this.nodeLink[node.id];
            let links = this.graphData.links;
            links.forEach((link)=>{
                (link.target==node.id&&a.source.indexOf(link.source)==-1)?a.source.push(link.source)
                :(link.source==node.id&&a.target.indexOf(link.target)==-1)?a.target.push(link.target):''
                if(link.desc=='ae'){
                    link.target==node.id?a.type='ae'
                        :link.source==node.id?a.type='ca':''
                }
            })
            if(a.type==''){
                node.id.split(":").length==1?a.type='normal':a.type='atr';
            }
            return this.handleSizeColor(this.nodeLink[node.id]);
        },
        //处理显示文字，时间戳转时间等
        handleTitle(node){
            let arr = node.id.split(":");
            // console.log(node)
            let title = node.id==node.name?'':`${node.name}`,label='';
            if(arr[2]){
                if(arr[1]=='time'){
                    let time = new Date(parseInt(arr[2])*1000);
                    let y = time.getFullYear();
                    let m = time.getMonth()+1;
                    let d = time.getDate();
                    let h = time.getHours();
                    let mm = time.getMinutes();
                    let s = time.getSeconds();
                    let add0 = (m)=>{return m<10?'0'+m:m }
                    title =  y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
                }else{
                    title = (arr[1]=='ca_id'||arr[1]=='ae_id'||arr[1]=='tag'||arr[1]=='sensor_id')?'':arr[2];
                }
                label = this.handleAtr(arr[1]).label;
                // title = arr[1]=='time'?new Date(parseInt(arr[2]) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '):arr[2];
            }else{
                title = title?title:node.id;
            }
            return {title: title,label: label};
        },
        //映射方法，将字母信息转换为文字
        handleAtr(type){
            let label='';
            switch(type){
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
                    label = type;
                    break;
            }
            return {
                label: label,
            }
        },
        //处理不同类型节点大小和颜色
        handleSizeColor(node){
            let color='',size='',lightColor = '';
            switch(node.type){
                case 'ca':
                    node.color = '#0088B2';//'rgba(30,118,183,1)';//'#01ADFF'; //'rgba(9,142,255,1)';
                    node.lightColor = '#55EFFF'//'#11eed8';//'rgba(30,118,183,0.5)';
                    node.size = 120;
                    break;
                case 'ae':
                    node.color = '#983534';//'#8A1414';//'#B80000';//'#BC2121';//'#F75B1D';////'rgba(198,37,47,1)';//'rgba(255,0,64,1)';
                    node.lightColor = '#FF2452'//'#FF461F';//'#FF493C';//'#B80000';//'#fd2121'//'rgba(198,37,47,0.5)';
                    node.size = 80;
                    break;
                case 'normal':
                    node.color = '#C18B24'//'rgba(255,224,93,1)'//'rgba(192,196,136,1)'; //'rgba(255,224,93,1)';
                    node.lightColor = '#fbfb04'//'rgba(192,196,136,0.5)';
                    node.size = 50;
                    break;
                case 'atr':
                    node.color = 'rgba(100,100,100,1)';
                    node.lightColor = '#E2E7FF';
                    node.size = 20;
                    break;
            }
            return {color: color,size: size,lightColor: lightColor,type: node.type}
        },
        //添加精灵文字
        addSpriteText(node,size,color){
            const obj = new THREE.Mesh(
                this.meshGroup['text']['geometry'],
                this.meshGroup['text']['material']
            );
            let label = this.handleTitle(node).title;
            const sprite = new SpriteText(label);
            sprite.color = this.nodeLink[node.id].type=='ca'?'#f1f4f5':color;
            let i = this.nodeLink[node.id].type=='ca'||this.nodeLink[node.id].type=='ae';
            sprite.textHeight = i?18:10;
            obj.add(sprite);
            obj.position.set(0,i?(size+12):(size+20),0);
            return obj;
        },
        //创建2d标签
        createAttackLabel(node) {
            // console.log(node);
            let labelDiv = document.createElement("div");
            labelDiv.className = "attackLabel";
            labelDiv.id = node.id;
            labelDiv.textContent = `攻击步骤${this.attack.indexOf(node.id) + 1}：${
                node.name
            }`;
            let label = new THREE.CSS2DObject(labelDiv);
            label.position.set(node.x,node.y+20,node.z); //node.x+20,node.y+100,node.z
            this.Graph.scene().add(label);
            this.twoDRenderer.setSize(
                document.getElementById("3d-graph").clientWidth,
                document.getElementById("3d-graph").clientHeight
            );
            // label.position.set(0,0,0);
            return label;
        },
        render() {
            requestAnimationFrame(this.render);
            this.twoDRenderer.render(this.Graph.scene(), this.Graph.camera());
        },
        render2D() {
            let a = document.getElementById("3d-graph");
            this.twoDRenderer = new THREE.CSS2DRenderer();
            this.twoDRenderer.setSize(a.clientWidth, a.clientWidth);
            this.twoDRenderer.domElement.style.position = "absolute";
            this.twoDRenderer.domElement.style.top = "0px";
            this.twoDRenderer.domElement.style.zIndex = 1;
            this.twoDRenderer.domElement.style.color = 'red';
            a.appendChild(this.twoDRenderer.domElement);
            this.twoDRenderer.render(this.Graph.scene(), this.Graph.camera());
        },
        async initGraph(){
            this.elem = document.getElementById('3d-graph');
            let WIDTH = document.getElementById('3d-graph').clientWidth;
            let HEIGHT = document.getElementById('3d-graph').clientHeight;
            this.Graph = ForceGraph3D()
            (this.elem)
                .graphData(this.graphData)
                .enableNodeDrag(false)
                .enableNavigationControls(false)
                .showNavInfo(false)
                .cameraPosition({ z: this.distance })
                .backgroundColor('rgba(0,0,0,0)')
                .linkWidth(0)
                .nodeThreeObject(node => {
                     if(this.nodeLink[node.id]&&(this.nodeLink[node.id].type=='ca'||this.nodeLink[node.id].type=='ae')){
                        // console.log(this.nodeLink[node.id])
                        // this.twoDRenderer.setSize( WIDTH, HEIGHT );
                        // return this.createAttackLabel(node);
                        return this.addSpriteText(node,10,'#fff');
                    }else{
                        return ''
                    } 
                    // return this.addSpriteText(node,10,'#fff');
                })
                .nodeThreeObjectExtend((node=>{
                    return true;
                }))
                .nodeLabel((node)=> this.handleTitle(node).title)//
                .linkLabel((link)=>{
                    let label = '';
                    let arr = link.target.id.split(":");
                    if(arr.length>1&&link.desc == arr[1]){
                        label = this.handleAtr(link.desc).label;
                    }else{
                        label = link.desc;
                    }
                    return label;
                })
                .nodeAutoColorBy('id')
                .nodeColor((node)=>{
                    if(this.colors.length){
                        for(let i=0;i<this.colors.length;i++){
                            if(this.colors[i].indexOf(node.id)!=-1){
                                return this.cg[i];
                            }
                        }
                    }
                    return this.nodeLink[node.id]?this.nodeLink[node.id].color:this.handleData(node).color;
                })
                .nodeOpacity(0.9)
                .nodeVal((node)=>this.nodeLink[node.id]?this.nodeLink[node.id].size:this.handleData(node).size)
                .width(WIDTH)
                .height(HEIGHT)
                .onNodeHover(node => this.elem.style.cursor = node ? 'pointer' : null)
                .onNodeClick(node => {
                    console.log(node);
                    console.log(this.nodeLink[node.id]);
                })
                .onLinkHover(link => this.elem.style.cursor = link ? 'pointer' : null)
                .onLinkClick(link=>{
                    
                });
                this.Graph.d3Force('link').distance((link)=>{
                    if(this.nodeLink[link.source.id].type=='normal'&&this.nodeLink[link.target.id].type=='atr'){
                        return 40;
                    }else if(link.desc!='ae'&&this.nodeLink[link.target.id].type=='atr'){
                        return 80;
                    }else if(link.desc=='ae'&&this.nodeLink[link.source.id].type=='ca'){
                        return 150;
                    }
                });  //200
               /*  this.render2D();
                this.render(); */
                return true;
        },
        //存入模型信息，方便取用
        handleMesh(){
            this.Graph.scene().children[2].children.forEach((x,i) => {
                if(x.type == 'Mesh' && x.__data){
                    this.meshs[x.__data.id] = i;
                    this.nodeLink[x.__data.id].mesh=x;
                    /* if(this.nodeLink[x.__data.id].type=='ca'||this.nodeLink[x.__data.id].type=='ae'){
                        this.createAttackLabel(x.__data);
                    } */
                }
            })
        },
        resize(){
            let WIDTH = document.getElementById('3d-graph').clientWidth;
            let HEIGHT = document.getElementById('3d-graph').clientHeight;
            this.Graph?this.Graph.width(WIDTH):'';    //图谱大小更新
            this.Graph?this.Graph.height(HEIGHT):'';
        },
        // 清除定时器
        clearTime(){
            this.tim.intval.forEach((i)=>{
                clearInterval(i);
            })
            this.tim.out.forEach((t)=>{
                clearTimeout(t);
            })
            this.tim={
                intval:[],
                out:[]
            }
        },
        disposeNode (node){
            if (node instanceof THREE.Mesh)
            {
                if (node.geometry)
                {
                    node.geometry.dispose ();
                }

                if (node.material)
                {
                    if (node.material instanceof THREE.MeshFaceMaterial)
                    {
                        $.each (node.material.materials, function (idx, mtrl)
                        {
                            if (mtrl.map)           mtrl.map.dispose ();
                            if (mtrl.lightMap)      mtrl.lightMap.dispose ();
                            if (mtrl.bumpMap)       mtrl.bumpMap.dispose ();
                            if (mtrl.normalMap)     mtrl.normalMap.dispose ();
                            if (mtrl.specularMap)   mtrl.specularMap.dispose ();
                            if (mtrl.envMap)        mtrl.envMap.dispose ();

                            mtrl.dispose ();    // disposes any programs associated with the material
                        });
                    }
                    else
                    {
                        if (node.material.map)          node.material.map.dispose ();
                        if (node.material.lightMap)     node.material.lightMap.dispose ();
                        if (node.material.bumpMap)      node.material.bumpMap.dispose ();
                        if (node.material.normalMap)    node.material.normalMap.dispose ();
                        if (node.material.specularMap)  node.material.specularMap.dispose ();
                        if (node.material.envMap)       node.material.envMap.dispose ();

                        node.material.dispose ();   // disposes any programs associated with the material
                    }
                }
            }
        },   // disposeNode
        disposeHierarchy (node, callback){
            for (var i = node.children.length - 1; i >= 0; i--)
            {
                var child = node.children[i];
                this.disposeHierarchy (child, callback);
                callback (child);
            }
        },
        //清除模型材质
        clearMesh(scene){
            scene.children.forEach((a)=>{
                if(a.children.length>0){
                    this.disposeHierarchy(a, this.disposeNode);
                }
                scene.remove(a)
            })
          
        },
         // websocket获取数据
        getNodeMessage(msg){
            console.log(msg.data)
            let m = JSON.parse(msg.data);
            this.addData(m,false);
        },
        async wsOpen() {
            let _this = this;
            let ws = new WebSocket(`${this.$socket2}/kg/node_list`);///kg/node_list
            ws.onopen = function(evt) {
                console.log("open")
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
    mounted() {
        window.addEventListener('resize',this.resize);
        this.addData(test3d);
        /*setInterval(()=>{
            this.addData(test3d);
        },50000)  */
        this.wsOpen().then(res => {
            console.log('open')
            this.ws = res;
            this.ws.onmessage = e=>{
                this.getNodeMessage(e)
            }
        })
        
    },
    watch: {

    }
}
</script>
<style lang="less" scoped>
.c_index{
    display: flex;
    justify-content: space-between;
   
    >.topo{
        position:absolute;
        top: 0;
        left:0;
        right:0;
        bottom:0;
        background: transparent;
        overflow: hidden;
    }
}
</style>