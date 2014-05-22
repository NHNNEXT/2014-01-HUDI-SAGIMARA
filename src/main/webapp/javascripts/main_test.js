
//test코드는 tests라는 디렉토리처럼 별도의 공간에 보관하는 것이 좋겠음. 서비스코드는 아님으로.

//기븐,웬, 덴 은 참 좋은 습관.

test("dateSet_Test", function(){
	//Given
	var date = new Date();
	var today = date.getDate();
	var month = date.getMonth() + 1;
	var testResult = month + "." + today;	
	//When
	visitInfoBarManager.setDateSet();
	//Then
	//결과에 대한 설명을 표현해주는 게 결과 페이지를 볼 때 좋아요..
//	equal(visitInfoBarManager.dateSet[4], testResult);
	equal(visitInfoBarManager.dateSet[4], testResult, "달과 날짜가 잘 들어있음");

});

test("setvisitNumberSet_Test", function(){
	//Given
	var testArray = [1,2,3,4,5];
	//When
	visitInfoBarManager.setvisitNumberSet(testArray);
	//Then
	equal(visitInfoBarManager.visitNumberSet, testArray);
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
	//Then
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
	
	//Then
	var elLocationInfo = document.querySelector("#location-info"); //이건 Given이것네.
	var expectedDiv = document.querySelector("#location-info-fake"); //이것도.
	equal(elLocationInfo.outerHTML, expectedDiv.firstChild.outerHTML);
});

test("test_case", function() {
	equal("result", "expect");
});