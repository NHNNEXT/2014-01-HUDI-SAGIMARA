

var updateManager = {
	setAnimation : function(state) {
		// 페이지 에니메이션을 시작시키는 함수
		var elContainer = editor.get("#container");

		var type = editor.resultFeatureDetector;
		editor.setStyle(elContainer, type, state);
	}
}

var oVerificationStatus = {
	elTableBody : editor.get(".table>tbody"),
	getVerificationStatus : function() {

	}
};

var oEventElements = {

	elUserPopUp : editor.get("#userPopUp"),
	
	userPhotoClickEvent : function(e) {
		var tr =e.target.parentElement.parentElement.parentNode;
		var id = tr.children[0].textContent;
		oEventElements.requestVerification(id, tr);
		
	},
	
	requestVerification : function(id, tr) {

		var url = "/admin/data";
		var request = new XMLHttpRequest();
		var formdata = new FormData();
		var result;

		request.open("POST", url, true);
		formdata.append("request", "verificationStatusChange");
		formdata.append("id", id);
		formdata.append("status", 0);
		request.send(formdata);
		
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				result = utility.JSONparse(request.response);
				if (result.code === "200") {
					tr.childNodes[3].textContent = "0";
					tr.childNodes[4].textContent = "true";
				}
			}
		}
	}
}

var oNavigationElements = {
	elUlList : editor.get(".nav>ul"),
	elMain : editor.get(".nav>ul").children[0],
	elUserList : editor.get(".nav>ul").children[1],
	elVerificationManager : editor.get(".nav>ul").children[2],

	userListClickEvent : function(e) {
		oNavigationElements.removeActiveClass();
		oNavigationElements.elUserList.setAttribute("class", "active");
		document.location.href = './userList';
	},

	verificationManagerClickEvent : function(e) {
		oNavigationElements.removeActiveClass();
		oNavigationElements.elVerificationManager.setAttribute("class",
				"active");
		document.location.href = './verificationList';
	},

	mainClickEvent : function(e) {
		oNavigationElements.removeActiveClass();
		oNavigationElements.elMain.setAttribute("class", "active");
		document.location.href = './index';
		console.log(e.target);
	},
	removeActiveClass : function() {
		var index;
		for (index = 0; index < this.elUlList.childElementCount; index++) {
			this.elUlList.children[index].removeAttribute("class", "active");
		}
	}
}

var sagimaraIndex = {
	init : function() {
		// 실행시 contents영역을 계산해서 적용
		contentAreaResize();
		editor.playStatusFeatureDetector();
		updateManager.setAnimation("running");
		oNavigationElements.elVerificationManager.setAttribute("class",
				"active");

		// Login, Register Button 리스너 장착
		oNavigationElements.elUserList.addEventListener("click",
				oNavigationElements.userListClickEvent, false);
		oNavigationElements.elVerificationManager.addEventListener("click",
				oNavigationElements.verificationManagerClickEvent, false);
		oNavigationElements.elMain.addEventListener("click",
				oNavigationElements.mainClickEvent, false);

		this.requestUserList();
	},

	requestUserList : function() {

		var url = "/admin/data";
		var request = new XMLHttpRequest();
		var formdata = new FormData();
		var result;

		request.open("POST", url, true);
		formdata.append("request", "verificationList");
		formdata.append("max", 20);
		formdata.append("page", 0);
		formdata.append("orderBy", "");
		request.send(formdata);

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				result = utility.JSONparse(request.response);
				var i;
				var elSection = editor.get(".verificationList");
				var elTableBody = editor.get("tbody", elSection);
				for (i = 0; i < result.length; i++) {
					var newRow = elTableBody.insertRow(elTableBody.rows.length);
					var userListKeyArr = htConstants.aUserListAllInfo;
					var keyLength = htConstants.aUserListAllInfo.length;
					for (var k = 0; k < keyLength; k++) {
						if (userListKeyArr[k] === "videoLink") {
							var linkText = result[i][userListKeyArr[k]];
							tableEditor
							.insertLinkRow(newRow, k, linkText);
							
						} else if(userListKeyArr[k] === "button"){ 
							tableEditor
							.insertVerificationRow(newRow,k,oEventElements.userPhotoClickEvent);
						}else{
							tableEditor.insertRow(newRow, k,
									result[i][userListKeyArr[k]]);
						}
					}
				}
			}
		}
	}

};
var htConstants = {
		aUserListAllInfo : [ "userID", "verificationTime", "verificationStatus",
				"currentStatus", "verification", "location",
				"location_coordinate", "location_time", "videoLink", "videoDate","button"]
	}
var contentAreaResize = function() {
	var width = (window.innerWidth || self.innerWidth
			|| document.documentElement.clientWidth || document.body.clientWidth);
	var height = (window.innerHeight || self.innerHeight
			|| document.documentElement.clientHeight || document.body.clientHeight);

	var contentsArea = editor.get(".contents");
	var navigationArea = editor.get(".nav");
	var navigationWidth = 200;
	var contentsWidth = width - navigationWidth;
	var containerChildrenHeight = height;

	contentsArea.style.setProperty("width", contentsWidth + "px");
	contentsArea.style.setProperty("height", containerChildrenHeight + "px");
	navigationArea.style.setProperty("height", containerChildrenHeight + "px");
}

window.onresize = function() {
	contentAreaResize();

};

sagimaraIndex.init();