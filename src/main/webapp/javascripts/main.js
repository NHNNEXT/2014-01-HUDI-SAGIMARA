var oEventElements = {
	//EventListener를 위한 elements
	elSubmit : document.querySelector(".search-submit"),
	elLogo : document.querySelector(".logo")
};



var visitInfo = {
	//해당번호로 검색(방문)한 사람수 관련 정보
	setBars : "",
	visitNumberSet : [],
	dateInfo : new Date(),
	setDateSet : function() {
		//최근 5일의 날짜 배열을 dateSet에 세팅한다.
		this.dateSet = new Array();

		this.today = this.dateInfo.getDate();
		this.month = this.dateInfo.getMonth() + 1;
		this.year = this.dateInfo.getFullYear();

		var datePool = 5;
		for (var i = 0 ; i < datePool ; i++) {
			this.dateInfo.setFullYear(this.year, this.month - 1, this.today - i);
			var day = this.dateInfo.getDate();
			var month = this.dateInfo.getMonth() + 1;
			this.dateSet[i] = month + "." + day;
		}
		this.dateInfo.setFullYear(this.year, this.month - 1, this.today);
		this.dateSet.reverse();
	},
	setvisitNumberSet : function(profileInquiry) {
		//방문(검색)수를 최근 5일의 정보를 가져와 visitNumberSet에 세팅한다.
		this.visitNumberSet = profileInquiry;
	}
};

var visitBar = {
	count : 0,
	barAnimationController : function() {
		// 각각의 bar를 시간차를 두고 에니메이션해주는 함수
		this.count = 0;
		var setBars = setInterval((function () {
			var elVisitedInfo = document.querySelector("#visited-info");
			var elVisitedInfoBar = elVisitedInfo.querySelectorAll("#visited-graph .bar-section");
			var numberOfBar = elVisitedInfoBar.length

			if (this.count > numberOfBar - 1) {
				clearInterval(this.setBars);
				return;
			}
			var barArray = this.checkBarHeight();
			var visit = barArray[this.count];
			var visitPerHeight = 10; //방문자 1명당 10px의 높이로 설정 
			var newHeight = (visit * visitPerHeight) + "px";
			var BarHeight = elVisitedInfoBar[this.count].querySelector(".bar");
			var barValue = BarHeight.querySelector("p");
			var barDate = elVisitedInfoBar[this.count].querySelector("p");

			setStyle(BarHeight, "height", newHeight);

			updateInnerHTML(barDate, visitInfo.dateSet[this.count]);
			updateInnerHTML(barValue, visitInfo.visitNumberSet[this.count]);
			this.count++;
		}).bind(this), 300);
	},
	checkBarHeight : function() {
		// bar 높이가 특정 높이 이상으로 높아지는 것을 막고 비율에 맞추어 분배해주는 함수
		var barArray = [];
		var maxcount = 23;
		var totalNumberOfBar = 5;
		var max = Math.max.apply(null, visitInfo.visitNumberSet);
		if (max > maxcount) {
			for (var i = 0; i < totalNumberOfBar ; i++) {
				barArray[i] = visitInfo.visitNumberSet[i] * maxcount / max;
			}
		} else {
			for (var i = 0; i < totalNumberOfBar ; i++) {
				barArray[i] = visitInfo.visitNumberSet[i];
			}
		}

		return barArray;
	}
};

function setStyle(element, type, value) {
	//해당 element에 주어진 type의 스타일을 value값으로 변경
	var targetStyle = element.style;
	targetStyle.setProperty(type, value);
}

function updateInnerHTML(element, contents) {
	//해당 element에 contents을 삽입하는 함수
	var updateContents = contents;
	element.innerHTML = contents;
}

