var map;
var	geocoder;

function initialize() {
	var mapOptions = {
		zoom : 13,
		center : new google.maps.LatLng(37.38, 127.114),
		disableDefaultUI : true
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
	geocoder =  new google.maps.Geocoder();
	var marker = new google.maps.Marker({
		position : mapOptions.center,
		map : map,
		title : 'Hello World!'
	});
}

function moveToTarget(address) {
	geocoder.geocode({
		'address' : address
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			console.log(results);
			map.setCenter(results[0].geometry.location);
		} else {
			console.log("검색 결과가 없습니다.");
		}
	});
}

//initialize();