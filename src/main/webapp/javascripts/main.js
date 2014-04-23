console.log("it works");

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

function updateVisitedInfo(userData) {
	var elVisitedInfo = document.querySelector("#visited-info");
	var elVisitedInfoBar = elVisitedInfo.querySelectorAll("#q-graph .qtr");
	
	//console.log(elVisitedInfoBar[0].children);
	var length = elVisitedInfoBar.length
	for(var i=0 ; i < length ; i++) {
		oldHeight = elVisitedInfoBar[i].children[0].children[0].style.height;
		var newHeight = parseInt(oldHeight) + (120 + i*10) +"px";
		elVisitedInfoBar[i].children[0].children[0].style.height = newHeight;
	}

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

//setInterval("updateVisitedInfo()",1000);
//updateVisitedInfo();
setTimeout("updateVisitedInfo()",1000);