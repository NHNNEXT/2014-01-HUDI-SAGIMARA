var visitInfoBarManager = {
	// 해당번호로 검색(방문)한 사람수 관련 정보
	// 사용법
	// setDataSet을 실행하여 오늘 날짜로 업데이트
	// setVisitNumberSet에게 넣을 데이터 Set을 넘겨준다.
	// 에니메이션이 나타나야할 시점에 executeBarAnimation을 실행한다. 
	// 인자로는 해당 .bar-section의 node list를 넘겨준다.
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