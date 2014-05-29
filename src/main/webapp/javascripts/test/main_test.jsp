<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport"
		content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
	<title>Sagimara</title>

	<link rel="stylesheet" type="text/css" media="screen"
		href="/stylesheets/base.css">
	<link rel="stylesheet" type="text/css" media="screen"
		href="/stylesheets/main.css">
	<link rel="stylesheet" type="text/css" media="screen"
		href="/stylesheets/lib/qunit-1.14.0.css">

</head>
<body>
	<div id="qunit"></div>
	<div id="quint-fixture">
		<div class="search-submit"></div>
		<div class="logo"></div>
		
		<div id="location-info-fake"></div>
		<div id="location-info">
			<div id ="map-canvas">
				<p></p>
			</div>
		</div>
	</div>


	<script src="/javascripts/lib/qunit-1.14.0.js"></script>
	<script src="/javascripts/main.js"></script>
	<script src="/javascripts/test/main_test.js"></script>
</body>
</html>
