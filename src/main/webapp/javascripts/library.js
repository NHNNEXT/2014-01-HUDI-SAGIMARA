var editor = {
	get : function(selector, elements) {
		// 해당 element에 대한 querySelector element가 없을시 document에서 select
		if (typeof elements === "undefined") {
			elements = document;
		}
		var result = elements.querySelector(selector);
		return result;
	},

	getAll : function(selector, elements) {
		// 해당 element에 대한 querySelectorAll element가 없을시 document에서 select
		if (typeof elements === "undefined") {
			elements = document;
		}
		var result = elements.querySelectorAll(selector);
		return result;
	},

	setStyle : function(element, type, value) {
		// 해당 element에 주어진 type의 스타일을 value값으로 변경
		var targetStyle = element.style;

		targetStyle.setProperty(type, value);
	},

	getStyle : function(element, type) {
		// 해당 element에 주어진 type의 스타일 value 리턴
		var targetStyle = window.getComputedStyle(element);

		return targetStyle.getPropertyValue(type);

	},

	updateInnerHTML : function(element, contents) {
		// 해당 element에 contents을 삽입하는 함수
		var updateContents = contents;
		element.innerHTML = contents;
	},

	resultFeatureDetector : "",

	playStatusFeatureDetector : function() {
		// 해당브라우져에서 동작가능한 playStatus를 찾아서 해당 타입을 resultFeatureDetector에 저장 해준다.
		var result;
		var elForCheck = editor.get("body");
		var playStatus = {
			"-webkit-animation-play-state" : typeof elForCheck.style.webkitAnimationPlayState,
			"-moz-animation-play-state" : typeof elForCheck.style.mozAnimationPlayState,
			"animation-play-state" : typeof elForCheck.style.animationPlayState
		}

		for ( var key in playStatus) {
			if (playStatus[key] !== "undefined") {
				result = key;
			}
		}

		this.resultFeatureDetector = result;
	}
}

var utility = {
	requestPreventEvent : function(e) {
		// submit 이벤트를 막는 기능
		e.preventDefault();
	},

	refresh : function(e) {
		// 화면 리프래쉬 함수
		window.location.reload(true);
	},

	JSONparse : function(raw) {
		// json파일을 json객체로 변환
		var jsonObj = JSON.parse(raw);
		return jsonObj;
	},

	validPhone : function(input) {
		// 입력된 전화번호의 유효성 판단
		// 010-1234-5678, 010 1234 5678과 같이 하이픈이나 공백으로 구분되는 입력
		var input = input.replace("-", "");
		input = input.replace(" ", "");

		var inputLength = input.length;

		var midThreeDigitNumber = 10; // 중간 3자리 핸드폰 번호 길이
		var midFourDigitNumber = 11; // 중간 4자리 핸드폰 번호 길이
		var forTest = 4; // test를 위한 길이 추후삭제요

		if (inputLength === midThreeDigitNumber
				|| inputLength === midFourDigitNumber
				|| inputLength === forTest) {
			return input;// 휴대폰 형식에 맞는 String
		} else {
			return false;// 휴대폰 형식이 아닌 경우
		}
		/*
		 * 추가 기능 - 앞자리 세자리에 대한 예외적용(010 부분) - 국제 번호 형식에 대한 처리(+82 1012345678 등)
		 */
	},

	getDateTime : function() {
		var currentdate = new Date();
		var datetime = currentdate.getFullYear() + "-"
				+ (currentdate.getMonth() + 1) + "-" + currentdate.getDate()
				+ " " + currentdate.getHours() + ":" + currentdate.getMinutes()
				+ ":" + currentdate.getSeconds();
		return datetime;
	}
}

var tableEditor = {
	insertRow : function(row, cellNum, text) {
		var newCell = row.insertCell(cellNum);
		var newText = document.createTextNode(text)
		newCell.appendChild(newText);
	},

	insertLinkRow : function(row, cellNum, text) {
		var newCell = row.insertCell(cellNum);
		var newDiv = document.createElement("div");
		if (text !== "") {
			text = "updatedImages" + text.split('updatedImages')[1]
			newDiv.innerHTML = "<a href='../" + text + "'>img</a>";
			console.log(text);
			newCell.appendChild(newDiv);
		}
	}
}

var ajax = {
	request : function(url, formdata, onreadyStateChangeFunction) {
		var request = new XMLHttpRequest();
		var result;
		request.open("POST", url, true);
		request.send(formdata);
		request.onreadystatechange =  onreadyStateChangeFunction.bind(null, request);

	}
}
