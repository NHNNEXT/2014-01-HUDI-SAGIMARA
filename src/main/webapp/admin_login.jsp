<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- HTML5 버전의 doctype을 사용하기.(최신버전)
 --><!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Sagimara Admin Page</title>
	<link rel="stylesheet" type="text/css" media="screen"
		href="/stylesheets/admin_login.css">
</head>
<body>

	<div id=loginBox class="border-radius">
		<form id="adminLoginForm" action="/login" method="POST">
		<fieldset>
<!--     Table태그는 가로/세로 기반의 데이터를 담는 것이 아니면 사용하지 않는 추세. 이유는 몇 가지 있는데 대표적으로 HTML구조가 복잡해지는 것.따라서 그냥 div로 이를 다시 표현하는 것이 좋음.
 -->		<table>
              <tbody>
              	<tr colspan=3>
              		<h2>Sagimara Admin</h2>
              	</tr>
                <tr>
                  <th>아이디</th>
                  <td>
                    <input class="admin_id border-radius" placeholder="id" type="text" name="admin_id">
                  </td>
                  <td class="logintd" rowspan="2">
                  	<input class="login-submit border-radius" type="submit" tabindex="2" value="Login">
                  </td>
                </tr>
                <tr>
                  <th>비밀번호</th>
                  <td>
                    <input class="admin_pw border-radius" placeholder="password" type="password" name="admin_pw">
                  </td>
                </tr>
              </tbody>
            </table>
		</fieldset>	
		</form>
	</div>
	<script src="/javascripts/admin_login.js"></script>
</body>
</html>