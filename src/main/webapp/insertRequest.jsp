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
		<form action="/insert/RequestData" method="POST" enctype="form-data">
			<input type="text" name="from" > <br />
			<input type="text" name="to" > <br />
			<input type="text" name="date"/> <br /> 
			<input type="submit" value="보내기">
			<input type="reset" value="지우기">
		</form>
	</div>
</div>

</body>
</html>
