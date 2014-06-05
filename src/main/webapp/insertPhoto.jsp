<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
<title>Insert title here</title>
</head>
<body>

<div id="wrap">
	<header>
	<h1>upload User Photo</h1>
	</header>
	
	<div id="formArea">
		<form action="/insert/photoData" method="POST" enctype="multipart/form-data">
			<input type="text" name="id" size=50 > <br />
			<input type="text" name="date" size=40 > <br />
			<input type="file" name="file"/> <br /> 
			<input type="submit" value="보내기">
			<input type="reset" value="지우기">
		</form>
	</div>
</div>

</body>
</html>
