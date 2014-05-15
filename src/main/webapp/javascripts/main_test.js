test("dateSet_Test", function(){
	visitInfoBarManager.setDateSet();
	equal(visitInfoBarManager.dateSet[4],"5.15");
});