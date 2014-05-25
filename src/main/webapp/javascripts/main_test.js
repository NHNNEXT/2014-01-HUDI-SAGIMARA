test("dateSet_Test", function(){
	//Given
	var date = new Date();
	var today = date.getDate();
	var month = date.getMonth() + 1;
	var testResult = month + "." + today;	
	//When
	visitInfoBarManager.setDateSet();
	//Then 날짜가 오늘 날짜로 맞게 들어가는지 확인
	equal(visitInfoBarManager.dateSet[4], testResult);
});

test("setvisitNumberSet_Test", function(){
	//Given
	var testInquery = {"phoneNumber":"0000","today":"1","oneDayAgo":"2","twoDayAgo":"3","threeDayAgo":"4","fourDayAgo":"5"};
	var expectedValue = ["5","4","3","2","1"];
	//When
	visitInfoBarManager.setVisitNumberSet(testInquery);
	var resultValue = visitInfoBarManager.visitNumberSet;
	//Then 방문자 수가 입력값과 결과과 값이 같은지 확인(today)
	equal(resultValue[4], expectedValue[4]);
});

test("updateLocation_Test", function(){
	//Given
	var testdata = {
		profileLocation : "경기도 성남시"
	}
	var elLocationInfo = document.querySelector("#location-info");
	var locationInfoNodeList = elLocationInfo.querySelectorAll("#map-canvas p");
	var updatedLocationInfo = locationInfoNodeList[0];
	//When
	updateManager.updateLocation(testdata);
	//Then 위치정보가 요청한 자료대로 들어가는지 확인
	equal(updatedLocationInfo.innerText, testdata.profileLocation);
	equal(elLocationInfo.style.webkitAnimationPlayState, "running");
});	

test("updateLocation_Test_Independed_browser", function(){
	//Given
	var expectedDivString ="<div id=\"location-info\" style=\"-webkit-animation-play-state: running;\"><div id=\"map-canvas\"><p>경기도 성남시</p></div></div>";
	var expectedDiv = document.querySelector("#location-info-fake");
	expectedDiv.innerHTML = expectedDivString;
	
	var testdata = {
			profileLocation : "경기도 성남시"
		}
	//When
	updateManager.updateLocation(testdata);
	var elLocationInfo = document.querySelector("#location-info");
	var expectedDiv = document.querySelector("#location-info-fake");
	
	//Then 위치정보가 요청한 자료대로 들어가는지 확인 (fake div를 만들어서 확인)
	equal(elLocationInfo.outerHTML, expectedDiv.firstChild.outerHTML);
});

test("test_case", function() {
	equal("result", "expect");
});