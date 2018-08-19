let scale = null,
    toolBar = null,
    overView = null,
    map = null,
    marker = null;
function onApiLoaded(){
  map = new AMap.Map('mapContainer', {
    zoom: 6
  });
  marker = new AMap.Marker({
    map: map,
  });
}
