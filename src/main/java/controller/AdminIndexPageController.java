package controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import utility.JsonBuilder;
import database.InquiryDAO;
import database.LocationDAO;
import database.NotificationDAO;
import database.RequestDAO;
import database.VerificationDAO;
import database.VideoDAO;
import dto.Location;
import dto.Request;
import dto.UserInquiry;
import dto.Verification;
import dto.VerifivationList;
import dto.Video;


public class AdminIndexPageController implements Controller {
	private String forwardPath;
	private Logger logger;
	private JsonBuilder jb;

	public AdminIndexPageController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.jb = JsonBuilder.getJsonBuilder();
		this.forwardPath = forwardPath;
	}

	@Override
	public String run(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session =  request.getSession();

		String id = (String)session.getAttribute("admin_id");  // request에서 id 파라미터를 가져온다

		if(id==null||id.equals("")){                     // id가 Null 이거나 없을 경우
			response.sendRedirect("/admin/login");    // 로그인 페이지로 리다이렉트 한다.
			return null;
		}



		return forwardPath;
	}



}
