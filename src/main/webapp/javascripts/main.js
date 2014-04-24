console.log("it works");
var setBars;

function updateProfile(userData){
	var elProfileStatus = document.querySelector("#profile-status");
	if(userData.profileStatus === "0") {
		elProfileStatus.style.background = "#28bf00";
		elProfileStatus.innerHTML = "Safety";
	} else if(userData.profileStatus === "1") {
		elProfileStatus.style.background = "#da6d0d";
		elProfileStatus.innerHTML = "Warning";
	} else {
		elProfileStatus.style.background = "#BF322A";
		elProfileStatus.innerHTML = "Danger";
	}
}

function updateBar(index) {
	var elVisitedInfo = document.querySelector("#visited-info");
	var elVisitedInfoBar = elVisitedInfo.querySelectorAll("#q-graph .qtr");
	var length = elVisitedInfoBar.length
	

	if(index>length-1) {
		updateVisitedInfo(0,1);
		return;
	}
	
	console.log(elVisitedInfoBar[index].children[0].children[0].children[0]);
	//oldHeight = elVisitedInfoBar[index].children[0].children[0].style.height;
	var newHeight = (120 + i*10) +"px";
	elVisitedInfoBar[index].children[0].children[0].style.height = newHeight;
	var a = elVisitedInfoBar[index].children[0].children[0].children[0];
	updateNumber(a,index+12);

}

function updateNumber(element, number) {
	element.innerHTML = number;
}


function updateVisitedInfo(userData,state) {
	i = 0;
	
	if(state==0){
		setBars = setInterval("updateBar(i++)",100);
	} else {
		clearInterval(setBars);
	}
}

function updateWatch(userData) {
	var elWatchInfo = document.querySelector("#watch-info");
	var elWatchInfoDetail = elWatchInfo.querySelector("#watch-tool");
	updateNumber(elWatchInfoDetail, 5);
}

function updateCaution(userData) {
	var elCautionInfo = document.querySelector("#caution-info");
	var elCautionInfoDetail = elCautionInfo.querySelector("#caution-tool");
	updateNumber(elCautionInfoDetail, 5);
}


function requestSearch(e){
	e.preventDefault();
	console.log("requestSearch Success");
	var id = e.target.parentElement[0].value;
	var url = "/test";
	var testUpdate = document.querySelectorAll("#profile-detail-section p");

	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	//request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var formdata = new FormData();
	formdata.append("id", id);
	request.send(formdata); 
	
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			console.log(request.response);
			//json ajax 통신 부분
			var jsonObj = JSON.parse(request.response)
			updateProfile(jsonObj);
			setTimeout("updateVisitedInfo(0,0)",500);
			updateWatch(jsonObj);
			updateCaution(jsonObj);
			testUpdate[0].innerHTML = "profilePhone : " + jsonObj.profilePhone;
			testUpdate[1].innerHTML = "profileStatus : " + jsonObj.profileStatus;
			testUpdate[2].innerHTML = "profileVerification : " + jsonObj.profileVerification;
			//document.location.reload(true);
		}
	}
}

function refresh(e) {
	window.location.reload(true);
}

var elSubmit = document.querySelector(".search-submit");
var elLogo = document.querySelector(".logo");

elSubmit.addEventListener("click", requestSearch, false);
elLogo.addEventListener("click", refresh, false);
