test("requestRegister_Test", function(){
	//Given

	var box = document.querySelector("admin_id");
	var button = document.getElementById("#registerPopUp .login_button");
	button.addEventListener("click", buttonEvent.requestRegister, false);
	
	//When
	fireEvent(button,"click");
	
	//Then 
	equal(box, undefined);
});

test("requestRegister_Test", function(){
	var registerForm = document.getElementById("#registerPopUp");
	
	equal(registerForm, undefined);
});
