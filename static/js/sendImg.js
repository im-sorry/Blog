/**
*@发送图片的部分
*
*/

s.on('imgProfile', data => {
  if(id == data.id)return;
	let flag = isViewBottom($content[0]),
	    dir = 'left',
	    imgId = inputImgTo(data, dir),
	    img = document.createElement('img'),
      loadingImg = document.createElement('img'),
      imgAck = false,
      loadingAck = false;
	loadingImg.onload = function(){
    if(imgAck)return;
    loadingAck = true;
    $(`.subMsg[data-imgId="${imgId}"]`).append(loadingImg);
  };
	loadingImg.src = './img/loadingImg.gif';
  img.onload = function(){
    imgAck = true;
    if(loadingAck){
      $(`.subMsg[data-imgId="${imgId}"]`)[0].removeChild(loadingImg);
    }
    $(`.subMsg[data-imgId="${imgId}"]`)[0].appendChild(img);
    if(!flag) dataBind.uncheckedMsg += 1;
    else adjustScroll($content[0]);
  };
  img.src = data.src;
});
$("#imgProfile").change(function(){
	let file = this.files[0];
	let size = file.size;
	let pos = $(".imgProfile").offset();
	if(file.type.indexOf('image') !== 0){
		hintToArea({x: pos.left, y: pos.top - 25, msg: "请上传图片文件!", color:'red'});
		return;
	}
	if(size > 1024 * 1024){
		hintToArea({x: pos.left, y: pos.top - 25, msg: "图片应小于1MB"});
		return;
	}
  //放到自己桌面上
  let img = document.createElement('img'),
      dir = 'right';
	inputImgTo({id, name}, dir);
  img.onload = function(){
    $(`.subMsg[data-imgId="${imgId}"]`)[0].appendChild(img);
    adjustScroll($content[0]);
  };
  img.src = window.URL.createObjectURL(file);
	//给服务器发送图片
	let stream = ss.createStream();
	ss(s).emit('imgProfile', stream, {name, fileName: file.name, size});
	ss.createBlobReadStream(file).pipe(stream);

});

function inputImgTo(data, dir){
	let time = getTime();
	let template = `
		<div class="subMsg w100 clearfix ${dir}" data-id="${data.id}" data-imgId="${++imgId}">
			<p class="time w100"><span class="t">${time.time}</span><span class="name">${data.name}</span></p>
		</div>
	`;
	$content[0].innerHTML += template;
	msgNum ++;
	msgInTime ++;
	return imgId;
}
