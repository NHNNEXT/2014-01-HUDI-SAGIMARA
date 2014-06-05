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
	elLogo : editor.get(".logo"),
	elVerification : editor.get("#verification-button")
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
		var elVisitedInfoBar = editor.getAll("#visited-graph .bar-section", elVisitInfo);
		var type = editor.resultFeatureDetector;
		editor.setStyle(elVisitInfoDetail, type, "running");
		visitInfoBarManager.executeBarAnimation(elVisitedInfoBar);
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

var sagimaraMain = {
	phoneNumber : "",
	init : function() {
		// 페이지 초기 세팅 관리 함수
		// 검색 아이콘에 검색 관련 통신 이벤트등록
		// 로고에 리프래쉬 기능 이벤트 등록
		// 4일전~오늘날짜를 계산에서 보관
		// FeatureDetector값을 찾아서 저장
		oEventElements.elSubmit.addEventListener("click", this.requestSearchEvent.bind(this), false);
		oEventElements.elLogo.addEventListener("click", utility.refresh, false);
		oEventElements.elVerification.addEventListener("click", this.verificationRequestEvent.bind(this), false);
		visitInfoBarManager.setDateSet()
		editor.playStatusFeatureDetector();
	},
	
	verificationRequestEvent : function(e) {
		//인증요청에 대한 처리
		utility.requestPreventEvent(e);
		console.log(e.toElement.parentNode[0]);
		var verification = e.toElement.parentNode

		verification[0].value = "2222";
		verification[1].value = this.phoneNumber;
		verification[2].value = utility.getDateTime();
		//verification.action += "/insert/RequestData?from=1111&to=2222&date=1999-01-01%2012:12:12";
		verification.submit();
	},
	
	requestSearchEvent : function(e) {
		// 검색 요청 처리 및 서버와 통신
		utility.requestPreventEvent(e);
		updateManager.setAnimation("paused");

		this.phoneNumber = e.target.parentElement[0].value;
		var url = "/test";
		var request = new XMLHttpRequest();
		var formdata = new FormData();
		var result;
		
		var input = utility.validPhone(this.phoneNumber);

		request.open("POST", url, true);
		if(input) {
			formdata.append("id", input);
		} else {
			alert("잘못된 번호입력");
			utility.refresh();
		}
		
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