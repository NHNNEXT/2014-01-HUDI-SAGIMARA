console.log("it works"); //좋겠다 동작해서~

//이벤트 변수? 이름을 들으면 무엇을 상상할 수 있지? 
//그리고 key/value 해시맵 구조의 데이터는 object인데 
//자바스크립트는 타입이 없음으로 prefix에 o 와 같이 타입을 추정가능하게 이름짓는 것이일반적.
// oEventVariable = {}
var eventVariable = {
	//아래 el이라고 한 건 element 네요.. 그럼 eventElements 가 적당한 거 아닌가..
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
		// 주석한 줄 있는 거 그남아 다행.. 
		for (var i = 0; i < 5; i++) {
			this.dateSet[4 - i] = this.month + "." + (this.today - i);
		}
	},
	visit : []
};

/* 
이하 코드에 대한 공통리뷰

1. 전역공간에 존재하는 함수. 전역공간에서 없애주세요. 아래 다른 함수들 모~~~두 다.!
2. 변수명 함수명 컨벤션 정하고 잘 지킬것
3. 전역변수 금지.
4. 데이터들 (10, -1. 2..) 이런거 뭔지 상수로 대문자로 선언해두고 그걸로 무엇인지 어떤의미인지 추론가능하게 하기.
5. 함수는 최대한 라인수 작게 하고 함수가 하나 이상의 일을 하는지 리팩토링하기.
6. 더 기능추가하지 말고 가급적 리팩토링 하고 코드 다듬기.(중요)

*/


function checkBarheight() {
	var barArray = [];
	var max = Math.max.apply(null, visitInfo.visit);
	if (max > 23) {
		for (var i = 0; i < 5; i++) {
			barArray[i] = visitInfo.visit[i + 2] * 23 / max;
		}
	} else {
		for (var i = 0; i < 5; i++) {
			barArray[i] = visitInfo.visit[i + 2];
		}
	}

	return barArray;
}

function updateBar(index) {
	var elVisitedInfo = document.querySelector("#visited-info");  //자주 사용되고 길다란 이름은 별로 함수로 묶어서 짧은 코드로 사용하는 건 어떨까? 
	var elVisitedInfoBar = elVisitedInfo.querySelectorAll("#q-graph .qtr"); //el이라고 붙였지만 과연 이게 element 하나 일까? nodelist 아닌가??
	var length = elVisitedInfoBar.length //length는 array의 속성으로 예약어와 동일한 취급을 하는 것임으로 변수명으로 부적절. 

	if (index > length - 1) { // 왜 -1이지 뭘의미하지? 
		barAnimationController(false);
		return;
	}

	var barArray = checkBarheight();
	var value = barArray[index];
	var newHeight = (value * 10) + "px"; //10은 뭐지??? 
	var BarHeight = elVisitedInfoBar[index].querySelector(".bar");
	var barValue = BarHeight.querySelector("p");
	;
	var barDate = elVisitedInfoBar[index].querySelector("p");

	BarHeight.style.height = newHeight; //style을 설정하는 것도 별도 함수로 만들어서 사용하는 거 어떨가? 모든 css속성을 인자로 받아서 반영하는 로직으로.
	visitInfo.getToday();
	updateInnerHTML(barDate, visitInfo.dateSet[index]);
	updateInnerHTML(barValue, visitInfo.visit[index + 2]);
}

function barAnimationController(state) {
	//으악..이 i뭐지. 전역변수로 그냥 할당했네.최악이야.
	i = 0;

	if (state) {
		visitInfo.setBars = setInterval("updateBar(i++)", 100);
	} else {
		clearInterval(visitInfo.setBars);
	}
}

function updateInnerHTML(element, html) {
	element.innerHTML = html; //html을변수명으로 사용하다니...위에 state는 참을만 했지만.
}

function updateProfile(userData) {
	var elProfileInfo = document.querySelector("#profile-detail-section");
	var elProfileInfoDetail = elProfileInfo.querySelectorAll("p");
	var join = "profilePhone : " + userData.profilePhone;
	var Verification = "profileStatus : " + userData.profileStatus;
	var Accept = "profileVerificatione : " + userData.profileVerificatione;
	//위에서 만든거 아래 다 주석되어 있어서 안쓰는거네? 
	// updateInnerHTML(elProfileInfoDetail[0], join);
	// updateInnerHTML(elProfileInfoDetail[1], Verification);
	// updateInnerHTML(elProfileInfoDetail[2], Accept);
	elProfileInfo.style.webkitAnimationPlayState = "running"; //이런코드는 webkit계열만 동작하는 건가? 
}

