
var oEventElements = {
	// EventListener를 위한 elements
	elSubmit : editor.get(".search-submit"),
	elLogo : editor.get(".logo"),
	elVerificationTop : editor.get("#verification-button-top"),
	elVerificationMid : editor.get("#verification-button-mid")
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
		oEventElements.elVerificationTop.addEventListener("click", this.verificationRequestEvent.bind(this), false);
		oEventElements.elVerificationMid.addEventListener("click", this.verificationRequestEvent.bind(this), false);
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