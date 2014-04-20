console.log("it works");

function requestSearch(e){
	e.preventDefault();
	console.log("requestSearch Success");
	console.log(e);
	var id = e.target.parentElement[0].value;
	console.log(id);
	var url = "/test";
	var update = document.querySelectorAll("#profile-detail-article p");
	//console.log(update);

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
			update[0].innerHTML = "profilePhone : " + jsonObj.profilePhone;
			update[1].innerHTML = "profileStatus : " + jsonObj.profileStatus;
			update[2].innerHTML = "profileVerification : " + jsonObj.profileVerification;
			//document.location.reload(true);
		}
	}
}

var submit = document.querySelector(".search-submit");

submit.addEventListener("click", requestSearch, false);
