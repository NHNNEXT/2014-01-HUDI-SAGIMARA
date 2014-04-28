<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>Sagimara</title>

<link rel="stylesheet" type="text/css" medi="screen"
	href="/stylesheets/base.css">
<link rel="stylesheet" type="text/css" media="screen"
	href="/stylesheets/main.css">

<script
	src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
</head>
<body>
	<div id="wrap">
		<header>
			<div class="column">
				<div class="logo">SAGIMARA</div>
			</div>
			<div class="column">
				<form name="finder" method="post" action="/test">
					<input class="search-input"
						placeholder="Enter phone-numer for search..." type="text"
						name="id"> <input class="search-submit" type="submit"
						value=""> <span class="search-icon"> </span>
				</form>
			</div>
		</header>

		<div id="container">
			<section id="user-profile">
				<section class="clearfix">
					<section id="profile-image-section" class="float-left">
						<figure>
							<img id="profile-image" src="/images/person.png">
						</figure>
					</section>
					<section id="profile-detail-section" class="float-right">
						<p>인증기록</p>
						<p>2014년 3월 15일 가입요청</p>
						<p>2014년 3월 18일 얼굴영상 처리</p>
						<p>2014년 3월 18일 재인증요청</p>
						<section id="profile-button-section">
							<button type="button" class="button button-red">재인증 요청</button>
						</section>
					</section>
				</section>
				<section id="visited-info">
					<figure>
						<ul id="q-graph">
							<p>최근 5일간 검색한 사람의 수</p>
							<li class="qtr" id="q1">
								<p></p>
								<ul>
									<li class="past bar" style="height: 0px;"><p></p></li>
								</ul>
							</li>
							<li class="qtr" id="q2">
								<p></p>
								<ul>
									<li class="past bar" style="height: 0px;"><p></p></li>
								</ul>
							</li>
							<li class="qtr" id="q3">
								<p></p>
								<ul>
									<li class="past bar" style="height: 0px;"><p></p></li>
								</ul>
							</li>
							<li class="qtr" id="q4">
								<p></p>
								<ul>
									<li class="past bar" style="height: 0px;"><p></p></li>
								</ul>
							</li>
							<li class="qtr" id="q5">
								<p></p>
								<ul>
									<li class="today bar" style="height: 0px;"><p></p></li>
								</ul>
							</li>
						</ul>
					</figure>
				</section>
				<section id="profile-status" class="clearfix profile-status"></section>
			</section>
			<section id="info-wrapper">
				<section id="detail-info" class="clearfix">
					<section id="location-info" class="detail-info-item float-left">
						<p>최근 위치 정보</p>
						<figure>
							<div id="map-canvas">
								<p></p>
							</div>
						</figure>
					</section>
					<section id="watch-info" class="detail-info-item float-left">
						<p>지켜보는 사람의 수</p>
						<figure>
							<div id="watch-tool">
								<p></p>
							</div>
						</figure>
					</section>
					<section id="caution-info" class="detail-info-item float-right">
						<p>신고/주의 현황</p>
						<figure>
							<div id="caution-tool">
								<p></p>
							</div>
						</figure>
					</section>
				</section>
			</section>
		</div>
		<footer>
			<div class="footer-logo">SAGIMARA</div>
		</footer>
	</div>

	<script src="/javascripts/main.js"></script>
	<script src="/javascripts/maps.js"></script>
</body>
</html>
