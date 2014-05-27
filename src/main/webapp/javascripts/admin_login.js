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
		},

};

var oEventElements = {
		// EventListener를 위한 elements
		elLogin : editor.get(".login_button"),
		elRegister : editor.get(".register_button"),
		
		//
		elMsgBox : editor.get("#msgBox")
};

var sagimaraAdmin = {
		init : function() {
			loginFormRelocation();
			oEventElements.elLogin.addEventListener("click", buttonEvent.login, false);
			oEventElements.elRegister.addEventListener("click", buttonEvent.register, false);
		}
};

var loginError = {
		success : function(msg){
			oEventElements.elMsgBox.style.display = "inline-block";
			oEventElements.elMsgBox.textContent = msg;
		},
		failed : function(msg){
			oEventElements.elMsgBox.style.display = "block";
			oEventElements.elMsgBox.textContent = msg;
		}
}

var buttonEvent = {
		login : function(e) {
			e.preventDefault();

			var id = e.target.parentNode.parentNode.children[2].children[0].value;
			var password = e.target.parentNode.parentNode.children[4].children[0].value;
			var url = "/admin/login_submit";
			var request = new XMLHttpRequest();
			var formdata = new FormData();
			var result;
			
			request.open("POST", url, true);
			formdata.append("admin_id", id);
			formdata.append("admin_pw", password);
			request.send(formdata);
			
			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					result = JSON.parse(request.response);
					console.log(result.code);
					if(result.code==="200"){
						loginError.success("로그인 성공!!");
					}else if(result.code==="400"){
						loginError.failed("잘못된 아이디나 패스워드 입니다.");
					}else if(result.code==="204"){
						loginError.failed("비밀번호를 다시 확인하세요.");
					}
				}
			}
			
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