function updateProfile(userData) {
	//userProfile부분의 업데이트를 하는 함수
	var elProfileInfo = document.querySelector("#profile-detail-section");
	var elProfileInfoDetail = elProfileInfo.querySelectorAll("p");
	//update될 자료에 대한 확정 필요.
	var join = "profilePhone : " + userData.profilePhone;
	var Verification = "profileStatus : " + userData.profileStatus;
	var Accept = "profileVerificatione : " + userData.profileVerificatione;
	// updateInnerHTML(elProfileInfoDetail[0], join);
	// updateInnerHTML(elProfileInfoDetail[1], Verification);
	// updateInnerHTML(elProfileInfoDetail[2], Accept);
	setStyle(elProfileInfo, "-webkit-animation-play-state", "running");
	setStyle(elProfileInfo, "-moz-animation-play-state", "running");
	setStyle(elProfileInfo, "animation-play-state", "running");
}

var userStatus = {
	//user Status관련 정보
	safety : {
		code : 0, 
		color : "#28bf00", 
		contents : "<h1>Safety</h1><p>인증된 회원이므로 거래 성사되길 바랍니다.</p><p>중고 물품 거래시 상품을 꼭 확인하세요.</p>"
	},
	warning : {
		code: 1, 
		color : "#ff9600", 
		contents : "<h1>Warning</h1><p>인증되지 않은 회원이므로 거래시 주의 바랍니다.</p><p>중고 물품 거래시 상품을 꼭 확인하세요.</p>"
	},
	danger : {
		code:2, 
		color:"#BF322A", 
		contents:"<h1>Danger</h1><p>신고된 회원이므로 거래시 주의 바랍니다.</p><p>중고 물품 거래시 상품을 꼭 확인하세요.</p>"
	}
}

function updateStatus(userData) {
	//user Status부분의 업데이트
	var elProfileStatus = document.querySelector("#profile-status");
	var elProfileStatusContents = elProfileStatus.querySelector(".contents");
	setStyle(elProfileStatus, "height", "150px");
	if (userData.profileStatus == userStatus.safety.code) {
		setStyle(elProfileStatus, "background", userStatus.safety.color);
		updateInnerHTML(elProfileStatusContents, userStatus.safety.contents)
	} else if (userData.profileStatus == userStatus.warning.code) {
		setStyle(elProfileStatus, "background", userStatus.warning.color);
		updateInnerHTML(elProfileStatusContents, userStatus.warning.contents)
	} else {
		setStyle(elProfileStatus, "background", userStatus.danger.color);
		updateInnerHTML(elProfileStatusContents, userStatus.danger.contents)
	}
}

function updateVisit(userData) {
	//해당번호 검색(방문)한 수를 업데이트
	var elVisitInfo = document.querySelector("#visited-info");
	var elVisitInfoDetail = elVisitInfo.querySelector("#visited-graph");
	setStyle(elVisitInfoDetail, "-webkit-animation-play-state", "running");
	setStyle(elVisitInfoDetail, "-moz-animation-play-state", "running");
	setStyle(elVisitInfoDetail, "animation-play-state", "running");
	
	visitBar.barAnimationController();
}

function updateLocation(userData) {
	//user의 위치정보를 업데이트
	var elLocationInfo = document.querySelector("#location-info");
	var elLocationInfoDetail = elLocationInfo.querySelector("#map-canvas p");
	setStyle(elLocationInfo, "-webkit-animation-play-state", "running");
	setStyle(elLocationInfo, "-moz-animation-play-state", "running");
	setStyle(elLocationInfo, "animation-play-state", "running");
	updateInnerHTML(elLocationInfoDetail, userData.profileLocation);
}

function updateWatch(userData) {
	//user를 지켜보고(등록) 있는 사람의 수를 업데이트
	var elWatchInfo = document.querySelector("#watch-info");
	var elWatchInfoDetail = elWatchInfo.querySelector("#watch-tool p");
	setStyle(elWatchInfo, "-webkit-animation-play-state", "running");
	setStyle(elWatchInfo, "-moz-animation-play-state", "running");
	setStyle(elWatchInfo, "animation-play-state", "running");
	updateInnerHTML(elWatchInfoDetail, userData.profileWatch);

}

