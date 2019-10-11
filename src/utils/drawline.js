import auth from '@/js/c_auth.js'
function Line( sx, sy, tx, ty ,ctx,hue,fireworks,color,type,ids) {
        // console.log(fireworks)
        var _this = this;
        this.hue = hue;
        this.ctx = ctx;
        this.fireworks = fireworks;
        this.ids = ids;//扩展字段，可以为任意数据类型
        this.color = color;
        this.type = type;
        // 运动中的实际坐标
        this.x = sx;
        this.y = sy;
        // 开始坐标
        this.sx = sx;
        this.sy = sy;
        // 目标坐标
        this.tx = tx;
        this.ty = ty;
        // 从起点到目标的距离
        this.distanceToTarget = auth.calculateDistance.call(this,_this.sx, _this.sy,  _this.tx,  _this.ty );
        this.distanceTraveled = 0;
        // 跟踪每个烟花的过去坐标以创建轨迹效果，增加坐标计数以创建更突出的轨迹
        this.coordinates = [];
        this.coordinateCount = 3;
        // 使用当前坐标填充初始坐标集合
        while( this.coordinateCount-- ) {
            this.coordinates.push( [ this.x, this.y ] );
        }
        this.angle = Math.atan2(  _this.ty -  _this.sy,  _this.tx -  _this.sx );
        this.speed = 3;
        this.acceleration = 1.02;
        this.brightness = auth.random.call(this, 50, 70 );
        // circle target indicator radius
        this.targetRadius = 1;
        



        // update firework
        Line.prototype.update = function( index ) {
            // 删除坐标数组中的最后一项
            this.coordinates.pop();
            // 将当前坐标添加到数组的开头
            this.coordinates.unshift( [ this.x, this.y ] );
            
            // 循环圆目标指示器半径
            if( this.targetRadius < 64 ) {
                this.targetRadius += 2.4;
            } else {
                this.targetRadius = 8;
            }
            
            // speed up the firework
            this.speed *= this.acceleration;
            
            // 根据角度和速度获得当前的速度
            var vx = Math.cos( this.angle ) * this.speed,
                vy = Math.sin( this.angle ) * this.speed;
            // how far will the firework have traveled with velocities applied?
            // this.distanceTraveled = auth.calculateDistance.call(this,_this.sx, _this.sy, _this.x + vx, _this.y + vy );
            var xDistance = this.sx - this.x,
                yDistance = this.sy - this.y;
            this.distanceTraveled = Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
            // console.log(this.distanceTraveled+'----'+this.distanceToTarget)
            // 如果行进的距离（包括速度）大于到目标的初始距离，则达到目标
            if( this.distanceTraveled >= this.distanceToTarget ) {
                // createParticles( this.tx, this.ty );
                // 使用传入更新函数的索引来确定要删除的内容
                    // this.fireworks.splice( index, 1 );
                    // this.ctx.beginPath();
                    // this.ctx.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
                    // this.ctx.stroke();
                    this.fireworks(index)
                
            } else {
                // 没有达到目标，继续旅行
                this.x += vx;
                this.y += vy;
            }
        }

        // draw firework
        Line.prototype.draw = function() {
            // //画线
            this.ctx.beginPath();
            this.ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
            this.ctx.lineTo( this.x, this.y );
            this.ctx.lineWidth = 3;
            // this.ctx.strokeStyle = 'hsla(17, 100%, 60%, 1)';
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
            //circle动效
            // this.ctx.beginPath();
            // this.ctx.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
            // this.ctx.stroke();
           
        }
}
// create particle
function Particle( x, y ,ctx,hue,particles,color,type) {
	this.x = x;
	this.y = y;
	this.ctx = ctx;
    this.particles = particles;
    this.color = color;
    this.type = type;
	// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 5;
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	// set a random angle in all possible directions, in radians
	this.angle = auth.random.call(this, 0, Math.PI * 2 );
	this.speed = auth.random.call(this,1, type=="ca"?8:1.6 );
	// friction will slow the particle down
	this.friction = 0.95;
	// gravity will be applied and pull the particle down
	this.gravity = 0.1;
	// set the hue to a random number +-20 of the overall hue variable
	this.hue = auth.random.call(this,hue - 20, hue + 20 );
	this.brightness = auth.random.call(this,50, 80 );
	this.alpha = 1;
	// set how fast the particle fades out
	this.decay = auth.random.call(this,0.015, 0.03 );

    // update particle
    Particle.prototype.update = function( index ) {
        // remove last item in coordinates array
        this.coordinates.pop();
        // add current coordinates to the start of the array
        this.coordinates.unshift( [ this.x, this.y ] );
        // slow down the particle
        this.speed *= this.friction;
        // apply velocity
        this.x += Math.cos( this.angle ) * this.speed;
        this.y += Math.sin( this.angle ) * this.speed + this.gravity;
        // fade out the particle
        this.alpha -= this.decay;
        
        // remove the particle once the alpha is low enough, based on the passed in index
        if( this.alpha <= this.decay ) {
            this.particles.splice( index, 1 );
        }
    }

    // draw particle
    Particle.prototype.draw = function() {
        this.ctx.beginPath();
        // move to the last tracked coordinates in the set, then draw a line to the current x and y
        this.ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
        this.ctx.lineTo( this.x, this.y );
        // this.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
    }
}
 
