console.log("it works");

function requestSearch(e){
	e.preventDefault();
	console.log("requestSearch Success");
	console.log(e);
	var id = e.target.parentElement[0].value;
	console.log(id);
	var url = "/test";
	
	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	//request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var formdata = new FormData();
	formdata.append("id", id);
	request.send(formdata); 
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			console.log(request);
			//document.location.reload(true);
		}
	}
}

var submit = document.querySelector(".search-submit");

submit.addEventListener("click", requestSearch, false);
