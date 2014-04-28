console.log("it works");

var eventVariable = {
	elSubmit : document.querySelector(".search-submit"),
	elLogo : document.querySelector(".logo")
};

var visitInfo = {
	setBars : "",
	dateInfo : new Date(),
	getToday : function() {
		this.today = this.dateInfo.getDate();
		this.month = this.dateInfo.getMonth() + 1;
		this.dateSet = new Array();
		// 최근 5일날짜 입력
		for (var i = 0; i < 5; i++) {
			this.dateSet[4 - i] = this.month + "." + (this.today - i);
		}
	},
	visit : []
};

function checkBarheight() {
	var barArray = [];
	var max = Math.max.apply(null, visitInfo.visit);
	if (max > 23) {
		for (var i = 0; i < 5; i++) {
			barArray[i] = visitInfo.visit[i+2] * 23 / max;
		}
	} else {
		for (var i = 0; i < 5; i++) {
			barArray[i] = visitInfo.visit[i+2];
		}
	}

	return barArray;
}

function updateBar(index) {
	var elVisitedInfo = document.querySelector("#visited-info");
	var elVisitedInfoBar = elVisitedInfo.querySelectorAll("#q-graph .qtr");
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

	BarHeight.style.height = newHeight;
	visitInfo.getToday();
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

function updateInnerHTML(element, html) {
	element.innerHTML = html;
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
	elProfileInfo.style.webkitAnimationPlayState = "running";
}

function updateStatus(userData) {
	var elProfileStatus = document.querySelector("#profile-status");
	elProfileStatus.style.height = "150px";
	if (userData.profileStatus === "0") {
		elProfileStatus.style.background = "#28bf00";
		elProfileStatus.innerHTML = "<h1>Safety</h1>"
				+ "<p>인증된 회원이므로 거래 성사되길 바랍니다.</p>"
				+ "<p>중고 물품 거래시 상품을 꼭 확인하세요.</p>"
				+ "<button type=\"button\" class=\"button\">인증 요청</button>";
		;
	} else if (userData.profileStatus === "1") {
		elProfileStatus.style.background = "#ff9600";
		elProfileStatus.innerHTML = "<h1>Warning</h1>"
				+ "<p>인증되지 않은 회원이므로 거래시 주의 바랍니다.</p>"
				+ "<p>중고 물품 거래시 상품을 꼭 확인하세요.</p>"
				+ "<button type=\"button\" class=\"button\">인증 요청</button>";
	} else {
		elProfileStatus.style.background = "#BF322A";
		elProfileStatus.innerHTML = "<h1>Danger</h1>"
			+ "<p>신고된 회원이므로 거래시 주의 바랍니다.</p>"
			+ "<p>중고 물품 거래시 상품을 꼭 확인하세요.</p>"
			+ "<button type=\"button\" class=\"button\">인증 요청</button>";
	}
}

function updateVisit(userData) {
	var elVisitInfo = document.querySelector("#visited-info");
	var elVisitInfoDetail = elVisitInfo.querySelector("#q-graph");
	elVisitInfoDetail.style.webkitAnimationPlayState = "running";
	setTimeout("barAnimationController(true)", 100);
	checkBarheight();
}

function updateLocation(userData) {
		//moveToTarget(userData.profileLocation);
	var elLocationInfo = document.querySelector("#location-info");
	var elLocationInfoDetail = elLocationInfo.querySelector("#map-canvas p");
	elLocationInfo.style.webkitAnimationPlayState = "running";
	updateInnerHTML(elLocationInfoDetail, userData.profileLocation);
}

function updateWatch(userData) {
	var elWatchInfo = document.querySelector("#watch-info");
	var elWatchInfoDetail = elWatchInfo.querySelector("#watch-tool p");
	elWatchInfo.style.webkitAnimationPlayState = "running";
	updateInnerHTML(elWatchInfoDetail, userData.profileWatch);

}

function updateCaution(userData) {
	var elCautionInfo = document.querySelector("#caution-info");
	var elCautionInfoDetail = elCautionInfo.querySelector("#caution-tool p");
	elCautionInfo.style.webkitAnimationPlayState = "running";
	updateInnerHTML(elCautionInfoDetail, userData.profileNotify);
}

function setDefault() {
	var elVisitInfoDetail = document.querySelector("#q-graph");
	elVisitInfoDetail.style.webkitAnimationPlayState = "paused";
	var elLocationInfoDetail = document.querySelector("#map-canvas");
	elLocationInfoDetail.style.webkitAnimationPlayState = "paused";
	var elWatchInfoDetail = document.querySelector("#watch-tool p");
	elWatchInfoDetail.style.webkitAnimationPlayState = "paused";
	var elCautionInfoDetail = document.querySelector("#caution-tool p");
	elCautionInfoDetail.style.webkitAnimationPlayState = "paused";
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
	// request.setRequestHeader("Content-type",
	// "application/x-www-form-urlencoded");
	var formdata = new FormData();
	formdata.append("id", id);
	request.send(formdata);

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			console.log(request.response);
			// json ajax 통신 부분
			var jsonObj = JSON.parse(request.response)
			var elContainer = document.querySelector("#container");
			elContainer.style.webkitAnimationPlayState = "running";
			var elFooter = document.querySelector("footer");
			elFooter.style.webkitAnimationPlayState = "running";
			visitInfo.visit = jsonObj.profileInquiry;
			updateProfile(jsonObj);
			updateStatus(jsonObj);
			updateVisit(jsonObj);
			updateLocation(jsonObj);
			updateWatch(jsonObj);
			updateCaution(jsonObj);
			// document.location.reload(true);
		}
	}
}

function refresh(e) {
	window.location.reload(true);
}

eventVariable.elSubmit.addEventListener("click", requestSearch, false);
eventVariable.elLogo.addEventListener("click", refresh, false);
