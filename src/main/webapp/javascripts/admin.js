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

	//
	elMsgBox : editor.get("#loginBox .msgBox"),

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
	}
};

var loginError = {
	success : function(msg) {
		oEventElements.elMsgBox.style.display = "inline-block";
		oEventElements.elMsgBox.textContent = msg;
	},
	failed : function(msg) {
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
				if (result.code === "200") {
					loginError.success("로그인 성공!!");
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
	}
};

var registerLayer = {
	openPopUp : function() {
		//registerPopUp에 display 옵션을 block으로 설정해서 보이게함.(default: none)
		var registerPopUp = oEventElements.elRegisterPopUp;
		registerPopUp.style.display = "block";
		console.log(registerPopUp);
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
