/* 
여기에 전역변수 잔뜩 있네.
map, geocoder, initialize, moveToTarget.. 

javascript-immediately-invoked-function (즉시실행함수) 가 무엇인지 찾아보고 여기에 적용할 수 있는지 고민해보세요.
적용가능하다면 어떤 장점이 있는지 알아야 함.
그걸 정리해서 휴디카페 게시판에 5/4일까지 정리해서 올릴 것. (중요)
*/


var map;
var	geocoder;

//무슨 이름이 이렇게 범용적이지.. 지금은 전역공간에 존재하는 함수인데.. 만약 누군가 initialize라는 함수를 또 만들면 어떻게되지..? 
function initialize() {
	var mapOptions = {
		zoom : 13, //왜 13이지?
		center : new google.maps.LatLng(37.38, 127.114), //이런 좌표는 뭘 의미하지..?
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
			console.log(results); //console.log는 모든 브라우저에서 다 있는 함수맞나?? 그렇지 않다면 어떤 조치를 하는 게 좋을까? 
			map.setCenter(results[0].geometry.location);
		} else {
			console.log("검색 결과가 없습니다.");
		}
	});
}

initialize();