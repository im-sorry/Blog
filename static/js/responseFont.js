// (function(){
// 	let html = document.getElementsByTagName("html")[0];
// 	addEvent(window, "resize", resize);
// 	function resize(){
// 		let width = html.getBoundingClientRect().width;
// 		width = width >= 1200 ? 1200 : width;
// 		html.style.fontSize = 16 * width / 1200+ "px";
// 		//console.log(html.style.fontSize)
// 	}
// 	function addEvent(dom, type, callback){
// 		if(dom.addEventListener){
// 			dom.addEventListener(type, callback);
// 		}else if(dom.attachEvent){
// 			dom.attachEvent("on" + type, callback);
// 		}else{
// 			dom["on" + type] = callback;
// 		}
// 	}
// 	resize();
// })()
(function(win,doc){
    let docEl = doc.documentElement;//获取HTML标签
    //判断是移动端设备还是PC,移动 就采用'orientationchange',横竖屏事件，PC端就采用onresize，窗口改变时间
    let resize = 'orientationchange' in win ? 'orientationchange':'resize';
    function rem(){
      let w = docEl.clientWidth;
      if(!w)return;
      if(w >= 1072) w = 1072;
      docEl.style.fontSize= 10*(w/670)+'px';
    }
    doc.addEventListener('DOMContentLoaded',rem,false);
    //监听'DOMContent事件:DOM加载完成执行,如果DOMContent事件，那么执行rem函数
    win.addEventListener(resize,rem,false);
    //win下监听resize事件,如果resize事件，那么执行rem函数
})(window,document);

