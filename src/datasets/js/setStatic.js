import * as d3 from "d3";
import auth from './c_auth.js'
// import data from './topo/test2d2.json';
"use strict"
function func(params) {
     /**
     * @param params Object 所有参数集合对象
     * @param el 选择的svg
     * @param width svg 宽度
     * @param height svg 高度
     * @param zoom Bollean 是否开启平移缩放
     */
    var _this = func;
    let gloal = {
        width: 500, //宽度
        height: 300, //高度
        size: 14, //节点直径
        zoom: true, //缩放平移 
        ...params   //展开对象（单独写在外面会报错，如果写在对象里面可以展开并合并对象
    }

    //验证选择svg节点是否存在
    let app = document.querySelectorAll(gloal.el)[0];
    if (!gloal.el || !app || app.nodeName != "svg") {
        console.error("传入节点参数名有误")
        return
    }
    //设置一些默认值
    //设置节点默认半径  
    //选择svg并且赋予高宽
    let [width, height] = [gloal.width || 500, gloal.height || 300];
    var svg = d3.select(gloal.el).attr("width", width).attr("height", height);
    //设置初始状态
    svg.selectAll("g").remove();
    var newNode,texts,nodeLink={},storeId=[],centers=[];
    var force/*  = d3
        .forceSimulation()//dataset.nodes
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 3)) //重力 /2
        .on("tick",tick) */
    var main = svg.append("g").attr("class", "main");

    var links = main.append('g').attr('class','links'),link;
    var nodes = main.append('g').attr('class','nodes'),node;
    var textNodes = main.append("g").attr("class", "text");
    var isZoom = true;
    //注册缩放平移
    if (gloal.zoom) {
        //设置缩放初始参参数
        var scale = 1,translate = [0,0];
        var zoom = d3.zoom().on("zoom", (e) => {
            main.attr("transform", d3.event.transform);
            gloal._this.scale = d3.event.transform.k * 10;
        }).scaleExtent([0, 5])
        svg.call(zoom);

        _this.prototype._transform = (value, fun) => {
            let arr = value.replace('translate(','').replace('scale(','').replace(/\)/g,'').split(' ');
            let t = arr[0].split(',').map((t)=>{
                return parseFloat(t);
            })
            scale = arr[1];
            zoom.scaleTo(svg, scale);
            this.center();
            return scale
        }
        _this.prototype._scale = (value, fun) => {
            if (isNaN(value)) return;
            typeof value !== "number" ? scale = 1 : scale = value;
            typeof fun === "function" ? func(scale) : '';
            zoom.scaleTo(svg, scale);
            return scale
        }
    }

    function tick(){
        newNode
            .attr("x", function(d) {
                // console.log(d)
                return d.x;
            })
            .attr("y", function(d) {
                return d.y;
            })
        texts
            .style('transform',(d)=>`translate(${d.x}px,${d.y}px)`)
        link
            .attr("d", function (d) {//设置线条的偏移以及路径
                // console.log(d)
                return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
            })
    }
    //定义拖拽行为，此处为重新设置元素圆心位置
    function dragmove(d,i,a) {
        d3.select(a[i])
            .attr("x", d.x = d3.event.x)
            .attr("y", d.y = d3.event.y)
        
    }
    function dragStarted(d,i,a) {
        d.fx = d.x;
        d.fy = d.y; 
        // console.log('start')
        force.alphaTarget(0.3).restart();
    }
    function dragEnded(d,i,a) {
        d.fx = d.x;
        d.fy = d.y; 
        force.alphaTarget(0);
        // console.log('end')
    }
    function random(){
        let r = Math.random();
        let isOdd = parseInt(r*10000)%2==0?1:-1
        // console.log(gloal.width*r)
        let a  = gloal.width/2+r*gloal.width*2*isOdd;
        return r*gloal.width;
    }
    async function setXY(nl,data,nodeId,angle,radian){  //angle：初始角度,radian：旋转角度
        // console.log(nodeId)
        // console.log(nl)
        if(storeId.indexOf(nodeId)==-1) storeId.push(nodeId); //else return ;
        let nd = 0,count = 0;
        nl.links.length>0?nl.links.forEach((id,i)=>{
            if(storeId.indexOf(id)==-1){
                let len,ra;
                if(nl.links.length>12){
                    let ct = parseInt(nl.links.length/11)+1;//3
                    let ct1 = nd%ct+1;    //0,1,2
                    let c = nodeLink[id].links.length/12+1;
                    len =nodeLink[id].links.length>4?2000*c:ct1?400*ct1:700*ct1;
                }else{
                    len = nodeLink[id].links.length>4?1500:400;
                }
               /* if(nl.links.length>11){
                    let c = parseInt(i/10)+1;
                    console.log(c)
                    len =nodeLink[id].links.length>4?1400*c:400*c;
                }else{
                    len = nodeLink[id].links.length>4?1200:400;
                }
                 if(radian<30){
                    len =nodeLink[id].links.length>4?1400:(i%2==0)?800:400;
                }else{
                    len = nodeLink[id].links.length>4?1200:400;
                } */
                if(count==0){ //子节点以父节点角度为中心，左右散开
                    ra = angle+(radian*nd);
                    nd++;
                }else if(count%2==1){
                    ra = angle+(radian*nd);
                }else{
                    ra = angle-(radian*nd);
                    nd++;
                }
                count++;
                let b = {
                    x: nl.x + len*Math.cos(ra*Math.PI/180),
                    y: nl.y + len*Math.sin(ra*Math.PI/180),
                    len: len,
                }
                Object.assign(nodeLink[id],b);
                Object.assign(data.nodes[nodeLink[id].ind],nodeLink[id]);
                let lr = nodeLink[id].links.length>11?360/nodeLink[id].links.length:35;
                if(nodeLink[id].links.length>1){
                    setXY(nodeLink[id],data,id,ra,lr);
                }else{
                    storeId.indexOf(id)==-1?storeId.push(id):''
                }
            }
        }):''
    }
    var n=0;
    function format(data,id){
        // console.log(id)
        let zf = n%2==0?1:-1;
        let a = n==0?{
            x: parseFloat(gloal.width)/2,
            y: parseFloat(gloal.height)/2
        }:nodeLink[id].links==0?{
            x: parseFloat(gloal.width)/2 + 10000*Math.cos(35*n*Math.PI/180),
            y: parseFloat(gloal.height)/2 + 10000*Math.sin(35*n*Math.PI/180)
        }:{
            x: parseFloat(gloal.width)/2 + 5000*Math.cos(n*35*Math.PI/180),
            y: parseFloat(gloal.height)/2 + 5000*Math.sin(n*35*Math.PI/180),
            /* x: zf*(800+storeId.length/2),
            y: zf*(800+storeId.length/2) */
        }
        Object.assign(nodeLink[id],a);
        Object.assign(data.nodes[nodeLink[id].ind],nodeLink[id]);
        let angle = parseFloat(360)/nodeLink[id].links.length;
        n++;
        setXY(nodeLink[id],data,id,angle,angle).then(()=>{
            setCenter(data);
        });
        
        
    }
    async function storeData(data){
        data.nodes.map((node,ind)=>{
            // console.log(nodeLink[node.id])
            nodeLink[node.id]?'':nodeLink[node.id] = {
                ind: ind,
                links: [],
            };
        })
    }
    function setCenter(data){
        if(storeId.length<data.nodes.length){
            for(let i=n;i<centers.length;i++){
                if(nodeLink[centers[i]]&&!nodeLink[centers[i]].x){
                    format(data,centers[i])
                }else{
                    // console.log(i)
                }
            }
        } else{
            /* _this.prototype._init(data);
             force = d3
                .forceSimulation()//dataset.nodes
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(width / 2, height / 3)) //重力 /2
                .on("tick",tick) */
        }
    }
     //过渡效果
    var t = d3
        .transition()
        .duration(50)
        .ease(d3.easeLinear);

    //居中
    func.prototype.center = (x,y) => {
        //增加过渡效果
        main.classed("transitionG", true)
        x?zoom.translateTo(svg, x, y):zoom.translateTo(svg, width / 2, height / 1.5)
        setTimeout(x => {
            //取消过渡效果
            main.classed("transitionG", false)
        }, 500)
    }
    //注册改变高宽事件
    func.prototype._resize = ({width,height}) => {
        svg.attr("width", width).attr("height", height);
        this.center();
    }

    //清除以前数据
    _this.prototype._remove = function () {
        node.remove();
        link.remove();
        d3.selectAll('.links g').remove();
        textNodes.remove();
        // node = nodes.selectAll('g');
        // newNode = node.selectAll('image');
        // texts = node.selectAll('text');
        // link = links.selectAll("path");
    }
    _this.prototype._init = function(data){
        // console.log(data.nodes)
        node = nodes
            .selectAll("g")
            .data(data.nodes)
            .enter()
            .append("g")
            .call(
                    d3
                    .drag()
                    .on("start", dragStarted) //拖动开始
                    .on("drag", dragmove) //拖动ing
                    .on("end", dragEnded) //拖动结束
                );
        newNode = node
            .append('image')
            .attr("x", (d)=>d.x)
            .attr("y", (d)=>d.y)
            .attr("xlink:href",(e)=>{
                // console.log(e)
                return e.img
            })
            .attr('opacity',function(d){
                return d.opacity
            })
            .on('click',(e)=>{
                console.log(e)
            })
            .attr('style',(e)=>`transform : translate(-${e.left},-${e.left});`) 
         //设置节点文字
        texts = node
            .append("text")
            .attr('x',function(e){
                if(e.text){
                    d3.select(this).append('tspan').attr('y',`6px`).attr('x',function(d){
                        return e.text.x?e.text.x:20
                    }).attr("text-anchor", "start").text(function(){
                        return (e.show||e.text.show)?e.id:''
                    }).attr("style",function(d){
                        return e.text.size?`font-size: ${e.text.size}px;`:''
                    })
                }
            })
            .attr('style',(e)=>{
                return `transform: translate(${e.x}px,${e.y}px);fill: ${e.text.color?e.text.color:gloal.isNode?e.itemStyle.color:'#fff'}`
            })
            
        // nodes = node.merge(nodes);//将数组中的元素合并生成一个新的数组

        link = links
            .selectAll("path")
            .data(data.links)
            .enter()
            .append("path")
            .attr('d',(d)=>{
                if(!d.source.x){
                    d.source = data.nodes[nodeLink[d.source].ind]; //由于对象特性，是引用类型，tickdrag移动的是点位置，必须这样赋值才能让线随点动
                    d.target = data.nodes[nodeLink[d.target].ind];
                }else{
                    d.source = data.nodes[nodeLink[d.source.id].ind];
                    d.target = data.nodes[nodeLink[d.target.id].ind];
                }
                // console.log(d)
                return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
            })
            .attr("stroke-width", function (d) {
                return d.width?d.width:0.5;
            })
            .style('opacity',1)//(d)=>d.linesClass=='Attack'?0.6:0.2
            .attr("stroke",function(d){
                if(d.color){
                    return d.color
                }
            })
            .on("click", function (data) {
                console.log(data)
            })
            .classed("lineActive", e => {
                return e.value == 4
            })
            .classed("dasharray", e => {
                return e.value == ""
            })
            .style("stroke",function(d){
                if(d.color){
                    return d.color
                }
            });
    }
    _this.prototype._restart = function(data,sc){
        if(!node){
            sc?this._scale(sc):'';
        }else{
            this._remove();
            // return ;
            // this.center(data.nodes[0].x,data.nodes[0].y);
            // this._scale(sc);
        }
        storeId=[];
        if(data.nodes[data.nodes.length-1].x){
            storeData(data).then((res)=>{
                this._init(data);
                force = d3
                    .forceSimulation()//dataset.nodes
                    .force("charge", d3.forceManyBody())
                    .force("center", d3.forceCenter(width / 2, height / 3)) //重力 /2
                    .on("tick",tick)
            });
        }else{
            nodeLink = data.nodeLink;
            centers = data.centers;
            format(data,centers[0])
           /*  centers.forEach((id)=>{
                nodeLink[id]&&nodeLink[id].x?'':format(data,id);
            }) */
            _this.prototype._init(data);
            force = d3
                .forceSimulation()//dataset.nodes
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(width / 2, height / 3)) //重力 /2
                .on("tick",tick) 
        }
        
    }
   
     //开始加载
     _this.prototype._destroyed = (data) => {
        //离开时清空节点
        // node.exit().remove();
        // link.exit().remove();
        // textNodes.exit().remove();
        svg.remove()
        node.remove();
        link.remove();
        textNodes.remove();
    }
}
func.prototype = {
    _init: function () {
        return this
    }
}
export default func