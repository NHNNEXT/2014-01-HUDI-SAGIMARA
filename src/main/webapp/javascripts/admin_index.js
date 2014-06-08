

var updateManager = {
	updateVisit : function(data, sectionID) {
		// 최근 방문자 수 업데이트
		visitInfoBarManager.setData(data);
		var elVisitInfo = editor.get(sectionID);
		var elVisitInfoDetail = editor.get("#visited-graph", elVisitInfo);
		var elVisitedInfoBar = editor.getAll("#visited-graph .bar-section", elVisitInfo);
		var type = editor.resultFeatureDetector;
		editor.setStyle(elVisitInfoDetail, type, "running");
		visitInfoBarManager.executeBarAnimation(elVisitedInfoBar);
	},
	
	updateReport : function(data, sectionID) {
		// 최근 신고 건수 업데이트
		visitInfoBarManager.setData(data);
		var elVisitInfo = editor.get(sectionID);
		var elVisitInfoDetail = editor.get("#report-graph", elVisitInfo);
		var elVisitedInfoBar = editor.getAll("#report-graph .bar-section", elVisitInfo);
		var type = editor.resultFeatureDetector;
		editor.setStyle(elVisitInfoDetail, type, "running");
		visitInfoBarManager.executeBarAnimation(elVisitedInfoBar);
	},
	
	setAnimation : function(state) {
		// 페이지 에니메이션을 시작시키는 함수
		var elContainer = editor.get("#container");
		
		var type = editor.resultFeatureDetector;
		editor.setStyle(elContainer, type, state);
	}
}

var oVerificationStatus = {
	elTableBody : editor.get(".table>tbody"),
	getVerificationStatus : function(){
		
	}
};

var oNavigationElements = {
	elUlList : editor.get(".nav>ul"),
	elUserList : editor.get(".nav>ul").children[0],
	elVerificationManager : editor.get(".nav>ul").children[1],
	elIDonKnow : editor.get(".nav>ul").children[2],
	
	userListClickEvent : function(e){
		oNavigationElements.removeActiveClass();
		oNavigationElements.elUserList.setAttribute("class", "active");
		document.location.href='./userList';
	},
	
	verificationManagerClickEvent : function(e){
		oNavigationElements.removeActiveClass();
		oNavigationElements.elVerificationManager.setAttribute("class", "active");
		console.log(e.target);
	},
	
	iDonKnowClickEvent : function(e){
		oNavigationElements.removeActiveClass();
		oNavigationElements.elIDonKnow.setAttribute("class", "active");
		console.log(e.target);
	},
	removeActiveClass : function(){
		var index;
		for(index=0; index<this.elUlList.childElementCount; index++){
			this.elUlList.children[index].removeAttribute("class", "active");
		}
	}
	
}

