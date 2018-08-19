(function(doc, win){
	let canvas = doc.querySelector('canvas');
	if(canvas == null){
		canvas = doc.createElement('canvas');
		doc.body.appendChild(canvas);
	}
	let width = canvas.width = win.innerWidth,
		height = canvas.height = win.innerHeight,
		ctx = canvas.getContext('2d');
	let numsOfDots = 500,
		array = [],
		maxr = 2.5,//最大半径
		minr = 0.9,//最小半径
		flashTime = 100,//闪烁时间
		maxalpha = 1,//最大亮度
		minalpha = 0.5,//最小亮度
		chance = 0.3,//闪烁的几率
		centerX = width / 2,
		centerY = height / 2;


	function run(){
		clear(ctx);
		array.forEach(item => {
			item.draw(ctx);
		});
		flashTime = randomTime();
		setTimeout(run, flashTime);
		//requestAnimationFrame(run);
	}
	function Dot(conf){
		Object.assign(this, {flag: false, alpha: minalpha, step: 0.1}, conf);
	}
	Dot.prototype.draw = function(ctx){
		let flag = Math.random() < chance,
			color = "",
			alpha = 0;
		if(this.flag){
			this.alpha += this.step;
			if(this.alpha >= maxalpha || this.alpha <= minalpha){
				this.step = -this.step;
			}
			if(this.alpha <= minalpha){
				this.flag = false;
			}
			alpha = this.alpha;
		}else{
			this.flag = flag;
			alpha = 0.3;
		}
		color = `rgba(${this.R},${this.G},${this.B},${alpha})`;
		//this.computedPos();
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	};
	Dot.prototype.computedPos = function(){
		let ox = centerX - this.x,
			oy = centerY - this.y,
			oz = Math.sqrt(Math.pow(ox, 2), Math.pow(oy, 2));
		let x = oy/oz;
		x += 0.3;
		if(x >= 1){
			x = -1;
		}
		let deg = Math.asin(x);

		this.y = centerY - Math.sin(deg) * oz;
		this.x = centerX - Math.cos(deg) * oz;
	};
	function createDots(){
		for(let i = 0; i < numsOfDots; i++){
			array.push(new Dot(randomData()))
		}
	}
	function randomTime(){
		return Math.floor(Math.random()*100) + 100;
	}
	function randomData(){
		let r = minr + Math.floor(Math.random()*(maxr - minr));
			x = Math.max(0, Math.floor(Math.random()*(width - r))),
			y = Math.max(0, Math.floor(Math.random()*(height - r)));
			R = Math.floor(Math.random()*256);
			G = Math.floor(Math.random()*256);
			B = Math.floor(Math.random()*256);
		return {r, x, y, R, G, B};
	}
	function clear(ctx){
		ctx.clearRect(0,0, width, height);
	}
	createDots();
	run();
})(document, window);
