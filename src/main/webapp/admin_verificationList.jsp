<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
<title>Sagimara Admin</title>

<link rel="stylesheet" type="text/css" media="screen"
	href="/stylesheets/base.css">
<link rel="stylesheet" type="text/css" media="screen"
	href="/stylesheets/admin_index.css">
</head>
<body>
	<div id="wrap">
		<header> </header>

		<div id="container">
			<nav class="nav">
				<ul>
					<li><a>메인</a></li>
					<li><a>회원목록</a></li>
					<li class="active"><a>인증요청관리</a></li>
					<li><a>신고 처리</a></li>
				</ul>
			</nav>
			<section class="contents">
				<h1>Sagimara Admin</h1>
				<hr>
				
				<section class="verificationList">
					<h1>인증 요청 관리</h1><span class="refresh">Refresh</span>
					<article>
						<table class="table table-striped">
							<thead>
								<tr>
									<th>id</th>
									<th>인증요청시간</th>
									<th>인증요청등급</th>
									<th>현재등급</th>
									<th>인증여부</th>
									<th>위치</th>
									<th>위치 좌표</th>
									<th>위치인증 시간</th>
									<th>사진</th>
									<th>사진 전송 시간</th>

								</tr>
							</thead>
							<tbody>

							</tbody>
						</table>
					</article>
				</section>
			</section>
		</div>
		<div class="clearfix"></div>

	</div>
	<script src="/javascripts/library.js"></script>
	<script src="/javascripts/barManager.js"></script>
	<script src="/javascripts/admin_verificationList.js"></script>
</body>
</html>