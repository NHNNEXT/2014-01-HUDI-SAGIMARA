
// 아래 전역변수들을 없애야 하는데.. namespace를 활용하면 좀 쉽게 없앨 수 있음.
var swiper;
var swiperItem = [];
var touchX;
var startTouchX;
var startPercent;
var itemIndex = 0;
var screenX = window.innerWidth;
var validLength = screenX/5;

var timer;
var touches = [];

var swipeManager = {
	swipeCheck : function(touchPos, startPos) {
		if(touchPos-startPos > validLength) { // right swipe action
			return -1;
		}
		else if(startPos-touchPos > validLength) { // left swipe action
			return 1;
		}
		else return 0;
	},

	//init의 규모가 너무 큼.
	//함수를 가볍게하고 나머지 자세한 부분은 함수로 분리해두기.
	init : function() {
		swiper = document.getElementById('detail-info');

		//요렇게 담아두는 건 좋음.
		swiperItem = [
			document.getElementById("location-info"),
			document.getElementById("watch-info"),
			document.getElementById("caution-info")
		];

		//배열은 for in 문을 사용하지 않고(느림), for문을 사용함. 
		//객체의 경우에만 for in을 사용. 
		for(var i in swiperItem) {
			swiperItem[i].style.left = 100*i+"%";
		}
		//timer = setInterval(update, 15);

		swiper.addEventListener('touchend', function() {
			//이벤트핸들러가 꽤 복잡하다면 이것도 별도 콜백 함수로 분리.
			for(var i in swiperItem) {
				console.log("bef : "+swiperItem[i].style.left);
				var leftValue = parseFloat(swiperItem[i].style.left);

				//swipeManager.swipeCheck(touchX, startTouchX 와 같은 값은 지역변수에 담아두고 사용하는 게 더 빠름. 지금은 객체의 속성에 반복적으로 접근해서 느림...
				if(swipeManager.swipeCheck(touchX, startTouchX) > 0)
				{
					leftValue = Math.floor(leftValue/100)*100; //100이 의미하는 건 상수임으로..이건 외부 상수만 보관하는 객체로 분리하는 것이 좋음.
				}
				else if(swipeManager.swipeCheck(touchX, startTouchX) < 0)
				{
					leftValue = Math.ceil(leftValue/100)*100;
				}
				else
				{
					leftValue = Math.round(leftValue/100)*100;
				}
				//-webkit-transition: left 1s; -transition: left 1s;
				//요놈도 한 셋트로 별도 함수에서 처리하도록 분리. 음 그 함수가 0.5와 같은 값을 인자로 받아서 범용적으로 동작하게 하는 게 멋지지 않을까?
				swiperItem[i].style.Transition = 'left 0.5s';
				swiperItem[i].style.WebkitTransition = 'left 0.5s';
				swiperItem[i].style.left = leftValue + "%";
	  		}
			
			//else
		});

		swiper.addEventListener('touchmove', function(event) {

		  event.preventDefault(); //이거 왜 하는지 알고 있지??
		  touchX = event.touches[0].pageX; //pagex말고 비슷한 좌표값을 가지는 값들도 같이 공부하고 그 차이를 알아야 함.
		  var movePercent = (touchX-startTouchX)/screenX*100+startPercent;
		  if(movePercent <= 0 && movePercent >= -100*(swiperItem.length-1)) {
		  	for(var i in swiperItem) {
		  		swiperItem[i].style.Transition = 'left 0s';
				swiperItem[i].style.WebkitTransition = 'left 0s';
		  		swiperItem[i].style.left = (movePercent+i*100) + "%";
		  	}
		  }
		  
		});

		swiper.addEventListener('touchstart', function(event) {
		  event.preventDefault();
		  startTouchX = event.touches[0].pageX;
		  startPercent = parseInt(swiperItem[0].style.left);
		});
	}
}

swipeManager.init();