<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>Sagimara</title>

<link rel="stylesheet" type="text/css" media="screen"
	href="/stylesheets/base.css">
<link rel="stylesheet" type="text/css" media="screen"
	href="/stylesheets/main.css">
</head>
<body>
	<div id="wrap">
    	<header>
    		<div class="column">
    			<div class="logo">
    				SAGIMARA
    			</div>
    		</div>
    		<div class="column">
	    		<form name="finder" method="post" action="/test">
	    			<input class="search-input" placeholder="Enter phone-numer for search..." type="text" name="id">
	    			<input class="search-submit" type="submit" value="">
					<span class="search-icon">
					</span>
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
						<p>TestLine 1</p>
						<p>TestLine 2</p>
						<p>TestLine 3</p>
					</section>
				</section>
				<section id="profile-status" class="clearfix">
					Warning
				</section>
			</section>
			<section id="info-wrapper">
				<section id="attention-info" class="clearfix">
					Attention-Info Section
				</section>
				<section id="detail-info" class="clearfix">
					<section id="visited-info" class="detail-info-item float-left">
						오늘하루 검색한 사람의 수
						<figure>
							<img id="profile-image" src="/images/1.png">
						</figure>
					</section>
					<section id="location-info" class="detail-info-item float-right">
						최근 위치 정보
						<figure>
							<img id="profile-image" src="/images/2.png">
						</figure>
					</section>
					<section id="watch-info" class="detail-info-item float-left">
						지켜보는 사람의 수
						<figure>
							<img id="profile-image" src="/images/3.png">
						</figure>
					</section>
					<section id="caution-info" class="detail-info-item float-right">
						신고 현황
						<figure>
							<img id="profile-image" src="/images/4.png">
						</figure>
					</section>
				</section>
			</section>
		</div>
    	<footer>
    		this is footer
    	</footer>
    </div>
    
    <script src="/javascripts/main.js"></script>
</body>
</html>
