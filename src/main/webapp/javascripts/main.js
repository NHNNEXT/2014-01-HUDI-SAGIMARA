var oEventElements = {
	elSubmit : document.querySelector(".search-submit"),
	elLogo : document.querySelector(".logo")
};

var visitInfo = {
	//해당번호로 검색(방문)한 사람수 관련 정보
	setBars : "",
	dateInfo : new Date(),
	getToday : function() {
		this.dateSet = new Array();

		this.today = this.dateInfo.getDate();
		this.month = this.dateInfo.getMonth() + 1;
		this.year = this.dateInfo.getFullYear();

		console.log(this.dateInfo.getDate());

		// 최근 5일날짜 입력
		for (var i = 0 ; i < 5 ; i++) {
			this.dateInfo.setFullYear(this.year, this.month - 1, this.today - i);
			var day = this.dateInfo.getDate();
			var month = this.dateInfo.getMonth() + 1;
			this.dateSet[i] = month + "." + day;
		}
		this.dateSet.reverse();
	},
	visit : []
};

function setStyle(target, type, value) {
	var targetStyle = target.style;
	targetStyle.setProperty(type, value);
}

function checkBarheight() {
	// bar 높이가 특정 높이 이상으로 높아지는 것을 막고 비율에 맞추어 분배해주는 함수
	var barArray = [];
	var maxcount = 23;
	var max = Math.max.apply(null, visitInfo.visit);
	if (max > maxcount) {
		for (var i = 0; i < 5; i++) {
			barArray[i] = visitInfo.visit[i + 2] * maxcount / max;
		}
	} else {
		for (var i = 0; i < 5; i++) {
			barArray[i] = visitInfo.visit[i + 2];
		}
	}

	return barArray;
}

function updateBar(index) {
	var elVisitedInfo = document.querySelector("#visited-info");
	var elVisitedInfoBar = elVisitedInfo
			.querySelectorAll("#visited-graph .bar-section");
	var length = elVisitedInfoBar.length

	if (index > length - 1) {
		barAnimationController(false);
		return;
	}

	var barArray = checkBarheight();
	var value = barArray[index];
	var newHeight = (value * 10) + "px";
	var BarHeight = elVisitedInfoBar[index].querySelector(".bar");
	var barValue = BarHeight.querySelector("p");
	;
	var barDate = elVisitedInfoBar[index].querySelector("p");

	setStyle(BarHeight, "height", newHeight);

	updateInnerHTML(barDate, visitInfo.dateSet[index]);
	updateInnerHTML(barValue, visitInfo.visit[index + 2]);
}

function barAnimationController(state) {
	i = 0;

	if (state) {
		visitInfo.setBars = setInterval("updateBar(i++)", 100);
	} else {
		clearInterval(visitInfo.setBars);
	}
}

function updateInnerHTML(element, contents) {
	element.innerHTML = contents;
}

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
	setTimeout("barAnimationController(true)", 100);
	visitInfo.getToday();
	checkBarheight();
}

function updateLocation(userData) {
	// moveToTarget(userData.profileLocation);
	var elLocationInfo = document.querySelector("#location-info");
	var elLocationInfoDetail = elLocationInfo.querySelector("#map-canvas p");
	setStyle(elLocationInfo, "-webkit-animation-play-state", "running");
	updateInnerHTML(elLocationInfoDetail, userData.profileLocation);
}

function updateWatch(userData) {
	var elWatchInfo = document.querySelector("#watch-info");
	var elWatchInfoDetail = elWatchInfo.querySelector("#watch-tool p");
	setStyle(elWatchInfo, "-webkit-animation-play-state", "running");
	updateInnerHTML(elWatchInfoDetail, userData.profileWatch);

}

function updateCaution(userData) {
	var elCautionInfo = document.querySelector("#caution-info");
	var elCautionInfoDetail = elCautionInfo.querySelector("#caution-tool p");
	setStyle(elCautionInfo, "-webkit-animation-play-state", "running");
	updateInnerHTML(elCautionInfoDetail, userData.profileNotify);
}

function setDefault() {
	var elVisitInfoDetail = document.querySelector("#visited-graph");
	setStyle(elVisitInfoDetail, "-webkit-animation-play-state", "paused");
	var elLocationInfoDetail = document.querySelector("#map-canvas");
	setStyle(elLocationInfoDetail, "-webkit-animation-play-state", "paused");
	var elWatchInfoDetail = document.querySelector("#watch-tool p");
	setStyle(elWatchInfoDetail, "-webkit-animation-play-state", "paused");
	var elCautionInfoDetail = document.querySelector("#caution-tool p");
	setStyle(elCautionInfoDetail, "-webkit-animation-play-state", "paused");
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
			setStyle(elFooter, "-webkit-animation-play-state", "running");

			visitInfo.visit = jsonObj.profileInquiry;
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
