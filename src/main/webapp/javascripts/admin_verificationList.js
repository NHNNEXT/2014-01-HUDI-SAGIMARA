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

					tableEditor.insertRow(newRow, 0, result[i]["userID"]);
					tableEditor.insertRow(newRow, 1,
							result[i]["verificationTime"]);
					tableEditor.insertRow(newRow, 2,
							result[i]["verificationStatus"]);
					tableEditor
							.insertRow(newRow, 3, result[i]["currentStatus"]);
					tableEditor.insertRow(newRow, 4, result[i]["verification"]);
					tableEditor.insertRow(newRow, 5, result[i]["location"]);
					tableEditor.insertRow(newRow, 6,
							result[i]["location_coordinate"]);
					tableEditor
							.insertRow(newRow, 7, result[i]["location_time"]);
					tableEditor
							.insertLinkRow(newRow, 8, result[i]["videoLink"]);
					tableEditor.insertRow(newRow, 9, result[i]["videoDate"]);

				}
			}
		}
	}

};

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