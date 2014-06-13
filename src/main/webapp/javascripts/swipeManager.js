var SWIPEMANAGER = {
	Elements : {
		swipeArea : document.getElementById('detail-info'),
		swiperItem : [
			document.getElementById("location-info"),
			document.getElementById("watch-info"),
			document.getElementById("caution-info")
		]

	},

	Constants : {
		3figure : 100,
		delayTime : 0.5,
		delayMs : 0.5*1000,
		delayZero : 0,
		leftPerc : 100,
		moveLength : 1/5
	},

	Calculate : {
		swipeCheck : function(touchPos, startPos, value) {
			var validLength = SWIPEMANAGER.Event.Variables.screenX/5;

			if(touchPos-startPos > validLength) { // right swipe action
				return Math.ceil(value/3figure)*3figure;
			}
			else if(startPos-touchPos > validLength) { // left swipe action
				return Math.floor(value/3figure)*3figure;
			}
			else return Math.round(value/3figure)*3figure;
		}
	},

	Stylize : {
		setTransition : function(index,styleContent) {
			var swiperItem = SWIPEMANAGER.Elements.swiperItem;

			swiperItem[index].style.Transition = styleContent;
			swiperItem[index].style.WebkitTransition = styleContent;
			swiperItem[index].style.MozTransition = styleContent;
			swiperItem[index].style.MsTransition = styleContent;
		},

		setLeft : function(index, styleNum) {
			SWIPEMANAGER.Elements.swiperItem[index].style.left = styleNum + "%";
		}
	},
	
	Event : {
		Variables : {
			touchX : 0,
			startTouchX : 0,
			startPercent : 0,
			screenX : window.innerWidth,
			ItemX : [],
			init : function() {
				for(var i = 0 ; i < SWIPEMANAGER.Elements.swiperItem.length ; i++) {
					SWIPEMANAGER.Event.Variables.ItemX[i] = leftPerc*i;
				}
			}
		},

		touchStart : function() {
			SWIPEMANAGER.Elements.swipeArea.addEventListener('touchstart', function(event) {
				event.preventDefault();
			 	SWIPEMANAGER.Event.Variables.startTouchX = event.touches[0].pageX;
			  	SWIPEMANAGER.Event.Variables.startPercent = SWIPEMANAGER.Event.Variables.ItemX[0];
			});
		},

		touchMove : function(setTransition, setLeft) {
			SWIPEMANAGER.Elements.swipeArea.addEventListener('touchmove', function(event) {
				event.preventDefault();

				SWIPEMANAGER.Event.Variables.touchX = event.touches[0].pageX;

				var length = SWIPEMANAGER.Elements.swiperItem.length;
				var touchX = SWIPEMANAGER.Event.Variables.touchX;
				var startTouchX = SWIPEMANAGER.Event.Variables.startTouchX;

				var movePercent = (touchX-startTouchX)/SWIPEMANAGER.Event.Variables.screenX*leftPerc+SWIPEMANAGER.Event.Variables.startPercent;

				if(movePercent <= 0 && movePercent >= -leftPerc*(length-1)) {
					for(i = 0 ; i < length ; i++) {
			  			setTransition(i,'left 0s');
			  			setLeft(i, movePercent+i*leftPerc);
			  		}
			  	}
			});
		},

		touchEnd : function(swipeCheck, setTransition, setLeft) {
			var length = SWIPEMANAGER.Elements.swiperItem.length;
			var swiperItem = SWIPEMANAGER.Elements.swiperItem;

			SWIPEMANAGER.Elements.swipeArea.addEventListener('touchend', function() {
				for(i = 0 ; i < length ; i++) {
					var leftValue = parseFloat(swiperItem[i].style.left);
					
					leftValue = swipeCheck(
						SWIPEMANAGER.Event.Variables.touchX,
						SWIPEMANAGER.Event.Variables.startTouchX,
						leftValue);
					
					setTransition(i,'left '+delayTime+'s');					
					setLeft(i, leftValue);
					
					SWIPEMANAGER.Event.Variables.ItemX[i] = leftValue;
				}

				setTimeout(function(){
					for(i = 0 ; i < length ; i++) {
						setTransition(i,'left '+delayZero+'s');
						setLeft(i, SWIPEMANAGER.Event.Variables.ItemX[i] == 0 ? 0 : -leftPerc);
			  		}
			  	},delayMs);
			});
		},

		Register : function() {
			var swipeCheck = SWIPEMANAGER.Calculate.swipeCheck;
			var setTransition = SWIPEMANAGER.Stylize.setTransition;
			var setLeft = SWIPEMANAGER.Stylize.setLeft;

			SWIPEMANAGER.Event.Variables.init();

			SWIPEMANAGER.Event.touchStart();
			SWIPEMANAGER.Event.touchMove(setTransition, setLeft);
			SWIPEMANAGER.Event.touchEnd(swipeCheck, setTransition, setLeft);	
		}
	}
};

SWIPEMANAGER.Event.Register();