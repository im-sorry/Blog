(function(){
	var canvas = document.getElementsByTagName("canvas")[0];
	if(!canvas){
		canvas = document.createElement("canvas");
		canvas.id = "canvas";
	}
	document.body.appendChild(canvas);
	canvas.style.position = "absolute";
	canvas.style.left = "0";
	canvas.style.top = "0";
	canvas.style.zIndex = "-11";
	var width = canvas.width = window.innerWidth;
	var height = canvas.height = window.innerHeight;
	window.addEventListener("resize", () => {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
	});
	var ctx = canvas.getContext('2d');
	var ballNum = 300;//小球的个数
	var balls = [];//存放小球的信息的数组
	var mouseX = 0;//鼠标的x轴位置
	var mouseY = 0;//鼠标y轴的位置
	canvas.style = {
		position:"absolute",
		top: "0",
		left: "0"
	}
	createBall();
	//创建移动定时器
	setInterval(move, 20);
	//绑定鼠标移动事件
	document.addEventListener('mousemove', function(e){
		var event = e || window.event;
		mouseX = event.x;
		mouseY = event.y;
	}, false);

	//小球移动函数
	function move(){
		//首先清空画布
		ctx.clearRect(0, 0, width, height);
		for(var i = 0; i < ballNum; i++){//遍历每个小球
			balls[i].x += balls[i].sx;
			balls[i].y += balls[i].sy;
			//如果超出边界,则速度取反
			if(balls[i].x < 0 ||balls[i].x > width){
				balls[i].sx = -balls[i].sx;
			}
			if(balls[i].y < 0 ||balls[i].y > width){
				balls[i].sy = -balls[i].sy;
			}
			//如果和鼠标距离在一个范围内,则半径变大
			if(Math.pow(balls[i].x - mouseX, 2) + Math.pow(balls[i].y - mouseY, 2) <= 20000){
				balls[i].r = 50;
			}else{
				if(balls[i].r >= balls[i].r1){
					balls[i].r --;
				}
			}
			drawBall(balls[i].x, balls[i].y, balls[i].r, balls[i].color);
		}

	}
	//创建小球
	function createBall(){
		for(var i = 0; i < ballNum; i++){
			balls[i] = {};
			var R = Math.floor(Math.random()*255);
			var G = Math.floor(Math.random()*255);
			var B = Math.floor(Math.random()*255);	
			balls[i].x = Math.random()*width;
			balls[i].y = Math.random()*height;
			balls[i].r = Math.random()*20 + 5;
			balls[i].sx = Math.random()*2 - 1;
			balls[i].sy = Math.random()*2 - 1;
			balls[i].r1 = balls[i].r;
			balls[i].color = 'rgb('+ R +','+ G +','+ B +')';
			drawBall(balls[i].x, balls[i].y, balls[i].r, balls[i].color);
		}
	}
	//画小球函数
	function drawBall(x, y, r, color){
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(x, y, r, 0, Math.PI*2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
})()
	
