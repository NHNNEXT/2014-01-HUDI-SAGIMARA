<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Sagimara Admin Page</title>
	<link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/admin_login.css">
</head>
<body>

	<div id=loginBox class="border-radius">
		<form id="adminLoginForm" action="#" method="POST" enctype="form-data">
		<fieldset>
		<div class="logo"><h2>Sagimara Admin</h2></div>
		<div class="id_title">아이디</div> 
		<div class="id_input"><input class="admin_id border-radius" placeholder="id" type="text" name="admin_id"></div>
		<div class="pw_title">비밀번호</div>
		<div class="pw_input"><input class="admin_pw border-radius" placeholder="password" type="password" name="admin_pw"></div>
		<div class="login_button"><input class="login-submit border-radius" type="submit" value="Login"></div>
		<div class="register_button"><input class="register-submit border-radius" type="submit" value="register"></div>
		</fieldset>	
		</form>
	</div>
	<script src="/javascripts/admin_login.js"></script>
</body>
</html>