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

	swipeCheck : function(touchPos, startPos, value) {
		if(touchPos-startPos > validLength) { // right swipe action
			return Math.ceil(value/100)*100;
		}
		else if(startPos-touchPos > validLength) { // left swipe action
			return Math.floor(value/100)*100;
		}
		else return Math.round(value/100)*100;;
	},

	touchstartEvent : function() {
		swiper.addEventListener('touchstart', function(event) {
			event.preventDefault();
		 	startTouchX = event.touches[0].pageX;
		  	//startPercent = parseInt(swiperItem[0].style.left);
		  	startPercent = ItemX[0];
		});
	}

	touchmoveEvent : function(setTransition) {
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
	}

	touchendEvent : function(swipeCheck, setTransition) {
		swiper.addEventListener('touchend', function() {
			for(i = 0 ; i < swiperItem.length ; i++) {
				console.log("bef : "+swiperItem[i].style.left);
				var leftValue = parseFloat(swiperItem[i].style.left);
				
				leftValue = swipeCheck(touchX, startTouchX, leftValue);
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
	}

	eventRegister : function() {
		var swipeCheck = this.swipeCheck;
		var setTransition = this.setTransition;

		this.touchstartEvent();
		this.touchmoveEvent(setTransition);
		this.touchendEvent(swipeCheck, setTransition);	
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

		this.eventRegister();
	}
}

swipeManager.init();