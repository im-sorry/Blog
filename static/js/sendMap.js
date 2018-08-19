function sendMap(){
  let data = {
    id: id,
    name: name,
    x: map.getCenter().lat,
    y: map.getCenter().lng
  }
  s.emit('mapMsg', data);
  inputMapTo(data, 'right');
  adjustScroll($content[0]);
  $('.hideMap').css('animationName', "");
}
function inputMapTo(data, dir){
  let time = getTime();
  let template = `
		<div class="subMsg w100 ${dir}" data-id="${data.id}" style="height:120px">
			<p class="time w100"><span class="t">${time.time}</span><span class="name">${data.name}</span></p>
			<div class="text-map p-r ${dir}">
			  <img src="img/map.jpg" width="100" height="100" alt="" title="点击查看">
        <span id="showMap" class="p-a" data-x="${data.x}" data-y="${data.y}" onclick="showMap(this)">点击查看</span>
      </div>
		</div>
	`;
  $content[0].innerHTML += template;
  msgNum ++;
  msgInTime ++;
}
function showMap(tag){
  if(tag.id == 'showMap'){
    map = new AMap.Map('mapContainer', {
      zoom: 6,
      center:[Number(tag.dataset.y), Number(tag.dataset.x)]
    });
    marker = new AMap.Marker({
      map: map,
    });
    $('.hideMap').css('opacity', '1').css('animationName', 'showMap');
  }
}
