import * as d3 from "d3";
import auth from './c_auth.js'
"use strict"
function func(params) {
     /**
     * @param params Object 所有参数集合对象
     * @param el 选择的svg
     * @param width svg 宽度
     * @param height svg 高度
     * @param zoom Bollean 是否开启平移缩放
     */

    //设置默认值
    //如果传递参数没有默认参数 参数覆盖 
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
    svg.selectAll("g").remove()
    var main = svg.append("g").attr("class", "main");
    //注册缩放平移
    if (gloal.zoom) {
        //设置缩放初始参参数
        var scale = 1;
        var zoom = d3.zoom().on("zoom", (e) => {
            main.attr("transform", d3.event.transform);
            gloal._this.scale = d3.event.transform.k * 10;
        }).scaleExtent([0.1, 5])
        svg.call(zoom);
        _this.prototype._scale = (value, fun) => {
            if (isNaN(value)) return;
            typeof value !== "number" ? scale = 1 : scale = value;
            typeof fun === "function" ? func(scale) : '';
            zoom.scaleTo(svg, scale)
            return scale
        }
    }
  //创建节点
    var links = main
        .append("g")
        .attr("class", "links")
    var link = links.selectAll("path")

    var textNodes = main.append("g").attr("class", "text");
    var nodes = main
        .append("g")
        .attr("class", "nodes")
    var node =nodes.selectAll(gloal.isNode?"circle":'image');
    //过渡效果
    var t = d3
        .transition()
        .duration(50)
        .ease(d3.easeLinear);
    //创建动力
    var repelForce = d3.forceManyBody().strength(-1000).distanceMax(1000).distanceMin(0);
    var simulation = d3
        .forceSimulation()
        .force("link", d3.forceLink().id(function (d) {
            return d.id;
        }))
        .force("manyBody", repelForce)
        .force("center", d3.forceCenter(width / 2, height / 3)) //重力 /2
        .force("charge", d3.forceManyBody().strength(30)) //引力 -20
        .force("collide", d3.forceCollide(10)) //碰撞力30
        .on("tick", ticked); //运动

    function ticked() {
        link
        .attr("d", function (d) {//设置线条的偏移以及路径
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            if(gloal.isCurve){
                // /* M（表示画笔落下的位置）, A（画椭圆）是大写的，表示绝对位置。当使用相对位置时，要小写*/
                return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,0 " + d.target.x + "," + d.target.y;
            }else{
                return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
            }
            
        }).attr("fill", "transparent");
        node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
        textNodes.attr("transform", function (d) {
            if (d) {
                return "translate(" + (d.source.x + d.target.x) / 2 + "," + (d.source.y + d.target.y) / 2 + ")";
            }
        });
    }

    function dragstarted(d) {
        if (!d3.event.active) {
            simulation.alphaTarget(0.1).restart();
            // simulation.alpha(0.1).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) {
            simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
    }
    //居中
    func.prototype.center = (x,y) => {
        //增加过渡效果
        main.classed("transitionG", true)
        x?zoom.translateTo(svg, x, y):zoom.translateTo(svg, width / 2, height / 2)
        setTimeout(x => {
            //取消过渡效果
            main.classed("transitionG", false)
        }, 500)
    }
    //注册改变高宽事件
    func.prototype._resize = ({
        width,
        height
    }) => {
        svg.attr("width", width).attr("height", height);
        this.center();
    }
    func.prototype._data_distance = (val,charge) => {
        //分类距离
        simulation.alpha(0.3).restart();
        val = parseInt(val)
        simulation.force("link").distance(val=>{
            return  charge?charge(val):val;
            // return 100;
        })
    }
    //清除以前数据
    _this.prototype._remove = function (sc,data) {
        node.remove();
        link.remove();
        d3.selectAll('.links g').remove();
        textNodes.remove();
        // console.log(node._groups[0].length)
        // console.log(link._groups[0].length)
        if(node._groups[0].length==0){
            this._scale(sc);
        }else{
            // this.center(data.nodes[0].x,data.nodes[0].y);
            // this._scale(sc);
        }
        link = links.selectAll("path");
        node =nodes.selectAll(gloal.isNode?"circle":'image');
    }
    //开始执行
    _this.prototype._restart = function(data,sc){
        this._remove(sc,data);
        node = node.data(data.nodes, function (d) {
            return d;
        });
        link = link.data(data.links, function (d) {
            return d//.source.id + "-" + d.target.id;
        });
        // node._groups[0][0]?node._enter[0][0]=node._groups[0][0]:'';
        // node._groups[0][0]?link._enter[0][0]=link._groups[0][0]:'';
        // console.log(node)//._enter[0][0]--undefined
        // console.log(link)//._enter[0][0]--undefined
        //设置节点
        let allG = node
            .enter()
            .append("g")
            .attr('class',function(d){
                // console.log(d.id)
                return `type${d.show}`
            })
            .style('opacity',function(d){
                return d.opacity
            })
            .call(
                d3
                .drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            )
        // console.log(allG)
        var newNode = gloal.isNode?allG
            .append("circle", function () {})
            .attr("r", (e) => {
                if(e.size){
                    return e.size;
                }else{
                    if (e.type == 1) {
                        return 15
                    }
                    if (e.type == "ranges") {
                        return 15
                    } else if (e.type == "mini") {
                        return 10
                    } else {
                        return 15
                    }
                }
                
            })
            .on('click',(e)=>{
                console.log(e)
            })
            .style("opacity", 1)
            .attr("stroke", (e)=>{
                return e.stroke?e.stroke:'rgba(255,255,255,0.5'
            })
            .style("stroke-width",6)
            .classed("dasharray", e => {
                //虚线
                if (e.type == "ranges") {
                    return true
                } else {
                    return false
                }
            })
            .attr("fill", d => {
                return d.itemStyle.color
            }).style('stroke',function(d){
                return d.color
            })
        :allG
            .append("image")
            .attr("xlink:href",(e)=>{
                e.name=='APT0'?console.log(e):''
                // console.log(parseInt(e.left)*2+5)
                return e.img
            })///"../image/icon3.7bff3b59.png"
            .on('click',(e)=>{
                console.log(e)
            })
            .attr('style',(e)=>`transform : translate(-${e.left},-${e.left});`) //width: ${parseInt(e.left)*2+10}px;opacity: ${e.opacity};
            
        //设置节点文字
        var texts = allG
            .append("text")
            .attr('x',function(e){
                if(e.text){
                    d3.select(this).append('tspan').attr('y',`6px`).attr('x',function(d){
                        return e.text.x?e.text.x:20
                    }).attr("text-anchor", "start").text(function(){
                        return (e.show||e.text.show)?e.name:''
                    }).attr("style",function(d){
                        return e.text.size?`font-size: ${e.text.size}px;`:''
                    })
                }
                else if (e.type == "ranges") {
                    return ""
                }else if (e.type == "Thing"){
                    d3.select(this).append('tspan').attr('y','6px').attr('x',0).attr("text-anchor", "middle").text(function(){
                        return "Thing"
                    })
                }else if (e.type == "mini") {
                    return ''
                }else{
                    let yFar = 6;
                    if(e.child){
                        yFar = -2;
                    }
                    if(e.groupType){
                        d3.select(this).append('tspan').attr('y',`${yFar}px`).attr('x',function(d){
                            return d.ids?auth.countFont.call(this,d.ids)*5.5*-1:auth.countFont.call(this,d.name)*3*-1
                        }).attr("text-anchor", "middle").text(function(){
                            return e.groupType.includes('parent')?e.name:e.ids==''?e.name:e.ids
                        })
                    }else{
                        d3.select(this).append('tspan').attr('y',`${yFar}px`).attr('x',function(d){
                            return 20
                        }).attr("text-anchor", "start").text(function(){
                            return e.name
                        })
                    }
                    d3.select(this).append('tspan').attr('y','20px').attr('x',function(d){
                        return 20
                    }).attr("text-anchor", "middle").attr('class','smallTxt').style('fill',e.color).text(function(){
                        return e.secondTxt?e.secondTxt:''
                    })
                }
            })
            .style('fill',function(d){
                return d.text.color?d.text.color:gloal.isNode?d.itemStyle.color:'#fff'
            })
        newNode.style("opacity", 1);
        node = allG.merge(node);//将数组中的元素合并生成一个新的数组

        // svg.append("g") .attr('class','mouseClass');
        //线条
        link = link
            .enter()
            .append("g")
            .attr('class',function(d){
                return d.linesClass?`lines${d.linesClass}`:''
            })
            .append("path")
            .attr("stroke-width", function (d) {
                return d.width?d.width:0.5;
            })
            .style('opacity',(d)=>d.linesClass=='Attack'?0.6:0.2)
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
            })
            .merge(link);
        
        //绑定node和links
        simulation.nodes(data.nodes);
        simulation.force("link").links(data.links).distance(100)

        simulation.alpha(0.3).restart();
        
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