console.log("it works");

function requestSearch(evt){
	evt.preventDefault();
	console.log("requestSearch Success");
	console.log(evt);
}

var submit = document.querySelector(".search-submit");

submit.addEventListener("click", requestSearch, false);
