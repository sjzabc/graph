import * as d3 from "d3";
"use strict"
// let color = d3.scaleOrdinal(d3.schemeCategory20);
var pppp = true
const color = (num) => {
	var color;
	var arr = [
		"#d1d6d0",
		"#ff9b9b",
		"#ffaa84",
		"#ff8e5e",
		"#ffe14a",
		"#e7ea46",
		"#cce041",
		"#baf0a9",
		"#99d9c7",
		"#89f2b5",
		"#8cf3fe",
		"#b8e6ff",
		"#b3abff",
		"#d6aff7",
		"#ff94c9",
	]
	if (num < 20 & num > 0) {
		color = arr[num]
	} else {
		color = "#aaccff";
	}
	return color
}

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
		...params
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
	// console.log(global)
	let [width, height] = [gloal.width || 500, gloal.height || 300];
	var svg = d3.select(gloal.el).attr("width", width).attr("height", height);
	//注册改变高宽事件
	func.prototype._resize = ({
		width,
		height
	}) => {
		svg.attr("width", width).attr("height", height);
	}

	//设置初始状态
	svg.selectAll("g").remove()
	var main = svg.append("g").attr("class", "main");
	//注册缩放平移
	if (gloal.zoom) {
		//设置缩放初始参参数
		var scale = 1;
		var zoom = d3.zoom().on("zoom", function (e) {
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
	//创建连线组合
	var link = main
		.append("g")
		.attr("class", "links")
		.selectAll("line")
	//创建节点组合
	var node = main
		.append("g")
		.attr("class", "nodes")
		.selectAll("circle");
	//创建文本组合
	var textNodes = main
		.append("g")
		.attr("class", "text");
	
	//过渡效果
	var t = d3
		.transition()
		.duration(50)
		.ease(d3.easeLinear);
	//创建动力
	var repelForce = d3
		.forceManyBody()
		.strength(-1200)
		.distanceMax(1000)
		.distanceMin(400);
	//创建引力
	var simulation = d3
		.forceSimulation()
		.force("link", d3.forceLink().id(function (d) {
		return d.id;
		}))
		.force("manyBody", repelForce)
		.force("center", d3.forceCenter(width / 2, height / 2.1)) //重力
		.force("charge", d3.forceManyBody().strength(-650)) //引力
		.force("collide", d3.forceCollide(65)) //碰撞力
		.on("tick", ticked); //运动

	//设置距离方法
	func.prototype._class_distance = (val) => {
		//分类距离
		simulation.alpha(0.1).restart();
		val = parseInt(val) * 5
		var force = d3.forceManyBody().strength(0 - val).distanceMax(val).distanceMin(0);
		simulation.force("manyBody", force)
	}
	func.prototype._data_distance = (val) => {
		//分类距离
		simulation.alpha(0.1).restart();
		val = parseInt(val)
		simulation.force("link").distance(val)
	}

	func.prototype._start = async state => {
		/**
		 * 是否启动沙漏
		 * @param state blooean   true开启  false 关闭
		 */
		if (!state) {
			simulation.restart()
			simulation.velocityDecay(0.4)
			simulation.tick()
		} else {
			simulation.stop()
			simulation.velocityDecay(1)
		}
	}

	const statusColor = (status) => {
		/**
		 * @param status 
		 * -> 1 选择状态一
		 * -> 默认
		 * 
		 */
		if (status == 5) {
		return "url(#arrow_active)"
		} else if (status == 6) {
		return "url(#arrow_active_1)"
		} else if (status == 7) {
		return "url(#arrow_active1)"
		} else {
		return "url(#arrow)"
		}
	}
	//
	function ticked() {
		link
		// .attr("x1", function (d) {
		//     return d.source.x;
		// })
		// .attr("y1", function (d) {
		//     return d.source.y;
		// })
		// .attr("x2", function (d) {
		//     return d.target.x;
		// })
		// .attr("y2", function (d) {
		//     return d.target.y;
		// })
		.attr("d", function (d) { //设置线条的偏移以及路径
			var dx = d.target.x - d.source.x,
			dy = d.target.y - d.source.y,
			dr = Math.sqrt(dx * dx + dy * dy);
			// /* M（表示画笔落下的位置）, A（画椭圆）是大写的，表示绝对位置。当使用相对位置时，要小写*/
			return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,0 " + d.target.x + "," + d.target.y;
		})
		.attr("fill", "transparent");
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
			simulation.alpha(0.1).restart();
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

	//开始加载
	_this.prototype._destroyed = (data) => {
		//离开时清空节点
		node.exit().remove();
		link.exit().remove();
		textNodes.exit().remove();
		svg.remove()
		node.remove();
		link.remove();
		textNodes.remove();
		pppp = true;
	}
	_this.prototype._related = (onnode, data) => {
		var datas = data.links.filter(x => x.source.id == onnode.id)
		var datas1 = data.links.filter(x => x.target.id == onnode.id)
		console.log(datas)
		console.log(datas1)
		//查找相关 
		var rela = datas1.filter(x => x.source.type == "ranges")
		let no = datas.filter(x => x.value == "Subclass of")[0]
		//相关
		var n1 = datas.filter(x => x.target.type == "ranges").map(x => x.target.id)
		var n2 = datas1.filter(x => x.type == "subclass").map(x => x.source.id)

		var subClass = datas1.filter(x => x.value == "Subclass of").map(x => x.source.id)

		node.classed("sib_active", e =>
			subClass.indexOf(e.id) !== -1
		)
		node.classed("parent_active", e =>
			e.id == no.target.id ? no : false
		)
	}
	//开始执行
	_this.prototype._restart = async function (data) {
		// console.log(data)
		// Apply the general update pattern to the nodes.
		node = node.data(data.nodes, function (d) {
			return d.id;
		});
		// Apply the general update pattern to the links.
		link = link.data(data.links, function (d) {
			return d.source.id + "-" + d.target.id;
		});

		//清楚以前数据
		_this.prototype._remove = function () {
			node.remove();
			link.remove();
			// textNodes.remove();
		}
		node.exit().remove();
		link.exit().remove();
		textNodes.exit().remove();
		textNodes.remove();
		textNodes = main.append("g").attr("class", "text");
		pppp = true;

		//设置节点
		let allG = node
		.enter()
		.append("g")
		.attr('class', function (d) {
			// console.log(d)
			return `type${d.show}`
		})
		.call(
			d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended)
		)

		let nodeClickArr = []
		var newNode = allG
		.append("circle", function () {})
		.attr("r",15)
		//   .style("opacity", 0)
		.classed("dasharray", e => {
			//虚线
			if (e.type == "ranges") {
				return true
			} else {
				return false
			}
		})
		.attr("fill", d => {
			return d.color
		}).style('stroke', function (d) {
			return d.color
		}).on('mouseout', function (d) {})

		//设置节点文字
		var texts = allG
		.append("text")
		.text(function (d) {
			return d.name
		})
		.attr("style", "font-size:3.9vh")
		.attr('text-anchor', 'end').attr('transform', 'translate(-20 10)')
		.style('fill', function (d) {
			return d.color
		})
		newNode.transition(t).style("opacity", 1);
		// newNode.style("opacity", 1);
		node = allG.merge(node);

		newNode.append("title").text(function (d) {
			return d.name;
		}).attr('class', 'mouseClass');

		//设置线条
		link = link
		.enter()
		.append("g")
		.attr('class', function (d) {
			return d.linesClass ? `lines${d.linesClass}` : ''
		})
		.append("line")
		.attr("stroke-width", 1)
		.append("path")
		.attr("stroke-width", function (d) {
			return 2;
		})
		.attr("stroke",'#000')
		.on("click", function (data) {
			console.log(data)
		})
		// .attr("marker-end", d => {
		//   if (d.type == "ranges") {
		//     return "url(#arrow)"
		//   } else if (d.value == 4) {
		//     return "url(#arrow)"
		//   } else if (d.show != true) {
		//     if (d.value) {
		//       if(d.value == "Subclass of"){//给Subclass of添加箭头@cw
		//         console.log(d)
		//         return "url(#arrow)"
		//       }else{
		//         return d.type == "subclass" ? "url(#arrow_subclass)" : "url(#arrow1)"
		//       }
		//     } else {
		//       return "url(#arrow)"
		//     }
		//   }else {
		//     return ""
		//   }
		// })
		.classed("lineActive", e => {
			return e.value == 4
		}).classed("dasharray", e => {
			// console.log(e)
			return e.value == ""
		})
		.style("stroke", function (d) {
			if (d.color) {
				return d.color
			}
		})
		.merge(link);
		// console.log(pppp)
		if (pppp) {
			pppp = false
			// console.log(d3.select)
			// textNodes = textNodes.selectAll("g").data(data.links).enter().append("g")
			// textNodes.append("rect").attr("width", e => e.value ? e.value.length * 13 : 0)
			//   .attr("height", e => e.value ? 20 : 0)
			//   .attr("x", e => e.value ? -(e.value.length * 13 / 2) : 0)
			//   .attr("y", -9).attr("fill", e => e.type == "subclass" ? "#aaccff" : "transparent")
			// textNodes.append("text").text(function (e) {
			//   return e.value || ""
			// }).attr("text-anchor", "middle").attr("fill", "#666").attr("y", function(d){
			// //   console.log(d)
			// })
		}
		/*  
		_this.prototype._get_link_node = (srcname, type) => {
		if (type == "sourse") {
			data.links.filter(x => x.source.id == srcname)
		}
		return
		} */

		_this.prototype._active_link = (arr) => {
			//做线条高亮使用 
			//ARR 中两个节点相符合则高亮
			let linksArr = [];
			//找到和点击节点有关系的节点
			var _arr = []
			linksArr = data.links.filter(x => arr.indexOf(x.target.id) != -1 || arr.indexOf(x.source.id) != -1)
			linksArr.forEach(x => {
				if (arr.indexOf(x.target.id) != -1) {
					let ls = linksArr.filter(l => x.source.id == l.target.id && l.type == "ranges").map(e => x.source.id)
					_arr.push(...ls)
				} else {
					let ls = linksArr.filter(l => x.target.id == l.source.id && l.type == "ranges").map(e => x.target.id)
					_arr.push(...ls)
				}
			})
			arr = [...new Set([..._arr, ...arr])]
			//开始显示
			svg.selectAll("line").classed("lineActive", (e) => {
				if (arr.indexOf(e.source.id) != -1 && arr.indexOf(e.target.id) != -1) {
					return true
				} else {
					return false
				}
			})
			.attr("marker-end", (e) => {
				if (arr.indexOf(e.source.id) != -1 && arr.indexOf(e.target.id) != -1) {
					if (e.value) {
						return e.value == "Subclass of" ? "url(#arrow_subclass_class)" : statusColor(7)
					} else
					if (e.type != "ranges") {
						return statusColor(5)
					} else {
						return statusColor(5)
					}
				} else if (e.show != true) {
					if (e.value) {
						return "url(#arrow1)"
					} else
					if (e.type != "ranges") {
						return statusColor()
					}
				} else {
					return ""
				}
			})
		}

		_this.prototype._active_node = (names) => {
			//name array
			if (names instanceof Array == false) {
				//如果不是数组返回
				return false
			}
			svg.selectAll(".nodes").selectAll("g").classed("nodeActive", e => {
				return names.indexOf(e.id) != -1
			})
			gloal._this.path(names)
		}
		//传入id name 当前节点绑定节点
		_this.prototype._special_node = (name) => {
			svg.selectAll(".nodes").selectAll("circle").attr('r', 15)
			svg.selectAll(".nodes").selectAll("circle").classed("nodeActive", e => {
				if (e.ids) {
					return e.ids == name
				} else {
					return e.id == name
				}
			})
			svg.selectAll(".nodes").selectAll("text").classed("textActive", e => {
				if (e.ids) {
					return e.ids == name
				} else {
					return e.id == name
				}
			})
			svg.select('.nodeActive').attr('r', 30)
			svg.select('.textActive').select("tspan").attr('x', e => {
				return e.ids ? e.ids.length * 7 * -1 - 30 : e.id.length * 13 * -1 - 30
			})
			console.log(svg.select('.nodeActive'))
		}
		//全选/取消全选
		_this.prototype._all_node = (type) => {
			if (type) {
				svg.selectAll(".nodes").selectAll("g").style('display', 'block');
				svg.selectAll(".links").selectAll("g").style('display', 'block');
			} else {
				svg.selectAll(".nodes").selectAll("g").style('display', 'none');
				svg.selectAll(".links").selectAll("g").style('display', 'none');
			}
		}

		//绑定node和links
		simulation.nodes(data.nodes);
		simulation.force("link").links(data.links).distance(100)

		simulation.alpha(0.24).restart();




		//居中
		func.prototype._center = () => {
			let allx = data.nodes.map(x => x.x);
			let ally = data.nodes.map(x => x.y);
			let [maxY, minY] = [
				Math.max.apply(null, ally),
				Math.min.apply(null, ally)
			];
			let [maxX, minX] = [
				Math.max.apply(null, allx),
				Math.min.apply(null, allx)
			];

			let num = height / (maxY - minY) / 12.5;
			main.classed("transitionG", true)
			_this.prototype._scale(num)

			zoom.translateTo(svg, width / 2, height / 2)
			setTimeout(x => {
				//取消过渡效果
				main.classed("transitionG", false)
			}, 500)
		}
		func.prototype._center()
		// simulation.alphaTarget(0.2).restart();
		// simulation.tick()
		return true
	}
}
func.prototype = {
	_init: function () {
		return this
	}
}
export default func
