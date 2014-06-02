

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

var oNavigationElements = {
	elUlList : editor.get(".nav>ul"),
	elUserList : editor.get(".nav>ul").children[0],
	elVerificationManager : editor.get(".nav>ul").children[1],
	elIDonKnow : editor.get(".nav>ul").children[2],
	
	userListClickEvent : function(e){
		oNavigationElements.removeActiveClass();
		oNavigationElements.elUserList.setAttribute("class", "active");
		console.log(e.target);
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