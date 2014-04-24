<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<title>Sagimara</title>

	<link rel="stylesheet" type="text/css" medi	="screen"
		href="/stylesheets/base.css">
	<link rel="stylesheet" type="text/css" media="screen"
		href="/stylesheets/main.css">

	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
	<script src="/javascripts/maps.js"></script>
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
							<img id="profile-image" src="/images/police.jpg">
						</figure>
					</section>
					<section id="profile-detail-section" class="float-right">
						<p></p>
						<p></p>
						<p></p>
					</section>
				</section>
				<section id="profile-status" class="clearfix profile-status">
					Warning</section>
			</section>
			<section id="info-wrapper">
				<section id="attention-info" class="clearfix"></section>
				<section id="detail-info" class="clearfix">
					<section id="visited-info" class="detail-info-item float-left">
						<figure>
							<ul id="q-graph">
								<li class="qtr" id="q1">4.22
									<ul>
										<li class="past bar" style="height: 0px;"><p></p></li>
									</ul>
								</li>
								<li class="qtr" id="q2">4.23
									<ul>
										<li class="past bar" style="height: 0px;"><p></p></li>
									</ul>
								</li>
								<li class="qtr" id="q3">4.24
									<ul>
										<li class="past bar" style="height: 0px;"><p></p></li>
									</ul>
								</li>
								<li class="qtr" id="q4">4.25
									<ul>
										<li class="past bar" style="height: 0px;"><p></p></li>
									</ul>
								</li>
								<li class="qtr" id="q5">4.26
									<ul>
										<li class="today bar" style="height: 0px;"><p></p></li>
									</ul>
								</li>
							</ul>
						</figure>
					</section>
					<section id="location-info" class="detail-info-item float-right">
						<figure>
							<div id="map-canvas"></div>
						</figure>
					</section>
					<section id="watch-info" class="detail-info-item float-left">
						<figure>
							<div id="watch-tool">
									<p></p>
									<div style="height:50%;">
								</div>
							</div>
						</figure>
					</section>
					<section id="caution-info" class="detail-info-item float-right">
						<figure>
							<div id="caution-tool">
								<p></p>
							</div>
						</figure>
					</section>
				</section>
			</section>
		</div>
		<footer> this is footer </footer>
	</div>

	<script src="/javascripts/main.js"></script>
</body>
</html>