function updateCaution(userData) {
	//경고나 신고가 들어온 수를 업데이트
	var elCautionInfo = document.querySelector("#caution-info");
	var elCautionInfoDetail = elCautionInfo.querySelector("#caution-tool p");
	setStyle(elCautionInfo, "-webkit-animation-play-state", "running");
	setStyle(elCautionInfo, "-moz-animation-play-state", "running");
	setStyle(elCautionInfo, "animation-play-state", "running");
	updateInnerHTML(elCautionInfoDetail, userData.profileNotify);
}

function setDefault() {
	//업데이트 될 항목에 대해서 애니메이션 초기화
	var elVisitInfoDetail = document.querySelector("#visited-graph");
	setStyle(elVisitInfoDetail, "-webkit-animation-play-state", "paused");
	setStyle(elVisitInfoDetail, "-moz-animation-play-state", "paused");
	setStyle(elVisitInfoDetail, "animation-play-state", "paused");
	var elLocationInfoDetail = document.querySelector("#map-canvas");
	setStyle(elLocationInfoDetail, "-webkit-animation-play-state", "paused");
	setStyle(elLocationInfoDetail, "-moz-animation-play-state", "paused");
	setStyle(elLocationInfoDetail, "animation-play-state", "paused");
	var elWatchInfoDetail = document.querySelector("#watch-tool p");
	setStyle(elWatchInfoDetail, "-webkit-animation-play-state", "paused");
	setStyle(elWatchInfoDetail, "-moz-animation-play-state", "paused");
	setStyle(elWatchInfoDetail, "animation-play-state", "paused");
	var elCautionInfoDetail = document.querySelector("#caution-tool p");
	setStyle(elCautionInfoDetail, "-webkit-animation-play-state", "paused");
	setStyle(elCautionInfoDetail, "-moz-animation-play-state", "paused");
	setStyle(elCautionInfoDetail, "animation-play-state", "paused");
}


function JSONparse(raw) {
	//json파일을 json객체로 변환
	var jsonObj = JSON.parse(raw);
	
	return jsonObj;
}

function updatePage(result) {
	//각요소 전부에게 새로운 정보를 주고 업데이트 시키는 함수
	visitInfo.setvisitNumberSet(result.profileInquiry);
	updateProfile(result);
	updateStatus(result);
	updateVisit(result);
	updateLocation(result);
	updateWatch(result);
	updateCaution(result);
}

function startAnimation() {
	//페이지 에니메이션을 시작시키는 함수
	var elContainer = document.querySelector("#container");
	var elFooter = document.querySelector("footer");
	
	setStyle(elContainer, "-webkit-animation-play-state", "running");
	setStyle(elContainer, "-moz-animation-play-state", "running");
	setStyle(elContainer, "animation-play-state", "running");
	setStyle(elFooter, "-webkit-animation-play-state", "running");
	setStyle(elFooter, "-moz-animation-play-state", "running");
	setStyle(elFooter, "animation-play-state", "running");
}


function requestSearch(e) {
	requestPreventEvent(e);
	setDefault();
	var id = e.target.parentElement[0].value;
	var url = "/test";
	var testUpdate = document.querySelectorAll("#profile-detail-section p");
	var request = new XMLHttpRequest();
	var formdata = new FormData();
	var result;
	
	request.open("POST", url, true);
	formdata.append("id", id);
	request.send(formdata);

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			console.log(request.response);
			// json ajax 통신 부분
			result = JSONparse(request.response);
			updatePage(result);
			startAnimation();
		}
	}
}

function requestPreventEvent(e) {
	e.preventDefault();
}

function refresh(e) {
	window.location.reload(true);
}


function init() {
	oEventElements.elSubmit.addEventListener("click", requestSearch, false);
	oEventElements.elLogo.addEventListener("click", refresh, false);
	visitInfo.setDateSet()
}


window.onload = init;
