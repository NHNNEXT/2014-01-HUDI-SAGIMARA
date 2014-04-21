console.log("it works");

function updateProfile(userData){
	var elProfileStatus = document.querySelector("#profile-status");
	if(userData.profileStatus === "0") {
//		var oldClassName = elProfileStatus.className;
//		var newClassName = oldClassName + "-safety";
//		elProfileStatus.className = newClassName;
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

var elsubmit = document.querySelector(".search-submit");

elsubmit.addEventListener("click", requestSearch, false);
