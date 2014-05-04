var oEventElements = {
	//EventListener를 위한 elements
	elSubmit : document.querySelector(".search-submit"),
	elLogo : document.querySelector(".logo")
};

function setStyle(element, type, value) {
	//해당 element에 주어진 type의 스타일을 value값으로 변경
	var targetStyle = element.style;
	targetStyle.setProperty(type, value);
}

function updateInnerHTML(element, contents) {
	//해당 element에 contents을 삽입하는 함수
	element.innerHTML = contents;
}

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

		var dateFool = 5;
		for (var i = 0 ; i < dateFool ; i++) {
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
		}).bind(this), 100);
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

function updateProfile(userData) {
	var elProfileInfo = document.querySelector("#profile-detail-section");
	var elProfileInfoDetail = elProfileInfo.querySelectorAll("p");
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

function updateStatus(userData) {
	var elProfileStatus = document.querySelector("#profile-status");
	setStyle(elProfileStatus, "height", "150px");
	if (userData.profileStatus === "0") {
		setStyle(elProfileStatus, "background", "#28bf00");
		elProfileStatus.innerHTML = "<h1>Safety</h1>"
				+ "<p>인증된 회원이므로 거래 성사되길 바랍니다.</p>"
				+ "<p>중고 물품 거래시 상품을 꼭 확인하세요.</p>"
				+ "<button type=\"button\" class=\"button\">인증 요청</button>";
		;
	} else if (userData.profileStatus === "1") {
		setStyle(elProfileStatus, "background", "#ff9600");
		elProfileStatus.innerHTML = "<h1>Warning</h1>"
				+ "<p>인증되지 않은 회원이므로 거래시 주의 바랍니다.</p>"
				+ "<p>중고 물품 거래시 상품을 꼭 확인하세요.</p>"
				+ "<button type=\"button\" class=\"button\">인증 요청</button>";
	} else {
		setStyle(elProfileStatus, "background", "#BF322A");
		elProfileStatus.innerHTML = "<h1>Danger</h1>"
				+ "<p>신고된 회원이므로 거래시 주의 바랍니다.</p>"
				+ "<p>중고 물품 거래시 상품을 꼭 확인하세요.</p>"
				+ "<button type=\"button\" class=\"button\">인증 요청</button>";
	}
}

function updateVisit(userData) {
	var elVisitInfo = document.querySelector("#visited-info");
	var elVisitInfoDetail = elVisitInfo.querySelector("#visited-graph");
	setStyle(elVisitInfoDetail, "-webkit-animation-play-state", "running");
	setStyle(elVisitInfoDetail, "-moz-animation-play-state", "running");
	setStyle(elVisitInfoDetail, "animation-play-state", "running");
	
	visitBar.barAnimationController();
}

function updateLocation(userData) {
	var elLocationInfo = document.querySelector("#location-info");
	var elLocationInfoDetail = elLocationInfo.querySelector("#map-canvas p");
	setStyle(elLocationInfo, "-webkit-animation-play-state", "running");
	setStyle(elLocationInfo, "-moz-animation-play-state", "running");
	setStyle(elLocationInfo, "animation-play-state", "running");
	updateInnerHTML(elLocationInfoDetail, userData.profileLocation);
}

function updateWatch(userData) {
	var elWatchInfo = document.querySelector("#watch-info");
	var elWatchInfoDetail = elWatchInfo.querySelector("#watch-tool p");
	setStyle(elWatchInfo, "-webkit-animation-play-state", "running");
	setStyle(elWatchInfo, "-moz-animation-play-state", "running");
	setStyle(elWatchInfo, "animation-play-state", "running");
	updateInnerHTML(elWatchInfoDetail, userData.profileWatch);

}

function updateCaution(userData) {
	var elCautionInfo = document.querySelector("#caution-info");
	var elCautionInfoDetail = elCautionInfo.querySelector("#caution-tool p");
	setStyle(elCautionInfo, "-webkit-animation-play-state", "running");
	setStyle(elCautionInfo, "-moz-animation-play-state", "running");
	setStyle(elCautionInfo, "animation-play-state", "running");
	updateInnerHTML(elCautionInfoDetail, userData.profileNotify);
}

function setDefault() {
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

function requestSearch(e) {
	e.preventDefault();
	setDefault();
	console.log("requestSearch Success");
	var id = e.target.parentElement[0].value;
	var url = "/test";
	var testUpdate = document.querySelectorAll("#profile-detail-section p");

	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	var formdata = new FormData();
	formdata.append("id", id);
	request.send(formdata);

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			console.log(request.response);
			// json ajax 통신 부분
			var jsonObj = JSON.parse(request.response)
			var elContainer = document.querySelector("#container");
			var elFooter = document.querySelector("footer");
			
			setStyle(elContainer, "-webkit-animation-play-state", "running");
			setStyle(elContainer, "-moz-animation-play-state", "running");
			setStyle(elContainer, "animation-play-state", "running");
			setStyle(elFooter, "-webkit-animation-play-state", "running");
			setStyle(elFooter, "-moz-animation-play-state", "running");
			setStyle(elFooter, "animation-play-state", "running");

			visitInfo.setvisitNumberSet(jsonObj.profileInquiry);
			updateProfile(jsonObj);
			updateStatus(jsonObj);
			updateVisit(jsonObj);
			updateLocation(jsonObj);
			updateWatch(jsonObj);
			updateCaution(jsonObj);
		}
	}
}

function refresh(e) {
	window.location.reload(true);
}

oEventElements.elSubmit.addEventListener("click", requestSearch, false);
oEventElements.elLogo.addEventListener("click", refresh, false);

window.onload = visitInfo.setDateSet();
