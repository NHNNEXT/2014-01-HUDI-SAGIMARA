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
import database.NotificationDAO;
import database.RequestDAO;
import database.VerificationDAO;
import dto.Request;
import dto.UserInquiry;
import dto.Verification;


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
		

		UserInquiry visits = getVisiterDataAtToday();
		String json = jb.objectToJson(visits);
		logger.info(json);
		request.setAttribute("visits", json);
		
		UserInquiry noti = getNotificationAtToday();
		json = jb.objectToJson(noti);
		logger.info(json);
		request.setAttribute("notify", json);
		
		ArrayList<Verification> veriList = getVerifivationList(5);
		json = jb.objectToJson(veriList);
		logger.info(json);
		request.setAttribute("verification", json);
		
		ArrayList<Request> requestList = getRequestList(5);
		json = jb.objectToJson(requestList);
		logger.info(json);
		request.setAttribute("request", json);
		
		return forwardPath;
	}
	

	public UserInquiry getVisiterDataAtToday() {

		InquiryDAO inquiryDAO = new InquiryDAO();
		
		try {
			return inquiryDAO.selectForGraph();
		} catch (SQLException e) {
			e.printStackTrace();
			logger.info("Inquiry select Fail");
		}
		return null;
	}

	public UserInquiry getNotificationAtToday() {
		NotificationDAO notiDao = new NotificationDAO();
		
		try {
			return notiDao.selectForGraph();
		} catch (SQLException e) {
			e.printStackTrace();
			logger.info("Notify select Fail");
		} 
		return null;
	}

	public ArrayList<Verification> getVerifivationList(int count) {
		VerificationDAO veriDao = new VerificationDAO();
		
		try {
			return veriDao.getList(count);
		} catch (SQLException e) {
			e.printStackTrace();
			logger.info("Verifivation select Fail");
		} 
		return null;
	}

	public ArrayList<Request> getRequestList(int count) {
		RequestDAO reqDao = new RequestDAO();
		
		try {
			return reqDao.getList(count);
		} catch (SQLException e) {
			e.printStackTrace();
			logger.info("Request select Fail");
		}
		return null;
	}

}
