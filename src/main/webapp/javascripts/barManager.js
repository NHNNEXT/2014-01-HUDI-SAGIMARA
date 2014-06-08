var editor = {
	get : function(selector, elements) {
		//해당 element에 대한 querySelector element가 없을시 document에서 select
		if(typeof elements == "undefined") {
			elements = document;
		}
		var result = elements.querySelector(selector);
		return result;
	},
	
	getAll : function(selector, elements) {
		//해당 element에 대한 querySelectorAll element가 없을시 document에서 select
		if(typeof elements == "undefined") {
			elements = document;
		}
		var result = elements.querySelectorAll(selector);
		return result;
	},
		
	setStyle : function(element, type, value) {
		// 해당 element에 주어진 type의 스타일을 value값으로 변경
		var targetStyle = element.style;
		
		targetStyle.setProperty(type, value);
	},
	
	updateInnerHTML : function(element, contents) {
		// 해당 element에 contents을 삽입하는 함수
		var updateContents = contents;
		element.innerHTML = contents;
	},
	
	resultFeatureDetector : "",
	
	playStatusFeatureDetector : function() {
		//해당브라우져에서 동작가능한 playStatus를 찾아서 해당 타입을 resultFeatureDetector에 저장 해준다.
		var result;
		var elForCheck = editor.get("body");
		var playStatus = {
			"-webkit-animation-play-state" : typeof elForCheck.style.webkitAnimationPlayState, 
			"-moz-animation-play-state" : typeof elForCheck.style.mozAnimationPlayState,
			"animation-play-state" :  typeof elForCheck.style.animationPlayState
		}

		for(var key in playStatus){
			if(playStatus[key] !== "undefined"){
				result = key;
			}
		}
		
		this.resultFeatureDetector = result;
	}
}

var utility = {
	requestPreventEvent : function(e) {
		// submit 이벤트를 막는 기능
		e.preventDefault();
	},
	
	refresh : function(e) {
		// 화면 리프래쉬 함수
		window.location.reload(true);
	},
	
	JSONparse : function(raw) {
		// json파일을 json객체로 변환
		var jsonObj = JSON.parse(raw);
		return jsonObj;
	},
	
	validPhone : function(input)
	{
		//입력된 전화번호의 유효성 판단
		// 010-1234-5678, 010 1234 5678과 같이 하이픈이나 공백으로 구분되는 입력
		var input = input.replace("-","");
		input = input.replace(" ","");
		
		var inputLength = input.length;
		
		var midThreeDigitNumber = 10; //중간 3자리 핸드폰 번호 길이 
		var midFourDigitNumber = 11; //중간 4자리 핸드폰 번호 길이
		var forTest = 4; //test를 위한 길이 추후삭제요

		if(inputLength === midThreeDigitNumber || inputLength === midFourDigitNumber || inputLength === forTest) {
			return input;// 휴대폰 형식에 맞는 String
		} else {
			return false;// 휴대폰 형식이 아닌 경우
		}
		/* 추가 기능
		- 앞자리 세자리에 대한 예외적용(010 부분)
		- 국제 번호 형식에 대한 처리(+82 1012345678 등)
		*/
	},
	
	getDateTime : function() {
		var currentdate = new Date(); 
		var datetime = currentdate.getFullYear()+ "-"
		                + (currentdate.getMonth()+1)  + "-" 
		                + currentdate.getDate() + " "  
		                + currentdate.getHours() + ":"  
		                + currentdate.getMinutes() + ":" 
		                + currentdate.getSeconds();
		return datetime;
	}
}