function Circle(x,y,ctx,hue,circles,color,type){
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.circles = circles;
    this.color = color;
    this.type = type;
    this.targetRadius = 1;
    Circle.prototype.update = function(index){
        let num = type == "ca"?1:6
        if( this.targetRadius < 150/num && this.targetRadius >0) {
            this.targetRadius += 2.4/num;
        } else {
            this.targetRadius = 0;
            this.circles.splice(index,1)
        }
    }
    Circle.prototype.draw = function(index){
        this.ctx.beginPath();
        this.ctx.arc( this.x, this.y, this.targetRadius, 0, Math.PI * 2 );
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc( this.x, this.y,5, 0, Math.PI * 2 );
        // this.ctx.fill()
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
    }
}

//离屏渲染
function HeadLight(r){
    this.canvas = document.createElement('canvas'); // 创建一个新的canvas
    this.width = this.canvas.width = r * 2; // 创建一个正好包裹住一个粒子canvas
    this.height = this.canvas.height = r * 2;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    this.x = this.width / 2;
    this.y = this.height / 2;
    this.r = r; // 半径
    HeadLight.prototype.createHeadLight = function (){
        this.ctx.save();
        this.ctx.beginPath();
        //创建径向渐变
        var radialGradient = this.ctx.createRadialGradient(this.x, this.y, this.r,this.x, this.y, this.r+10);
        radialGradient.addColorStop(0, "rgba(255,255,255,1)");
        radialGradient.addColorStop(.2, "rgba(255,255,255,.8)");
        radialGradient.addColorStop(1, "transparent");
        
        this.ctx.fillStyle = radialGradient;
        //画圆
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.restore();
    }
    // 移动粒子
    HeadLight.prototype.move = function(ctx,x, y) {
        // 将这个新创建的canvas画到真正显示的canvas上
        ctx.drawImage(this.canvas, x, y);
    }
}
function drawCurve(width,height,start,end,curveness){
    this.canvas = document.createElement('canvas'); // 创建一个新的canvas
    this.width = this.canvas.width = width<0?-width:width==0?10:width; // 创建一个正好包裹住一个粒子canvas
    this.height = this.canvas.height = height<0?-height:height==0?10:height;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    this.start = start;
	this.end = end;
    this.curveness = curveness;
    
    // console.log(width)
    // console.log(height)
    drawCurve.prototype.drawCurvePath = function(percent){
        this.ctx.save();
        this.ctx.beginPath();
        var cp = [
            ( this.start[ 0 ] + this.end[ 0 ] ) / 2 - ( this.start[ 1 ] - this.end[ 1 ] ) * this.curveness,
            ( this.start[ 1 ] + this.end[ 1 ] ) / 2 - ( this.end[ 0 ] - this.start[ 0 ] ) * this.curveness
        ];
    
        var t = percent / 100;
    
        var p0 = this.start;
        var p1 = cp;
        var p2 = this.end;
    
        var v01 = [ p1[ 0 ] - p0[ 0 ], p1[ 1 ] - p0[ 1 ] ];     // 向量<p0, p1>
        var v12 = [ p2[ 0 ] - p1[ 0 ], p2[ 1 ] - p1[ 1 ] ];     // 向量<p1, p2>
    
        var q0 = [ p0[ 0 ] + v01[ 0 ] * t, p0[ 1 ] + v01[ 1 ] * t ];
        var q1 = [ p1[ 0 ] + v12[ 0 ] * t, p1[ 1 ] + v12[ 1 ] * t ];
    
        var v = [ q1[ 0 ] - q0[ 0 ], q1[ 1 ] - q0[ 1 ] ];       // 向量<q0, q1>
    
        var b = [ q0[ 0 ] + v[ 0 ] * t, q0[ 1 ] + v[ 1 ] * t ];
        this.ctx.moveTo( p0[ 0 ], p0[ 1 ] );
    
        this.ctx.quadraticCurveTo( 
            q0[ 0 ], q0[ 1 ],
            b[ 0 ], b[ 1 ]
        );
        // this.createHeadLight( b[ 0 ], b[ 1 ]) //和画线/频率一样画圆
        // particle.createHeadLight();
    //    let particle = new HeadLight(3);
        this.particle.move(this.ctx, b[ 0 ]-3, b[ 1 ]-3);
        this.ctx.restore();
    }
    drawCurve.prototype.move = function(ctx,x, y) {
        // 将这个新创建的canvas画到真正显示的canvas上
        ctx.drawImage(this.canvas, x, y);
    }
}
/**
* 绘制一条曲线路径
* @param  {Object} ctx canvas渲染上下文
* @param  {Array<number>} start 起点
* @param  {Array<number>} end 终点
* @param  {number} curveness 曲度(0-1)
* @param  {number} percent 绘制百分比(0-100)
*/
function CurveLine(ctx, start, end, curveness,curveLines,fireworks,color){
    this.ctx = ctx;
    this.start = start;
	this.end = end;
    this.curveness = curveness;
    this.curveLines = curveLines;
    this.percent = 0;
    this.progress = start[0];
    this.fireworks = fireworks;
    this.color = color;
    this.index = 0;
    this.t = '';
    this.k = parseFloat(end[1]-start[1])/parseFloat(end[0]-start[0]);
    this.particle = new HeadLight(3);
    this.particle.createHeadLight();
    // this.curve = new drawCurve(end[0]-start[0],end[1]-start[1],start,end,curveness);
    this.ctx.strokeStyle =  this.color;
    this.ctx.shadowColor = '#9BFCFF';
    this.ctx.lineWidth = 2;
    this.ctx.shadowBlur = 10;
    // 暂未使用
    CurveLine.prototype.update = function( ){
        if(this.percent==99&&this.index==0){
            console.log('complete');
            this.t = setInterval(()=>{
                this.auto();
            },100);
            setTimeout(()=>{
                console.log('clear')
                clearInterval(this.t)
                this.index = 0;
                this.t = '';
                this.percent = 0;
            },15000)
            this.index++;
        }else if(this.index==0){
            this.percent = ( this.percent + 1 ) % 100;
        }
    }
    CurveLine.prototype.init = function(index){//percent
        this.ctx.beginPath();
        // var gradient=this.ctx.createLinearGradient(...this.start,...this.end);//
        // gradient.addColorStop(0, "#5BC0DE");
        // gradient.addColorStop(0.5, "#ffff00");
        // gradient.addColorStop(1, "#ffff00");
        // this.curve.drawCurvePath(this.percent);
        // this.curve.move(this.ctx,...this.start);
        this.drawCurvePath(this.percent);//percent
        this.ctx.stroke();
        // 直接删除
        if(this.percent>=99){
            this.fireworks(index,true);
            this.curveLines.splice(0,1);
        }
        this.ctx.closePath();
        this.percent = ( this.percent + 1 ) % 100+1;
    }
    // 暂未使用
    CurveLine.prototype.auto = function() {
        ctx.clearRect( 0, 0, window.innerWidth, window.innerHeight );
        this.ctx.beginPath();
        this.drawCurvePath(100);
        var gradient=ctx.createLinearGradient(this.progress-50,(this.progress-50)*this.k,this.progress+50,(this.progress+50)*this.k);
        gradient.addColorStop(0, "#5BC0DE");
        gradient.addColorStop(0.5, "#ffff00");
        gradient.addColorStop(1, "#5BC0DE");
        // console.log(gradient)
        this.ctx.strokeStyle =  gradient//gradient;
        this.ctx.stroke();
        if(this.k>=1){
            if (this.progress > this.end[0]) {
                this.progress = this.start[0];
            } else {
                this.progress = this.progress + 20;
            }
        }else if(this.k<1){
            if (this.progress < this.end[0]) {
                this.progress = this.start[0];
            } else {
                this.progress = this.progress - 20;
            }
        }
        
        this.ctx.closePath();

    }
    // 流动效果，暂未使用
    CurveLine.prototype.flow = function( ) {
        let t = setInterval(()=>{
            this.auto();
        },100)
        return t;
    }
    CurveLine.prototype.createHeadLight = function (x,y){
        // ctx.beginPath();
        //创建径向渐变
        var radialGradient = ctx.createRadialGradient(x, y, 3, x, y, 15);
        radialGradient.addColorStop(0, "rgba(255,255,255,1)");
        radialGradient.addColorStop(.2, "rgba(255,255,255,.8)");
        radialGradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = radialGradient;
        //画圆
        ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
        // this.ctx.closePath();
        ctx.fill();
      }
      
    CurveLine.prototype.drawCurvePath = function( percent ) {
        var cp = [
            ( this.start[ 0 ] + this.end[ 0 ] ) / 2 - ( this.start[ 1 ] - this.end[ 1 ] ) * this.curveness,
            ( this.start[ 1 ] + this.end[ 1 ] ) / 2 - ( this.end[ 0 ] - this.start[ 0 ] ) * this.curveness
        ];
    
        var t = percent / 100;
    
        var p0 = this.start;
        var p1 = cp;
        var p2 = this.end;
    
        var v01 = [ p1[ 0 ] - p0[ 0 ], p1[ 1 ] - p0[ 1 ] ];     // 向量<p0, p1>
        var v12 = [ p2[ 0 ] - p1[ 0 ], p2[ 1 ] - p1[ 1 ] ];     // 向量<p1, p2>
    
        var q0 = [ p0[ 0 ] + v01[ 0 ] * t, p0[ 1 ] + v01[ 1 ] * t ];
        var q1 = [ p1[ 0 ] + v12[ 0 ] * t, p1[ 1 ] + v12[ 1 ] * t ];
    
        var v = [ q1[ 0 ] - q0[ 0 ], q1[ 1 ] - q0[ 1 ] ];       // 向量<q0, q1>
    
        var b = [ q0[ 0 ] + v[ 0 ] * t, q0[ 1 ] + v[ 1 ] * t ];
        this.ctx.moveTo( p0[ 0 ], p0[ 1 ] );
    
        this.ctx.quadraticCurveTo( 
            q0[ 0 ], q0[ 1 ],
            b[ 0 ], b[ 1 ]
        );
        // this.createHeadLight( b[ 0 ], b[ 1 ]) //和画线/频率一样画圆
        // particle.createHeadLight();
    //    let particle = new HeadLight(3);
        this.particle.move(this.ctx, b[ 0 ]-3, b[ 1 ]-3);
    }

}

export const func = {
    Line,Particle,Circle,CurveLine
}