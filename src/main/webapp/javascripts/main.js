var oEventElements = {
	// EventListener를 위한 elements
	elSubmit : document.querySelector(".search-submit"),
	elLogo : document.querySelector(".logo")
};

//자바스크립트의 type은 동적으로 결정되기 때문에 이를 보완하기 위해 이름에 prefix를 붙이는 경우가 있음. 헝가리안표기법을 사용하는 것 추천.
var visitInfoBarManager = {
	// 해당번호로 검색(방문)한 사람수 관련 정보
	setBars : "",
	count : 0,
	visitNumberSet : [],
	dateInfo : new Date(),
	setDateSet : function() {
		// 최근 5일의 날짜 배열을 dateSet에 세팅한다.
		this.dateSet = new Array(); //[]와 같이 literal표기법을 사용하는 것이 간결하고 더 좋음.(저 위에 visitNumbeSet 처럼)

		//아래 today, month와 같이 setDataSet함수에서만 사용하는 지역변수는 객체에 속성으르 추가할 필요가 없음으로 this.today보다는 var today라는 지역변수 사용이 적합함
		this.today = this.dateInfo.getDate();
		this.month = this.dateInfo.getMonth() + 1;
		this.year = this.dateInfo.getFullYear();

		var datePool = 5;
		for (var i = 0; i < datePool; i++) {
			this.dateInfo
					.setFullYear(this.year, this.month - 1, this.today - i);
			var day = this.dateInfo.getDate();
			var month = this.dateInfo.getMonth() + 1;
			this.dateSet[i] = month + "." + day;
		}
		this.dateInfo.setFullYear(this.year, this.month - 1, this.today);
		this.dateSet.reverse();
	},//숨막히지 않게 메서드와 메서드 사이에는 한 줄 공백 넣는 거 어떰?
	setvisitNumberSet : function(profileInquiry) {
		// 방문(검색)수를 최근 5일의 정보를 가져와 visitNumberSet에 세팅한다.
		this.visitNumberSet = profileInquiry;
	},
	barAnimationController : function() {
		// 각각의 bar를 시간차를 두고 에니메이션해주는 함수 action
		// 애니메이션구현을 위해서 심각하게 공부할 주제가 하나 있는데...settimeout으로 애니메이션을 구현할 수 있다는 사실. 썩 더 좋지는 않지만 좀더 나은 방법으로 보통 setInterval보다는 setTimeout으로 구현. 
		// 왜 그런지 한 번 찾아보고 공부할 필요 있음. 
		this.count = 0;
		var setBars = setInterval((function() {

			//300밀리세컨드마다..document객체를 참고할텐데 너무 똑같은 짓을 계속하게 되는건 아닐까? 변하는 값인지 고정된 값인지 확인하고 구현방법 고민하기.
			//그런 코드들이 아래 더 있는지도 같이 찾아보기.
			var elVisitedInfo = document.querySelector("#visited-info"); 
			var elVisitedInfoBar = elVisitedInfo
					.querySelectorAll("#visited-graph .bar-section");
			var numberOfBar = elVisitedInfoBar.length - 1

			if (this.count > numberOfBar) {
				clearInterval(this.setBars);
				return;
			}
			var barArray = this.checkBarHeight();
			var visit = barArray[this.count];
			var visitPerHeight = 10; // 방문자 1명당 10px의 높이로 설정
			var newHeight = (visit * visitPerHeight) + "px";
			var BarHeight = elVisitedInfoBar[this.count].querySelector(".bar");
			var barValue = BarHeight.querySelector("p");
			var barDate = elVisitedInfoBar[this.count].querySelector("p");

			editor.setStyle(BarHeight, "height", newHeight);

			editor.updateInnerHTML(barDate, this.dateSet[this.count]);
			editor.updateInnerHTML(barValue, this.visitNumberSet[this.count]);
			this.count++;
		}).bind(this), 300);
	},
	checkBarHeight : function() {
		// bar 높이가 특정 높이 이상으로 높아지는 것을 막고 비율에 맞추어 분배해주는 함수
		var barArray = [];
		var maxcount = 23; //왜 23이지? javascript에서 이런 상수를 어떻게 표현하는 게 더 좋을까?
		var totalNumberOfBar = 5;
		var max = Math.max.apply(null, this.visitNumberSet);
		if (max > maxcount) {
			for (var i = 0; i < totalNumberOfBar; i++) {
				barArray[i] = this.visitNumberSet[i] * maxcount / max;
			}
		} else {
			for (var i = 0; i < totalNumberOfBar; i++) {
				barArray[i] = this.visitNumberSet[i];
			}
		}

		//바로 위 코드의 조건문을 이런식으로 바꿔서 중복을 없앨 수 있음.
        ///////////////////////////////////////////////////////
		function calc(nValue) {
			for (var i = 0; i < totalNumberOfBar; i++) {
				barArray[i] = this.visitNumberSet[i] * nValue;
			}
		}

		var num =  (max > maxcount) ? (maxcount / max) : 1;
        calc(num);
        ///////////////////////////////////////////////////////

		return barArray;
	}
};

