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
    	<div id="header">
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
    	</div>
    	
		<div id="container">
			<article id="user-profile">
				<article class="clearfix">
					<article id="profile-image-article" class="float-left">
						<figure>
							<img id="profile-image" src="/images/police.jpg">
						</figure>
					</article>
					<article id="profile-detail-article" class="float-right">
						<p>TestLine 1</p>
						<p>TestLine 2</p>
						<p>TestLine 3</p>
					</article>
				</article>
				<article id="profile-status" class="clearfix">
					Warning
				</article>
			</article>
			<article id="info-wrapper">
				<article id="attention-info" class="clearfix">
					Attention-Info Section
				</article>
				<article id="detail-info" class="clearfix">
					<article id="visited-info" class="detail-info-item float-left">
						오늘하루 검색한 사람의 수
						<figure>
							<img id="profile-image" src="/images/1.png">
						</figure>
					</article>
					<article id="location-info" class="detail-info-item float-right">
						최근 위치 정보
						<figure>
							<img id="profile-image" src="/images/2.png">
						</figure>
					</article>
					<article id="watch-info" class="detail-info-item float-left">
						지켜보는 사람의 수
						<figure>
							<img id="profile-image" src="/images/3.png">
						</figure>
					</article>
					<article id="caution-info" class="detail-info-item float-right">
						신고 현황
						<figure>
							<img id="profile-image" src="/images/4.png">
						</figure>
					</article>
				</article>
			</article>
		</div>
    	<div id="footer">
    		this is footer
    	</div>
    </div>
    
    <script src="/javascripts/main.js"></script>
</body>
</html>
