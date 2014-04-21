console.log("it works");

function requestSearch(e){
	e.preventDefault();
	console.log("requestSearch Success");
	console.log(e);
	var id = e.target.parentElement[0].value;
	console.log(id);
	var url = "/test";
	/* querySelectAll의 반환값의 타입이 무엇인지 알기 어려운데요? update라는 이름말고 다른 것이 어떨지 */
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
			/* 아래 4줄은 별도의 함수에서 처리하는 것으로 분리해 되는 수준 */
			var jsonObj = JSON.parse(request.response)
			update[0].innerHTML = "profilePhone : " + jsonObj.profilePhone;
			update[1].innerHTML = "profileStatus : " + jsonObj.profileStatus;
			update[2].innerHTML = "profileVerification : " + jsonObj.profileVerification;
			//document.location.reload(true);
		}
	}
}

/* javascript 접두어(prefix)에 type을 표시하는 게 가독성을 높이는 방법. element라면 el을 붙이고, Array라면 a를 붙이는 등 */
var submit = document.querySelector(".search-submit");

submit.addEventListener("click", requestSearch, false);