//헝가리안 표기법인 경우 hash table 구조임으로 이름을 htUserStatusInfo로 지을 수 있을 듯.
//contents 와 같은 부분은 javascript template을 공부해서 적용해보는 것도 좋음.(라이브러리 사용권장)
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
		visitInfoBarManager.setvisitNumberSet(result.profileInquiry);
		this.updateProfile(result);
		this.updateStatus(result);
		this.updateVisit(result);
		this.updateLocation(result);
		this.updateWatch(result);
		this.updateCaution(result);
	},
	updateProfile : function(userData) {
		// userProfile부분의 업데이트를 하는 함수
		var elProfileInfo = document.querySelector("#profile-detail-section");
		var elProfileInfoDetail = elProfileInfo.querySelectorAll("p");
		// update될 자료에 대한 확정 필요 - 우선 주석처리
		// var join = "profilePhone : " + userData.profilePhone;
		// var Verification = "profileStatus : " + userData.profileStatus;
		// var Accept = "profileVerificatione : " +
		// userData.profileVerificatione;
		// editor.updateInnerHTML(elProfileInfoDetail[0], join);
		// editor.updateInnerHTML(elProfileInfoDetail[1], Verification);
		// editor.updateInnerHTML(elProfileInfoDetail[2], Accept);
		var type = editor.playStatusFeatureDetector();
		editor.setStyle(elProfileInfo, type, "running");
	},
	//지금 이코드가 복잡하고 빽빽해 보이는 이유는 뭘까..?
	//줄간격만 늘려도 좀 괜찮을 듯(아래 주석코드 참고)
	//그리고 조건문 안에 실행부분이 약간 중복인데 이 부분을 함수로 빼서 처리할 수 있을지도 검토.
	//변수 이름이 긴건 좋은데 보기 어렵다면 좀 짧게 정하는 것도 좋을 듯.

	updateStatus : function(userData) {
		// user Status부분의 업데이트
		var elProfileStatus = document.querySelector("#profile-status");
		var elProfileStatusContents = elProfileStatus
				.querySelector(".contents");
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

		/*  이렇게 줄간격 이라도 좀 띄어왔쏘.
		//var elProfileStatus = document.querySelector("#profile-status"); 요 라인은 아래 라인과 통합가능.
		var elProfileStatusContents = document.querySelector("#profile-status.contents");
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
		*/
	},
	//document.querySelector를 자주 사용하는데 짧은이름으로 래핑함수 하나 만들어 두면 코드 보기도 깔끔할 듯.
	updateVisit : function(userData) {
		// 해당번호 검색(방문)한 수를 업데이트
		var elVisitInfo = document.querySelector("#visited-info");
		var elVisitInfoDetail = elVisitInfo.querySelector("#visited-graph");
		// 한라인으로 처리 feature detecting, browser detecting
		var type = editor.playStatusFeatureDetector();
		editor.setStyle(elVisitInfoDetail, type, "running");
		// action의 의미
		visitInfoBarManager.barAnimationController();
	},
	updateLocation : function(userData) {
		// user의 위치정보를 업데이트
		var elLocationInfo = document.querySelector("#location-info");
		var elLocationInfoDetail = elLocationInfo
				.querySelector("#map-canvas p");
		var type = editor.playStatusFeatureDetector();
		editor.setStyle(elLocationInfo, type, "running");
		editor.updateInnerHTML(elLocationInfoDetail, userData.profileLocation);
	},

	updateWatch : function(userData) {
		// user를 지켜보고(등록) 있는 사람의 수를 업데이트
		var elWatchInfo = document.querySelector("#watch-info");
		var elWatchInfoDetail = elWatchInfo.querySelector("#watch-tool p");
		var type = editor.playStatusFeatureDetector();
		editor.setStyle(elWatchInfo, type, "running");
		editor.updateInnerHTML(elWatchInfoDetail, userData.profileWatch);

	},
	updateCaution : function(userData) {
		// 경고나 신고가 들어온 수를 업데이트
		var elCautionInfo = document.querySelector("#caution-info");
		var elCautionInfoDetail = elCautionInfo.querySelector("#caution-tool p");
		var type = editor.playStatusFeatureDetector();
		editor.setStyle(elCautionInfo, type, "running");
		editor.updateInnerHTML(elCautionInfoDetail, userData.profileNotify);
	},
	setAnimation : function(state) {
		// 페이지 에니메이션을 시작시키는 함수
		var elContainer = document.querySelector("#container");
		var elFooter = document.querySelector("footer");
		
		var type = editor.playStatusFeatureDetector();
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

var editor = {
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
	playStatusFeatureDetector : function() {
		//해당브라우져에서 동작가능한 playStatus를 찾아서 해당 타입을 return해준다.
		var elForCheck = document.querySelector("body");
		//이렇게 되면 객체를 접근할 때 마다 계산하는 셈이니.. 이런값은 초기로직에서 미리 계산해두고 쓰면 좋겠음.
		var playStatus = {
			"-webkit-animation-play-state" : typeof elForCheck.style.webkitAnimationPlayState, 
			"-moz-animation-play-state" : typeof elForCheck.style.mozAnimationPlayState,
			"animation-play-state" :  typeof elForCheck.style.animationPlayState
		}
		var result;

		for(var key in playStatus){
			if(playStatus[key] !== "undefined"){
				result = key;
			}
		}
			
		return result;
	}
}

var sagimaraMain = {
	init : function() {
		// 페이지 초기 세팅 관리 함수
		// 검색 아이콘에 검색 관련 통신 이벤트등록
		// 로고에 리프래쉬 기능 이벤트 등록
		// 4일전~오늘날짜를 계산에서 보관
		oEventElements.elSubmit.addEventListener("click", this.requestSearchEvent, false);
		oEventElements.elLogo.addEventListener("click", utility.refresh, false);
		visitInfoBarManager.setDateSet()
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