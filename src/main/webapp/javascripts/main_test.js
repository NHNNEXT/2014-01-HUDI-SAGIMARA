test("dateSet_Test", function(){
	//Given
	var date = new Date();
	var today = date.getDate();
	var month = date.getMonth() + 1;
	var testResult = month + "." + today;	
	//When
	visitInfoBarManager.setDateSet();
	//Then
	equal(visitInfoBarManager.dateSet[4], testResult);
});

test("setvisitNumberSet_Test", function(){
	//Given
	var testArray = [1,2,3,4,5];
	//When
	visitInfoBarManager.setvisitNumberSet(testArray);
	//Then
	equal(visitInfoBarManager.visitNumberSet, testArray);
});

test("updateLocation_Test", function(){
	//Given
	var testLocation = "경기도 성남시";
	//When
	updateManager.updateLocation(testLocation);
	//Then
	equal(document.qu )
});