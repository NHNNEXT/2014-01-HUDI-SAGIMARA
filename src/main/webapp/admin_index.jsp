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
					<li class="active"><a>메인</a></li>
					<li><a>회원목록</a></li>
					<li><a>인증요청관리</a></li>
				</ul>
			</nav>
			<section class="contents">
				<h1>Sagimara Admin</h1>
				<hr>
				<section class="daily-visitor-graph">
					<h1>일간 방문자 그래프</h1>
					<article>
						<figure>
							<ul id="visited-graph">
								<p>최근 5일간 접속자 수</p>
								<li class="bar-section">
									<p></p>
									<ul>
										<li class="bar"><p></p></li>
									</ul>
								</li>
								<li class="bar-section">
									<p></p>
									<ul>
										<li class="bar"><p></p></li>
									</ul>
								</li>
								<li class="bar-section">
									<p></p>
									<ul>
										<li class="bar"><p></p></li>
									</ul>
								</li>
								<li class="bar-section">
									<p></p>
									<ul>
										<li class="bar"><p></p></li>
									</ul>
								</li>
								<li class="bar-section">
									<p></p>
									<ul>
										<li class="bar"><p></p></li>
									</ul>
								</li>
							</ul>
						</figure>
					</article>
				</section>
				<section class="daily-report-graph">
					<h1>일간 신고건수 그래프</h1>
					<article>
						<figure>
							<ul id="report-graph">
								<p>최근 5일간 신고건수</p>
								<li class="bar-section">
									<p></p>
									<ul>
										<li class="bar"><p></p></li>
									</ul>
								</li>
								<li class="bar-section">
									<p></p>
									<ul>
										<li class="bar"><p></p></li>
									</ul>
								</li>
								<li class="bar-section">
									<p></p>
									<ul>
										<li class="bar"><p></p></li>
									</ul>
								</li>
								<li class="bar-section">
									<p></p>
									<ul>
										<li class="bar"><p></p></li>
									</ul>
								</li>
								<li class="bar-section">
									<p></p>
									<ul>
										<li class="bar"><p></p></li>
									</ul>
								</li>
							</ul>
						</figure>
					</article>
				</section>
				<section class="verification-status">
					<h1>판매자 인증 처리 현황</h1><span class="refresh">Refresh</span>
					<article>
						<table class="table table-striped">
							<thead>
								<tr>
									<th>판매자아이디</th>
									<th>요청시간</th>
									<th>현재 등급</th>
									<th>사진</th>
									<th>위치정보</th>
								</tr>
							</thead>
							<tbody>

							</tbody>
						</table>
					</article>
				</section>
				<section class="verification-request-list">
					<h1>구매자 인증 요청 목록</h1>
					<article>
						<table class="table table-striped">
							<thead>
								<tr>
									<th>요청대상</th>
									<th>마지막 요청시간</th>
									<th>요청횟수</th>
								</tr>
							</thead>
							<tbody>

							</tbody>
						</table>
					</article>
				</section>
				<section class="recently-report-list">
					<h1>최근 신고 목록</h1>
					<article>
						<table class="table table-striped">
							<thead>
								<tr>
									<th>신고 대상</th>
									<th>신고한 사람</th>
									<th>신고 시간</th>
									<th>신고 내용</th>
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

	<script src="/javascripts/barManager.js"></script>
	<script src="/javascripts/admin_index.js"></script>
</body>
</html>