var sagimaraIndex = {
		init : function() {
			// 실행시 contents영역을 계산해서 적용
			contentAreaResize();
			// Login, Register Button 리스너 장착
			
			oNavigationElements.elUserList.addEventListener("click",
					oNavigationElements.userListClickEvent, false);
			oNavigationElements.elVerificationManager.addEventListener("click",
					oNavigationElements.verificationManagerClickEvent, false);
			oNavigationElements.elIDonKnow.addEventListener("click",
					oNavigationElements.iDonKnowClickEvent, false);
			
			visitInfoBarManager.setDateSet();
			editor.playStatusFeatureDetector();
			this.requestVisitsData("visits", ".daily-visitor-graph");
			this.requestVisitsData("notify", ".daily-report-graph");
			this.requestVerificationList("verification",".verification-status");
			this.requestVerificationRequestList("request",".verification-request-list");
			this.requestNotificationList("notification",".recently-report-list");
			
		},

		requestVisitsData : function(requestType, sectionID) {
			// 검색 요청 처리 및 서버와 통신
			updateManager.setAnimation("paused");
			
			var url = "/admin/data";
			var request = new XMLHttpRequest();
			var formdata = new FormData();
			var result;
			
			request.open("POST", url, true);			
			formdata.append("request", requestType);
			request.send(formdata);

			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					result = utility.JSONparse(request.response);
					if(sectionID===".daily-visitor-graph"){
						updateManager.updateVisit(result,sectionID);
					}else if(sectionID===".daily-report-graph"){
						//updateManager.updateReport(result,sectionID);
					}
					updateManager.setAnimation("running");
				}
			}
		},
		
		requestVerificationList : function(requestType, sectionID) {

			var url = "/admin/data";
			var request = new XMLHttpRequest();
			var formdata = new FormData();
			var result;
			
			request.open("POST", url, true);			
			formdata.append("request", requestType);
			formdata.append("count", 5);
			request.send(formdata);

			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					result = utility.JSONparse(request.response);
				
					var i;
					var elSection = editor.get(sectionID);
					var elTableBody = editor.get("tbody",elSection);
					for (i=0;i<result.length;i++){
						var newRow   = elTableBody.insertRow(elTableBody.rows.length);

						//판매자 아이디
						tableEditor.insertRow(newRow,0,result[i]["phoneNum"]);
						//요청시간
						tableEditor.insertRow(newRow,1,result[i]["verificationTime"]);
						//현재 등급
						tableEditor.insertRow(newRow,2,result[i]["verificationStatus"]);
						//사진 링크
						tableEditor.insertRow(newRow,3,result[i]["videoLink"]);
						//위치 정보
						tableEditor.insertRow(newRow,4,result[i]["locationCoordinate"]);
						
					}
				}
			}
		},
		
		requestVerificationRequestList : function(requestType, sectionID) {

			var url = "/admin/data";
			var request = new XMLHttpRequest();
			var formdata = new FormData();
			var result;
			
			request.open("POST", url, true);			
			formdata.append("request", requestType);
			formdata.append("count", 5);
			request.send(formdata);

			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					result = utility.JSONparse(request.response);
				
					var i;
					var elSection = editor.get(sectionID);
					var elTableBody = editor.get("tbody",elSection);
					for (i=0;i<result.length;i++){
						var newRow   = elTableBody.insertRow(elTableBody.rows.length);

						//판매자 아이디
						tableEditor.insertRow(newRow,0,result[i]["requestFrom"]);
						//마지막 요청시간
						tableEditor.insertRow(newRow,1,result[i]["requestDate"]);
						//요청횟수
						tableEditor.insertRow(newRow,2,result[i]["requestCount"]);
						
					}
				}
			}
		},
		
		requestNotificationList : function(requestType, sectionID) {

			var url = "/admin/data";
			var request = new XMLHttpRequest();
			var formdata = new FormData();
			var result;
			
			request.open("POST", url, true);			
			formdata.append("request", requestType);
			formdata.append("count", 5);
			request.send(formdata);

			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					result = utility.JSONparse(request.response);
				
					var i;
					var elSection = editor.get(sectionID);
					var elTableBody = editor.get("tbody",elSection);
					for (i=0;i<result.length;i++){
						var newRow   = elTableBody.insertRow(elTableBody.rows.length);

						//신고대상
						tableEditor.insertRow(newRow,0,result[i]["notificationFrom"]);
						//신고자
						tableEditor.insertRow(newRow,1,result[i]["notificationTo"]);
						//신고날짜
						tableEditor.insertRow(newRow,2,result[i]["notificationDate"]);
						//신고내용
						tableEditor.insertRow(newRow,3,result[i]["notificationText"]);
						
					}
				}
			}
		}
		
		
		
	};

var contentAreaResize = function(){
	var width = (window.innerWidth || self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
	var height = (window.innerHeight || self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
	
	var contentsArea = editor.get(".contents");
	var navigationArea = editor.get(".nav");
	var navigationWidth = 200;
	var contentsWidth = width-navigationWidth;
	var containerChildrenHeight = height;

	contentsArea.style.setProperty("width", contentsWidth+"px");
	contentsArea.style.setProperty("height", containerChildrenHeight+"px");
	navigationArea.style.setProperty("height", containerChildrenHeight+"px");
} 


window.onresize = function() {
	contentAreaResize();

};

sagimaraIndex.init();