function updateStatus(userData) {
	var elProfileStatus = document.querySelector("#profile-status");
	elProfileStatus.style.height = "150px";
	if (userData.profileStatus === "0") { //0 이면 0이지 문자열0을 할필요가..? 그리고 0,1,2 말고 이게 가진의미를 갖는게 맞는 거 아닐까? 
		elProfileStatus.style.background = "#28bf00";
		elProfileStatus.innerHTML = "<h1>Safety</h1>"
		//이런 데이터가 하드코딩되어 있다니..로직과 데이터의 분리는 유지보수 관점에서 아주 중요함. 데이터를 발라서 모두 외부 별도 전역변수에 key/value구조로 담아두고 그걸 쓸 것 
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

//아래 유사한 updateVisit를 하나의 컨트롤러 같은데서 분기 처리해서 호출하는 식으로 추상화 할 수 없을까? 
//비슷한 것이 노출되니깐 좀 헷갈리고 그럴듯.
function updateVisit(userData) {
	var elVisitInfo = document.querySelector("#visited-info");
	var elVisitInfoDetail = elVisitInfo.querySelector("#q-graph");
	elVisitInfoDetail.style.webkitAnimationPlayState = "running";
	setTimeout("barAnimationController(true)", 100);
	checkBarheight();
}

function updateLocation(userData) {
	if (userData.profileLocation != "위치정보 없음") { //이런 데이터를 문자열에 넣고 비교하는 건 첨봤음. 상수로 분리하고 사용하기.
		moveToTarget(userData.profileLocation);
		var elLocationInfo = document.querySelector("#location-info");
		var elLocationInfoDetail = elLocationInfo.querySelector("#map-canvas");
		elLocationInfoDetail.style.webkitAnimationPlayState = "running";
	}
}

function updateWatch(userData) {
	var elWatchInfo = document.querySelector("#watch-info");
	var elWatchInfoDetail = elWatchInfo.querySelector("#watch-tool p");
	elWatchInfoDetail.style.webkitAnimationPlayState = "running";
	updateInnerHTML(elWatchInfoDetail, userData.profileWatch);

}

function updateCaution(userData) {
	var elCautionInfo = document.querySelector("#caution-info");
	var elCautionInfoDetail = elCautionInfo.querySelector("#caution-tool p");
	elCautionInfoDetail.style.webkitAnimationPlayState = "running";
	updateInnerHTML(elCautionInfoDetail, userData.profileNotify);
}

function setDefault() {
	//반복...반복...반복 을 보고도 그대로 사용하다니..
	var elVisitInfoDetail = document.querySelector("#q-graph");
	elVisitInfoDetail.style.webkitAnimationPlayState = "paused";
	var elLocationInfoDetail = document.querySelector("#map-canvas");
	elLocationInfoDetail.style.webkitAnimationPlayState = "paused";
	var elWatchInfoDetail = document.querySelector("#watch-tool p");
	elWatchInfoDetail.style.webkitAnimationPlayState = "paused";
	var elCautionInfoDetail = document.querySelector("#caution-tool p");
	elCautionInfoDetail.style.webkitAnimationPlayState = "paused";
}

/* 
requestSearch라는 함수가 있다고 칩시다.
이름만 봐서는 요청을보내는 것만 할것으로 추정함. 
그런데, 아래 함수가 하는 건 뭐지? 
기본 이벤트를 막고, default로 뭔가 초기화를 하고, 로그도 찍고, ajax요청을 보낼 준비를 하고,
ajax요청을 보내고 
응답을 받아서 콜백에서 이것저것 많은 함수를 또 호출하고.

몇가지 일을 한거지?? 이걸 함수이름으로 쓰면 ...
requestPreventEventandsetdefaultandrequestAjaxandsetJsondata () 라고 해야 될 듯...

함수를 여러개 나누시요.
*/

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

//onload 이후 시점에 동작되도록 변경.
eventVariable.elSubmit.addEventListener("click", requestSearch, false);
eventVariable.elLogo.addEventListener("click", refresh, false);
