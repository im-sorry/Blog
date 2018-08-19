
		var canvas = document.getElementById("canvas");
		if(!canvas){
			canvas = document.createElement("canvas");
			canvas.id = "canvas";
			document.body.appendChild(canvas);
		}
		var width = canvas.width = window.innerWidth;
		var height = canvas.height = window.innerHeight;
		var ctx = canvas.getContext('2d');
		var data = [];//粒子数组
		var num = 250;//粒子数量
		var mouseX = 0;//鼠标X轴坐标
		var mouseY = 0;//鼠标y轴坐标
		init();
		//初始化函数
		function init(){
			//绑定鼠标移动函数
			document.addEventListener('mousemove', function(e){
				var e = e || window.event;
				mouseX = e.x;
				mouseY = e.y;
			}, false);
			createGrain();
			setInterval(move, 20);	
		}
		//定义创建粒子函数
		function createGrain(){
			for (var i = 0; i < num; i++) {
				data[i] = {};
				data[i].x = Math.random()*width;
				data[i].y = Math.random()*height;
				data[i].sx = -Math.random()*1.0 + 0.5;
				data[i].sy = -Math.random()*1.0 + 0.5;
				drawArc(data[i].x, data[i].y);
			}
		}
		//定义粒子移动函数
		function move(){
			var len = data.length;
			ctx.clearRect(0, 0, width, height);
			for(var i = 0; i < len; i++){
				data[i].x += data[i].sx;
				data[i].y += data[i].sy;
				//判断是否碰撞边界
				if(data[i].x < 0 || data[i].x > width){
					data[i].sx = -data[i].sx;
				}
				if(data[i].y < 0 || data[i].y > height){
					data[i].sy = -data[i].sy;
				}
				//判断离鼠标的距离
				// if(Math.pow(data[i].x - mouseX, 2) + Math.pow(data[i].y - mouseY, 2) <= 20000){
				// 	drawLine(data[i].x, data[i].y, mouseX, mouseY, 'rgba(255,255,255,.3)');
				// 	// data[i].x -= data[i].sx;
				// 	// data[i].y -= data[i].sy;
				// 	//规定距离鼠标的距离
				// 	if(data[i].x <= mouseX){
				// 		if(data[i].sx < 0){
				// 			data[i].sx = -data[i].sx;
				// 		}
				// 	}else{
				// 		if(data[i].sx > 0){
				// 			data[i].sx = -data[i].sx;
				// 		}
				// 	}
				// 	if(data[i].y <= mouseY){
				// 		if(data[i].sy < 0){
				// 			data[i].sy = -data[i].sy;
				// 		}
				// 	}else{
				// 		if(data[i].sy > 0){
				// 			data[i].sy = -data[i].sy;
				// 		}
				// 	}
				// 	if(Math.pow(data[i].x - mouseX, 2) + Math.pow(data[i].y - mouseY, 2) <= 19000){
				// 			data[i].sx = -data[i].sx;
				// 			data[i].sy = -data[i].sy;
				// 	}
				// }
				//判断两个点距离,如果小于某值,则连线
				for(var j = i + 1; j < len; j++){
					if(Math.pow(data[i].x - data[j].x, 2) + Math.pow(data[i].y - data[j].y, 2) <= 2000){
						drawLine(data[i].x, data[i].y, data[j].x, data[j].y);
					}
				}
				drawArc(data[i].x, data[i].y);
			}
		}
		//画圆函数
		function drawArc(x, y){
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = 'rgba(255,255,255,.3)';
			ctx.arc(x, y, 1, 0, Math.PI*2);
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
		}
		//画线函数
		function drawLine(x0, y0, x1, y1, color){
			ctx.strokeStyle = color || 'rgba(255,255,255,.1)';
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x0, y0);
			ctx.lineTo(x1, y1);
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
		}