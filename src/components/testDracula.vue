<template>
    <div>
        <el-button @click='sendMsg' style="position: absolute; left: 10px; top: 50%">发送数据</el-button>
        <div id="widget">
        </div>
    </div>
 
</template>
<script>
import add from '../datasets/add.json';
import test2d3 from '../datasets/test2d3.json';
import {icons} from './icon.js';
import * as d3 from "d3";
var Dracula = require('graphdracula')
// var Raphael = require('raphael')
export default {
    data(){
        return {
            graph:{},
        }
    },
    created(){

    },
    mounted(){
        this.initTopo(test2d3,false)
    },
    methods:{
        sendMsg(){
            this.initTopo(add,true);
        },
        clickNode(a,b,c){
            console.log(a,b,c)
        },
        initTopo(data,isL){
            var g = new Dracula.Graph();
            data.links.forEach(link => {
                g.addEdge(link.src, link.dst);
            });

            var layouter = new Dracula.Layout.Spring(g);
            layouter.layout();
            let widget = document.getElementById('widget')

            var renderer = new Dracula.Renderer.Raphael('#widget', g, widget.clientWidth, widget.clientHeight);
            renderer.draw();
        }
    }
}
</script>

<style lang="less">
#widget{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
}
</style>
