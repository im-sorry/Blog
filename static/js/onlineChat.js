	let $content = $(".content"),
		$sendMsg = $("#sendMsg"),
		$onlineSlide = $("#onlineSlide"),
    $container = $("#mapContainer");
	let msgNum = 0,//当前信息条数
		MaxMsgNum = 20,//信息最大条数
		msgInTime = 0,//固定时间内有信息的条数
		onlineNum = 0,//在线人数
		name = "",//名字
		id = "",//自己的id
		imgId = 0;//图片位置标识
	let dataBind = {};//双向绑定的数据
	let css = ["css/light.css", ""],
		js = ["js/colorfulBall.js", "js/skyGrain.js"],
		currentSkin = 1;
	Object.defineProperty(dataBind, 'uncheckedMsg', {
		enumerable: true,
		set(value){
			this.value = value;
			if(this.value != 0){
				$(".unmsg-hint").text(value).show();
			}else{
				$(".unmsg-hint").hide();
			}
		},
		get(){
			return this.value;
		}
	});
	let s = io.connect("http://www.hanqx.xin");

	//监听服务器是否发送消息--------------------------------------------------------------------------------
	//服务器发送信息
	s.on('news',  function(data){
		let flag = isViewBottom($content[0]);
		if(data.type == 'map'){
		  inputMapTo(data, "");
    }else{
      inputTextTo(data, '');
    }
		if(!flag){
			dataBind.uncheckedMsg += 1;
		}
		flag && adjustScroll($content[0]);
	});
	//监听服务器发送初始化数据
	s.on('initData',  function(data){
		let localName = window.localStorage.getItem('qwertyuiop/name');
		name = localName || data.name;
		id = data.id;
		$("#name")[0].value = name;
		s.emit("clientServerName", {name});
	});
	//监听服务器返回在线人数
	s.on('onlinenum', function(data){
		$(".numOfOnline").text(data.msg);
		if(data.msg > onlineNum){
			createFloatMsg(`当前在线人数为:${data.msg}人`);
		}
		onlineNum = data.msg;
	});
	//监听服务器返回在线人数
	s.on('changeName', function(data){
		changeName(data);
	});
	//监听服务器返回onlinePersons
	s.on('serverClientOnlinePersons', data => {
		let template = "";
		for(let key in data){
			if(key == id)continue;
			template += `<li class="p-r" data-id="${key}">${data[key].name}</li>`;
		}
		$onlineSlide.html(template);
	});

	//监听事件------------------------------------------------------------------
	//监听发送按钮
	$("input[type='button']").click(function(){
		$sendMsg.focus();
		send();
	});
	//监听键盘enter
	$sendMsg.on('keydown', function(e){
		if(e.keyCode != 13)return;
		e.preventDefault();
		send();
		$(this).focus();
	});
	//监听修改名字事件
	$("#changeName").click(function(){
		$("#name").removeAttr("disabled").focus();
		$("#name").blur(function(){
			let value = $(this)[0].value,
				flag = false,
				text = "";
			if(value == ""){
				text = "名字不能为空";
				flag = true;
			}else if(value.length > 10){
				text = "名字过长";
				flag = true;
			}else if(/^网友[\d]+$/.test(value)){
				text = "请换个名字";
				flag = true;
			}
			if(flag){
				$(this).focus();
				let offset = $(this).offset();
				hintToArea({x:offset.left + 5, y: offset.top, msg: text, color:"red", backgroundColor: "white"});
				return;
			}
			name = value;
			window.localStorage.setItem('qwertyuiop/name', name);//每次修改名字保存到localStorage
			changeName({id: id, name: name});
			s.emit('changeName', {id: id, name: name});
			$(this).attr('disabled', 'true');
		});
	});
	//监听点击下拉在线人数的事件
	$('.leftInfo .onlineMsg .arrowTop').click(function(){
		$(this).children("i").toggleClass("on");
		$onlineSlide.slideToggle('fast', 'linear');
	});
	//监听滚动到底部事件,模拟查看信息
	$content.on('scroll', function(){
		if(dataBind.uncheckedMsg === 0)return;
		if(isViewBottom($content[0])){
			dataBind.uncheckedMsg = 0;
		}
	});
	//点击提示查看新消息
	$(".unmsg-hint").click(function(){
		adjustScroll($content[0]);
	});
	//clearHover提示
	$(".clearMsg").mouseover(function(e){
		let offset = $(this).offset();
		hintToArea({x:offset.left, y:offset.top - 25,msg:"清屏"});
	});
	$(".clearMsg").click(function(e){
		$content.html("");
	});
	//点击换肤
	$(".skin").mouseover(function(e){
		let offset = $(this).offset();
		hintToArea({x:offset.left, y:offset.top - 25,msg:"换肤"});
	});
	$(".skin").click(function(e){
		$("#skincss")[0].href = css[++currentSkin % 2];
	});
	//发送图片
	$(".imgProfile").mouseover(function(e){
		let offset = $(this).offset();
		hintToArea({x:offset.left, y:offset.top - 25,msg:"发送图片"});
	});
  //发送地图位置
  $(".map").mouseover(function(e){
    let offset = $(this).offset();
    hintToArea({x:offset.left, y:offset.top - 25,msg:"查看位置"});
  });
  $(".map").click(function(){
    $('.hideMap').css('opacity', '1').css('animationName', 'showMap');
    if(typeof AMap === 'undefined'){
      let url = 'https://webapi.amap.com/maps?v=1.4.8&key=d7ee319b3be4e1071f1f50637a82bd3a&callback=onApiLoaded&&plugin=AMap.Scale,AMap.OverView,AMap.ToolBar';
      let jsapi = document.createElement('script');
      jsapi.charset = 'utf-8';
      jsapi.src = url;
      document.head.appendChild(jsapi);
    }else{
      map = new AMap.Map('mapContainer', {
        zoom: 6
      });
      marker = new AMap.Marker({
        map: map,
      });
    }
  });
  $(".clearMap").click(function(){
    $('.hideMap').css('animationName', "");
  });
  //事件委托实现地图查询
  $content[0].addEventListener('click', function(e){
    if(e.target.id == 'showMap'){

    }
  }, false);



  //function---------------------------------------------
	//改变修改的名字
	function changeName(data){
		$content.children(`[data-id = ${data.id}]`).each(function (index, item){
			$(item).find(".name").text(data.name);
		});
		$onlineSlide.children(`[data-id = ${data.id}]`).text(data.name);
	}
	//取数据,并且发送数据
	function send(){
		let value = $sendMsg[0].value;
		if(value == ""){//如果为空,则提示
			let {left,top,width,height} = Object.assign($sendMsg.offset(),{width: $sendMsg.width(), height: $sendMsg.height()});
			hintToArea({
				x: left + 5,
				y: top - 5,
				msg: "输入为空!",
				color:"red"
			});
			return false;
		}
		inputTextTo({msg: value, name: name, id: id}, 'right');
		adjustScroll($content[0]);
		s.emit('news', {msg: value, name: name, id: id});
		$sendMsg[0].value = "";
	}
	//插入信息到页面
	function inputTextTo(data, dir){
		let time = getTime();
		let template = `
			<div class="subMsg w100 clearfix ${dir}" data-id="${data.id}">
				<p class="time w100"><span class="t">${time.time}</span><span class="name">${data.name}</span></p>
				<xmp class="msg">${data.msg}</xmp>
			</div>
		`;
		$content[0].innerHTML += template;
		msgNum ++;
		msgInTime ++;
	}
	//指定位置显示提示信息
	function hintToArea(data){
		$("<span></span>").css({
			display: 'none',
			position: 'absolute',
			top: data.y + "px",
			left: data.x + "px",
			padding: data.padding || "3px",
			color: data.color || '#333',
			border: '1px solid #333',
			borderRadius: "5px",
			backgroundColor: data.backgroundColor || 'white',
			textAlign: 'center'
		}).text(data.msg).appendTo(document.body).show(300).delay(1000).hide(300).queue(function(){
			$(this).remove()
		});
	}
	//插入提示到页面
	function inputHintTo(msg, pos, color){
		let flag = isViewBottom($content[0]);
		let template = `
			<p class="hint" style="color:${color || 'red'}">${msg}</p>
		`;
		if(pos == "top"){
			$content[0].innerHTML = template + $content[0].innerHTML;
		}else if(top == "bottom"){
			$content[0].innerHTML += template;
		}
		adjustScroll($content[0], 15);
	}
	//获取时间
	function getTime(){
		let d = new Date(),
			y = d.getFullYear(),
			m = d.getMonth() + 1,
			date = d.getDate(),
			day = d.getDay() == 0? 7 : d.getDay(),
			hour = d.getHours() < 10? 0 + d.getHours().toString() : d.getHours(),
			minute = d.getMinutes() < 10? 0 + d.getMinutes().toString() : d.getMinutes(),
			second = d.getSeconds() < 10? 0 + d.getSeconds().toString() : d.getSeconds();
		return {
			year: `${y}-${m}-${date}`,
			time: `${hour}:${minute}:${second}`
		}
	}
	//调整滚动条
	function adjustScroll(content, num){
		if(num){
			content.scrollTop += num;
			return;
		}
		let scrollHeight = content.scrollHeight,
			clientHeight = content.clientHeight;
		if(scrollHeight == clientHeight)return;
		content.scrollTop = scrollHeight - clientHeight;
	}
	//移除多于20条的信息
	function remove(tag, num){
		for(let i = 0;i < num; i ++){
			tag.removeChild(tag.firstElementChild);
		}
	}
	//创建浮动消息
	function createFloatMsg(msg){
		$("<span class='floatMsg'>" + msg +"</span>").css({
			position: 'absolute',
			right: '-250px',
			top: '100px',
			whiteSpace: 'nowrap'
		}).appendTo(document.body).delay(500).animate({
			right: window.innerWidth
		}, 5000, 'linear', function(){
			$(this).remove();
		});
	}
	//当前视角是否在底部
	function isViewBottom(content){
		let scrollHeight = content.scrollHeight,
			clientHeight = content.clientHeight;
		if(scrollHeight == clientHeight)return true;
		if(content.scrollTop < scrollHeight - clientHeight)return false;
		return true;
	}
	//定时器-------------------------------------------------------------------------
	//定时清除多于信息
	(function(){
		function f(){
			if(msgNum > MaxMsgNum){
				remove($content[0], msgNum - MaxMsgNum);
				inputHintTo("以上为历史消息,暂时不可查看", "top");
				msgNum = MaxMsgNum;
			}
			setTimeout(f, 5 * 60 * 1000);
		}
		f();
	})();
	//如果五分钟之内发的信息超过20条,则提示年份
	(function(){
		function f(){
			if(msgInTime >= 20){
				msgInTime = 0;
				inputHintTo(getTime().year, "top", 'rgb(50,255,50)');
			}
			setTimeout(f, 5 * 60 * 1000);
		}
		f();
	})();