var visitInfoBarManager = {
	// 해당번호로 검색(방문)한 사람수 관련 정보
	// <<사용법>>
	// 1.setDataSet을 실행하여 오늘 날짜로 업데이트
	// 2.setVisitNumberSet에게 넣을 데이터 Set을 넘겨준다.
	// 3.에니메이션이 나타나야할 시점에 executeBarAnimation을 실행한다. 인자로는 해당 .bar-section의 node list를 넘겨준다.
	setBars : "",
	count : 0,
	visitNumberSet : [],
	dateInfo : new Date(),
	setDateSet : function() {
		// 최근 5일의 날짜 배열을 dateSet에 세팅한다.
		this.dateSet = [];

		var today = this.dateInfo.getDate();
		var month = this.dateInfo.getMonth() + 1;
		var year = this.dateInfo.getFullYear();

		var datePool = 5;
		for (var i = 0; i < datePool; i++) {
			this.dateInfo
					.setFullYear(year, month - 1, today - i);
			var day = this.dateInfo.getDate();
			var month = this.dateInfo.getMonth() + 1;
			this.dateSet[i] = month + "." + day;
		}
		this.dateInfo.setFullYear(year, month - 1, today);
		this.dateSet.reverse();
	},
	
	setVisitNumberSet : function(data) {
		// 방문(검색)수를 최근 5일의 정보를 가져와 visitNumberSet에 세팅한다.
		this.visitNumberSet.length = 0;
		for(var key in data) {
			if(key != "phoneNumber") {
				this.visitNumberSet.push(data[key]);
			}
		}
		this.visitNumberSet.reverse();
	},
	
	setData : function(data) {
		// 방문(검색)수를 최근 5일의 정보를 가져와 visitNumberSet에 세팅한다.
		this.visitNumberSet.length = 0;

		for(var key in data) {
			this.visitNumberSet.push(data[key]);
		}
		this.visitNumberSet.reverse();
	},
	
	executeBarAnimation : function(nodeList) {
		// 각각의 bar를 시간차를 두고 에니메이션해주는 함수 action
		this.count = 0;
		var elVisitedInfoBar = nodeList;
		var numberOfBar = elVisitedInfoBar.length - 1;
		
		var barArray = this.checkBarHeight();
		var visitPerHeight = 10; // 방문자 1명당 10px의 높이로 설정
//		setBar2에 setTimeout방식으로 구현
//		var setBars = setInterval((function() {
//			if (this.count > numberOfBar) {
//				clearInterval(this.setBars);
//				return;
//			}
//			
//			var visit = barArray[this.count];	
//			var newHeight = (visit * visitPerHeight) + "px";
//			var BarHeight = editor.get(".bar", elVisitedInfoBar[this.count]);
//			var barValue = editor.get("p", BarHeight);
//			var barDate = editor.get("p", elVisitedInfoBar[this.count]);
//
//			editor.setStyle(BarHeight, "height", newHeight);
//
//			editor.updateInnerHTML(barDate, this.dateSet[this.count]);
//			editor.updateInnerHTML(barValue, this.visitNumberSet[this.count]);
//			
//			this.count++;
//		}).bind(this), 300);
		
		var setBar2 = (function() {
			var visit = barArray[this.count];	
			var newHeight = (visit * visitPerHeight) + "px";
			var BarHeight = editor.get(".bar", elVisitedInfoBar[this.count]);
			var barValue = editor.get("p", BarHeight);
			var barDate = editor.get("p", elVisitedInfoBar[this.count]);

			editor.setStyle(BarHeight, "height", newHeight);

			editor.updateInnerHTML(barDate, this.dateSet[this.count]);
			editor.updateInnerHTML(barValue, this.visitNumberSet[this.count]);
			
			this.count++;
			
			if (this.count <= numberOfBar) {
				setTimeout(setBar2, 300);
			}
		}).bind(this);
			
		setBar2();
	},	
	
	checkBarHeight : function() {
		// bar 높이가 특정 높이 이상으로 높아지는 것을 막고 비율에 맞추어 분배해주는 함수
		var barArray = [];
		var visitPerHeight = 10; // 방문자 1명당 10px의 높이로 설정
		var maxHeight = editor.get("#visited-graph").offsetHeight * 0.70; // 그래프창 높이의 70%를 max height로 설정
		var maxcount = maxHeight/visitPerHeight; // 방문자수의 최대 숫자를 산정
		
		var totalNumberOfBar = 5;
		var max = Math.max.apply(null, this.visitNumberSet);
		
		var num =  (max > maxcount) ? (maxcount / max) : 1;
		
		for (var i = 0; i < totalNumberOfBar; i++) {
			barArray[i] = this.visitNumberSet[i] * num;
		}

		return barArray;
	}
};