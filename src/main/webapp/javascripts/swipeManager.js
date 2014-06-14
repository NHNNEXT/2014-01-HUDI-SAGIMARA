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
		figure_3 : 100,
		delayTime : 0.5,
		delayMs : 0.5*1000,
		delayZero : 0,
		leftPerc : 100,
		moveLength : 1/5
	},

	Calculate : {
		swipeCheck : function(touchPos, startPos, value) {
			var validLength = SWIPEMANAGER.Event.Variables.screenX/5;
			var figure_3 = SWIPEMANAGER.Constants.figure_3;

			if(touchPos-startPos > validLength) { // right swipe action
				return Math.ceil(value/figure_3)*figure_3;
			}
			else if(startPos-touchPos > validLength) { // left swipe action
				return Math.floor(value/figure_3)*figure_3;
			}
			else return Math.round(value/figure_3)*figure_3;
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
					SWIPEMANAGER.Event.Variables.ItemX[i] = SWIPEMANAGER.Constants.leftPerc*i;
				}
			}
		},

		touchStart : function() {
			SWIPEMANAGER.Elements.swipeArea.addEventListener('touchstart', function(event) {
				var v = SWIPEMANAGER.Event.Variables;

				event.preventDefault();
			 	v.startTouchX = event.touches[0].pageX;
			  	v.startPercent = v.ItemX[0];
			});
		},

		touchMove : function(setTransition, setLeft) {
			SWIPEMANAGER.Elements.swipeArea.addEventListener('touchmove', function(event) {
				event.preventDefault();

				var v = SWIPEMANAGER.Event.Variables;
				v.touchX = event.touches[0].pageX;

				var leftPerc = SWIPEMANAGER.Constants.leftPerc;
				var length = SWIPEMANAGER.Elements.swiperItem.length;
				var touchX = v.touchX;
				var startTouchX = v.startTouchX;

				var movePercent = (touchX-startTouchX)/v.screenX*leftPerc+v.startPercent;

				if(movePercent <= 0 && movePercent >= -leftPerc*(length-1)) {
					for(i = 0 ; i < length ; i++) {
			  			setTransition(i,'left 0s');
			  			setLeft(i, movePercent+i*leftPerc);
			  		}
			  	}
			});
		},

		touchEnd : function(swipeCheck, setTransition, setLeft) {
			var swiperItem = SWIPEMANAGER.Elements.swiperItem;
			var length = swiperItem.length;
			var v = SWIPEMANAGER.Event.Variables;
			var c = SWIPEMANAGER.Constants;

			SWIPEMANAGER.Elements.swipeArea.addEventListener('touchend', function() {
				for(i = 0 ; i < length ; i++) {
					var leftValue = parseFloat(swiperItem[i].style.left);
					
					leftValue = swipeCheck(v.touchX,v.startTouchX,leftValue);
					
					setTransition(i,'left '+c.delayTime+'s');					
					setLeft(i, leftValue);
					
					v.ItemX[i] = leftValue;
				}

				setTimeout( function() {
					for(i = 0 ; i < length ; i++) {
						setTransition(i,'left '+c.delayZero+'s');
						setLeft(i, v.ItemX[i] == 0 ? 0 : -c.leftPerc);
			  		}
			  	},c.delayMs);
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