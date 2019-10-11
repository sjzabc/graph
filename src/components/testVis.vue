<template>
    <div>
        <el-button @click='sendMsg' style="position: absolute; left: 10px; top: 50%">发送数据</el-button>
        <div id="vis">
        </div>
    </div>
 
</template>
<script>
import add from '../datasets/add.json';
import test2d3 from '../datasets/test2d3.json';
import {icons} from './icon.js';
var vis = require('vis-network')
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
            data.nodes.map((node)=>{
                // console.log(node)
                let a = {
                    label: node.name,
                    image: icons[node.type],
                    shape: 'image'
                }
                return Object.assign(node,a);
            })
            data.links.map((link)=>{
                // console.log(node)
                let b = {
                    from: link.src,
                    to: link.dst,
                }
                return Object.assign(link,b);
            })
            console.log(data) 
            // create an array with nodes
            /*[
                {id: 1, label: 'Node 1'},
                {id: 2, label: 'Node 2'},
                {id: 3, label: 'Node 3'},
                {id: 4, label: 'Node 4'},
                {id: 5, label: 'Node 5'}
            ] */
            var nodes = new vis.DataSet(data.nodes);

            /*
            [
                {from: 1, to: 3},
                {from: 1, to: 2},
                {from: 2, to: 4},
                {from: 2, to: 5}
            ] */
            // create an array with edges
            var edges = new vis.DataSet(data.links);

            var container = document.getElementById('vis');

            // provide the data in the vis format
            var dt = {
                nodes: nodes,
                edges: edges
            };
            var options = {
                physics:false,
                nodes: {
                    // shape: 'dot',
                    // size: 20,
                    font: {
                        size: 15,
                        color: '#ffffff'
                    },
                    borderWidth: 2
                },
                edges: {
                    width: 2
                },
            };

            // initialize your network!
            var network = new vis.Network(container, dt, options);
            network.on("click", this.clickNode);
        }
    }
}
</script>

<style lang="less">
#vis{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
