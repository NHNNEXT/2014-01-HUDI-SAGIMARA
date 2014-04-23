function initialize() {
  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(37.38,127.114),
    disableDefaultUI: true
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var marker = new google.maps.Marker({
      position: mapOptions.center,
      map: map,
      title: 'Hello World!'
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
