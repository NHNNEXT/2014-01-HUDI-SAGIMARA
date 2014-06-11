var swiper;
var swiperItem = [];
var touchX;
var startTouchX;
var startPercent;
var ItemX = [];
var screenX = window.innerWidth;
var validLength = screenX/5;

var swipeManager = {
	
	setTransition : function(index,styleContent) {
		swiperItem[index].style.Transition = styleContent;
		swiperItem[index].style.WebkitTransition = styleContent;
		swiperItem[index].style.MozTransition = styleContent;
		swiperItem[index].style.MsTransition = styleContent;
	},

	swipeCheck : function(touchPos, startPos) {
		if(touchPos-startPos > validLength) { // right swipe action
			return -1;
		}
		else if(startPos-touchPos > validLength) { // left swipe action
			return 1;
		}
		else return 0;
	},

	init : function() {
		swiper = document.getElementById('detail-info');
		swiperItem = [
			document.getElementById("location-info"),
			document.getElementById("watch-info"),
			document.getElementById("caution-info")
		];

		for(i = 0 ; i < swiperItem.length ; i++) {
			ItemX[i] = 100*i;
		}
		
		var swipeCheck = this.swipeCheck;
		var setTransition = this.setTransition;

		swiper.addEventListener('touchend', function() {
			for(i = 0 ; i < swiperItem.length ; i++) {
				console.log("bef : "+swiperItem[i].style.left);
				var leftValue = parseFloat(swiperItem[i].style.left);
				if(swipeCheck(touchX, startTouchX) > 0)
				{
					leftValue = Math.floor(leftValue/100)*100;
				}
				else if(swipeCheck(touchX, startTouchX) < 0)
				{
					leftValue = Math.ceil(leftValue/100)*100;
				}
				else
				{
					leftValue = Math.round(leftValue/100)*100;
				}
				//-webkit-transition: left 1s; -transition: left 1s;
				setTransition(i,'left 0.5s');
				
				swiperItem[i].style.left = leftValue + "%";
				
				ItemX[i] = leftValue;
				console.log("0.5s");
			}

			setTimeout(function(){
				for(i = 0 ; i < swiperItem.length ; i++) {
					setTransition(i,'left 0s');
					swiperItem[i].style.left = (ItemX[i] == 0 ? 0 : -100) + "%";
					console.log("0s");
		  		}
		  	},500);
		});

		swiper.addEventListener('touchmove', function(event) {

		  event.preventDefault();
		  touchX = event.touches[0].pageX;
		  var movePercent = (touchX-startTouchX)/screenX*100+startPercent;
		  if(movePercent <= 0 && movePercent >= -100*(swiperItem.length-1)) {
		  	for(i = 0 ; i < swiperItem.length ; i++) {
		  		setTransition(i,'left 0s');
		  		swiperItem[i].style.left = (movePercent+i*100) + "%";
		  	}
		  }
		  
		});

		swiper.addEventListener('touchstart', function(event) {
		  event.preventDefault();
		  startTouchX = event.touches[0].pageX;
		  //startPercent = parseInt(swiperItem[0].style.left);
		  startPercent = ItemX[0];
		});
	}
}

swipeManager.init();