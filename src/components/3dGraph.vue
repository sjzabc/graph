<template>
  <div>
    <div id="3d-graph" class="topo"></div>
    <!-- 显示攻击流程 -->
    <div class="attackAlert" v-if="process">
      <div>
        <div class="title">
          <img src="../assets/3dGraph/copy 2.png" alt />
          <span style>攻击步骤</span>
          <i class="el-icon-close" @click="process=false"></i>
        </div>
        <Scroll
          style="overflow-x:auto;position:absolute;top:44px;left:10px;right:10px;bottom:2px;"
          ref="scrollBox"
        >
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
                <li style="color:#fff;">
                  来源:
                  <span style="font-weight:600;">{{item.device}}</span>
                </li>
                <li :title="item.desc">描述: {{item.desc}}</li>
              </ul>
            </li>
          </ul>
        </Scroll>
        <!-- <img src="./Image/light.png" alt=""> -->
      </div>
    </div>
  </div>
</template>
<script>
// @mouseover="pic1 = pic11" @mouseout="pic11 = pic1"
import ForceGraph3D from "3d-force-graph";
// import * as THREE from 'three'
import { CSS2DObject, CSS2DRenderer } from "../utils/THREE/CSS2DRenderer.js";
import blocks from "../datasets/test3d2.json";
import { tDgraphIcon } from "./icon.js";
import Scroll from "@/components/scroll";
//import SpriteText from 'three-spritetext';

