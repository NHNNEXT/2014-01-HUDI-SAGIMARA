
// 전역변수가 너무 많아요. 전에 말한 대로 namespace를 만들어서 재구성해보면 좋겠어요.

var editor = {
	get : function(selector, elements) {
		// 해당 element에 대한 querySelector element가 없을시 document에서 select
		if (typeof elements == "undefined") {
			elements = document;
		}
		var result = elements.querySelector(selector);
		return result;
	}

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
var loginFormRelocation = function loginFormLocation() {

	var loginForm = document.querySelector("#loginBox");
	var formHeight = (window.innerHeight - 220) / 2; //이런 220과 같은 값은 상수 임으로 별도 객체에 보관해서 관리하는 게 더 좋음.
	var formWidth = (window.innerWidth - 410) / 2;

	//style을 설정하는 메서드를 별도로 만들어서 재사용하는 것도 좋겠군요. setCSS({'position' : "fixed" , "top" : fromHeight+"px" , .....})
	//jQuery와 같은 라이브러리를 사용하면 이와 같은 메소드들이 잘 지원되요.
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

//loginError와 registerError은 비슷하면서도 조금씩 다르네요. 
//코드를 통합할 수 있지 않을까? 생각됨. 
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

		//동일한 객체 참조를 자주 하지 마시고 아래처럼 참조를 변수에 담가두고 사용하세요. 그러면 더 빠릅니다.
		//var elParent = e.target.parentNode.parentNode;
		//var id = elParent.child[2].children[0].value;

		var id = e.target.parentNode.parentNode.children[2].children[0].value;
		var password = e.target.parentNode.parentNode.children[4].children[0].value;
		var url = "/admin/login_submit";  //이런URL값도 정적인 값으로 외부로 분리해두면 더 좋아요.
		var request = new XMLHttpRequest();  //ajax코드는 어딘가 재사용가능하게 함수로 분리해두고 그걸 가져다가 쓸 수 있는 방법이 좀더 개선된 방법.
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
					loginError.failed("잘못된 아이디나 패스워드 입니다.");  //이런 에러메시지들도 별도 객체에서 보관하는 게 좋음. 이런 게 다 비즈니스로직과 데이터의 분리를 해야 하는 관점임.
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
		
		//parentNode까지 변수에 할당해두고 사용하기.
		var id = e.target.parentNode.parentNode.children[1].children[0].value;
		var password = e.target.parentNode.parentNode.children[3].children[0].value;
		var passwordCheck = e.target.parentNode.parentNode.children[5].children[0].value;
		var name = e.target.parentNode.parentNode.children[7].children[0].value;
		var email = e.target.parentNode.parentNode.children[9].children[0].value;
		
		registerCheck.init(id,password,passwordCheck,name,email);
		if(registerCheck.all()){
		
			// login함수에서도 있는데 여기서도 동일하게 XHR통신내용이 있음.. 이런반복적인 중복코드를 함수로 없애는 게 중요.
			var url = "/admin/register";
			var request = new XMLHttpRequest();
			var formdata = new FormData();
			var result;
			
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
	}
};

var registerCheck = {
		data : {
			id : "",
			password : "",
			passwordCheck : "",
			name : "",
			email : ""
		},
		
		init : function(id,password,passwordCheck,name,email) {
			this.data.id = id;
			this.data.password = password;
			this.data.passwordCheck = passwordCheck;
			this.data.name = name;
			this.data.email = email;
		},
		
		all : function(){
			//아래코드는.. 이렇게 체크해도 될 거 같음..
			/*
				if(!this.id() || !this.password() || !this.passwordCheck()......) 
				return false;
			 */
			if(!this.id()){
				return false;
			}
			if(!this.password()){
				return false;
			}
			if(!this.passwordCheck()){
				return false;
			}
			if(!this.name()){
				return false;
			}
			if(!this.email()){
				return false;
			}
			return true;
		},
		
		id : function(){
			if(this.data.id===""){
				//이하 나오는 오류메시지들은 모두 객체에 담아서 상수처럼 보관하고 사용하기.
				registerError.failed("아이디를 입력해주세요");
				return false;
			}
			
			// 모든 변수는 var  키워드를 사용하지 않으면 전역변수로 할당됨.(중요)
			// this.data.id.lenght 와 같은 코드는 루브를 돌면서 계속 객체탐색이 일어나는 것이라..연산비용이 들어가는 것임으로 미리 length값을 계산해서 그 계산된 값을 변수에 넣고 
			// 사용하는게 일반적이고 더 성능좋은 코드임.
			for (i=0; i<this.data.id.length ;i++ )
			{
			  ch=this.data.id.charAt(i)
			  if (!(ch>='0' && ch<='9') && !(ch>='a' && ch<='z'))
			  {
				  registerError.failed("아이디는 영어 소문자, 숫자만 가능합니다.");
				  return false;
			  }
			}
			
			return true;
		},
		
		password : function(){
			if(this.data.password===""){
				registerError.failed("비밀번호를 입력해주세요");
				return false;
			}
			if (this.data.password.length<6 || this.data.password.length>16)
			{
				registerError.failed("비밀번호는 6자 이상 16자 이하이여야합니다.");
				return false;
			}
			return true;
		},
		
		passwordCheck : function(){
			if(this.data.passwordCheck===""){
				registerError.failed("비밀번호를 확인 해주세요");
				return false;
			}
			if(this.data.passwordCheck!==this.data.password){
				registerError.failed("비밀번호 확인이 틀렸습니다.");
				return false;
			}
			return true;
		},
		
		name : function(){
			if(this.data.name===""){
				registerError.failed("이름을 입력해주세요");
				return false;
			}
			return true;
		},
		
		email : function(){
			if(this.data.email===""){
				registerError.failed("이메일을 입력해주세요");
				return false;
			}
			//이번기회에 정규표현식에 대한 이해가 더 올라갔기를..
			var eCheck=/^[_a-zA-Z0-9]+([-+.][_a-zA-Z0-9]+)*@([0-9a-zA-Z_-]+)(\.[a-zA-Z]+){1,2}$/i;
			var mail_check = eCheck.test(this.data.email);
			if(mail_check!=true){
				registerError.failed("이메일을 형식이 잘못되었습니다.");
				return false;
			}
			return true;
		}
}

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
