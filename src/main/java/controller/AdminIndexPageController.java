package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import utility.JsonBuilder;
import database.DatabaseHandler;
import dto.Inquiry;
import dto.UserInquiry;
import dto.UserProfile;

public class AdminIndexPageController implements Controller {
	private String forwardPath;
	private Logger logger;
	private DatabaseHandler dbh;
	private JsonBuilder jb;
	
	public AdminIndexPageController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.dbh = DatabaseHandler.getDatabaseHandler();
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
		
		UserInquiry inquiry = dbh.getVisiterDataAtToday();
		String json = jb.objectToJson(inquiry);
		logger.info(json);
		request.setAttribute("inquiry data", json);
		
		
		
		return forwardPath;
	}

}
