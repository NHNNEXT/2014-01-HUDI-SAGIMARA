var editor = {
	get : function(selector, elements) {
		// 해당 element에 대한 querySelector element가 없을시 document에서 select
		if (typeof elements == "undefined") {
			elements = document;
		}
		var result = elements.querySelector(selector);
		return result;
	},

};

var oEventElements = {
	// EventListener를 위한 elements
	elLogin : editor.get("#loginBox .login_button"),
	elRegister : editor.get("#loginBox .register_button"),
	
	elRequestRegister : editor.get("#registerPopUp .login_button"),
	//
	elLoginMsgBox : editor.get("#loginBox .msgBox"),
	elRegisterMsgBox : editor.get("#registerPopUp .msgBox"),

	// Register와 관련한 Element
	elRegisterPopUp : editor.get("#registerPopUp"),
	elRegisterCloseButton : editor.get(".exit-button"),
	elWrapper : editor.get("#wrapper")
};
// 로그인 폼 위치 중앙정렬함수
// 즉시실행함수로 실행
var loginFormRelocation = function loginFormLocation() {

	var loginForm = document.querySelector("#loginBox");
	var formHeight = (window.innerHeight - 220) / 2;
	var formWidth = (window.innerWidth - 410) / 2;

	loginForm.style.position = "fixed";
	loginForm.style.top = formHeight + "px";
	loginForm.style.left = formWidth + "px";
};

var registerPopupRelocation = function() {
	var registerPopUp = oEventElements.elRegisterPopUp;
	var formHeight = (window.innerHeight - 410) / 2;
	var formWidth = (window.innerWidth - 410) / 2;
	
	registerPopUp.style.position = "fixed";
	registerPopUp.style.top = formHeight + "px";
	registerPopUp.style.left = formWidth + "px";
}

var sagimaraAdmin = {
	init : function() {
		// LoginForm, RegisterPopUp을 가운데로 맞춤
		loginFormRelocation();
		registerPopupRelocation();

		// Login, Register Button 리스너 장착
		oEventElements.elLogin.addEventListener("click", buttonEvent.login,
				false);
		oEventElements.elRegister.addEventListener("click",
				buttonEvent.register, false);
		oEventElements.elRegisterCloseButton.addEventListener("click",
				buttonEvent.registerClose, false);
		
		oEventElements.elRequestRegister.addEventListener("click",
				buttonEvent.requestRegister, false);
		
	}
};

var loginError = {
	success : function(msg) {
		oEventElements.elLoginMsgBox.style.display = "inline-block";
		oEventElements.elLoginMsgBox.textContent = msg;
	},
	failed : function(msg) {
		oEventElements.elLoginMsgBox.style.display = "block";
		oEventElements.elLoginMsgBox.style.setProperty("-webkit-animation-play-state", "running");
		oEventElements.elLoginMsgBox.textContent = msg;
	}
}

var registerError = {
		success : function(msg) {
			oEventElements.elRegisterMsgBox.style.display = "inline-block";
			oEventElements.elRegisterMsgBox.textContent = msg;
		},
		failed : function(msg) {
			oEventElements.elRegisterMsgBox.style.display = "block";
			oEventElements.elRegisterMsgBox.textContent = msg;
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
				if (result.code === "200") {
					window.location.replace("/admin/index");
				} else if (result.code === "400") {
					loginError.failed("잘못된 아이디나 패스워드 입니다.");
				} else if (result.code === "204") {
					loginError.failed("비밀번호를 다시 확인하세요.");
				}
			}
		}

	},
	register : function(e) {
		e.preventDefault();
		registerLayer.openPopUp();
	},
	registerClose : function(e){
		e.preventDefault();
		registerLayer.closePopUp();
	},
	requestRegister : function(e){
		e.preventDefault();
		
		var id = e.target.parentNode.parentNode.children[1].children[0].value;
		var password = e.target.parentNode.parentNode.children[3].children[0].value;
		var passwordCheck = e.target.parentNode.parentNode.children[5].children[0].value;
		var name = e.target.parentNode.parentNode.children[7].children[0].value;
		var email = e.target.parentNode.parentNode.children[9].children[0].value;
		var url = "/admin/register";
		var request = new XMLHttpRequest();
		var formdata = new FormData();
		var result;
		
		console.log(id, password, name, email);
		
		request.open("POST", url, true);
		formdata.append("admin_id", id);
		formdata.append("admin_pw", password);
		formdata.append("admin_name", name);
		formdata.append("admin_email", email);
		request.send(formdata);

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				result = JSON.parse(request.response);
				console.log(result.code);
				if (result.code === "200") {
					registerError.success("회원가입 성공!!");
				} else if (result.code === "400") {
					registerError.failed("잘못된 아이디나 패스워드 입니다.");
				} else if (result.code === "204") {
					registerError.failed("회원가입에 실패하셨습니다..");
				}
			}
		}		
	}
};

var registerLayer = {
	openPopUp : function() {
		//registerPopUp에 display 옵션을 block으로 설정해서 보이게함.(default: none)
		var registerPopUp = oEventElements.elRegisterPopUp;
		registerPopUp.style.display = "block";
		// 
		var deemedLayer = document.createElement("div");
		deemedLayer.setAttribute("id", "deemed");
		
		var wrapper = oEventElements.elWrapper;
		wrapper.appendChild(deemedLayer);

	},
	closePopUp : function() {
		var registerPopUp = oEventElements.elRegisterPopUp;
		registerPopUp.style.display = "none";
		
		var wrapper = oEventElements.elWrapper;
		var deemedLayer = document.getElementById("deemed");
		wrapper.removeChild(deemedLayer);

	}

}

window.onresize = function() {
	loginFormRelocation();
	registerPopupRelocation();
};

window.onload = sagimaraAdmin.init();
