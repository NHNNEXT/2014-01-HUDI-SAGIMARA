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

var oEventElements = {
	// EventListener를 위한 elements
	elSubmit : editor.get(".search-submit"),
	elLogo : editor.get(".logo")
};

var visitInfoBarManager = {
	// 해당번호로 검색(방문)한 사람수 관련 정보
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
	
	setVisitNumberSet : function(profileInquiry) {
		// 방문(검색)수를 최근 5일의 정보를 가져와 visitNumberSet에 세팅한다.
		this.visitNumberSet.length = 0;
		for(var key in profileInquiry) {
			if(key != "phoneNumber") {
				this.visitNumberSet.push(profileInquiry[key]);
			}
		}
		this.visitNumberSet.reverse();
	},
	
	executeBarAnimation : function() {
		// 각각의 bar를 시간차를 두고 에니메이션해주는 함수 action
		this.count = 0;
		var elVisitedInfo = editor.get("#visited-info");
		var elVisitedInfoBar = editor.getAll("#visited-graph .bar-section", elVisitedInfo);
		var numberOfBar = elVisitedInfoBar.length - 1;
		
		var barArray = this.checkBarHeight();
		var visitPerHeight = 10; // 방문자 1명당 10px의 높이로 설정

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

var userStatusInfo = {
	// user Status관련 정보
	safety : {
		code : 0,
		color : "#28bf00",
		contents : "<h1>Safety</h1><p>인증된 회원이므로 거래 성사되길 바랍니다.</p><p>중고 물품 거래시 상품을 꼭 확인하세요.</p>"
	},
	
	warning : {
		code : 1,
		color : "#ff9600",
		contents : "<h1>Warning</h1><p>인증되지 않은 회원이므로 거래시 주의 바랍니다.</p><p>중고 물품 거래시 상품을 꼭 확인하세요.</p>"
	},
	
	danger : {
		code : 2,
		color : "#BF322A",
		contents : "<h1>Danger</h1><p>신고된 회원이므로 거래시 주의 바랍니다.</p><p>중고 물품 거래시 상품을 꼭 확인하세요.</p>"
	}
}

var updateManager = {
	updatePage : function(result) {
		// 각요소 전부에게 새로운 정보를 주고 업데이트 시키는 함수
		visitInfoBarManager.setVisitNumberSet(result.profileInquiry);
		this.updateProfile(result);
		this.updateStatus(result);
		this.updateVisit(result);
		this.updateLocation(result);
		this.updateWatch(result);
		this.updateCaution(result);
	},
	
	updateProfile : function(userData) {
		// userProfile부분의 업데이트를 하는 함수
		var elProfileInfo = editor.get("#profile-detail-section");
		var elProfileInfoDetail = editor.getAll("p", elProfileInfo);
		// update될 자료에 대한 확정 필요 - 우선 주석처리
		// var join = "profilePhone : " + userData.profilePhone;
		// var Verification = "profileStatus : " + userData.profileStatus;
		// var Accept = "profileVerificatione : " +
		// userData.profileVerificatione;
		// editor.updateInnerHTML(elProfileInfoDetail[0], join);
		// editor.updateInnerHTML(elProfileInfoDetail[1], Verification);
		// editor.updateInnerHTML(elProfileInfoDetail[2], Accept);
		var type = editor.resultFeatureDetector;
		editor.setStyle(elProfileInfo, type, "running");
	},
	
	updateStatus : function(userData) {
		// user Status부분의 업데이트
		var elProfileStatus = editor.get("#profile-status");
		var elProfileStatusContents = editor.get(".contents", elProfileStatus);
		editor.setStyle(elProfileStatus, "height", "150px");
		
		if (userData.profileStatus == userStatusInfo.safety.code) {
		
			editor.setStyle(elProfileStatus, "background", userStatusInfo.safety.color);
			editor.updateInnerHTML(elProfileStatusContents,
					userStatusInfo.safety.contents)
					
		} else if (userData.profileStatus == userStatusInfo.warning.code) {
			
			editor.setStyle(elProfileStatus, "background", userStatusInfo.warning.color);
			editor.updateInnerHTML(elProfileStatusContents, userStatusInfo.warning.contents)
			
		} else {
			
			editor.setStyle(elProfileStatus, "background", userStatusInfo.danger.color);
			editor.updateInnerHTML(elProfileStatusContents, userStatusInfo.danger.contents)
		
		}
	},	
	
	updateVisit : function(userData) {
		// 해당번호 검색(방문)한 수를 업데이트
		var elVisitInfo = editor.get("#visited-info");
		var elVisitInfoDetail = editor.get("#visited-graph", elVisitInfo);
		var type = editor.resultFeatureDetector;
		editor.setStyle(elVisitInfoDetail, type, "running");
		visitInfoBarManager.executeBarAnimation();
	},
	
	updateLocation : function(userData) {
		// user의 위치정보를 업데이트
		var elLocationInfo = editor.get("#location-info");
		var elLocationInfoDetail = editor.get("#map-canvas p", elLocationInfo);
		var type = editor.resultFeatureDetector;
		editor.setStyle(elLocationInfo, type, "running");
		editor.updateInnerHTML(elLocationInfoDetail, userData.profileLocation);
	},

	updateWatch : function(userData) {
		// user를 지켜보고(등록) 있는 사람의 수를 업데이트
		var elWatchInfo = editor.get("#watch-info");
		var elWatchInfoDetail = editor.get("#watch-tool p", elWatchInfo);
		var type = editor.resultFeatureDetector;
		editor.setStyle(elWatchInfo, type, "running");
		editor.updateInnerHTML(elWatchInfoDetail, userData.profileWatch);

	},
	
	updateCaution : function(userData) {
		// 경고나 신고가 들어온 수를 업데이트
		var elCautionInfo = editor.get("#caution-info");
		var elCautionInfoDetail = editor.get("#caution-tool p", elCautionInfo);
		var type = editor.resultFeatureDetector;
		editor.setStyle(elCautionInfo, type, "running");
		editor.updateInnerHTML(elCautionInfoDetail, userData.profileNotify);
	},
	
	setAnimation : function(state) {
		// 페이지 에니메이션을 시작시키는 함수
		var elContainer = editor.get("#container");
		var elFooter = editor.get("footer");
		
		var type = editor.resultFeatureDetector;
		editor.setStyle(elContainer, type, state);
		editor.setStyle(elFooter, type, state);
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
	}
}

var sagimaraMain = {
	init : function() {
		// 페이지 초기 세팅 관리 함수
		// 검색 아이콘에 검색 관련 통신 이벤트등록
		// 로고에 리프래쉬 기능 이벤트 등록
		// 4일전~오늘날짜를 계산에서 보관
		// FeatureDetector값을 찾아서 저장
		oEventElements.elSubmit.addEventListener("click", this.requestSearchEvent, false);
		oEventElements.elLogo.addEventListener("click", utility.refresh, false);
		visitInfoBarManager.setDateSet()
		editor.playStatusFeatureDetector();
	},
	
	requestSearchEvent : function(e) {
		// 검색 요청 처리 및 서버와 통신
		utility.requestPreventEvent(e);
		updateManager.setAnimation("paused");

		var id = e.target.parentElement[0].value;
		var url = "/test";
		var request = new XMLHttpRequest();
		var formdata = new FormData();
		var result;

		request.open("POST", url, true);
		formdata.append("id", id);
		request.send(formdata);

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				// json ajax 통신 부분
				// 통신이 성공하면 JSON 객체를 받아서 각요소에 보냄
				console.log(request.response);
				result = utility.JSONparse(request.response);
				updateManager.updatePage(result);
				updateManager.setAnimation("running");
			}
		}
	}
}

window.onload = sagimaraMain.init();