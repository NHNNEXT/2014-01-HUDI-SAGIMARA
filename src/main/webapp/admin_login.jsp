<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Sagimara Admin Page</title>
<link rel="stylesheet" type="text/css" media="screen"
	href="/stylesheets/base.css">
<link rel="stylesheet" type="text/css" media="screen"
	href="/stylesheets/admin.css">
</head>
<body>
	<div id="wrapper">
		<section id=loginBox class="border-radius input-form">
			<form id="adminLoginForm" class="custom-form" action="#"
				method="POST" enctype="form-data">
				<fieldset>
					<div class="logo">
						<h2>Sagimara Admin</h2>
					</div>
					<div class="id_title">아이디</div>
					<div class="id_input">
						<input class="admin_id border-radius" placeholder="id" type="text"
							name="admin_id">
					</div>
					<div class="pw_title">비밀번호</div>
					<div class="pw_input">
						<input class="admin_pw border-radius" placeholder="password"
							type="password" name="admin_pw">
					</div>
					<div class="login_button">
						<input class="login-submit border-radius" type="submit"
							value="Login">
					</div>
					<div class="register_button">
						<input class="register-submit border-radius" type="submit"
							value="Register">
					</div>
				</fieldset>
			</form>
			<div class="msgBox">messege!</div>
		</section>
		<section id="registerPopUp" class="border-radius input-form">
			<form action="#" class="custom-form" method="POST">
				<header class="logo">
					Registration form
					<p class="exit-button">X</p>
				</header>
				<fieldset>
					<div class="id_title">아이디</div>
					<div class="id_input">
						<input class="admin_id border-radius" placeholder="id" type="text"
							name="admin_id">
					</div>
					<div class="pw_title">비밀번호</div>
					<div class="pw_input">
						<input class="admin_pw border-radius" placeholder="password"
							type="password" name="admin_pw">
					</div>
					<div class="pw_check_title">비밀번호 확인</div>
					<div class="pw_check_input">
						<input class="admin_pw border-radius"
							placeholder="password-checker" type="password"
							name="admin_pw_check">
					</div>
					<div class="name_title">이름</div>
					<div class="name_input">
						<input class="admin_id border-radius" placeholder="name"
							type="text" name="admin_name">
					</div>
					<div class="email_title">이메일</div>
					<div class="email_input">
						<input class="admin_id border-radius" placeholder="email"
							type="text" name="admin_email">
					</div>

					<div class="login_button">
						<input class="login-submit border-radius" type="submit"
							value="Register">
					</div>

				</fieldset>
			</form>
			<div class="msgBox">messege!</div>
		</section>
	</div>
	<script src="/javascripts/admin.js"></script>
</body>
</html>