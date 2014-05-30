
/* 
객체지향적으로 구현하려는 모습이 좋네요.
잘했어요.

그런데 너무 많은 객체가 있어요. 자바스크립트의 약점인 전역변수를 없애는 것이 중요한데..
main.js 에 코딩한 거와 비슷한 수준으로 객체를 그룹핑하는 거죠.
껍데기 namespace 객체를 하나 만들고 그 하위에 계층적으로 의미단위로 묶어서 추가해보세요.
*/

//로그인 폼 위치 중앙정렬함수 
//즉시실행함수로 실행

//이렇게 함수를 표현하는 것을 함수표현식이라고 함.
//function aaa(){} 이건 함수선언식. 
//그런데 표현식을 할 때는 앞에 변수명이 그냥 함수명으로 되는것이라, 아래 처럼 두 개의 이름을 지정하는 것 혼란스러움.
//따라서 이렇게 두번째 이름은 생략하고 구현할 수 있음.
// var loginFormRelocation = function () {
var loginFormRelocation = function loginFormLocation() {
	
	var loginForm = document.querySelector("#loginBox");
	//220, 410 과 같은 숫자는 어디서 나온 것인지 모르니..계산에 의해서 값을 적어두던가. 데이터만 따로 관리하는 객체를 만들고 그걸 불러오는 게 좋음. 
	// var MY_DATA = { nHeight : 220, nWidth : 410};
	// var formHeight = (window.innerHeight - MY_DATA.nHeight) / 2;  
	
	var formHeight = (window.innerHeight - 220) / 2;  
	var formWidth = (window.innerWidth - 410) / 2;

	loginForm.style.position= "fixed";
	loginForm.style.top= formHeight +"px";
	loginForm.style.left= formWidth +"px";
};

//요런 시도 좋음. 재사용가치 있음.
//editor라는 이름이 의미적으로 적합한지 친구들과 논의해보기.
var editor = {
		get : function(selector, elements) {
			//해당 element에 대한 querySelector element가 없을시 document에서 select
			if(typeof elements == "undefined") {  //'==' 과 '===' 의 차이점 공부하기. 그리고 항상 언제나 === 을 사용하기. ==은 bad pattern.
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
		//login 함수는 이름도 좀 별로지만 ^^; ajax요청은 다른 객체에서 처리하고 여기서는 그 함수를 부르는 정도만 해도 깔끔할 듯.
		login : function(e) {
			e.preventDefault();

			//변수명에 헝가리안 표기법을 쓰는 게 좋은데. 그건 자바스크립트가 정적인 타입선언이 아니기 때문. 헝가리안 표기법이 뭔지 찾아보고 자바스크립트의 코딩컨벤션을 한 번 공부해보삼.
			var id = e.target.parentNode.parentNode.children[2].children[0].value; //이게 혹시 HTML구조가 바뀌는 상황이라면 동작하기 어려워 보임.. 지금 HTML구조를 잘 몰라서 그런것일 수 있지만,변경이 잘 안되는 부분이라면 상관없지만. 그렇지 않은 부분이면 더 좋은 코드가 없을지 고민.
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

//load이벤트도 addEventListener을 사용할 수 있고 그러는 게 더 좋음.(일관성)
window.onload = sagimaraAdmin.init();
