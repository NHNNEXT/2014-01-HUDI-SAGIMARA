//로그인 폼 위치 중앙정렬함수 
//즉시실행함수로 실행
var loginFormRelocation = function loginFormLocation() {
	
	var loginForm = document.querySelector("#loginBox");
	var formHeight = (window.innerHeight - 220) / 2;
	var formWidth = (window.innerWidth - 410) / 2;

	loginForm.style.position= "fixed";
	loginForm.style.top= formHeight +"px";
	loginForm.style.left= formWidth +"px";
};

var editor = {
		get : function(selector, elements) {
			//해당 element에 대한 querySelector element가 없을시 document에서 select
			if(typeof elements == "undefined") {
				elements = document;
			}
			var result = elements.querySelector(selector);
			return result;
		}
};

var oEventElements = {
		// EventListener를 위한 elements
		elLogin : editor.get(".login_button"),
		elRegister : editor.get(".register_button")
};

var sagimaraAdmin = {
		init : function() {
			loginFormRelocation();
			oEventElements.elLogin.addEventListener("click", buttonEvent.login, false);
			oEventElements.elRegister.addEventListener("click", buttonEvent.register, false);
		}
};

var buttonEvent = {
		login : function(e) {
			e.preventDefault();
			console.log("login button click");
		},
		register : function(e) {
			e.preventDefault();
			console.log("register button click");
		}
};

window.onresize = function() {
	loginFormRelocation();
};

window.onload = sagimaraAdmin.init();
