loginFormLocaion();
function loginFormLocaion() {
	var loginForm = document.querySelector("#loginBox");
	var formHeight = (window.innerHeight - 196) / 2;
	var formWidth = (window.innerWidth - 400) / 2;

	loginForm.style.position= "fixed";
	loginForm.style.top= formHeight +"px";
	loginForm.style.left= formWidth +"px";
}