var THREE = require("three");
// export default Stats;
export default {
  components: {
    Scroll
  },
  data() {
    return {
      elem: "",
      Graph: "",
      graphData: {nodes: [],links:[]}, //blocks
      storeData: [], //暂存数据id
      nodeLink: {}, //节点相连字典
      img: {
        refresh: tDgraphIcon.refresh,
        gravity: tDgraphIcon.gravity,
        gravity2: tDgraphIcon.gravity2,
        play: tDgraphIcon.play2
      },
      run: true,
      inputId: "",
      showGravity: false,
      cl: 10,
      space: 150,
      openId: "",
      nodeType: "",
      colors: {
        focus: [],
        linkNodes: [],
        caNodes: [], //蓝色
        aeNodes: [], //红色
        atrNodes: [], //蓝白色
        normalNodes: [], //黄色
        mainLinks: [], //绿
        atrLinks: [], //白色
        aeLinks: [] //红色
      },
      isClick: false,
      isfocus: false,
      process: false,
      timeout: "",
      stepTimer: {
        //方便清除步骤展示定时器
        step: [],
        node: []
      },
      stepList: [],
      aeList: [],
      aeOrder: {},
      socketNode: "",
      socketAe: "",
      attackNode: "",
      clickNode: "",
      twoDRenderer: "",
      attackLabel: []
    };
  },
  created() {
    // this.getData();
    // this.initNodeWebsocket();
    // this.initAeWebsocket();
    this.getNodeMessage()
    /*  setTimeout(()=>{
            this.initWebsocket();
        },500) */
  },
  destroyed() {
    this.socketNode.onclose = e => {
      console.log("connection closed (" + e + ")");
    };
    this.socketAe.onclose = e => {
      console.log("connection closed (" + e + ")");
    };
  },
  methods: {
    render() {
      requestAnimationFrame(this.render);
      this.twoDRenderer.render(this.Graph.scene(), this.Graph.camera());
      /*if(this.attackLabel.length){
                this.attackLabel.forEach((a)=>{
                    console.log(a);
                    a.position.set(a.parent.position.x,a.parent.position.y,a.parent.position.z);
                    // console.log(this.graphData.nodes);
                    /* this.graphData.nodes.forEach((n)=>{
                        if(a.element.id==n.id){
                            n.__threeObj.add(a);
                            this.Graph.graphData(this.graphData);
                        }
                    })
                })
                // console.log(this.Graph.scene().children[2].children)
            }*/
    },
    render2D() {
      let a = document.getElementById("3d-graph");
      this.twoDRenderer = new THREE.CSS2DRenderer();
      this.twoDRenderer.setSize(a.clientWidth, a.clientWidth);
      this.twoDRenderer.domElement.style.position = "absolute";
      this.twoDRenderer.domElement.style.top = "0px";
      this.twoDRenderer.domElement.style.zIndex = -1;
      // console.log(document.getElementById('3d-graph'))
      // console.log(this.Graph.scene())
      a.appendChild(this.twoDRenderer.domElement);
      this.twoDRenderer.render(this.Graph.scene(), this.Graph.camera());
      /* let grid = new THREE.GridHelper(1000, 50, 0x64FE00, 0x0C291F); //网格辅助，大小，行距，中心线颜色，网格线条颜色
            this.Graph.scene().add(grid); */
    },
    createLabel(node) {
      let spriteOrigin = this.makeTextSprite(" vector3(0, 0, 0) ", {
        fontsize: 20,
        borderColor: { r: 255, g: 0, b: 0, a: 0.4 },
        /* 边框黑色 */
        backgroundColor: { r: 255, g: 255, b: 255, a: 0.9 } /* 背景颜色 */
      });
      spriteOrigin.center = new THREE.Vector2(0, 0);
      // console.log(spriteOrigin)
      this.Graph.scene().children[2].children.forEach(a => {
        // console.log(a.__data.id);
        if (a.__data.id == node.id) {
          a.add(spriteOrigin);
        }
      });
      // this.Graph.scene().add( spriteOrigin );
      spriteOrigin.position.set(0, 0, 0); //node.x,node.y,node.z
    },
    /* 创建字体精灵 */
    makeTextSprite(message, parameters) {
      if (parameters === undefined) parameters = {};
      let fontface = parameters.hasOwnProperty("fontface")
        ? parameters["fontface"]
        : "Arial";
      /* 字体大小 */
      let fontsize = parameters.hasOwnProperty("fontsize")
        ? parameters["fontsize"]
        : 18;
      /* 边框厚度 */
      let borderThickness = parameters.hasOwnProperty("borderThickness")
        ? parameters["borderThickness"]
        : 4;
      /* 边框颜色 */
      let borderColor = parameters.hasOwnProperty("borderColor")
        ? parameters["borderColor"]
        : { r: 0, g: 0, b: 0, a: 1.0 };
      /* 背景颜色 */
      let backgroundColor = parameters.hasOwnProperty("backgroundColor")
        ? parameters["backgroundColor"]
        : { r: 255, g: 255, b: 255, a: 1.0 };
      /* 创建画布 */
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      /* 字体加粗 */
      context.font = "Bold " + fontsize + "px " + fontface;
      /* 获取文字的大小数据，高度取决于文字的大小 */
      let metrics = context.measureText(message);
      let textWidth = metrics.width;
      /* 背景颜色 */
      context.fillStyle =
        "rgba(" +
        backgroundColor.r +
        "," +
        backgroundColor.g +
        "," +
        backgroundColor.b +
        "," +
        backgroundColor.a +
        ")";
      /* 边框的颜色 */
      context.strokeStyle =
        "rgba(" +
        borderColor.r +
        "," +
        borderColor.g +
        "," +
        borderColor.b +
        "," +
        borderColor.a +
        ")";
      context.lineWidth = borderThickness;
      /* 绘制圆角矩形 */
      // roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
      /* 字体颜色 */
      context.fillStyle = "rgba(255, 255, 255, 1)";
      context.fillText(message, borderThickness, fontsize + borderThickness);
      /* 画布内容用于纹理贴图 */
      let texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      let spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      let sprite = new THREE.Sprite(spriteMaterial);
      // console.log(sprite.spriteMaterial);
      // console.log(sprite);
      /* 缩放比例 */
      sprite.scale.set(10, 5, 0);
      console.log(sprite);
      return sprite;
    },
    //数据处理
    handleData(node, links) {
      this.nodeLink[node.id] = this.nodeLink[node.id]
        ? this.nodeLink[node.id]
        : {
            type: "",
            source: [],
            target: []
          };
      let a = this.nodeLink[node.id];
      links.forEach(link => {
        link.target == node.id && a.source.indexOf(link.source) == -1
          ? a.source.push(link.source)
          : link.source == node.id && a.target.indexOf(link.target) == -1
          ? a.target.push(link.target)
          : "";
        if (link.desc == "ae") {
          link.target == node.id
            ? (a.type = "ae")
            : link.source == node.id
            ? (a.type = "ca")
            : "";
        }
      });
      if (a.type == "") {
        node.id.split(":").length == 1 ? (a.type = "normal") : (a.type = "atr");
      }
    },
    //  获取数据
    getData() {
      this.$ajax(`${this.$baseUrl}/kg/init`).then(res => {
        // console.log(JSON.stringify(res[0]));
        this.graphData = res[0];
        this.storeData = [];
        this.graphData.nodes.forEach(node => {
          let ind = this.storeData.indexOf(node.id);
          ind == -1
            ? this.storeData.push(node.id)
            : this.graphData.nodes.splice(ind, 1);
          // this.storeData.push(node.id);
          this.handleData(node, this.graphData.links);
        });
        // console.log(this.graphData);
        // console.log(this.nodeLink);
        this.initGraph();
      });
    },
    //获取url中多个参数数组---暂不使用
    getUrlVars() {
      var vars = {},
        hash;
      var hashes = window.location.href
        .slice(window.location.href.indexOf("?") + 1)
        .split("&");
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        vars[hash[0]] = hash[1];
      }
      // console.log(vars.id)
      this.openId = vars.id;
      // this.searchId(this.openId);
      // this.showAtack(vars.id);//需要注释
    },
    // websocket处理
    initNodeWebsocket() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socketNode = new WebSocket(`${this.$socket}/node_list/`);
        // 监听socket连接
        this.socketNode.onopen = () => {
          console.log("连接成功");
          this.socketNode.send("hello");
        };
        // 监听socket错误信息
        this.socketNode.onerror = () => {
          console.log("连接错误");
          this.socketNode.onclose = e => {
            console.log("connection closed (" + e + ")");
          };
          //   this.initWebsocket();
        };
        // 监听socket消息
        this.socketNode.onmessage = this.getNodeMessage;
        // 销毁监听
        this.socketNode.onclose = () => {
          //   this.initNodeWebsocket();
        };
      }
    },
    initAeWebsocket() {
      this.socketAe = new WebSocket(`${this.$socket}/ae_list/`);
      // 监听socket连接
      this.socketAe.onopen = () => {
        console.log("连接成功");
      };
      // 监听socket错误信息
      this.socketAe.onerror = () => {
        console.log("连接错误");
        this.socketAe.onclose = e => {
          console.log("connection closed (" + e + ")");
        };
        // this.initAeWebsocket();
      };
      // 监听socket消息
      this.socketAe.onmessage = this.getAeMessage;
      // 销毁监听
      this.socketAe.onclose = () => {
        // this.initAeWebsocket();
      };
    },
    getNodeMessage(msg) {
      let m = blocks;//JSON.parse(msg.data);
      let data = {
        nodes: [],
        links: []
      };
      m.forEach(m => {
        data.nodes.push(...m.nodes);
        data.links.push(...m.links);
      });
      // console.log(data)
      data.nodes.forEach(dt => {
        let index = this.storeData.indexOf(dt.id);
        if (index == -1) {
          this.storeData.push(dt.id);
          console.log(dt)
          this.graphData.nodes.push(dt);
          this.handleData(dt, data.links);
        } else {
          // let a = this.graphData.nodes[index];
          // console.log(this.graphData.nodes);
          this.graphData.nodes[index].name = dt.name; //a.name==a.id?dt.name:a.name;
        }
      });
      //点击ca，再在首页点击传过来的ca和原来的相同，不会重置
      this.clickNode != data.nodes[0].id &&
      this.nodeLink[data.nodes[0].id].type == "ca"
        ? (this.attackNode = data.nodes[0].id)
        : "";
      this.graphData.links.push(...data.links);
      this.Graph.graphData(this.graphData);
      setTimeout(() => {
        this.searchId(data.nodes[0].id);
      }, 500);
    },
    getAeMessage(msg) {
      this.aeList = JSON.parse(msg.data);
      // console.log("ae:");
      // console.log(this.aeList);
      this.aeList.forEach((ae, i) => {
        this.aeOrder[ae.id] = i;
      });
      // console.log(this.aeOrder);
      // this.showAtack();
    },
    //展示攻击流程
    showAttack() {
      // console.log(this.aeList);
      this.process = true;
      this.stepList = [];
      let time = 2000;
      this.aeList.forEach((val, i) => {
        let t = setTimeout(() => {
          this.stepList.push(val);
          if (this.$refs.scrollBox) {
            this.$refs.scrollBox.left();
          }
        }, (i + 1) * time);
        this.stepTimer.step.push(t);
      });
    },
    // 鼠标移上样式
    hover(type, num) {
      this.img[type] = tDgraphIcon[type + num];
    },
    // 搜索
    searchId(id) {
      if (id && this.graphData) {
        let n = 0;
        this.graphData.nodes.forEach(node => {
          if (node.id == id) {
            this.handleCamera(node);
            n++;
          }
        });
        if (n == 0) {
          this.$message.error("没有id为" + id + "的节点");
        }
      } else {
        this.Graph.cameraPosition(
          {}, // new position
          { x: 0, y: 0, z: 0 }, // lookAt ({ x, y, z })
          2000 // ms transition duration
        );
      }
    },
    // 调整拉近相机
    handleCamera(node) {
      if (node.id != this.clickNode) {
        this.colors = {
          focus: [],
          linkNodes: [],
          caNodes: [], //蓝色
          aeNodes: [], //红色
          atrNodes: [], //蓝白色
          normalNodes: [], //黄色
          mainLinks: [], //绿
          atrLinks: [], //白色
          aeLinks: [] //红色
        };
        this.isfocus = true;
        this.colors.focus.push(node.id);
        this.colors.linkNodes.push(
          ...this.nodeLink[node.id].source,
          ...this.nodeLink[node.id].target
        );
        this.Graph.nodeRelSize(this.cl);
      } else {
        this.isfocus = false;
      }
      const distance = 600;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      this.Graph.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );
    },
    // 刷新
    refresh() {
      this.inputId = "";
      this.isClick = false;
      this.getData();
      this.initWebsocket();
      this.showGravity = false;
    },
    //创建2d标签
    createAttackLabel(node) {
      // console.log(node);
      let labelDiv = document.createElement("div");
      labelDiv.className = "attackLabel";
      labelDiv.id = node.id;
      labelDiv.textContent = `攻击步骤${this.aeOrder[node.id] + 1}：${
        this.aeList[this.aeOrder[node.id]].type
      }`;
      let label = new THREE.CSS2DObject(labelDiv);
      label.position.set(node.x, node.y + 20, node.z); //node.x+20,node.y+100,node.z
      this.Graph.scene().add(label);
      this.twoDRenderer.setSize(
        document.getElementById("3d-graph").clientWidth,
        document.getElementById("3d-graph").clientHeight
      );
      // label.position.set(0,0,0);
      this.attackLabel.push(label);
      return label;
    },
    // 处理颜色
    handleColor(colors, node, link) {
      switch (this.nodeLink[node.id].type) {
        case "ca":
          colors.caNodes.push(node.id);
          break;
        case "ae":
          if (link && link.target.id == node.id) {
            let t = setTimeout(() => {
              colors.aeNodes.push(node.id); ////////需要调试
              console.log(
                this.attackLabel.length - 1 + "," + this.aeOrder[node.id]
              );
              this.createAttackLabel(node);
              // this.createLabel(node);
              node.id.split(":")[1] == "ae"
                ? ""
                : this.findAttr(colors, link.target, node);
              this.Graph.nodeRelSize(this.cl);
            }, 2000 * (this.aeOrder[node.id] + 1));
            this.stepTimer.node.push(t);
          } else {
            colors.aeNodes.push(node.id);
          }
          break;
        case "normal":
          colors.normalNodes.push(node.id);
          break;
        case "atr":
          colors.atrNodes.push(node.id);
          break;
      }
    },
    // 找到节点对应的属性节点
    findAttr(colors, no, node) {
      let aeArr = [];
      let i = 1;
      this.graphData.links.forEach(link => {
        if (link.source.id == no.id && link.target.id != node.id) {
          if (link.desc == "ae") {
            colors.aeLinks.push(link);
            if (colors.aeNodes.indexOf(link.target.id) === -1) {
              // console.log(link.target);
              // console.log(i);
              //分步骤亮
              let t = setTimeout(() => {
                colors.aeNodes.push(link.target.id);
                this.findAttr(colors, link.target, no);
                this.Graph.nodeRelSize(this.cl);
              }, i * 2000);
              this.stepTimer.node.push(t);
              i++;
            }
          } else {
            colors.atrLinks.push(link);
            colors.atrNodes.push(link.target.id);
          }
        }
      });
    },
    useColor(node) {
      if (this.colors.caNodes.indexOf(node.id) != -1) {
        // return 'rgba(255,151,48,1)';
        return "rgba(9,142,255,1)";
      } else if (this.colors.aeNodes.indexOf(node.id) != -1) {
        return "rgba(255,0,64,1)";
      } else if (this.colors.atrNodes.indexOf(node.id) != -1) {
        return "rgba(152,170,233,1)";
      } else if (this.colors.normalNodes.indexOf(node.id) != -1) {
        return "rgba(255,224,93,1)";
      } else if (this.colors.focus.indexOf(node.id) != -1) {
        return "rgba(255,255,255,1)";
      } else if (this.colors.linkNodes.indexOf(node.id) != -1) {
        return "rgba(162,162,198,1)";
      } else if (this.isfocus) {
        return "rgb(90,90,107,1)";
      } else {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let a = Math.random();
        // return "rgb("+r+','+g+','+b+','+a+")";
        // return "rgb(60,63,65,0.3)";
        return this.isClick
          ? "rgb(60,63,65,0.3)"
          : "rgb(" + r + "," + g + "," + b + "," + a + ")";
      }
    },
    clearLabel() {
      if (this.attackLabel.length > 0) {
        this.attackLabel.forEach(a => {
          // console.log(a);
          this.Graph.scene().remove(a);
        });
        let arr = document.getElementsByClassName("attackLabel");
        let parent = arr[0].parentElement;
        arr.forEach(a => {
          parent.removeChild(a);
        });
        this.attackLabel = [];
      }
    },
    initGraph() {
      // console.log(this.graphData);
      // console.log(JSON.stringify(this.graphData.nodes));
      // console.log(JSON.stringify(this.graphData.links));
      this.elem = document.getElementById("3d-graph");
      let WIDTH = document.getElementById("3d-graph").clientWidth;
      let HEIGHT = document.getElementById("3d-graph").clientHeight;
      let colors = this.colors;
      this.Graph = ForceGraph3D()(this.elem)
        // .jsonUrl('../datasets/block.json')
        .graphData(this.graphData)
        .backgroundColor("rgba(0,0,0,0)")
        /* .nodeThreeObject(node => {
                    if(this.aeOrder[node.id]){
                        this.twoDRenderer.setSize( WIDTH, HEIGHT );
                        return this.createAttackLabel(node);
                    }
                })
                .nodeThreeObjectExtend(true) */
        .nodeLabel(node => {
          let arr = node.id.split(":");
          // console.log(node)
          let title = node.id == node.name ? "" : `${node.name}：`;
          if (arr.length > 1) {
            title += arr[2] ? arr[2] : node.id;
          } else {
            title += node.id;
          }
          /* let ind = this.colors.aeNodes.indexOf(node.id);
                    if(this.isClick&&ind!=-1&&this.clickNode!=node.id&&this.nodeLink[this.clickNode].type=='ca'){
                        return `<p style="font-weight: bold;font-size:18px;color: red;height:24px">
                            攻击步骤${this.aeOrder[node.id]+1}：${this.aeList[this.aeOrder[node.id]].type}
                            </p>${title}`
                    }else{
                        return title;
                    } */
          return title;
        })
        .linkLabel(link => {
          // console.log(link);
          let label = "";
          let arr = link.target.id.split(":");
          if (arr.length > 1 && link.desc == arr[1]) {
            switch (arr[1]) {
              case "time":
                label = "时间";
                break;
              case "src":
                label = "源设备IP";
                break;
              case "dst":
                label = "目的设备IP";
                break;
              case "device":
                label = "检测设备";
                break;
              case "protocol":
                label = "协议";
                break;
              case "sport":
                label = "源端口";
                break;
              case "dport":
                label = "目的端口";
                break;
              case "ca_id":
                label = "攻击场景";
                break;
              case "ce_id":
                label = "攻击事件标识";
                break;
              case "ba_id":
                label = "攻击步骤";
                break;
              default:
                label = arr[1];
                break;
            }
          } else {
            label = link.desc;
          }
          return label;
        })
        // .nodeAutoColorBy('id')
        .nodeColor(node => {
          if (this.colors.caNodes.indexOf(node.id) != -1) {
            // return 'rgba(255,151,48,1)';
            return "rgba(9,142,255,1)";
          } else if (this.colors.aeNodes.indexOf(node.id) != -1) {
            return "rgba(255,0,64,1)";
          } else if (this.colors.atrNodes.indexOf(node.id) != -1) {
            return "rgba(152,170,233,1)";
          } else if (this.colors.normalNodes.indexOf(node.id) != -1) {
            return "rgba(255,224,93,1)";
          } else if (this.colors.focus.indexOf(node.id) != -1) {
            return "rgba(255,255,255,1)";
          } else if (this.colors.linkNodes.indexOf(node.id) != -1) {
            return "rgba(162,162,198,1)";
          } else if (this.isfocus) {
            return "rgb(90,90,107,1)";
          } else {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            let a = Math.random();
            // return "rgb("+r+','+g+','+b+','+a+")";
            // return "rgb(60,63,65,0.3)";
            return this.isClick
              ? "rgb(60,63,65,0.3)"
              : "rgb(" + r + "," + g + "," + b + "," + a + ")";
          }
        })
        .nodeOpacity(0.75)
        .linkColor(link => {
          if (this.colors.mainLinks.indexOf(link) != -1) {
            return "rgba(53,222,0,1)";
          } else if (this.colors.atrLinks.indexOf(link) != -1) {
            return "rgba(255,255,255,1)";
            // return 'rgba(255,40,248,1)';
          } else if (this.colors.aeLinks.indexOf(link) != -1) {
            return "rgba(255,0,64,1)";
          } else {
            return "rgba(160,160,160,1)";
          }
        })
        .linkWidth(link => (this.colors.mainLinks.indexOf(link) != -1 ? 3 : 1))
        .width(WIDTH)
        .height(HEIGHT)
        .onNodeHover(node => (this.elem.style.cursor = node ? "pointer" : null))
        .onNodeClick(node => {
            console.log(1111111111)
            this.clearLabel();
            (this.isClick = true),
                (this.clickNode = node.id),
                (this.process = false);
            if (this.$refs.scrollBox && this.$refs.scrollBox.scrollEvent) {
                this.$refs.scrollBox.scrollEvent.destroy();
                this.$refs.scrollBox.init();
            }
            let ind = 0;
            // console.log(this.attackNode);
            // this.attackNode==node.id?'':this.handleCamera(node);
            this.colors = {
                focus: [],
                linkNodes: [],
                caNodes: [], //蓝色
                aeNodes: [], //红色
                atrNodes: [], //蓝白色
                normalNodes: [], //黄色
                mainLinks: [], //绿
                atrLinks: [], //白色
                aeLinks: [] //红色
            };
            this.stepTimer.node.forEach(t => {
                clearTimeout(t);
            });
            this.stepTimer.step.forEach(t => {
                clearTimeout(t);
            });
            this.stepTimer = {
                node: [],
                step: []
            };
            this.handleColor(this.colors, node);
            if (
                this.nodeLink[node.id].type == "ae" ||
                this.nodeLink[node.id].type == "ca"
            ) {
                this.queryNode(node.id);
            }
            node.id == this.attackNode
                ? this.showAttack()
                : (this.process = false);

            this.graphData.links.forEach(link => {
                if (link.source.id == node.id || link.target.id == node.id) {
                //node:该节点
                let no = link.source.id == node.id ? link.target : link.source; //no:同线另一个节点
                this.handleColor(this.colors, no, link);
                link.desc == "ae"
                    ? this.colors.aeLinks.push(link)
                    : no.id.split(":").length == 3
                    ? this.colors.atrLinks.push(link)
                    : this.colors.mainLinks.push(link);
                // this.nodeLink[node.id].type=='ca'?this.findAttr(this.colors,no,node):'';
                }
            });
            this.Graph.nodeRelSize(this.cl);
        })
        .onLinkHover(link => (this.elem.style.cursor = link ? "pointer" : null))
        .onLinkClick(link => {
          console.log(link);
          // delete this.Graph.nodeColor;
          // this.Graph.nodeRelSize(this.cl);
        });
      this.Graph.d3Force("link").distance(this.space);
      this.Graph.nodeRelSize(this.cl);
      // let nodes = this.makeTextSprite('测试测试');
      // nodes.position.set(0,50,0);
      // this.Graph.scene().add(nodes);
      this.render2D();
      this.render();
    },
    queryNode(id) {
      // console.log("nodeid："+id);
      this.$ajax(`${this.$baseUrl}/query_node/?id=${id}`);
    },
    resize() {
      let WIDTH = document.getElementById("3d-graph").clientWidth;
      let HEIGHT = document.getElementById("3d-graph").clientHeight;
      this.Graph.width(WIDTH); //图谱大小更新
      this.Graph.height(HEIGHT);
      this.twoDRenderer.setSize(WIDTH, HEIGHT); //文字位置更新
    }
  },
  mounted() {
    //   this.initGraph()
    window.addEventListener("resize", this.resize);
  }
};
</script>
<style lang="less">
.top {
  position: absolute;
  top: 0;
  left: 30px;
  right: 30px;
  // width: 95%;
  color: #fff;
  padding: 5px 10px;
  box-sizing: border-box;
  z-index: 10000;
  .left {
    float: left;
    > input {
      width: 337px;
      height: 32px;
      padding: 2px 10px;
      color: #fff;
      background: rgba(1, 4, 18, 1);
      border: 1px solid rgba(36, 201, 231, 1);
    }
    > span {
      position: absolute;
      top: 5px;
      left: 313px;
      width: 55px;
      height: 36px;
      background: rgba(38, 217, 247, 0.24);
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    > span:hover {
      cursor: pointer;
    }
    > button {
      color: #fff;
      margin-left: 20px;
      background: rgba(38, 217, 248, 0.23);
      border: 1px solid rgba(36, 201, 231, 1);
    }
  }
  .right {
    // position: relative;
    float: right;
    width: 212px;
    height: 35px;
    display: flex;
    background: rgba(38, 217, 248, 0.23);
    opacity: 0.7509;
    background: url("../assets/3dGraph/编组.png") center left no-repeat;
    // border: 1px solid rgba(39,218,248,1);
    > span {
      display: inline-block;
      flex: 1;
      font-size: 16px;
      font-family: SourceHanSansCN-Normal;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid rgba(39, 218, 248, 1);
      img {
        margin-right: 5px;
      }
    }
    > span:hover {
      cursor: pointer;
      color: #f9ac39;
    }
  }
  > .gravity {
    position: absolute;
    right: 10px;
    top: 42px;
    width: 192px;
    height: 132px;
    padding: 0 10px;
    background: rgba(0, 158, 248, 0.21109999999999998);
    border-radius: 1px;
    // opacity:0.21109999999999998;
    > div {
      height: 50%;
      > span {
        color: #fff;
        font-size: 14px;
      }
      .el-slider__runway {
        // height:3px;
      }
      .el-slider__bar {
        background: rgba(30, 165, 190, 1);
        // height:3px;
      }
      .el-slider__button-wrapper {
        // top:-17px;
      }
      .el-slider__button {
        width: 11px;
        height: 11px;
        background: rgba(0, 36, 66, 1);
        border: 2px solid rgba(39, 217, 248, 1);
      }
    }
    > div:first-child {
      border-bottom: 1px solid rgba(30, 165, 190, 0.2481);
    }
  }
  > .legend {
    position: absolute;
    left: 10px;
    top: 50px;
    height: 32px;
    padding: 0 10px;
    background: rgba(0, 158, 248, 0.21109999999999998);
    // border-radius:1px;
    > span {
      margin-right: 10px;
      line-height: 32px;
      font-size: 14px;
    }
    > span::before {
      content: "";
      width: 10px;
      height: 10px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 5px;
    }
    > span:nth-child(1)::before {
      background: rgba(9, 142, 255, 1);
    }
    > span:nth-child(2)::before {
      background: rgba(255, 0, 64, 1);
    }
    > span:nth-child(3)::before {
      background: rgba(255, 224, 93, 1);
    }
    > span:nth-child(4)::before {
      background: rgba(152, 170, 233, 1);
    }
    > span:nth-child(5)::before {
      background: rgb(60, 63, 65, 0.3);
    }
  }
}
.bottom {
  position: absolute;
  right: 30px;
  bottom: 30px;
  height: 10%;
  color: #fff;
  padding: 5px 10px;
  z-index: 10000;
  .right {
    float: right;
    > span:hover {
      cursor: pointer;
    }
  }
}
.topo {
  position: absolute;
  top: -102px;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  overflow: hidden;
  z-index: 2;
  .attackLabel {
    color: red;
    font-weight: bold;
  }
}
.attackAlert {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 400px;
  height: 340px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  .yl-box-txt {
    padding-left: 0;
  }
  > div {
    box-sizing: border-box;
    text-align: left;
    // transform: translate(-50%,-50%);
    width: 100%;
    height: 100%;
    background: rgba(6, 36, 68, 0.9);
    border: 1px solid rgba(65, 140, 255, 0.8);
    box-shadow: 0px -61px 172px 0px rgba(4, 127, 255, 0.28);
    border-radius: 3px;
    padding: 0 10px;
    > div {
      background: rgba(6, 36, 68, 0.9);
    }
    > .title {
      height: 44px;
      line-height: 44px;
      position: relative;
      // background: #274f7b;
      > img {
        vertical-align: middle;
      }
      > span {
        display: inline-block;
        color: #fff;
        text-shadow: 0px 1px 4px rgba(4, 124, 255, 1);
        font-size: 22px;
        vertical-align: top;
        margin-left: 5px;
      }
      > .el-icon-close {
        color: #fff;
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        font-size: 22px;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
    }
    > img {
      position: absolute;
      top: 0;
      left: -57px;
      height: 100%;
    }
  }
}
.stepList {
  height: 94%;
  padding-top: 1.2%;
  width: 100%;
  white-space: nowrap;
  // display:flex;
  .stepItem {
    width: 48%;
    padding-right: 1%;
    height: 100%;
    // height: 100%;
    display: inline-block;
    p {
      height: 13%;
      width: 106%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background-repeat: no-repeat;
      background-position: left top;
      background-size: 100% 100%;
      font-size: 13px;
      margin-bottom: 5%;
      span {
        width: 90%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    ul {
      height: 80%;
      padding: 1% 8px;
      color: #b9b5b5;
      font-size: 13px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      li {
        overflow: hidden;
        line-height: 28px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  li:nth-child(odd) {
    p {
      background-image: url(../assets/3dGraph/step/step3.png);
    }
    ul {
      background: rgba(0, 158, 248, 0.2);
      li {
        color: #a0e7ff;
      }
    }
  }
  li:nth-child(even) {
    p {
      background-image: url(../assets/3dGraph/step/step6.png);
    }
    ul {
      background: rgba(255, 176, 57, 0.2);
      li {
        color: #ffefd7;
      }
    }
  }
  li:nth-child(1) {
    p {
      background-image: url(../assets/3dGraph/step/step1.png);
    }
  }
}
</style>
